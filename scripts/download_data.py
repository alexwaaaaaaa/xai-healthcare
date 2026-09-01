#!/usr/bin/env python3
"""Download the nine real, public clinical datasets used by this project.

Four cardiometabolic/renal cohorts and five oncology cohorts. Every row served by
the API or reported in the notebooks originates here. Nothing is generated, mocked
or hand-typed: if a source is unreachable the script fails loudly rather than
substituting synthetic data.

Usage:
    python scripts/download_data.py            # idempotent, skips existing files
    python scripts/download_data.py --force    # re-download everything
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"

log = logging.getLogger("download_data")


class SourceUnreachable(RuntimeError):
    """Raised when a dataset source cannot be reached or returns bad data."""


# --------------------------------------------------------------------------
# loaders — one per dataset, each returns a single DataFrame with the target
# column already named `target` and placed last.
# --------------------------------------------------------------------------

def _uci(dataset_id: int, target_rename: str | None = None) -> pd.DataFrame:
    """Fetch a UCI dataset via the official ucimlrepo client."""
    from ucimlrepo import fetch_ucirepo

    repo = fetch_ucirepo(id=dataset_id)
    X, y = repo.data.features, repo.data.targets
    if X is None or y is None:
        raise SourceUnreachable(f"UCI id={dataset_id} returned no features/targets")
    df = pd.concat([X, y], axis=1)
    # ucimlrepo target column names vary per dataset (num / death_event / class)
    df = df.rename(columns={df.columns[-1]: "target"})
    if target_rename:
        log.debug("original target column for id=%s was %s", dataset_id, target_rename)
    return df


def load_heart_disease() -> pd.DataFrame:
    """Cleveland Heart Disease. UCI target `num` is 0-4 severity; the standard
    binary framing (and the one the literature reports) is num > 0 -> disease."""
    df = _uci(45)
    df["target"] = (pd.to_numeric(df["target"], errors="coerce") > 0).astype(int)
    return df


def load_heart_failure() -> pd.DataFrame:
    """Heart Failure Clinical Records. Target is DEATH_EVENT (already 0/1)."""
    df = _uci(519)
    df["target"] = pd.to_numeric(df["target"], errors="coerce").astype("Int64")
    return df


def load_kidney_disease() -> pd.DataFrame:
    """Chronic Kidney Disease. Target is class in {ckd, notckd}."""
    df = _uci(336)
    df["target"] = (
        df["target"].astype(str).str.strip().str.lower().eq("ckd").astype(int)
    )
    return df


def load_breast_cancer() -> pd.DataFrame:
    """Breast Cancer Wisconsin (Diagnostic). Target is Diagnosis in {M, B};
    malignant is the positive class, since missing a malignancy is the costly
    error and the positive class should be the one you are screening for."""
    df = _uci(17)
    df["target"] = (
        df["target"].astype(str).str.strip().str.upper().eq("M").astype(int)
    )
    return df


# The UCI-hosted Ljubljana file has been through Excel, which silently converted
# numeric ranges into dates: "3-5" became "5-Mar", "10-14" became "14-Oct". The
# damage is in `tumor-size` and `inv-nodes`. Left alone, an ordinal encoder would
# happily rank these mangled strings and train on nonsense, so they are repaired
# here rather than downstream.
EXCEL_DATE_REPAIR = {
    "5-Mar": "3-5",
    "9-May": "5-9",
    "8-Jun": "6-8",
    "11-Sep": "9-11",
    "14-Oct": "10-14",
    "14-Dec": "12-14",
}


def load_breast_cancer_recurrence() -> pd.DataFrame:
    """Breast Cancer (Ljubljana). Target is recurrence within the follow-up."""
    df = _uci(14)
    for col in ("tumor-size", "inv-nodes"):
        df[col] = df[col].astype(str).str.strip().replace(EXCEL_DATE_REPAIR)
        broken = df[col][df[col].str.contains("[A-Za-z]", na=False)].unique()
        if len(broken):
            raise SourceUnreachable(
                f"{col}: unrepaired Excel-mangled values {list(broken)}. "
                "Extend EXCEL_DATE_REPAIR before continuing."
            )
    df["target"] = (
        df["target"].astype(str).str.strip().str.lower().eq("recurrence-events")
        .astype(int)
    )
    return df


def load_breast_cancer_survival() -> pd.DataFrame:
    """Haberman's Survival. UCI encodes 1 = survived 5+ years, 2 = died within 5;
    we flip so 1 means death, keeping "the bad outcome is the positive class"
    consistent across every dataset in this project."""
    df = _uci(43)
    df["target"] = (
        pd.to_numeric(df["target"], errors="coerce").eq(2).astype(int)
    )
    return df


def load_lung_cancer_surgery() -> pd.DataFrame:
    """Thoracic Surgery Data. Target Risk1Yr is T when the patient died within a
    year of lung resection, so T maps to 1."""
    df = _uci(277)
    df["target"] = (
        df["target"].astype(str).str.strip().str.upper().eq("T").astype(int)
    )
    return df


# Parallel diagnoses of the same event, recorded at the same visit. Biopsy is the
# histological gold standard, so the other three are alternative measurements of
# the target rather than predictors of it: keeping them is textbook leakage.
CERVICAL_PARALLEL_TESTS = ["Hinselmann", "Schiller", "Citology"]


def load_cervical_cancer() -> pd.DataFrame:
    """Cervical Cancer (Risk Factors).

    `ucimlrepo` designates no target for this dataset because the file ships four
    outcome columns, so it is assembled from `data.original` by hand.
    """
    from ucimlrepo import fetch_ucirepo

    repo = fetch_ucirepo(id=383)
    df = repo.data.original
    if df is None or "Biopsy" not in df.columns:
        raise SourceUnreachable("UCI id=383 returned no usable original frame")

    df = df.copy()
    df["target"] = pd.to_numeric(df["Biopsy"], errors="coerce").fillna(0).astype(int)
    df = df.drop(columns=[*CERVICAL_PARALLEL_TESTS, "Biopsy"])
    return df


PIMA_COLUMNS = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age",
    "target",
]

# Documented fallback: the identical UCI-origin Pima file, byte-for-byte the same
# 768 records as the Kaggle mirror. Used only when Kaggle credentials are absent,
# and always logged. This is a real source, not synthetic data.
PIMA_FALLBACK_URL = (
    "https://raw.githubusercontent.com/jbrownlee/Datasets/master/"
    "pima-indians-diabetes.csv"
)


def load_pima() -> pd.DataFrame:
    """Pima Indians Diabetes, Kaggle `uciml/pima-indians-diabetes-database`."""
    try:
        import kagglehub

        path = Path(kagglehub.dataset_download("uciml/pima-indians-diabetes-database"))
        csv = next(path.glob("*.csv"))
        log.info("  kagglehub cache: %s", csv)
        df = pd.read_csv(csv)
        return df.rename(columns={df.columns[-1]: "target"})
    except Exception as exc:  # noqa: BLE001 - any kagglehub/auth failure
        log.warning(
            "  kagglehub unavailable (%s: %s) -> falling back to the identical "
            "UCI-origin mirror %s",
            type(exc).__name__,
            exc,
            PIMA_FALLBACK_URL,
        )
        try:
            return pd.read_csv(PIMA_FALLBACK_URL, header=None, names=PIMA_COLUMNS)
        except Exception as exc2:  # noqa: BLE001
            raise SourceUnreachable(f"Pima fallback failed: {exc2}") from exc2


# --------------------------------------------------------------------------
# registry
# --------------------------------------------------------------------------

@dataclass(frozen=True)
class DatasetSpec:
    slug: str
    title: str
    source: str
    expected_rows: int
    target_meaning: str
    loader: Callable[[], pd.DataFrame] = field(repr=False)
    primary: bool = False


DATASETS: list[DatasetSpec] = [
    DatasetSpec(
        "heart_disease",
        "Heart Disease (Cleveland)",
        "https://archive.ics.uci.edu/dataset/45/heart+disease",
        303,
        "Presence (1) or absence (0) of angiographic heart disease",
        load_heart_disease,
        primary=True,
    ),
    DatasetSpec(
        "heart_failure",
        "Heart Failure Clinical Records",
        "https://archive.ics.uci.edu/dataset/519",
        299,
        "Death event during the follow-up period",
        load_heart_failure,
    ),
    DatasetSpec(
        "diabetes",
        "Pima Indians Diabetes",
        "https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database",
        768,
        "Onset of diabetes within five years",
        load_pima,
    ),
    DatasetSpec(
        "kidney_disease",
        "Chronic Kidney Disease",
        "https://archive.ics.uci.edu/dataset/336",
        400,
        "Chronic kidney disease present (1) or not (0)",
        load_kidney_disease,
    ),
    # ---------------------------------------------------------------- oncology
    DatasetSpec(
        "breast_cancer",
        "Breast Cancer Wisconsin (Diagnostic)",
        "https://archive.ics.uci.edu/dataset/17",
        569,
        "Malignant (1) or benign (0) breast mass",
        load_breast_cancer,
    ),
    DatasetSpec(
        "breast_cancer_recurrence",
        "Breast Cancer Recurrence (Ljubljana)",
        "https://archive.ics.uci.edu/dataset/14",
        286,
        "Recurrence of breast cancer during follow-up",
        load_breast_cancer_recurrence,
    ),
    DatasetSpec(
        "breast_cancer_survival",
        "Breast Cancer Surgical Survival (Haberman)",
        "https://archive.ics.uci.edu/dataset/43",
        306,
        "Death within five years of surgery",
        load_breast_cancer_survival,
    ),
    DatasetSpec(
        "cervical_cancer",
        "Cervical Cancer (Risk Factors)",
        "https://archive.ics.uci.edu/dataset/383",
        858,
        "Biopsy-confirmed cervical cancer",
        load_cervical_cancer,
    ),
    DatasetSpec(
        "lung_cancer_surgery",
        "Lung Cancer Thoracic Surgery",
        "https://archive.ics.uci.edu/dataset/277",
        470,
        "Death within one year of lung resection",
        load_lung_cancer_surgery,
    ),
]

# Deliberately excluded, recorded so the omission is a decision and not an
# oversight:
#   * UCI 62  "Lung Cancer"    — 32 patients against 56 features, three classes.
#     Any model is fitting noise; a reported accuracy would be meaningless.
#   * UCI 83  "Primary Tumor"  — 21 tumour-site classes, several with a single
#     case. This pipeline is binary throughout, and collapsing 21 sites into two
#     would invent a clinical question nobody asked.
EXCLUDED = {
    62: "32 rows vs 56 features, multiclass — p >> n, cannot be fitted honestly",
    83: "21 classes, minimum class size 1 — incompatible with a binary pipeline",
}


def fetch(spec: DatasetSpec, force: bool) -> dict:
    out = RAW / f"{spec.slug}.csv"
    if out.exists() and not force:
        df = pd.read_csv(out)
        log.info("%-16s cached   %s", spec.slug, out.name)
    else:
        log.info("%-16s fetching %s", spec.slug, spec.source)
        df = spec.loader()
        if df is None or df.empty:
            raise SourceUnreachable(f"{spec.slug}: source returned an empty frame")
        out.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(out, index=False)

    rows, cols = df.shape
    status = "OK" if rows == spec.expected_rows else "ROW COUNT MISMATCH"
    log.info(
        "%-16s %-18s rows=%-4d (expected %-4d) cols=%-3d target=%s",
        spec.slug,
        status,
        rows,
        spec.expected_rows,
        cols,
        spec.target_meaning,
    )
    if rows != spec.expected_rows:
        raise SourceUnreachable(
            f"{spec.slug}: got {rows} rows, expected {spec.expected_rows}. "
            "Refusing to continue with unexpected data."
        )

    return {
        "slug": spec.slug,
        "title": spec.title,
        "source": spec.source,
        "primary": spec.primary,
        "rows": rows,
        "columns": cols,
        "feature_names": [c for c in df.columns if c != "target"],
        "target_meaning": spec.target_meaning,
        "positive_rate": round(float(df["target"].astype(float).mean()), 4),
        "file": str(out.relative_to(ROOT)),
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--force", action="store_true", help="re-download even if cached")
    args = ap.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(message)s", stream=sys.stdout)

    manifest = []
    for spec in DATASETS:
        manifest.append(fetch(spec, args.force))

    (RAW / "manifest.json").write_text(json.dumps(manifest, indent=2))
    log.info("\nWrote %s", (RAW / "manifest.json").relative_to(ROOT))
    log.info("All %d datasets verified.", len(manifest))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SourceUnreachable as exc:
        log.error("\nFATAL: %s", exc)
        raise SystemExit(1) from exc

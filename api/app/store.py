"""Artefact registry, populated once at application startup.

Loading twenty-seven models, twenty-seven SHAP explainers and nine LIME explainers takes a
few seconds. Doing it per request would make every prediction unusable, so the
FastAPI lifespan handler fills this registry on boot and every request reads from
memory.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass, field
from pathlib import Path

import joblib
import pandas as pd

from xai import explain, schema

log = logging.getLogger("xai.api")


class ArtefactsMissing(RuntimeError):
    """Raised at startup when the notebooks have not been run yet."""


@dataclass
class Registry:
    models: dict[tuple[str, str], object] = field(default_factory=dict)
    shap: dict[tuple[str, str], object] = field(default_factory=dict)
    lime: dict[str, object] = field(default_factory=dict)
    preprocessors: dict[str, object] = field(default_factory=dict)
    train_frames: dict[str, pd.DataFrame] = field(default_factory=dict)
    evaluation: dict = field(default_factory=dict)
    global_importance: dict = field(default_factory=dict)
    case_studies: dict = field(default_factory=dict)
    best_models: dict[str, str] = field(default_factory=dict)
    ready: bool = False

    # ---------------- startup ----------------

    def load(self) -> None:
        self._require(schema.RESULTS / "05_evaluation.json")
        evaluation = json.loads((schema.RESULTS / "05_evaluation.json").read_text())
        self.evaluation = evaluation["evaluation"]
        self.explanation_quality = evaluation["explanation_quality"]
        self.method_notes = evaluation["method_notes"]
        self.best_models = evaluation["best_models"]

        self.global_importance = json.loads(
            self._require(schema.RESULTS / "04_global_importance.json").read_text()
        )
        self.case_studies = json.loads(
            self._require(schema.RESULTS / "04_case_studies.json").read_text()
        )

        for slug, ds in schema.DATASETS.items():
            self.preprocessors[slug] = joblib.load(
                self._require(schema.MODELS / f"{slug}_preprocessor.pkl")
            )
            train = pd.read_csv(
                self._require(schema.PROCESSED / f"{slug}_x_train.csv")
            ).drop(columns=["target"])
            self.train_frames[slug] = train
            # LIME is rebuilt rather than unpickled: it is cheap to construct and
            # pickling an object that embeds the whole training set is worse.
            self.lime[slug] = explain.build_lime(train, ds)

            for name in schema.MODEL_NAMES:
                self.models[(slug, name)] = joblib.load(
                    self._require(schema.MODELS / f"{slug}_{name}.pkl")
                )
                try:
                    self.shap[(slug, name)] = joblib.load(
                        self._require(schema.MODELS / f"{slug}_{name}_shap.pkl")
                    )
                except Exception as exc:
                    log.warning("rebuilding SHAP explainer for (%s, %s): %s", slug, name, exc)
                    self.shap[(slug, name)] = explain.ShapExplainer(
                        self.models[(slug, name)], train, name
                    )
            log.info("loaded %s: 3 models, 3 SHAP explainers, 1 LIME explainer", slug)

        self.ready = True
        log.info(
            "registry ready — %d models, %d SHAP explainers, %d LIME explainers",
            len(self.models), len(self.shap), len(self.lime),
        )

    @staticmethod
    def _require(path: Path) -> Path:
        if not path.exists():
            raise ArtefactsMissing(
                f"missing artefact: {path}. Run the notebooks in order "
                "(scripts/build_notebooks.py --execute) before starting the API."
            )
        return path

    # ---------------- lookups ----------------

    def model(self, dataset: str, model: str):
        return self.models[(dataset, model)]

    def explainer(self, dataset: str, model: str):
        return self.shap[(dataset, model)]

    def metrics(self, dataset: str, model: str) -> dict:
        return self.evaluation[dataset][model]


registry = Registry()

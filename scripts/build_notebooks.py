#!/usr/bin/env python3
"""Build `notebooks/*.ipynb` from the reviewable percent-format sources in
`notebooks/src/*.py`.

Cell markers:
    # %% [markdown]   -> markdown cell (lines are un-commented)
    # %%              -> code cell

Why this exists: notebook JSON is unreviewable in a diff. The .py sources are
the thing you read and edit; the .ipynb is the build artefact that gets executed
and submitted. `--execute` runs them in order so every artefact the next stage
consumes actually exists.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import nbformat

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "notebooks" / "src"
OUT = ROOT / "notebooks"


def parse(text: str) -> list:
    cells: list = []
    kind, buf = "code", []

    def flush() -> None:
        body = "\n".join(buf).strip("\n")
        if not body.strip():
            return
        if kind == "markdown":
            body = "\n".join(
                line[2:] if line.startswith("# ") else line.lstrip("#")
                for line in body.splitlines()
            )
            cells.append(nbformat.v4.new_markdown_cell(body))
        else:
            cells.append(nbformat.v4.new_code_cell(body))

    for line in text.splitlines():
        if line.startswith("# %%"):
            flush()
            kind = "markdown" if "[markdown]" in line else "code"
            buf = []
        else:
            buf.append(line)
    flush()
    return cells


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--execute", action="store_true", help="run each notebook in place")
    ap.add_argument("--only", help="build a single notebook stem, e.g. 03_model_training")
    args = ap.parse_args()

    sources = sorted(SRC.glob("*.py"))
    if args.only:
        sources = [p for p in sources if p.stem == args.only]
        if not sources:
            print(f"no source matching {args.only}", file=sys.stderr)
            return 1

    for src in sources:
        nb = nbformat.v4.new_notebook(cells=parse(src.read_text()))
        nb.metadata.kernelspec = {
            "display_name": "Python 3 (xai-healthcare)",
            "language": "python",
            "name": "python3",
        }
        dest = OUT / f"{src.stem}.ipynb"
        nbformat.write(nb, dest)
        print(f"built    {dest.relative_to(ROOT)}  ({len(nb.cells)} cells)")

        if args.execute:
            print(f"executing {dest.name} ...", flush=True)
            r = subprocess.run(
                [
                    sys.executable, "-m", "jupyter", "nbconvert",
                    "--to", "notebook", "--execute", "--inplace",
                    "--ExecutePreprocessor.timeout=3600",
                    str(dest),
                ],
                cwd=ROOT,
                capture_output=True,
                text=True,
            )
            if r.returncode != 0:
                print(r.stdout[-4000:])
                print(r.stderr[-8000:], file=sys.stderr)
                print(f"FAILED {dest.name}", file=sys.stderr)
                return r.returncode
            print(f"ok       {dest.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

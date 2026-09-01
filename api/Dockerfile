# Explainable AI for Healthcare Diagnosis — inference API
#
# The directory layout inside the image mirrors the repository, because
# `xai/schema.py` derives the artefact paths from its own parent directory.
# Keeping /app/xai next to /app/models is what lets the same code run locally and
# in the container with no path configuration.

FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# libgomp is required by XGBoost's OpenMP runtime; the slim image omits it and
# the failure mode is an import error at startup rather than at build time.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 curl \
    && rm -rf /var/lib/apt/lists/*

# Dependencies first so the layer is cached across source edits.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Shared library and service code.
COPY xai/ ./xai/
COPY api/ ./api/

# Notebook artefacts the API loads at startup. Copied rather than mounted so the
# image is self-contained; run the notebooks before building.
COPY models/ ./models/
COPY results/ ./results/
COPY data/processed/ ./data/processed/
COPY data/raw/manifest.json ./data/raw/manifest.json

RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# The startup probe hits /health, which reports how many models and explainers
# actually loaded — a process that is listening but has no artefacts is not
# healthy, and Compose should not mark it ready.
HEALTHCHECK --interval=15s --timeout=5s --start-period=90s --retries=5 \
    CMD curl -fsS http://127.0.0.1:8000/health | grep -q '"status":"ok"' || exit 1

CMD ["uvicorn", "api.app.main:app", "--host", "0.0.0.0", "--port", "8000"]

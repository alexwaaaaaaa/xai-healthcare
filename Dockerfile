# Explainable AI for Healthcare Diagnosis — Inference API (Hugging Face Spaces & Generic Docker)
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=7860

WORKDIR /app

# libgomp1 is required by XGBoost's OpenMP runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy service and libraries
COPY xai/ ./xai/
COPY api/ ./api/
COPY models/ ./models/
COPY results/ ./results/
COPY data/processed/ ./data/processed/
COPY data/raw/manifest.json ./data/raw/manifest.json

# Hugging Face Spaces runs as user ID 1000
RUN useradd -m -u 1000 user && chown -R user:user /app
USER user

EXPOSE 7860

CMD ["sh", "-c", "uvicorn api.app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]

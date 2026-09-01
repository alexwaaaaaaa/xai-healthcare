"""Hugging Face Spaces entrypoint (Gradio SDK).

Mounts the FastAPI backend so that:
1. Next.js on Vercel can consume all REST endpoints (/predict, /datasets, /models, etc.).
2. Hugging Face Spaces displays an interactive status page.
"""

from __future__ import annotations

import gradio as gr
from api.app.main import app as fastapi_app
from api.app.store import registry

# Ensure artefacts are loaded
if not registry.ready:
    registry.load()

with gr.Blocks(title="Explainable AI for Healthcare") as demo:
    gr.Markdown(
        "# 🩺 Explainable AI for Healthcare Diagnosis (MDS-391)\n\n"
        "**Department of Computer Engineering, Jamia Millia Islamia**\n\n"
        "The **FastAPI Inference & XAI Backend** is live and serving all 27 ML classifiers and SHAP/LIME explainers!\n\n"
        "### 🔗 Direct API Links:\n"
        "- 📖 **Interactive Swagger Docs**: [/docs](/docs)\n"
        "- 🏥 **Health Status**: [/health](/health)\n"
        "- 📊 **Datasets & Schemas**: [/datasets](/datasets)\n"
        "- 🔍 **Explainability Matrix**: [/explainability](/explainability)\n\n"
        "--- \n"
        "*Connect this Space URL (`https://<username>-<space-name>.hf.space`) as `NEXT_PUBLIC_API_URL` in Vercel.*"
    )

# Mount Gradio onto the existing FastAPI application
app = gr.mount_gradio_app(fastapi_app, demo, path="/")

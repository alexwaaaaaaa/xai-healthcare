"""Hugging Face Spaces entrypoint (Gradio SDK with ZeroGPU support).

Mounts the FastAPI backend at root and Gradio at /gradio so that:
1. Next.js on Vercel can consume all REST endpoints (/predict, /datasets, /models, etc.).
2. Hugging Face Spaces displays the status UI and satisfies ZeroGPU.
"""

from __future__ import annotations

import gradio as gr
import spaces
from api.app.main import app as fastapi_app
from api.app.store import registry

# Ensure artefacts are loaded
if not registry.ready:
    registry.load()

@spaces.GPU
def gpu_worker(probe: str) -> str:
    return f"Loaded {len(registry.models)} models. {probe}"

with gr.Blocks(title="Explainable AI for Healthcare", theme=gr.themes.Soft()) as demo:
    gr.Markdown(
        "# 🩺 Explainable AI for Healthcare Diagnosis (MDS-391)\n\n"
        "**Department of Computer Engineering, Jamia Millia Islamia**\n\n"
        "The **FastAPI Inference & XAI Backend** is live and serving all 27 ML classifiers and SHAP/LIME explainers!\n\n"
        "### 🔗 Direct API Links:\n"
        "- 📖 **Interactive Swagger Docs**: [/docs](/docs)\n"
        "- 🏥 **Health Status**: [/health](/health)\n"
        "- 📊 **Datasets & Schemas**: [/datasets](/datasets)\n"
        "- 🔍 **Explainability Matrix**: [/explainability](/explainability)\n"
    )

    with gr.Row():
        inp = gr.Textbox(label="Probe Input", value="Nominal")
        btn = gr.Button("Verify XAI Backend Engine", variant="primary")
    out = gr.Textbox(label="Backend Response")

    btn.click(fn=gpu_worker, inputs=inp, outputs=out)

demo.queue()

# Mount Gradio at /gradio so root routes /docs, /health, /datasets, /predict belong directly to FastAPI
app = gr.mount_gradio_app(fastapi_app, demo, path="/gradio")

@app.get("/")
def home():
    return {
        "service": "Explainable AI for Healthcare Diagnosis API",
        "status": "online",
        "docs": "/docs",
        "health": "/health",
        "datasets": "/datasets",
        "gradio_ui": "/gradio",
    }

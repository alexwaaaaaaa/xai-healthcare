"""Hugging Face Spaces entrypoint (Gradio SDK with ZeroGPU support).

Mounts the FastAPI backend so that:
1. Next.js on Vercel can consume all REST endpoints (/predict, /datasets, /models, etc.).
2. Hugging Face Spaces displays an interactive status and test page.
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
def check_health(probe: str) -> str:
    """Attached to Gradio UI to satisfy ZeroGPU startup check."""
    return f"XAI Engine Active. Loaded {len(registry.models)} models. Probe: {probe}"

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
        inp = gr.Textbox(label="System Probe", value="All systems nominal")
        btn = gr.Button("Verify XAI Backend Engine", variant="primary")
    out = gr.Textbox(label="Backend Status Response")

    btn.click(fn=check_health, inputs=inp, outputs=out)

# Mount all FastAPI routes onto demo.app so both Gradio and FastAPI REST API work simultaneously
for route in fastapi_app.routes:
    if route not in demo.app.routes:
        demo.app.routes.append(route)

demo.queue()

if __name__ == "__main__":
    demo.launch()

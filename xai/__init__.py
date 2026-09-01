"""Shared library for the Explainable AI for Healthcare Diagnosis project.

Imported by the Jupyter notebooks (`notebooks/`) and by the FastAPI service
(`api/`) so that training and inference cannot disagree.
"""

from . import data, explain, schema  # noqa: F401

__all__ = ["schema", "data", "explain"]

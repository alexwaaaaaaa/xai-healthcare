"""FastAPI application package.

Adds the repository root to `sys.path` so the shared `xai` package resolves in
local development. In the Docker image `xai` sits next to `api/` at `/app`, so
the same relative layout holds and no environment variable is needed.
"""

import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parents[2]
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

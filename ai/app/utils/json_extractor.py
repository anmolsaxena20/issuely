import json
import re
from typing import Any


def extract_json(text: str) -> dict[str, Any]:
    cleaned = re.sub(r"```(json)?", "", text).strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if not match:
        raise ValueError("No JSON object found")

    return json.loads(match.group())

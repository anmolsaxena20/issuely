from google import genai
from app.config import settings
from app.utils.prompt_loader import load_prompt
from app.utils.json_extractor import extract_json
from app.schemas.ai import AgentResponse


class StaffAgent:
    def __init__(self):
        self.client = genai.Client(api_key=settings.gemini_api_key)
        self.model = "models/gemini-flash-lite-latest"
        self.system_prompt = load_prompt("staff.txt")

    def run(self, task: str, context: dict, allowed_actions: list[str]) -> AgentResponse:
        prompt = f"""
{self.system_prompt}

Task:
{task}

Context:
{context}

Allowed actions:
{allowed_actions}

Respond ONLY with valid JSON in this format:
{{
  "reasoning": "string",
  "suggested_action": string | null,
  "payload": object | null
}}
"""

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )

            raw_text = response.candidates[0].content.parts[0].text

            data = extract_json(raw_text)
            return AgentResponse(**data)

        except Exception as e:
            print("FULL GEMINI ERROR:", repr(e))
            return AgentResponse(
                reasoning=f"Gemini exception: {type(e).__name__}",
                suggested_action=None,
                payload=None,
            )

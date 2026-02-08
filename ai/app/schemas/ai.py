from pydantic import BaseModel
from typing import List, Optional

class AgentRequest(BaseModel):
    role: str
    task: str
    context: dict
    allowed_actions: List[str]

class AgentResponse(BaseModel):
    reasoning: str
    suggested_action: Optional[str] = None
    payload: Optional[dict] = None

from fastapi import FastAPI
from app.schemas.ai import AgentRequest, AgentResponse
from app.services.agent_router import route_agent

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ai/agent", response_model=AgentResponse)
def run_agent(request: AgentRequest):
    return route_agent(request)
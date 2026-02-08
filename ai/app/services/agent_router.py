from app.agents.staff import StaffAgent
from app.schemas.ai import AgentRequest, AgentResponse

def route_agent(request: AgentRequest) -> AgentResponse:
    if request.role == "staff":
        agent = StaffAgent()
    else:
        raise ValueError("Unsupported role")

    return agent.run(
        task=request.task,
        context=request.context,
        allowed_actions=request.allowed_actions
    )

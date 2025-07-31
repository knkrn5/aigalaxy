from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


@router.post("/aichat-res")
def aichat(question: str = Body(embed=True)):
    res = aichatservice.aichat(question)
    # return StreamingResponse(res, media_type="text/plain")
    return StreamingResponse(res, media_type="text/event-stream")

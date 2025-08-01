from fastapi import APIRouter, Body, Query
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


# @router.post("/aichat-res")
# def aichat(question: str = Body(embed=True)):
#     res = aichatservice.aichat(question)
#     return StreamingResponse(res, media_type="text/event-stream")


@router.get("/aichat-res")
def aichat(question: str = Query(..., min_length=1)):
    return StreamingResponse(
        aichatservice.aichat(question),
        media_type="text/event-stream",
    )

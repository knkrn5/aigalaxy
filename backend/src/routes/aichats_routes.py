from fastapi import APIRouter, Body, Query
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


@router.post("/aichat-res")
def aichat(question: str = Body(embed=True, min_length=1)):
    res = aichatservice.aichat(question)
    def streamer():
        for item in res:
            yield ", ".join(item) if isinstance(item, set) else str(item)
    return StreamingResponse(streamer(), media_type="text/event-stream")


@router.get("/aichat-res")
def aichat(question: str = Query(..., min_length=1)):
    return StreamingResponse(
        aichatservice.aichat(question),
        media_type="text/event-stream",
    )

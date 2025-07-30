from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


@router.get("/aichatres")
def aichat():
    res = aichatservice.aichat()
    # return StreamingResponse(res, media_type="text/plain")
    return StreamingResponse(res, media_type="application/json")

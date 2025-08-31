from fastapi import APIRouter, Body, Query, Response
from fastapi.responses import StreamingResponse

from ..services.aichat_service import aichatservice


router = APIRouter()


@router.post("/aichat-res-manu")
def aichat(question: str = Body(embed=True, min_length=1), model: str = Body(embed=True, min_length=1)):
    res = aichatservice.aichatManu(question, model)

    def streamer():
        for item in res:
            yield ", ".join(item) if isinstance(item, set) else str(item)

    return StreamingResponse(streamer(), media_type="text/event-stream")


@router.get("/aichat-res-auto")
def aichat(
    question: str = Query(..., min_length=1), model: str = Query(..., min_length=1)
):
    return StreamingResponse(
        aichatservice.aichatAuto(question, model),
        media_type="text/event-stream",
    )


# @router.post("/aichat-res-direct")
# def aichat(question: str = Body(embed=True, min_length=1), model: str = Body(embed=True, min_length=1)):
#     res = aichatservice.aichatDirect(question, model)


#     return Response(res, media_type="application/json")
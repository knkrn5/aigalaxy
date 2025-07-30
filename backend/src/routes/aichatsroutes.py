from fastapi import APIRouter
from fastapi.responses import RedirectResponse

from ..services.aichatservice import aichatservice


router = APIRouter()


@router.get("/aichatres")
def aichat():
    res = aichatservice.aichat()
    print(res)
    return {"response": res}


# @router.get("/typer")
# async def redirect_typer():
#     return RedirectResponse("https://typer.tiangolo.com", status_code=302)

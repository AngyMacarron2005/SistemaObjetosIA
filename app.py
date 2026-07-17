from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File
import shutil
import os

from model.predictor import predecir

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/")
async def inicio(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={}
    )

@app.post("/predecir")
async def analizar(imagen: UploadFile = File(...)):

    carpeta = "static/uploads"

    os.makedirs(carpeta, exist_ok=True)

    ruta = os.path.join(carpeta, imagen.filename)

    with open(ruta, "wb") as buffer:
        shutil.copyfileobj(imagen.file, buffer)

    resultado = predecir(ruta)

    return resultado
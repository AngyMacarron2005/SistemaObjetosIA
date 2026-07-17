import onnxruntime as ort
import numpy as np

from PIL import Image
from torchvision import transforms

# -------------------------
# Cargar modelo ONNX
# -------------------------

sesion = ort.InferenceSession("model/modelo_resnet_multilabel.onnx")

# -------------------------
# Transformaciones
# -------------------------

transformaciones = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

# -------------------------
# Clases
# -------------------------

clases = [
    "Celular",
    "Lentes",
    "Cartera"
]

# -------------------------
# Función principal
# -------------------------

def predecir(ruta_imagen):

    imagen = Image.open(ruta_imagen).convert("RGB")

    tensor = transformaciones(imagen)

    tensor = tensor.unsqueeze(0)

    entrada = tensor.numpy().astype(np.float32)

    salida = sesion.run(
        None,
        {
            sesion.get_inputs()[0].name: entrada
        }
    )[0]

    probabilidades = 1 / (1 + np.exp(-salida[0]))

    resultados = []

    for nombre, prob in zip(clases, probabilidades):

        resultados.append({

            "clase": nombre,

            "probabilidad": round(float(prob)*100,2),

            "detectado": bool(prob > 0.5)

        })

    return resultados
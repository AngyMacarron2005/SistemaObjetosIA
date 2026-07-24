# 📱 Clasificación de Objetos Personales Olvidados

> **Prototipo de Detección de Objetos Olvidados en la Universidad Politécnica Salesiana (UPS)**  
> *Proyecto de Inteligencia Artificial y Aprendizaje Automático*

---

# Descripción del Proyecto

Este proyecto implementa un sistema inteligente para la **detección y clasificación automática de objetos personales olvidados** en las instalaciones de la Universidad Politécnica Salesiana (Cuenca, Ecuador).

La solución utiliza técnicas de **Aprendizaje Profundo (Deep Learning)** mediante **Transfer Learning con ResNet18**, permitiendo identificar simultáneamente la presencia de:

- Celular
- Lentes
- Cartera

El modelo fue exportado a **ONNX** para optimizar la inferencia y posteriormente integrado en una aplicación web desarrollada con **FastAPI**, ofreciendo una interfaz sencilla donde el usuario puede cargar una imagen y obtener automáticamente las probabilidades de cada objeto.

---

# Autores y Afiliación

- **Daniel Barros** (`dbarrosp1@est.ups.edu.ec`)
- **Angélica Panamá** (`apanamar@est.ups.edu.ec`)
- **Juan Rodríguez** (`jrodriguezc28@est.ups.edu.ec`)
- **Xaxier Siguachi** (`xsiguachi@est.ups.edu.ec`)

**Institución:** Carrera de Ciencias de la Computación  
**Universidad Politécnica Salesiana (Cuenca, Ecuador)**

---

# Dataset y Preprocesamiento

**Fuente del Dataset**

Wallet-Keys-Glasses Detection

https://universe.roboflow.com/ultralytics-fersv/wallet-keys-glasses-detection

### Clases utilizadas

Se seleccionaron únicamente tres categorías:

| Clase | ID |
|--------|----|
| Celular | 0 |
| Lentes | 1 |
| Cartera | 2 |

### Preprocesamiento

El conjunto de datos fue sometido a diversas etapas de preparación:

- Eliminación de clases no utilizadas.
- Redimensionamiento de imágenes a **224 × 224 píxeles**.
- Normalización utilizando los parámetros de ImageNet.
- Aplicación de Data Augmentation durante el entrenamiento.
- Balanceo mediante **Oversampling (2x)** para evitar el desbalance de clases.

Dataset final:

- **2,393 imágenes balanceadas**

---

# Arquitectura del Modelo

Se realizó una comparación entre una CNN diseñada desde cero y un modelo de **Transfer Learning basado en ResNet18**.

| Característica | CNN Base | ResNet18 |
|---------------|---------|-----------|
| Entrenamiento | Desde cero | Transfer Learning |
| Pesos iniciales | Aleatorios | ImageNet |
| Épocas | 70 | **6** |
| Velocidad | Baja | **11.6 veces más rápida** |
| Exact Match Accuracy | 63.0% | **92.8%** |

El modelo final corresponde a **ResNet18**, debido a su mayor precisión y menor tiempo de entrenamiento.

---

# Resultados del Modelo

## Métricas por clase

| Clase | Precisión | Recall | F1-Score |
|---------|-----------|---------|-----------|
| Celular | 94.1% | 92.5% | 93.3% |
| Lentes | 91.8% | 90.2% | 91.0% |
| Cartera | 95.0% | 93.8% | 94.4% |
| **Promedio** | **93.6%** | **92.2%** | **92.9%** |

---

## Rendimiento

- Tiempo de inferencia aproximado: **35 ms**
- Modelo exportado a **ONNX**
- Tamaño aproximado: **44.7 MB**
- Compatible con CPU
- Preparado para aplicaciones Edge

---

# Aplicación Web

La aplicación web fue desarrollada utilizando:

- FastAPI
- HTML5
- CSS3
- JavaScript
- ONNX Runtime

La interfaz permite:

- Seleccionar una imagen.
- Visualizar una vista previa.
- Ejecutar la inferencia del modelo.
- Mostrar la probabilidad obtenida para cada objeto.
- Resaltar automáticamente el objeto detectado con mayor confianza.

---

# Estructura del Proyecto

```text
SistemaObjetosIA/
│
├── app.py                     # Aplicación principal FastAPI
├── requirements.txt           # Dependencias del proyecto
├── README.md
│
├── model/
│   ├── modelo.onnx            # Modelo exportado
│   ├── clases.json            # Etiquetas de las clases
│   └── utils.py
│
├── static/
│   ├── css/
│   │     └── styles.css
│   ├── js/
│   │     └── script.js
│   └── uploads/
│
├── templates/
│   └── index.html
│
├── notebooks/
│   └── Proyecto_IA_Clasificacion_Objetos.ipynb
│
├── dataset/
│
└── resultados/
    ├── output.png
    └── pre.pdf
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/SistemaObjetosIA.git
```

```bash
cd SistemaObjetosIA
```

---

## 2. Crear entorno virtual

Windows

```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

## 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

O manualmente

```bash
pip install fastapi uvicorn onnxruntime pillow numpy torch torchvision matplotlib scikit-learn pandas
```

---

# Ejecutar el proyecto

Iniciar el servidor

```bash
python -m uvicorn app:app --reload
```

Abrir el navegador en

```
http://127.0.0.1:8000
```

---

# Uso del Sistema

1. Seleccionar una imagen.
2. Visualizar la vista previa.
3. Presionar **Analizar imagen**.
4. Esperar la inferencia del modelo.
5. Revisar las probabilidades obtenidas para cada objeto.

---

# Tecnologías Utilizadas

- Python
- FastAPI
- ONNX Runtime
- PyTorch
- Torchvision
- NumPy
- Pillow
- HTML5
- CSS3
- JavaScript

---

# Futuras Mejoras

- Detección en tiempo real mediante webcam.
- Integración con cámaras IP.
- Incorporación de más categorías de objetos.
- Sistema de notificaciones automáticas.
- Panel administrativo para monitoreo de objetos detectados.

---

# Licencia

Proyecto desarrollado para la asignatura de **Inteligencia Artificial y Aprendizaje Automático** de la **Universidad Politécnica Salesiana**.

Su finalidad es exclusivamente académica y de investigación.

---

# Agradecimientos

A la **Universidad Politécnica Salesiana**, a los docentes de la Carrera de Ciencias de la Computación y a la comunidad de **Roboflow** por facilitar el conjunto de datos utilizado para el entrenamiento del modelo.

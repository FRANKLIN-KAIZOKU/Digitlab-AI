# DigitLab AI

### AI-Powered Handwritten Digit Recognition using CNN

DigitLab AI is a full-stack machine learning application that recognizes handwritten digits from 0–9 using a Convolutional Neural Network trained on the MNIST dataset.

The application allows users to draw a digit directly in the browser and receive a real-time prediction with confidence. It also provides model analytics, training information, and a dedicated model exploration interface.

---

## 🚀 Live Demo

**Live Application:**  
https://digitlab-ai-1.onrender.com

**Backend API:**  
https://digitlab-ai-1qlc.onrender.com

**GitHub Repository:**  
https://github.com/FRANKLIN-KAIZOKU/Digitlab-AI

---

## ✨ Features

- Draw handwritten digits directly in the browser
- Real-time CNN inference
- Prediction confidence display
- MNIST-based digit classification
- CNN model trained using TensorFlow/Keras
- Model Lab for exploring the trained model
- Analytics dashboard
- Confusion matrix visualization
- Training and validation metrics
- REST API built with FastAPI
- Production deployment with separate frontend and backend services
- Responsive React-based interface

---

## 🧠 Machine Learning

### Dataset

DigitLab AI uses the **MNIST handwritten digit dataset**.

| Property | Value |
|---|---:|
| Training images | 60,000 |
| Test images | 10,000 |
| Number of classes | 10 |
| Classes | 0–9 |
| Image size | 28 × 28 |
| Input channels | 1 |
| Pixel range | 0–255 |
| Model input | 28 × 28 × 1 |

Before inference, images are converted to grayscale, normalized, and transformed into the format expected by the CNN.

---

## 🏗️ Model

The project uses a Convolutional Neural Network designed for handwritten digit classification.

The current production model is **V4**.

### Model Performance

| Metric | Result |
|---|---:|
| Test Accuracy | **98.07%** |
| Test Loss | **0.0643** |
| Training Epochs | **8** |
| Number of Classes | **10** |

### Per-Digit Accuracy

| Digit | Accuracy |
|---:|---:|
| 0 | 98.88% |
| 1 | 99.65% |
| 2 | 95.83% |
| 3 | 97.92% |
| 4 | 98.37% |
| 5 | 98.77% |
| 6 | 99.06% |
| 7 | 97.96% |
| 8 | 96.82% |
| 9 | 97.42% |

The V4 model was evaluated on the MNIST test set and is the model used by the deployed prediction API.

---

## 🔬 Image Preprocessing

User-drawn images are not sent directly to the model.

The inference pipeline performs preprocessing before prediction:

1. Convert the input image to grayscale.
2. Detect whether the image needs inversion.
3. Identify the foreground region.
4. Crop the digit from unnecessary surrounding space.
5. Convert the cropped region into a square representation.
6. Add padding around the digit.
7. Resize the image to `28 × 28`.
8. Normalize pixel values to the range `0–1`.
9. Reshape the image to `(1, 28, 28, 1)`.
10. Pass the processed image to the CNN.

This preprocessing allows freehand browser drawings to be transformed into a representation compatible with the MNIST-trained model.

---

## ⚙️ System Architecture

```text
                    USER
                     │
                     ▼
          ┌────────────────────┐
          │   React Frontend   │
          │      Vite          │
          └─────────┬──────────┘
                    │
                    │ HTTPS
                    ▼
          ┌────────────────────┐
          │    FastAPI API     │
          │      Python        │
          └─────────┬──────────┘
                    │
                    ▼
          ┌────────────────────┐
          │ Image Preprocessing│
          │ Grayscale / Crop   │
          │ Pad / Resize       │
          │ Normalize          │
          └─────────┬──────────┘
                    │
                    ▼
          ┌────────────────────┐
          │   CNN Model V4     │
          │ TensorFlow/Keras   │
          └─────────┬──────────┘
                    │
                    ▼
          ┌────────────────────┐
          │ Prediction +       │
          │ Confidence         │
          └─────────┬──────────┘
                    │
                    ▼
                   USER
```

---

## 🖥️ Application

DigitLab AI is organized into four main interfaces.

### Home

The landing page introduces the project and provides access to the interactive digit recognition experience.

### Playground

The main inference interface where users can draw a handwritten digit directly in the browser and receive a prediction from the deployed CNN.

### Model Lab

Provides information about the trained CNN model and its development.

### Analytics

Provides model evaluation information including:

- Test accuracy
- Test loss
- Training epochs
- Confusion matrix
- Training and validation metrics
- Per-digit performance

---

## 🔌 API

The backend is implemented using **FastAPI** and exposes REST endpoints for model information and digit prediction.

### Health Check

```http
GET /
```

Returns the current API status.

Example response:

```json
{
  "status": "online",
  "service": "DigitLab AI",
  "model": "MNIST CNN"
}
```

### Model Information

```http
GET /model-info
```

Returns information about the deployed CNN.

Example response:

```json
{
  "model": "DigitLab CNN",
  "input_shape": [28, 28, 1],
  "classes": 10,
  "classes_description": "Digits 0 through 9"
}
```

### V4 Prediction

```http
POST /predict-v4
```

Accepts an uploaded handwritten digit image, preprocesses it, and returns the CNN prediction and confidence.

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Python
- FastAPI
- Uvicorn
- Pillow
- NumPy
- scikit-learn

### Machine Learning

- TensorFlow
- Keras
- Convolutional Neural Network
- MNIST

### Deployment

- GitHub
- Render
- Render Static Site
- Render Web Service

---

## 📁 Project Structure

```text
digitlab-ai/
│
├── backend/
│   ├── api.py
│   ├── model.keras
│   ├── model_v2.keras
│   ├── model_v3.keras
│   ├── model_v4.keras
│   ├── history.json
│   ├── history_v2.json
│   ├── history_v3.json
│   ├── history_v4.json
│   ├── confusion_matrix.png
│   ├── confusion_matrix_v2.png
│   ├── confusion_matrix_v3.png
│   ├── confusion_matrix_v4.png
│   ├── train.py
│   ├── train_v3.py
│   ├── train_v4.py
│   └── requirements.txt
│
├── public/
│   ├── fk.png
│   ├── confusion_matrix_v4.png
│   └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Playground.tsx
│   │   ├── ModelLab.tsx
│   │   └── Analytics.tsx
│   └── App.tsx
│
├── index.html
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 💻 Run Locally

### Prerequisites

- Python 3.12
- Node.js
- pnpm

### Clone the Repository

```bash
git clone https://github.com/FRANKLIN-KAIZOKU/Digitlab-AI.git
cd Digitlab-AI
```

### Frontend

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev -- --port 8080
```

The frontend will be available at:

```text
http://localhost:8080
```

### Backend

Create the Python environment:

```bash
python3.12 -m venv backend/.venv
```

Activate it:

```bash
source backend/.venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the API:

```bash
python -m uvicorn backend.api:app --reload --port 8000
```

The API will be available at:

```text
http://localhost:8000
```

---

## 🧪 Model Development

Several CNN versions were developed and evaluated during the project.

| Model | Test Accuracy |
|---|---:|
| V1 | 98.13% |
| V2 | 96.15% |
| V3 | **98.56%** |
| V4 | 98.07% |

V3 achieved the highest test accuracy during experimentation.

V4 was developed as a controlled preprocessing experiment and was selected as the **production inference model** used by the deployed application.

This distinction is important:

> **Highest experimental accuracy:** V3 — 98.56%  
> **Production model:** V4 — 98.07%

---

## 📊 Evaluation

The model was evaluated using:

- Test accuracy
- Test loss
- Confusion matrix
- Training accuracy
- Validation accuracy
- Training loss
- Validation loss
- Per-digit accuracy

The evaluation results are presented through the Analytics interface.

---

## 🌐 Deployment Architecture

DigitLab AI is deployed as two separate services.

```text
                    GitHub
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      Render Static Site    Render Web Service
             │                   │
             ▼                   ▼
       React + Vite         FastAPI + Python
                                 │
                                 ▼
                         TensorFlow / Keras
                                 │
                                 ▼
                            CNN Model V4
```

The frontend communicates with the backend through HTTPS.

This allows the application to remain accessible even when the local development environment is not running.

---

## 🎯 Project Objective

The objective of DigitLab AI is to demonstrate how a Convolutional Neural Network can learn visual patterns from handwritten digits and expose the resulting model through an interactive web application.

The project combines:

```text
Machine Learning
        +
Computer Vision
        +
REST APIs
        +
Frontend Development
        +
Cloud Deployment
```

into one complete end-to-end system.

---

## 🚀 Future Scope

Possible future improvements include:

- Improved recognition of highly stylized handwriting
- Additional handwriting datasets
- More advanced preprocessing techniques
- Comparison with additional CNN architectures
- Batch image prediction
- Model activation visualizations
- Expanded model explainability
- Mobile-optimized drawing experience

---

## 👨‍💻 Author

**Franklin K**

B.Tech — Computer Science & Engineering (AI & ML)

---

## 📜 License

This project was developed as an academic and portfolio project.

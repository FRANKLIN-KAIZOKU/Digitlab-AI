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
| Classes | 10 |
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

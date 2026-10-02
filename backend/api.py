import io
import os

import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware


# ============================================================
# DIGITLAB AI — FASTAPI PREDICTION SERVER
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = "backend/model_v3.keras"

print("=" * 60)
print("DIGITLAB AI — PREDICTION API")
print("=" * 60)

# ------------------------------------------------------------
# LOAD TRAINED MODEL
# ------------------------------------------------------------

print(f"\nLoading model from:")
print(MODEL_PATH)

model = tf.keras.models.load_model(MODEL_PATH)

print("✓ CNN model loaded successfully")


# ------------------------------------------------------------
# FASTAPI APP
# ------------------------------------------------------------

app = FastAPI(
    title="DigitLab AI",
    description="AI-powered handwritten digit recognition API",
    version="1.0.0",
)


# ------------------------------------------------------------
# CORS
# ------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------
# HEALTH CHECK
# ------------------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "DigitLab AI",
        "model": "MNIST CNN",
    }


# ------------------------------------------------------------
# MODEL INFO
# ------------------------------------------------------------

@app.get("/model-info")
def model_info():
    return {
        "model": "DigitLab CNN",
        "input_shape": [28, 28, 1],
        "classes": 10,
        "classes_description": "Digits 0 through 9",
    }


# ------------------------------------------------------------
# IMAGE PREPROCESSING
# ------------------------------------------------------------

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Convert an uploaded handwritten digit image into the
    same basic format used during MNIST training.

    Output:
        (1, 28, 28, 1)
    """
    try:
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("L")

        pixels = np.array(image)

        if pixels.mean() > 127:
            pixels = 255 - pixels

        image = Image.fromarray(
            pixels.astype("uint8")
        )

        image = image.resize(
            (28, 28),
            Image.Resampling.LANCZOS,
        )

        image_array = np.array(
            image
        ).astype("float32")

        image_array = image_array / 255.0

        image_array = np.expand_dims(
            image_array,
            axis=-1,
        )

        image_array = np.expand_dims(
            image_array,
            axis=0,
        )

        return image_array

    except Exception as exc:
        raise ValueError(
            f"Could not preprocess image: {exc}"
        ) from exc
    
        # ----------------------------------------------------
        # 2. Convert to NumPy
        # ----------------------------------------------------
        pixels = np.array(image)

        # ----------------------------------------------------
        # 3. Detect whether the digit is dark or light
        # ----------------------------------------------------
        #
        # We want:
        #   background = black
        #   digit      = white
        #
        # If the image has a light background, invert it.
        #
        if pixels.mean() > 127:
            pixels = 255 - pixels

        # ----------------------------------------------------
        # 4. Remove very faint background noise
        # ----------------------------------------------------
        pixels[pixels < 30] = 0

        # ----------------------------------------------------
        # 5. Find the bounding box of the actual digit
        # ----------------------------------------------------
        coords = np.argwhere(pixels > 30)

        if coords.size == 0:
            raise ValueError("No handwritten digit detected.")

        y_min, x_min = coords.min(axis=0)
        y_max, x_max = coords.max(axis=0)

        # Crop to the actual digit
        cropped = pixels[
            y_min:y_max + 1,
            x_min:x_max + 1
        ]

        # ----------------------------------------------------
        # 6. Preserve aspect ratio
        # ----------------------------------------------------
        h, w = cropped.shape

        target_size = 20

        if h > w:
            new_h = target_size
            new_w = max(1, int(round(w * target_size / h)))
        else:
            new_w = target_size
            new_h = max(1, int(round(h * target_size / w)))

        cropped_image = Image.fromarray(cropped)

        resized = cropped_image.resize(
            (new_w, new_h),
            Image.Resampling.LANCZOS,
        )

        # ----------------------------------------------------
        # 7. Place digit in a 28x28 canvas
        # ----------------------------------------------------
        canvas = Image.new(
            "L",
            (28, 28),
            0,
        )

        left = (28 - new_w) // 2
        top = (28 - new_h) // 2

        canvas.paste(
            resized,
            (left, top),
        )

        # ----------------------------------------------------
        # 8. Convert to NumPy
        # ----------------------------------------------------
        image_array = np.array(canvas).astype("float32")

        # ----------------------------------------------------
        # 9. Normalize exactly like training
        # ----------------------------------------------------
        image_array = image_array / 255.0

        # ----------------------------------------------------
        # 10. Add channel dimension
        # ----------------------------------------------------
        image_array = np.expand_dims(
            image_array,
            axis=-1,
        )

        # ----------------------------------------------------
        # 11. Add batch dimension
        # ----------------------------------------------------
        image_array = np.expand_dims(
            image_array,
            axis=0,
        )

        return image_array

    except Exception as exc:
        raise ValueError(
            f"Could not preprocess image: {exc}"
        ) from exc
    
# ------------------------------------------------------------
# PREDICTION ENDPOINT
# ------------------------------------------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Receive a handwritten digit image and return:

    - predicted digit
    - confidence
    - probabilities for all 10 digits
    """

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload an image file.",
        )

    try:
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty.",
            )

        # Preprocess
        processed_image = preprocess_image(image_bytes)

        # Predict
        probabilities = model.predict(
            processed_image,
            verbose=0,
        )[0]

        # Highest probability
        predicted_digit = int(np.argmax(probabilities))

        confidence = float(probabilities[predicted_digit])

        # All class probabilities
        all_probabilities = {
            str(digit): float(probabilities[digit])
            for digit in range(10)
        }

        return {
            "success": True,
            "digit": predicted_digit,
            "confidence": confidence,
            "confidence_percent": round(
                confidence * 100,
                2,
            ),
            "probabilities": all_probabilities,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        ) from exc


# ------------------------------------------------------------
# SERVER START MESSAGE
# ------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    print("\nStarting DigitLab AI API...")
    print("API:  http://127.0.0.1:8000")
    print("Docs: http://127.0.0.1:8000/docs")
    print("=" * 60)

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        reload=False,
    )
    # ============================================================
# V4 MODEL — CROP + PAD + RESIZE EXPERIMENT
# ============================================================

V4_MODEL_PATH = "backend/model_v4.keras"

print("\nLoading V4 model from:")
print(V4_MODEL_PATH)

model_v4 = tf.keras.models.load_model(V4_MODEL_PATH)

print("✓ V4 CNN model loaded successfully")


def preprocess_v4_image(image_bytes: bytes) -> np.ndarray:
    """
    V4 preprocessing:

    1. Convert to grayscale
    2. Convert to MNIST-style white digit / black background
    3. Crop foreground
    4. Make square
    5. Add 15% padding
    6. Resize to 28x28
    7. Normalize
    """

    try:
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("L")

        pixels = np.array(image)

        # If image is white background / black digit,
        # invert it into MNIST-style format.
        if pixels.mean() > 127:
            pixels = 255 - pixels

        # Find foreground pixels.
        coords = np.argwhere(pixels > 20)

        # Handle blank image.
        if coords.size == 0:
            resized = Image.fromarray(
                pixels.astype("uint8")
            ).resize(
                (28, 28),
                Image.Resampling.LANCZOS,
            )

            result = (
                np.array(resized)
                .astype("float32")
                / 255.0
            )

            return result.reshape(
                1,
                28,
                28,
                1,
            )

        # ----------------------------------------------------
        # CROP
        # ----------------------------------------------------

        y_min, x_min = coords.min(axis=0)
        y_max, x_max = coords.max(axis=0)

        cropped = pixels[
            y_min:y_max + 1,
            x_min:x_max + 1,
        ]

        height, width = cropped.shape

        # ----------------------------------------------------
        # MAKE SQUARE
        # ----------------------------------------------------

        side = max(
            height,
            width,
        )

        square = np.zeros(
            (side, side),
            dtype=np.uint8,
        )

        y_offset = (
            side - height
        ) // 2

        x_offset = (
            side - width
        ) // 2

        square[
            y_offset:y_offset + height,
            x_offset:x_offset + width,
        ] = cropped

        # ----------------------------------------------------
        # ADD 15% PADDING
        # ----------------------------------------------------

        padding = max(
            2,
            int(side * 0.15),
        )

        padded_size = (
            side + 2 * padding
        )

        padded = np.zeros(
            (
                padded_size,
                padded_size,
            ),
            dtype=np.uint8,
        )

        padded[
            padding:padding + side,
            padding:padding + side,
        ] = square

        # ----------------------------------------------------
        # RESIZE
        # ----------------------------------------------------

        resized = Image.fromarray(
            padded
        ).resize(
            (28, 28),
            Image.Resampling.LANCZOS,
        )

        # ----------------------------------------------------
        # NORMALIZE
        # ----------------------------------------------------

        image_array = (
            np.array(resized)
            .astype("float32")
            / 255.0
        )

        return image_array.reshape(
            1,
            28,
            28,
            1,
        )

    except Exception as exc:
        raise ValueError(
            f"V4 preprocessing failed: {exc}"
        ) from exc


# ============================================================
# V4 PREDICTION ENDPOINT
# ============================================================

@app.post("/predict-v4")
async def predict_v4(
    file: UploadFile = File(...)
):
    """
    Run handwritten digit prediction using V4.

    V4 uses:
        crop → square → padding → resize → CNN
    """

    try:

        image_bytes = await file.read()

        processed = preprocess_v4_image(
            image_bytes
        )

        predictions = model_v4.predict(
            processed,
            verbose=0,
        )[0]

        predicted_digit = int(
            np.argmax(predictions)
        )

        confidence = float(
            predictions[predicted_digit]
        )

        probabilities = {
            str(digit): float(
                predictions[digit]
            )
            for digit in range(10)
        }

        return {
            "success": True,
            "model": "V4",
            "digit": predicted_digit,
            "confidence": confidence,
            "confidence_percent": round(
                confidence * 100,
                2,
            ),
            "probabilities": probabilities,
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )
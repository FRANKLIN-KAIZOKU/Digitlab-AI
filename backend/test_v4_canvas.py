import io
import numpy as np
import tensorflow as tf

from PIL import Image
from fastapi.testclient import TestClient

from api import app


MODEL_PATH = "backend/model_v4.keras"

model = tf.keras.models.load_model(MODEL_PATH)

client = TestClient(app)


def crop_pad_resize(image, padding_ratio=0.15):
    """
    V4 preprocessing:
    crop -> square -> 15% padding -> resize 28x28
    """

    image = np.asarray(image).astype(np.uint8)

    coords = np.argwhere(image > 20)

    if coords.size == 0:
        resized = Image.fromarray(image).resize(
            (28, 28),
            Image.Resampling.LANCZOS,
        )

        result = np.asarray(resized).astype("float32") / 255.0

        return result

    y_min, x_min = coords.min(axis=0)
    y_max, x_max = coords.max(axis=0)

    cropped = image[
        y_min:y_max + 1,
        x_min:x_max + 1,
    ]

    height, width = cropped.shape
    side = max(height, width)

    square = np.zeros(
        (side, side),
        dtype=np.uint8,
    )

    y_offset = (side - height) // 2
    x_offset = (side - width) // 2

    square[
        y_offset:y_offset + height,
        x_offset:x_offset + width,
    ] = cropped

    padding = max(
        2,
        int(side * padding_ratio),
    )

    padded_size = side + 2 * padding

    padded = np.zeros(
        (padded_size, padded_size),
        dtype=np.uint8,
    )

    padded[
        padding:padding + side,
        padding:padding + side,
    ] = square

    resized = Image.fromarray(padded).resize(
        (28, 28),
        Image.Resampling.LANCZOS,
    )

    result = np.asarray(
        resized
    ).astype("float32") / 255.0

    return result


def preprocess_v4(image_bytes):
    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("L")

    pixels = np.array(image)

    # Convert black background + white drawing
    # into MNIST-style white digit + black background.
    if pixels.mean() > 127:
        pixels = 255 - pixels

    processed = crop_pad_resize(pixels)

    processed = processed.reshape(
        1,
        28,
        28,
        1,
    )

    return processed


print("\n" + "=" * 55)
print("DIGITLAB AI — V4 CANVAS TEST")
print("=" * 55)

print("\nV4 model loaded successfully.")
print("Model:", MODEL_PATH)

print("\nNow we need actual canvas images.")
print("Use the DigitLab Playground and save/export")
print("your drawings as PNG files.")

print("\nFor each PNG, run:")
print("python backend/test_v4_canvas.py path/to/image.png")

print("=" * 55)


if __name__ == "__main__":

    import sys

    if len(sys.argv) < 2:
        print("\nNo image supplied.")
        print(
            "Example:"
        )
        print(
            "python backend/test_v4_canvas.py ~/Desktop/test9.png"
        )
        sys.exit(0)

    image_path = sys.argv[1]

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    x = preprocess_v4(image_bytes)

    probabilities = model.predict(
        x,
        verbose=0,
    )[0]

    predicted_digit = int(
        np.argmax(probabilities)
    )

    confidence = float(
        probabilities[predicted_digit]
    )

    print("\nPrediction")
    print("-" * 30)

    print(
        f"Digit:      {predicted_digit}"
    )

    print(
        f"Confidence: {confidence * 100:.2f}%"
    )

    print("\nProbability distribution:")

    for digit, probability in enumerate(
        probabilities
    ):
        print(
            f"{digit}: "
            f"{probability * 100:.2f}%"
        )

    print("=" * 55)
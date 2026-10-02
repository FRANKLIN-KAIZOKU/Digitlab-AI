import io

import numpy as np
import tensorflow as tf
from PIL import Image

from api import preprocess_image


# ============================================================
# DIGITLAB AI — TRUE V3 PREPROCESSING TEST
# ============================================================

MODEL_PATH = "backend/model_v3.keras"

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("=" * 60)
print("DIGITLAB AI — TRUE V3 API PIPELINE TEST")
print("=" * 60)

print(f"Model: {MODEL_PATH}")

# ------------------------------------------------------------
# Load MNIST
# ------------------------------------------------------------

(_, _), (x_test, y_test) = (
    tf.keras.datasets.mnist.load_data()
)


# ------------------------------------------------------------
# Convert MNIST image to PNG
# ------------------------------------------------------------

def image_to_png(image_array):

    image_array = image_array.astype(
        "uint8"
    )

    image = Image.fromarray(
        image_array,
        mode="L",
    )

    buffer = io.BytesIO()

    image.save(
        buffer,
        format="PNG",
    )

    return buffer.getvalue()


# ------------------------------------------------------------
# Test
# ------------------------------------------------------------

correct = 0
successful = 0

per_digit = {
    digit: {
        "correct": 0,
        "total": 0,
    }
    for digit in range(10)
}


# 10 samples per digit
for digit in range(10):

    indices = np.where(
        y_test == digit
    )[0][:10]

    for index in indices:

        true_digit = int(
            y_test[index]
        )

        png_bytes = image_to_png(
            x_test[index]
        )

        # IMPORTANT:
        # This is the SAME preprocessing
        # used by api.py /predict.
        processed = preprocess_image(
            png_bytes
        )

        probabilities = model.predict(
            processed,
            verbose=0,
        )[0]

        predicted_digit = int(
            np.argmax(probabilities)
        )

        successful += 1

        per_digit[true_digit]["total"] += 1

        if predicted_digit == true_digit:

            correct += 1

            per_digit[
                true_digit
            ]["correct"] += 1


# ------------------------------------------------------------
# Results
# ------------------------------------------------------------

accuracy = (
    correct / successful
    if successful
    else 0
)

print("\n" + "=" * 60)
print("TRUE V3 PIPELINE RESULTS")
print("=" * 60)

print(
    f"Successful samples: {successful}"
)

print(
    f"Correct predictions: {correct}"
)

print(
    f"V3 pipeline accuracy: "
    f"{accuracy * 100:.2f}%"
)

print("\nPer-digit accuracy:")

for digit in range(10):

    total = per_digit[digit]["total"]

    digit_correct = (
        per_digit[digit]["correct"]
    )

    digit_accuracy = (
        digit_correct / total
        if total
        else 0
    )

    print(
        f"Digit {digit}: "
        f"{digit_correct}/{total} "
        f"({digit_accuracy * 100:.2f}%)"
    )


print("\n" + "=" * 60)
print("TRUE V3 TEST COMPLETE")
print("=" * 60)
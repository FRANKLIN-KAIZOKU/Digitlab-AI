import io

import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi.testclient import TestClient

from api import app


# ============================================================
# DIGITLAB AI — API ROBUSTNESS TEST
# ============================================================

print("=" * 60)
print("DIGITLAB AI — API ROBUSTNESS TEST")
print("=" * 60)

print("\nLoading MNIST test dataset...")

(_, _), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

client = TestClient(app)

results = []

# Test exactly 10 examples of each digit.
# Total = 100 API requests.
for digit in range(10):

    indices = np.where(y_test == digit)[0][:10]

    print(f"\nTesting digit {digit}...")

    for index in indices:

        # Convert MNIST array to PNG bytes
        image = Image.fromarray(
            x_test[index].astype("uint8")
        )

        buffer = io.BytesIO()

        image.save(
            buffer,
            format="PNG",
        )

        buffer.seek(0)

        # Send image through the REAL FastAPI endpoint
        response = client.post(
            "/predict",
            files={
                "file": (
                    f"mnist_{digit}_{index}.png",
                    buffer,
                    "image/png",
                )
            },
        )

        if response.status_code != 200:
            print(
                f"  ERROR: HTTP {response.status_code}"
            )
            continue

        data = response.json()

        predicted = data["digit"]
        confidence = data["confidence"]

        results.append(
            {
                "true": int(digit),
                "predicted": int(predicted),
                "confidence": float(confidence),
            }
        )

        symbol = "✓" if predicted == digit else "✗"

        print(
            f"  {symbol} "
            f"true={digit} "
            f"predicted={predicted} "
            f"confidence={confidence * 100:.2f}%"
        )


# ============================================================
# OVERALL RESULTS
# ============================================================

print("\n" + "=" * 60)
print("ROBUSTNESS TEST RESULTS")
print("=" * 60)

if not results:
    print("\nNo successful API requests.")
    raise SystemExit(1)

correct = sum(
    result["true"] == result["predicted"]
    for result in results
)

total = len(results)

accuracy = correct / total

print(f"\nSuccessful API requests: {total}")
print(f"Correct predictions:     {correct}")
print(f"Incorrect predictions:   {total - correct}")
print(f"API pipeline accuracy:   {accuracy * 100:.2f}%")


# ============================================================
# PER-DIGIT ACCURACY
# ============================================================

print("\nPer-digit accuracy:")

for digit in range(10):

    digit_results = [
        result
        for result in results
        if result["true"] == digit
    ]

    digit_correct = sum(
        result["true"] == result["predicted"]
        for result in digit_results
    )

    digit_accuracy = (
        digit_correct / len(digit_results)
        if digit_results
        else 0
    )

    print(
        f"  {digit}: "
        f"{digit_correct}/{len(digit_results)} "
        f"({digit_accuracy * 100:.1f}%)"
    )


# ============================================================
# SUMMARY
# ============================================================

print("\n" + "=" * 60)

if accuracy >= 0.95:
    print("✓ API PIPELINE LOOKS HEALTHY")
elif accuracy >= 0.90:
    print("⚠ API PIPELINE NEEDS SOME INVESTIGATION")
else:
    print("✗ API PIPELINE NEEDS INVESTIGATION")

print("=" * 60)
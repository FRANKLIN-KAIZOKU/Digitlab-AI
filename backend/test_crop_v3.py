import numpy as np
import tensorflow as tf
from PIL import Image


MODEL_PATH = "backend/model_v3.keras"

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("=" * 60)
print("DIGITLAB AI — V3 CROP PREPROCESSING EXPERIMENT")
print("=" * 60)


# ------------------------------------------------------------
# Crop + center + resize preprocessing
# ------------------------------------------------------------

def crop_and_resize(image_array):

    image = image_array.astype(
        np.float32
    )

    # Find foreground pixels
    coords = np.argwhere(
        image > 20
    )

    if coords.size == 0:
        return np.zeros(
            (28, 28, 1),
            dtype=np.float32,
        )

    y_min, x_min = coords.min(
        axis=0
    )

    y_max, x_max = coords.max(
        axis=0
    )

    # Crop digit
    cropped = image[
        y_min:y_max + 1,
        x_min:x_max + 1,
    ]

    # Make square canvas
    height, width = cropped.shape

    size = max(
        height,
        width,
    )

    square = np.zeros(
        (size, size),
        dtype=np.float32,
    )

    y_offset = (
        size - height
    ) // 2

    x_offset = (
        size - width
    ) // 2

    square[
        y_offset:y_offset + height,
        x_offset:x_offset + width,
    ] = cropped

    # Add padding
    padding = max(
        2,
        int(size * 0.15)
    )

    padded_size = (
        size + padding * 2
    )

    padded = np.zeros(
        (
            padded_size,
            padded_size,
        ),
        dtype=np.float32,
    )

    padded[
        padding:padding + size,
        padding:padding + size,
    ] = square

    # Resize to MNIST dimensions
    image = Image.fromarray(
        padded.astype("uint8")
    )

    image = image.resize(
        (28, 28),
        Image.Resampling.LANCZOS,
    )

    result = np.array(
        image
    ).astype("float32") / 255.0

    result = np.expand_dims(
        result,
        axis=-1,
    )

    return result


# ------------------------------------------------------------
# Load MNIST
# ------------------------------------------------------------

(_, _), (x_test, y_test) = (
    tf.keras.datasets.mnist.load_data()
)


# ------------------------------------------------------------
# Evaluate V3 using crop preprocessing
# ------------------------------------------------------------

correct = 0
total = 0

per_digit = {
    digit: {
        "correct": 0,
        "total": 0,
    }
    for digit in range(10)
}


for digit in range(10):

    indices = np.where(
        y_test == digit
    )[0][:100]

    for index in indices:

        image = crop_and_resize(
            x_test[index]
        )

        image = np.expand_dims(
            image,
            axis=0,
        )

        prediction = model.predict(
            image,
            verbose=0,
        )[0]

        predicted_digit = int(
            np.argmax(prediction)
        )

        true_digit = int(
            y_test[index]
        )

        total += 1

        per_digit[
            true_digit
        ]["total"] += 1

        if predicted_digit == true_digit:

            correct += 1

            per_digit[
                true_digit
            ]["correct"] += 1


# ------------------------------------------------------------
# Results
# ------------------------------------------------------------

accuracy = (
    correct / total
)

print("\n" + "=" * 60)

print(
    f"Samples tested: {total}"
)

print(
    f"Correct: {correct}"
)

print(
    f"Cropped preprocessing accuracy: "
    f"{accuracy * 100:.2f}%"
)

print("\nPer-digit:")

for digit in range(10):

    d = per_digit[digit]

    digit_accuracy = (
        d["correct"] / d["total"]
    )

    print(
        f"Digit {digit}: "
        f"{d['correct']}/{d['total']} "
        f"({digit_accuracy * 100:.2f}%)"
    )

print("\n" + "=" * 60)
print(
    "CROP PREPROCESSING TEST COMPLETE"
)
print("=" * 60)
import json
import random
from pathlib import Path

import numpy as np
import tensorflow as tf
from PIL import Image
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt


# ============================================================
# CONFIG
# ============================================================

SEED = 42
IMG_SIZE = 28
PADDING_RATIO = 0.15
EPOCHS = 8
BATCH_SIZE = 128

MODEL_PATH = Path("backend/model_v4.keras")
HISTORY_PATH = Path("backend/history_v4.json")
CONFUSION_PATH = Path("backend/confusion_matrix_v4.png")
ACCURACY_PATH = Path("backend/training_accuracy_v4.png")
LOSS_PATH = Path("backend/training_loss_v4.png")


# ============================================================
# REPRODUCIBILITY
# ============================================================

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)


# ============================================================
# SAME CROP + PAD + RESIZE PREPROCESSING
# ============================================================

def crop_pad_resize(image, padding_ratio=PADDING_RATIO):
    """
    Convert an MNIST image into the cropped representation
    we tested in test_crop_v3.py.

    Steps:
        1. Find foreground pixels
        2. Crop around the digit
        3. Make the crop square
        4. Add 15% padding
        5. Resize to 28x28
        6. Normalize to [0, 1]
    """

    image = np.asarray(image).astype(np.uint8)

    # Find foreground pixels.
    coords = np.argwhere(image > 20)

    # Extremely unlikely fallback for a blank image.
    if coords.size == 0:
        resized = Image.fromarray(image).resize(
            (IMG_SIZE, IMG_SIZE),
            Image.Resampling.LANCZOS,
        )

        return np.asarray(resized).astype("float32") / 255.0

    y_min, x_min = coords.min(axis=0)
    y_max, x_max = coords.max(axis=0)

    # Crop tightly around the digit.
    cropped = image[
        y_min:y_max + 1,
        x_min:x_max + 1,
    ]

    height, width = cropped.shape

    # Make square.
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

    # Add padding.
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

    # Resize exactly to MNIST input dimensions.
    resized = Image.fromarray(padded).resize(
        (IMG_SIZE, IMG_SIZE),
        Image.Resampling.LANCZOS,
    )

    result = np.asarray(
        resized
    ).astype("float32") / 255.0

    return result


def preprocess_dataset(images):
    """
    Apply the exact V4 preprocessing to every image.
    """

    processed = np.empty(
        (
            len(images),
            IMG_SIZE,
            IMG_SIZE,
        ),
        dtype=np.float32,
    )

    for i, image in enumerate(images):
        processed[i] = crop_pad_resize(image)

        if (i + 1) % 5000 == 0:
            print(
                f"Preprocessed {i + 1}/{len(images)} images..."
            )

    return processed[..., np.newaxis]


# ============================================================
# LOAD MNIST
# ============================================================

print("=" * 60)
print("DIGITLAB AI — V4 TRAINING")
print("=" * 60)

print("\nLoading MNIST...")

(
    (x_train, y_train),
    (x_test, y_test),
) = tf.keras.datasets.mnist.load_data()

print(f"Training samples: {len(x_train)}")
print(f"Test samples:     {len(x_test)}")


# ============================================================
# PREPROCESS
# ============================================================

print("\nApplying V4 crop + pad + resize preprocessing...")
print(f"Padding ratio: {PADDING_RATIO}")

x_train = preprocess_dataset(x_train)
x_test = preprocess_dataset(x_test)

print("\nFinal shapes:")
print("x_train:", x_train.shape)
print("x_test: ", x_test.shape)


# ============================================================
# CNN MODEL
# ============================================================

model = tf.keras.Sequential([
    tf.keras.layers.Input(
        shape=(28, 28, 1)
    ),

    tf.keras.layers.Conv2D(
        32,
        (3, 3),
        activation="relu",
    ),

    tf.keras.layers.MaxPooling2D(
        (2, 2)
    ),

    tf.keras.layers.Conv2D(
        64,
        (3, 3),
        activation="relu",
    ),

    tf.keras.layers.MaxPooling2D(
        (2, 2)
    ),

    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(
        128,
        activation="relu",
    ),

    tf.keras.layers.Dropout(
        0.3
    ),

    tf.keras.layers.Dense(
        10,
        activation="softmax",
    ),
])


# ============================================================
# COMPILE
# ============================================================

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

print("\nModel:")
model.summary()


# ============================================================
# TRAIN
# ============================================================

print("\nStarting V4 training...")

history = model.fit(
    x_train,
    y_train,
    validation_split=0.1,
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    shuffle=True,
    verbose=1,
)


# ============================================================
# TEST
# ============================================================

print("\nEvaluating V4 on transformed MNIST test set...")

test_loss, test_accuracy = model.evaluate(
    x_test,
    y_test,
    verbose=0,
)

print(
    f"\nV4 Test Loss:     {test_loss:.4f}"
)

print(
    f"V4 Test Accuracy: {test_accuracy * 100:.2f}%"
)


# ============================================================
# SAVE MODEL
# ============================================================

model.save(MODEL_PATH)

print(
    f"\nSaved model → {MODEL_PATH}"
)


# ============================================================
# SAVE HISTORY
# ============================================================

with open(
    HISTORY_PATH,
    "w",
) as f:
    json.dump(
        history.history,
        f,
        indent=2,
    )

print(
    f"Saved history → {HISTORY_PATH}"
)


# ============================================================
# PREDICTIONS
# ============================================================

print("\nGenerating predictions...")

probabilities = model.predict(
    x_test,
    batch_size=BATCH_SIZE,
    verbose=1,
)

predictions = np.argmax(
    probabilities,
    axis=1,
)


# ============================================================
# PER-DIGIT ACCURACY
# ============================================================

print("\nPer-digit accuracy:")

for digit in range(10):

    mask = y_test == digit

    digit_accuracy = np.mean(
        predictions[mask] == y_test[mask]
    )

    print(
        f"{digit}: "
        f"{digit_accuracy * 100:.2f}%"
    )


# ============================================================
# CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(
    y_test,
    predictions,
)

plt.figure(
    figsize=(8, 8)
)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=np.arange(10),
)

disp.plot(
    cmap="Blues",
    values_format="d",
)

plt.title(
    "DigitLab AI — V4 Confusion Matrix"
)

plt.tight_layout()

plt.savefig(
    CONFUSION_PATH,
    dpi=200,
)

plt.close()

print(
    f"Saved confusion matrix → {CONFUSION_PATH}"
)


# ============================================================
# TRAINING ACCURACY
# ============================================================

plt.figure(
    figsize=(8, 5)
)

plt.plot(
    history.history["accuracy"],
    label="Training Accuracy",
)

plt.plot(
    history.history["val_accuracy"],
    label="Validation Accuracy",
)

plt.title(
    "DigitLab AI — V4 Training Accuracy"
)

plt.xlabel("Epoch")
plt.ylabel("Accuracy")

plt.legend()

plt.tight_layout()

plt.savefig(
    ACCURACY_PATH,
    dpi=200,
)

plt.close()

print(
    f"Saved accuracy curve → {ACCURACY_PATH}"
)


# ============================================================
# TRAINING LOSS
# ============================================================

plt.figure(
    figsize=(8, 5)
)

plt.plot(
    history.history["loss"],
    label="Training Loss",
)

plt.plot(
    history.history["val_loss"],
    label="Validation Loss",
)

plt.title(
    "DigitLab AI — V4 Training Loss"
)

plt.xlabel("Epoch")
plt.ylabel("Loss")

plt.legend()

plt.tight_layout()

plt.savefig(
    LOSS_PATH,
    dpi=200,
)

plt.close()

print(
    f"Saved loss curve → {LOSS_PATH}"
)


# ============================================================
# FINAL SUMMARY
# ============================================================

print("\n" + "=" * 60)
print("DIGITLAB AI — V4 TRAINING COMPLETE")
print("=" * 60)

print(
    f"Test accuracy: {test_accuracy * 100:.2f}%"
)

print("\nGenerated:")
print(f"  ✓ {MODEL_PATH}")
print(f"  ✓ {HISTORY_PATH}")
print(f"  ✓ {CONFUSION_PATH}")
print(f"  ✓ {ACCURACY_PATH}")
print(f"  ✓ {LOSS_PATH}")

print("=" * 60)
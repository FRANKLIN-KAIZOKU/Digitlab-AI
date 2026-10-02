import json
import os

import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt


# ============================================================
# CONFIG
# ============================================================

SEED = 42
EPOCHS = 8
BATCH_SIZE = 128

tf.keras.utils.set_random_seed(SEED)

print("=" * 60)
print("DIGITLAB AI — CNN V2 TRAINING")
print("=" * 60)


# ============================================================
# LOAD MNIST
# ============================================================

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

print(f"Training samples: {len(x_train)}")
print(f"Test samples:     {len(x_test)}")


# ============================================================
# PREPROCESS
# ============================================================

x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

x_train = np.expand_dims(x_train, axis=-1)
x_test = np.expand_dims(x_test, axis=-1)

print(f"Input shape: {x_train.shape}")


# ============================================================
# DATA AUGMENTATION
# ============================================================
#
# IMPORTANT:
# We intentionally DO NOT use horizontal flipping.
# Flipping handwritten digits would change their meaning.
#
# These transformations simulate reasonable variation
# in how a human draws a digit.
# ============================================================

augmentation = keras.Sequential(
    [
        layers.RandomRotation(
            factor=0.06,
            fill_mode="constant",
            fill_value=0.0,
        ),

        layers.RandomTranslation(
            height_factor=0.08,
            width_factor=0.08,
            fill_mode="constant",
            fill_value=0.0,
        ),

        layers.RandomZoom(
            height_factor=(-0.08, 0.08),
            width_factor=(-0.08, 0.08),
            fill_mode="constant",
            fill_value=0.0,
        ),
    ],
    name="augmentation",
)


# ============================================================
# CNN MODEL
# ============================================================

model = keras.Sequential(
    [
        keras.Input(shape=(28, 28, 1)),

        augmentation,

        layers.Conv2D(
            32,
            kernel_size=(3, 3),
            activation="relu",
            padding="same",
        ),

        layers.MaxPooling2D(
            pool_size=(2, 2)
        ),

        layers.Conv2D(
            64,
            kernel_size=(3, 3),
            activation="relu",
            padding="same",
        ),

        layers.MaxPooling2D(
            pool_size=(2, 2)
        ),

        layers.Flatten(),

        layers.Dense(
            128,
            activation="relu",
        ),

        layers.Dropout(0.3),

        layers.Dense(
            10,
            activation="softmax",
        ),
    ],
    name="DigitLab_CNN_V2",
)


# ============================================================
# COMPILE
# ============================================================

model.compile(
    optimizer=keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

model.summary()


# ============================================================
# TRAIN
# ============================================================

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
# TEST EVALUATION
# ============================================================

test_loss, test_accuracy = model.evaluate(
    x_test,
    y_test,
    verbose=0,
)

print()
print("=" * 60)
print("V2 TEST RESULTS")
print("=" * 60)

print(
    f"Test loss:     {test_loss:.4f}"
)

print(
    f"Test accuracy: {test_accuracy * 100:.2f}%"
)


# ============================================================
# SAVE V2 MODEL
# ============================================================

v2_path = "backend/model_v2.keras"

model.save(v2_path)

print()
print(f"V2 model saved to: {v2_path}")


# ============================================================
# SAVE TRAINING HISTORY
# ============================================================

with open(
    "backend/history_v2.json",
    "w",
) as f:
    json.dump(
        {
            key: [
                float(value)
                for value in values
            ]
            for key, values in history.history.items()
        },
        f,
        indent=2,
    )


# ============================================================
# CONFUSION MATRIX
# ============================================================

predictions = model.predict(
    x_test,
    verbose=0,
)

predicted_labels = np.argmax(
    predictions,
    axis=1,
)

cm = confusion_matrix(
    y_test,
    predicted_labels,
)

plt.figure(
    figsize=(8, 8)
)

plt.imshow(
    cm,
    interpolation="nearest",
)

plt.title(
    "DigitLab AI V2 — Confusion Matrix"
)

plt.colorbar()

plt.xticks(
    range(10)
)

plt.yticks(
    range(10)
)

plt.xlabel(
    "Predicted"
)

plt.ylabel(
    "True"
)

for i in range(10):
    for j in range(10):
        plt.text(
            j,
            i,
            cm[i, j],
            ha="center",
            va="center",
        )

plt.tight_layout()

plt.savefig(
    "backend/confusion_matrix_v2.png",
    dpi=200,
)

plt.close()


# ============================================================
# TRAINING CURVES
# ============================================================

plt.figure(
    figsize=(10, 5)
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
    "DigitLab AI V2 — Accuracy"
)

plt.xlabel(
    "Epoch"
)

plt.ylabel(
    "Accuracy"
)

plt.legend()

plt.tight_layout()

plt.savefig(
    "backend/training_accuracy_v2.png",
    dpi=200,
)

plt.close()


plt.figure(
    figsize=(10, 5)
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
    "DigitLab AI V2 — Loss"
)

plt.xlabel(
    "Epoch"
)

plt.ylabel(
    "Loss"
)

plt.legend()

plt.tight_layout()

plt.savefig(
    "backend/training_loss_v2.png",
    dpi=200,
)

plt.close()


# ============================================================
# FINAL
# ============================================================

print()
print("=" * 60)
print("DIGITLAB AI — V2 TRAINING COMPLETE")
print("=" * 60)

print(
    f"Final test accuracy: {test_accuracy * 100:.2f}%"
)

print(
    "Saved:"
)

print("  model_v2.keras")
print("  history_v2.json")
print("  confusion_matrix_v2.png")
print("  training_accuracy_v2.png")
print("  training_loss_v2.png")

print("=" * 60)
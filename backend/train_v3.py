import json
import os
import random

import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from tensorflow import keras
from tensorflow.keras import layers


# ============================================================
# DIGITLAB AI — V3 TRAINING
# Conservative augmentation for real hand-drawn digits
# ============================================================

SEED = 42

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)

print("=" * 60)
print("DIGITLAB AI — V3 TRAINING")
print("=" * 60)

# ------------------------------------------------------------
# 1. LOAD MNIST
# ------------------------------------------------------------

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

print(f"Training images: {x_train.shape}")
print(f"Test images:     {x_test.shape}")

# Normalize
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Add channel dimension
x_train = np.expand_dims(x_train, axis=-1)
x_test = np.expand_dims(x_test, axis=-1)

print(f"Input shape:     {x_train.shape}")


# ------------------------------------------------------------
# 2. CONSERVATIVE DATA AUGMENTATION
# ------------------------------------------------------------
#
# V2 used:
# rotation     ±~11.5°
# translation  ±8%
# zoom         ±8%
#
# That was too aggressive for MNIST.
#
# V3:
# rotation     ±~3.6°
# translation  ±3%
# zoom         ±3%
#
# The goal is to make the model slightly more tolerant
# of real human drawing without destroying MNIST structure.
# ------------------------------------------------------------

data_augmentation = keras.Sequential(
    [
        layers.RandomRotation(
            factor=0.01,
            fill_mode="constant",
            fill_value=0.0,
        ),

        layers.RandomTranslation(
            height_factor=0.03,
            width_factor=0.03,
            fill_mode="constant",
            fill_value=0.0,
        ),

        layers.RandomZoom(
            height_factor=(-0.03, 0.03),
            width_factor=(-0.03, 0.03),
            fill_mode="constant",
            fill_value=0.0,
        ),
    ],
    name="conservative_augmentation",
)


# ------------------------------------------------------------
# 3. CNN MODEL
# ------------------------------------------------------------

model = keras.Sequential(
    [
        keras.Input(shape=(28, 28, 1)),

        data_augmentation,

        layers.Conv2D(
            32,
            (3, 3),
            activation="relu",
        ),

        layers.MaxPooling2D(
            (2, 2)
        ),

        layers.Conv2D(
            64,
            (3, 3),
            activation="relu",
        ),

        layers.MaxPooling2D(
            (2, 2)
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
    name="digitlab_v3_cnn",
)


# ------------------------------------------------------------
# 4. COMPILE
# ------------------------------------------------------------

model.compile(
    optimizer=keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

model.summary()


# ------------------------------------------------------------
# 5. CALLBACKS
# ------------------------------------------------------------

early_stopping = keras.callbacks.EarlyStopping(
    monitor="val_accuracy",
    patience=2,
    restore_best_weights=True,
    verbose=1,
)


# ------------------------------------------------------------
# 6. TRAIN
# ------------------------------------------------------------

print("\nStarting V3 training...\n")

history = model.fit(
    x_train,
    y_train,

    validation_split=0.10,

    epochs=10,

    batch_size=128,

    shuffle=True,

    callbacks=[
        early_stopping
    ],

    verbose=1,
)


# ------------------------------------------------------------
# 7. TEST
# ------------------------------------------------------------

test_loss, test_accuracy = model.evaluate(
    x_test,
    y_test,
    verbose=0,
)

print("\n" + "=" * 60)
print("V3 TEST RESULTS")
print("=" * 60)

print(f"Test loss:     {test_loss:.4f}")
print(f"Test accuracy: {test_accuracy * 100:.2f}%")

print("=" * 60)


# ------------------------------------------------------------
# 8. SAVE MODEL
# ------------------------------------------------------------

model_path = "backend/model_v3.keras"

model.save(model_path)

print(f"\nSaved model → {model_path}")


# ------------------------------------------------------------
# 9. SAVE TRAINING HISTORY
# ------------------------------------------------------------

history_path = "backend/history_v3.json"

with open(
    history_path,
    "w",
) as f:
    json.dump(
        history.history,
        f,
        indent=2,
    )

print(f"Saved history → {history_path}")


# ------------------------------------------------------------
# 10. CONFUSION MATRIX
# ------------------------------------------------------------

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
    figsize=(9, 9)
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
    "DigitLab AI — V3 Confusion Matrix"
)

plt.tight_layout()

cm_path = "backend/confusion_matrix_v3.png"

plt.savefig(
    cm_path,
    dpi=200,
)

plt.close()

print(f"Saved confusion matrix → {cm_path}")


# ------------------------------------------------------------
# 11. ACCURACY CURVE
# ------------------------------------------------------------

plt.figure(
    figsize=(10, 6)
)

plt.plot(
    history.history["accuracy"],
    label="Training Accuracy",
)

plt.plot(
    history.history["val_accuracy"],
    label="Validation Accuracy",
)

plt.xlabel("Epoch")
plt.ylabel("Accuracy")

plt.title(
    "DigitLab AI — V3 Training Accuracy"
)

plt.legend()
plt.grid(alpha=0.2)

plt.tight_layout()

accuracy_path = (
    "backend/training_accuracy_v3.png"
)

plt.savefig(
    accuracy_path,
    dpi=200,
)

plt.close()

print(
    f"Saved accuracy curve → {accuracy_path}"
)


# ------------------------------------------------------------
# 12. LOSS CURVE
# ------------------------------------------------------------

plt.figure(
    figsize=(10, 6)
)

plt.plot(
    history.history["loss"],
    label="Training Loss",
)

plt.plot(
    history.history["val_loss"],
    label="Validation Loss",
)

plt.xlabel("Epoch")
plt.ylabel("Loss")

plt.title(
    "DigitLab AI — V3 Training Loss"
)

plt.legend()
plt.grid(alpha=0.2)

plt.tight_layout()

loss_path = (
    "backend/training_loss_v3.png"
)

plt.savefig(
    loss_path,
    dpi=200,
)

plt.close()

print(
    f"Saved loss curve → {loss_path}"
)


# ------------------------------------------------------------
# 13. PER-DIGIT ACCURACY
# ------------------------------------------------------------

print("\nPer-digit accuracy:")

for digit in range(10):

    mask = y_test == digit

    digit_accuracy = np.mean(
        predicted_labels[mask] == y_test[mask]
    )

    print(
        f"Digit {digit}: "
        f"{digit_accuracy * 100:.2f}%"
    )


# ------------------------------------------------------------
# DONE
# ------------------------------------------------------------

print("\n" + "=" * 60)
print("DIGITLAB AI — V3 TRAINING COMPLETE")
print("=" * 60)
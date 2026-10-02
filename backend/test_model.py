import tensorflow as tf
import numpy as np

MODEL_PATH = "backend/model.keras"

print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)

print("Loading MNIST...")
(_, _), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

x_test = x_test.astype("float32") / 255.0
x_test = np.expand_dims(x_test, axis=-1)

# Find an actual MNIST 9
index = np.where(y_test == 9)[0][0]

image = x_test[index:index + 1]
true_label = y_test[index]

probabilities = model.predict(image, verbose=0)[0]

prediction = int(np.argmax(probabilities))
confidence = float(probabilities[prediction])

print()
print("=" * 50)
print("MNIST SANITY TEST")
print("=" * 50)

print(f"True digit:     {true_label}")
print(f"Prediction:     {prediction}")
print(f"Confidence:     {confidence * 100:.4f}%")

print()
print("All probabilities:")

for digit, probability in enumerate(probabilities):
    print(f"{digit}: {probability * 100:.6f}%")

print("=" * 50)
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
import tensorflowjs as tfjs

def load_data(json_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    boards = []
    labels = []
    
    for item in data:
        boards.append(item['board'])
        labels.append(item['label'])
    
    X = np.array(boards).reshape(-1, 8, 8, 1)
    y = np.array(labels)
    
    return X, y

X, y = load_data('training_data.json')

def split_training_data(X,y):
    np.random.seed(42) 
    indices = np.arange(X.shape[0])
    np.random.shuffle(indices)

    test_size = int(0.2 * len(indices))
    test_indices = indices[:test_size]
    train_indices = indices[test_size:]

    X_train, X_test = X[train_indices], X[test_indices]
    y_train, y_test = y[train_indices], y[test_indices]
    return X_train, X_test, y_train, y_test


X_train, X_test, y_train, y_test = split_training_data(X,y)

# Define the model with dense layers
model = Sequential([
    Flatten(input_shape=(8, 8, 1)),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(3, activation='softmax')  # Output layer for multi-class classification
])


model.compile(optimizer=Adam(),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

history = model.fit(X_train, y_train, epochs=10, validation_split=0.2, batch_size=32)

loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Loss: {loss}, Test Accuracy: {accuracy}")


tfjs.converters.save_keras_model(model, 'models/just_dense_full_games')

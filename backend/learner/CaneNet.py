from tensorflow.keras.models import load_model, Model
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.data import AUTOTUNE
from tensorflow.keras import Sequential
from tensorflow.keras.layers import RandomFlip, RandomRotation, RandomZoom, RandomContrast
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing import image
from tensorflow.nn import softmax
from tensorflow import argmax as tf_argmax
from tensorflow import GradientTape, cast, float32, reduce_mean, get_logger
import matplotlib.pyplot as plt
import cv2
import numpy as np
import json
import tensorflow as tf
from io import BytesIO
import base64
import matplotlib
import logging
from .archs import UCN1, UCN2, UCN3

get_logger().setLevel(logging.ERROR)

matplotlib.use('Agg')

class CaneNet:
    def __init__(self, dataset_path="dataset/unzipped", model_name="model.h5", epochs=10, learning_rate=0.001, model_type=0, input_size=(224, 224), input_shape=(224, 224, 3), seed=42, batch_size=32, buffer_size=1000, fine_tuning_points=100, validation_split=0.2, model_path="models"):
        self.DATASET_PATH = dataset_path
        self.IMAGE_SIZE = tuple(input_size)
        self.INPUT_SHAPE = tuple(input_shape)
        self.SEED = seed
        self.BATCH_SIZE = batch_size
        self.BUFFER_SIZE = buffer_size
        self.FINE_TUNE_POINT = fine_tuning_points
        self.LEARNING_RATE = learning_rate
        self.EPOCHS = epochs
        self.VALIDATION_SPLIT = validation_split
        self.MODEL_PATH = model_path
        self.MODEL_NAME = model_name
        self.class_names = None
        self.model = None
        self.history = None
        self.test_ds = None
        self.train_ds = None
        self.validation_ds = None
        self.model_type = model_type
 
    def _load_dataset(self):
        train_augmentation = Sequential([
            RandomFlip('horizontal'),
            RandomRotation(0.2),
            RandomZoom(0.2),
            RandomContrast(0.2)
        ])
 
        train_ds = image_dataset_from_directory(
            self.DATASET_PATH,
            labels="inferred",
            batch_size=self.BATCH_SIZE,
            image_size=self.IMAGE_SIZE,
            shuffle=True,
            seed=self.SEED,
            validation_split=self.VALIDATION_SPLIT,
            subset="training"
        ).map(lambda x, y: (train_augmentation(x), y))
 
        validation_ds = image_dataset_from_directory(
            self.DATASET_PATH,
            labels="inferred",
            batch_size=self.BATCH_SIZE,
            image_size=self.IMAGE_SIZE,
            seed=self.SEED,
            validation_split=self.VALIDATION_SPLIT,
            subset="validation"
        )
        self.class_names = validation_ds.class_names
 
        validation_split = validation_ds.shard(num_shards=2, index=0)
        test_split = validation_ds.shard(num_shards=2, index=1)
 
        self.train_ds = train_ds.cache().shuffle(self.BUFFER_SIZE).prefetch(buffer_size=AUTOTUNE)
        self.validation_ds = validation_split.cache().prefetch(buffer_size=AUTOTUNE)
        self.test_ds = test_split.cache().prefetch(buffer_size=AUTOTUNE)


    def get_class_names(self):
        return self.class_names
 
    def prepare_model(self):
        if self.model_type == 0:
            model = UCN1.model(self)

        if self.model_type == 1:   
            model = UCN2.model(self)

        if self.model_type == 2:
            model = UCN3.model(self)

        model.compile(
            optimizer=Adam(learning_rate=self.LEARNING_RATE),
            loss=SparseCategoricalCrossentropy(from_logits=False),
            metrics=['accuracy']
        )
        self.model = model
        print("Model compilation successful")
 
    def train(self):
        if self.model:
            self.history = self.model.fit(self.train_ds, validation_data=self.validation_ds, epochs=self.EPOCHS,)
        else:
            print("Model not loaded")
 
    def get_classification_report(self):
        metrics = self.history.history
        plt.figure(figsize=(16, 6))
        plt.subplot(1, 2, 1)
        plt.plot(self.history.epoch, metrics['loss'], metrics['val_loss'])
        plt.legend(['training', 'validation'])
        plt.ylim([0, max(plt.ylim())])
        plt.ylabel('Loss')
        plt.xlabel('Epoch')
 
        plt.subplot(1, 2, 2)
        plt.plot(self.history.epoch, metrics['accuracy'], metrics['val_accuracy'])
        plt.legend(['training', 'validation'])
        plt.ylim([0, 1])
        plt.ylabel('Accuracy')
        plt.xlabel('Epoch')
        plt.show()
        buf = BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        return base64.b64encode(buf.read()).decode('utf-8')
 
    def test(self):
        result = self.model.evaluate(self.test_ds, return_dict=True)
        return result
 
    def save_model(self):
        if self.model:
            self.model.save(f"{self.MODEL_PATH}/{self.MODEL_NAME}")
            with open(f"{self.MODEL_PATH}/{self.MODEL_NAME}.classes.json", "w") as f:
                json.dump({"classes": self.class_names}, f)
            return True
        else:
            print("Model not loaded")
            return False
 
    def load_model(self):
        try:
            self.model = load_model(f"{self.MODEL_PATH}/{self.MODEL_NAME}")
            with open(f"{self.MODEL_PATH}/{self.MODEL_NAME}.classes.json", "r") as f:
                model_metadata = json.load(f)
                self.class_names = model_metadata.get("classes")
            print(f"Model and metadata loaded successfully from models/{self.MODEL_NAME}")
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
 
    def predict(self, img_path):
        if self.model:
            img = image.load_img(img_path, target_size=self.IMAGE_SIZE)
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            prediction = self.model.predict(img_array, verbose=0)
            score = softmax(prediction[0])
 
            predicted_class_idx = tf_argmax(score).numpy()
            confidence = score[predicted_class_idx].numpy()
 
            predicted_class = self.class_names[predicted_class_idx]
 
            return predicted_class, confidence
        else:
            print("Model not loaded")
            return None
 
    def generate_grad_cam(self, img_path):
        if self.model:
            img = image.load_img(img_path, target_size=self.IMAGE_SIZE)
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            last_layer_name = "conv2d"
            last_conv_layer = self.model.get_layer(last_layer_name)
            layer_input = self.model.input
            grad_model = Model(
                inputs=layer_input,
                outputs=[last_conv_layer.output, self.model.output]
            )
 
            with GradientTape() as tape:
                inputs = cast(img_array, float32)
                conv_outputs, predictions = grad_model(inputs)
                predicted_class = tf_argmax(predictions[0])
                loss = predictions[:, predicted_class]
 
            grads = tape.gradient(loss, conv_outputs)
            pooled_grads = reduce_mean(grads, axis=(0, 1, 2))
            conv_outputs = conv_outputs[0].numpy()
 
            for i in range(conv_outputs.shape[-1]):
                conv_outputs[:, :, i] *= pooled_grads[i]
 
            heatmap = np.mean(conv_outputs, axis=-1)
            heatmap = np.maximum(heatmap, 0) / np.max(heatmap)
 
            heatmap = cv2.resize(heatmap, (self.IMAGE_SIZE[1], self.IMAGE_SIZE[0]))
            heatmap = np.uint8(255 * heatmap)
            heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
 
            img = cv2.imread(img_path)
            img = cv2.resize(img, (self.IMAGE_SIZE[1], self.IMAGE_SIZE[0]))
            superimposed_img = cv2.addWeighted(img, 0.6, heatmap, 0.4, 0)
 
            plt.imshow(cv2.cvtColor(superimposed_img, cv2.COLOR_BGR2RGB))
            plt.axis('off')
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            return base64.b64encode(buf.read()).decode('utf-8')
        else:
            print("Model not loaded")

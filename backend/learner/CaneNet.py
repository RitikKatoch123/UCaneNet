from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.applications import MobileNetV2
from tensorflow.data import AUTOTUNE
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Rescaling, GlobalAveragePooling2D, Flatten, Dense, Dropout, ReLU, Conv2D
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
from tensorflow.keras.preprocessing import image
from tensorflow.nn import softmax
from tensorflow import argmax as tf_argmax
import matplotlib.pyplot as plt
import cv2
import numpy as np
import json
import tensorflow as tf
import io
import base64
import matplotlib
matplotlib.use('Agg')

class CaneNet:
    def __init__(self, model_type=0):
        self.DATASET_PATH = "dataset/unzipped"
        self.IMAGE_SIZE = (224, 224)
        self.INPUT_SHAPE = (224, 224, 3)
        self.SEED = 123
        self.BATCH_SIZE = 32
        self.BUFFER_SIZE = 250
        self.FINE_TUNE_POINT = 125
        self.LEARNING_RATE = 0.001
        self.EPOCHS = 50
        self.class_names = None
        self.model = None
        self.history = None
        self.test_ds = None
        self.train_ds = None
        self.validation_ds = None
        self.model_type = model_type
 
    def _load_dataset(self):
        train_augmentation = tf.keras.Sequential([
            tf.keras.layers.RandomFlip('horizontal'),
            tf.keras.layers.RandomRotation(0.2),
            tf.keras.layers.RandomZoom(0.2),
            tf.keras.layers.RandomContrast(0.2)
        ])
 
        train_ds = image_dataset_from_directory(
            self.DATASET_PATH,
            labels="inferred",
            batch_size=self.BATCH_SIZE,
            image_size=self.IMAGE_SIZE,
            shuffle=True,
            seed=self.SEED,
            validation_split=0.2,
            subset="training"
        ).map(lambda x, y: (train_augmentation(x), y))
 
        validation_ds = image_dataset_from_directory(
            self.DATASET_PATH,
            labels="inferred",
            batch_size=self.BATCH_SIZE,
            image_size=self.IMAGE_SIZE,
            seed=self.SEED,
            validation_split=0.2,
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
            base_model = MobileNetV2(
                input_shape=self.INPUT_SHAPE,
                include_top=False,
                weights='imagenet'
            )
            base_model.trainable = True
 
            for layer in base_model.layers[:self.FINE_TUNE_POINT]:
                layer.trainable = False
 
            model = Sequential([
                Rescaling(1./255, input_shape=self.INPUT_SHAPE),
                base_model,
                Conv2D(256, (3, 3), activation='relu', padding='same', kernel_regularizer=l2(0.01)),
                GlobalAveragePooling2D(),
                Flatten(),
                Dense(64, activation=ReLU(), kernel_regularizer=l2(0.01)),
                Dropout(0.3),
                Dense(len(self.class_names), activation='softmax')
            ])
        if self.model_type == 1:        
            model = Sequential([
                Rescaling(1./255, input_shape=self.INPUT_SHAPE),
                Conv2D(32, (3, 3), activation='relu', padding='same'),
                MaxPooling2D((2, 2)),
                Conv2D(64, (3, 3), activation='relu', padding='same'),
                MaxPooling2D((2, 2)),
                Conv2D(128, (3, 3), activation='relu', padding='same'),
                MaxPooling2D((2, 2)),
                Conv2D(256, (3, 3), activation='relu', padding='same'),
                GlobalAveragePooling2D(),
                Flatten(),
                Dense(128, activation='relu'),
                Dropout(0.3),
                Dense(64, activation='relu'),
                Dropout(0.3),
                Dense(len(self.class_names), activation='softmax')
            ])
 
        model.compile(
            optimizer=Adam(learning_rate=self.LEARNING_RATE),
            loss=SparseCategoricalCrossentropy(from_logits=False),
            metrics=['accuracy']
        )
        self.model = model
        print("Model compilation successful")
 
    def train(self):
        if self.model:
            self.history = self.model.fit(
                self.train_ds,
                validation_data=self.validation_ds,
                epochs=self.EPOCHS,
            )
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
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        return base64.b64encode(buf.read()).decode('utf-8')
 
    def test(self):
        result = self.model.evaluate(self.test_ds, return_dict=True)
        return result
 
    def save_model(self, model_name="model.h5"):
        if self.model:
            self.model.save(f"models/{model_name}")
            with open(f"models/{model_name}.classes.json", "w") as f:
                json.dump({"classes": self.class_names}, f)
            return True
        else:
            print("Model not loaded")
            return False
 
    def load_model(self, model_name="model.h5"):
        try:
            self.model = load_model(f"models/{model_name}")
            with open(f"models/{model_name}.classes.json", "r") as f:
                model_metadata = json.load(f)
                self.class_names = model_metadata.get("classes")
            print(f"Model and metadata loaded successfully from models/{model_name}")
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
            grad_model = tf.keras.models.Model(
                inputs=layer_input,
                outputs=[last_conv_layer.output, self.model.output]
            )
 
            with tf.GradientTape() as tape:
                inputs = tf.cast(img_array, tf.float32)
                conv_outputs, predictions = grad_model(inputs)
                predicted_class = tf.argmax(predictions[0])
                loss = predictions[:, predicted_class]
 
            grads = tape.gradient(loss, conv_outputs)
            pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
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
            buf = io.BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            return base64.b64encode(buf.read()).decode('utf-8')
        else:
            print("Model not loaded")

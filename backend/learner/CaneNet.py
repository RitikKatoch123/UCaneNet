from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.applications import MobileNetV2
from tensorflow.data import AUTOTUNE
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Rescaling, GlobalAveragePooling2D, Flatten, Dense, Dropout, ReLU
from tensorflow.keras.losses import SparseCategoricalCrossentropy
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import numpy as np
import json
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import io
import base64

class CaneNet:
    def __init__(self):
        self.DATASET_PATH = "backend/dataset/unzipped"
        self.IMAGE_SIZE = (128, 128)
        self.INPUT_SHAPE = (128, 128, 3)
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

    def _load_dataset(self):
        train_ds = image_dataset_from_directory(
            self.DATASET_PATH,
            labels="inferred",
            batch_size=self.BATCH_SIZE,
            image_size=self.IMAGE_SIZE,
            shuffle=True,
            seed=self.SEED,
            validation_split=0.2,
            subset="training"
        )
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
            GlobalAveragePooling2D(),
            Flatten(),
            Dense(64, activation=ReLU()),
            Dropout(0.25),
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
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        return base64.b64encode(buf.read()).decode('utf-8')

    def test(self):
        result = self.model.evaluate(self.test_ds, return_dict=True)
        return result

    def save_model(self, model_name="model.h5"):
        if self.model:
            self.model.save(f"backend/models/{model_name}")
            with open(f"backend/models/{model_name}.classes.json", "w") as f:
                json.dump({"classes": self.class_names}, f)
            return True
        else:
            print("Model not loaded")
            return False

    def load_model(self, model_name="model.h5"):
        try:
            self.model = load_model(f"backend/models/{model_name}")
            # print(self.model.summary())

            with open(f"backend/models/{model_name}.classes.json", "r") as f:
                model_metadata = json.load(f)
                self.class_names = model_metadata.get("classes")
            print(f"Model and metadata loaded successfully from backend/models/{model_name}")
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
            score = tf.nn.softmax(prediction[0])
            predicted_class = tf.argmax(score).numpy()
            predicted_class = self.class_names[predicted_class]
            return predicted_class
        else:
            print("Model not loaded")
            return None

from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, GlobalAveragePooling2D, Flatten, Dense, Dropout, ReLU, Rescaling
from tensorflow.keras.regularizers import l2

def model(parent):
    print("INFO: Using MobileNet model")
    base_model = MobileNetV2(
        input_shape=parent.INPUT_SHAPE,
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = True

    for layer in base_model.layers[:parent.FINE_TUNE_POINT]:
        layer.trainable = False

    model = Sequential([
        Rescaling(1./255, input_shape=parent.INPUT_SHAPE),
        base_model,
        Conv2D(256, (3, 3), activation='relu', padding='same', kernel_regularizer=l2(0.01)),
        GlobalAveragePooling2D(),
        Flatten(),
        Dense(64, activation=ReLU(), kernel_regularizer=l2(0.01)),
        Dropout(0.3),
        Dense(len(parent.class_names), activation='softmax')
    ])
    return model

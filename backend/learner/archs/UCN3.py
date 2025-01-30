from tensorflow.keras.layers import Input, Conv2D, BatchNormalization, ReLU, MaxPooling2D, GlobalAveragePooling2D, Flatten, Dense, Dropout, Add, Rescaling
from tensorflow.keras import Model

def resnet_base_block(inputs, filters, kernel_size=3, stride=1, conv_shortcut=True):
    x = Conv2D(filters, kernel_size, strides=stride, padding='same', use_bias=False)(inputs)
    x = BatchNormalization()(x)
    x = ReLU()(x)

    x = Conv2D(filters, kernel_size, padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)

    if conv_shortcut:
        shortcut = Conv2D(filters, 1, strides=stride, use_bias=False)(inputs)
        shortcut = BatchNormalization()(shortcut)
    else:
        shortcut = inputs

    x = Add()([x, shortcut])
    x = ReLU()(x)
    return x

def model(parent):
    print("INFO: Using ResNet model")
    inputs = Input(shape=parent.INPUT_SHAPE)
    x = Rescaling(1./255)(inputs)
    x = Conv2D(64, 7, strides=2, padding='same', use_bias=False)(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    x = MaxPooling2D(3, strides=2, padding='same')(x)

    x = resnet_base_block(x, 64, conv_shortcut=False)
    x = resnet_base_block(x, 64)
    x = resnet_base_block(x, 128, stride=2)
    x = resnet_base_block(x, 128)
    x = resnet_base_block(x, 256, stride=2)
    x = resnet_base_block(x, 256)
    x = resnet_base_block(x, 512, stride=2)
    x = resnet_base_block(x, 512)

    x = GlobalAveragePooling2D()(x)
    x = Flatten()(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation=ReLU())(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    outputs = Dense(len(parent.class_names), activation='softmax')(x)

    model = Model(inputs, outputs)
    return model
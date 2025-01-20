# UCaneNet - Sugarcane disease classifier AI App
[![.github/workflows/eas-build.yml](https://github.com/0x0is1/UCaneNet/actions/workflows/eas-build.yml/badge.svg)](https://github.com/0x0is1/UCaneNet/actions/workflows/eas-build.yml) [![.github/workflows/eas-update.yml](https://github.com/0x0is1/UCaneNet/actions/workflows/eas-update.yml/badge.svg)](https://github.com/0x0is1/UCaneNet/actions/workflows/eas-update.yml) ![Version](https://img.shields.io/badge/Version-1.0.4-red)

## Frontend section (Mobile application)
### App link
[Download from expo](https://expo.dev/accounts/bhoomi-ml/projects/bhoomi/builds/5708106b-cbb1-4966-87c5-9317a398874f)

### Build locally?
expo local building is only available for linux systems so not possible
but you build it through `eas-cli` on `expo server`

**Note: Please add `.env` file before running these commands**

#### For building
```
eas build --profile preview --platform android --non-interactive
```
#### For updating
```
eas update --channel preview --auto --non-interactive
```

### Build APK from source
You can just commit to this repository and `eas` will build it automatically on `expo.dev`. Note that build would be triggered only when `package.json` or `app.json` would be changed.

#### Updates
Updates like `JS code, assets` can be also pushed directly on this repo. All the preinstalled client will be updated automatically.

## Backend section
### Dataset used 
https://www.kaggle.com/datasets/nirmalsankalana/sugarcane-leaf-disease-dataset

### Model implemented
- Model 0: MobileNetV2 with extra Convolutional Layer
  - Base Model: MobileNetV2 pre-trained on ImageNet is used as a feature extractor, with the first layers frozen for transfer learning.
  - Additional Convolutional Layer: A new Conv2D layer with 256 filters is added to enhance feature learning.
  - Pooling and Dense Layers: Global average pooling reduces spatial dimensions, followed by a dense layer with 64 units and dropout to prevent overfitting.
  - Output: Softmax activation for multi-class classification.
  - Test Accurarcy: 89.58%
    
- Model 1: Custom CNN Architecture
  - Convolutional Layers: Multiple Conv2D layers (32 to 256 filters) with ReLU activation and max-pooling layers for feature extraction.
  - Global Pooling: Global average pooling reduces the output dimensions.
  - Fully Connected Layers: Two dense layers (128 and 64 units) with ReLU activation and dropout to prevent overfitting.
  - Output: Softmax activation for classification.
  - Test Accuracy: 89.05%

- Both models use the Adam optimizer and SparseCategoricalCrossentropy loss for training.
- We can switch between both models as per the hardware availability
- Gradient cam will be provided to the client app as well

## How to run backend
### Prerequisite
- Python 3
- GPU enabled system
- node
- expo-cli
- docker (optional)

### Installation
```
git clone https://github.com/0x0is1/UCaneNet
cd UCaneNet/backend
python3 -m pip install -r requirements.txt
```
#### After that, follow these steps to setup
- paste your `firebase admin sdk config file` inside `backend/server`

### Run with docker
```
docker build -t ucanenet_backend .
docker run -p 5000:5000 -d --name ucanenet_backend --gpus all ucanenet_backend
```

### Run on local machine (with GPU)
```
cd backend
python app.py
```

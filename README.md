dataset : https://www.kaggle.com/datasets/nirmalsankalana/sugarcane-leaf-disease-dataset

```
curl -X POST http://127.0.0.1:5000/upload -F "file=@backend/dataset/unzipped/Rust/rust (21).jpeg"
curl -X GET http://127.0.0.1:5000/prediction_status/ee447566-76ad-4189-8c7b-181209bbfbb4
```
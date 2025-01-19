import os
import threading
import uuid
from learner.CaneNet import CaneNet
import requests
import base64
import json
from PIL import Image
import io

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
IS_MODEL_TRAINING = False

with open('server/config.json', 'r') as f:
    config_data = json.load(f)
    MODEL_NAME = config_data['model_name']

trainer = CaneNet()
model = trainer.load_model()
prediction_data = {}
incomplete_predictions = set()
train_lock = threading.Lock()
def compress_image(img_path, quality=1):
    with Image.open(img_path) as img:
        img_byte_array = io.BytesIO()
        img.save(img_byte_array, format='JPEG', quality=quality)
        img_byte_array.seek(0)
        return img_byte_array.read()

def save_report(data, firebaseService, name, image, user_id):
    parsed_data = {
        "name": name,
        "imageUrl": image,
        "causes": data.get("causes"),
        "cures": data.get("cures"),
        "recognition": data.get("recognition"),
        "affectedPlantName": data.get("affectedPlantName"),
        "otherDetails": data.get("otherDetails"),
    }
    status = firebaseService.add_user_reports(user_id, parsed_data)
    return status

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def more_details(disease_name, langid):
    prompt = f'''
    Provide detailed information 
    (only raw json data, dont put it in code blocks. 
    don't put many points in single keyword. only single stentence. PLEASE NOTE: The language for each VALUE must be {["hindi", "english"][int(langid)]}. And Key should be strictly english (as they are given above))
    about the disease called "{disease_name}". 
    Specifically, describe the following points using keywords given for each:
    1) Causes of the disease (causes),
    2) Cures for the disease (cures),
    3) Symptoms and how to recognize the disease(recognition),
    4) Scientific name of the disease (scientificName),
    5) Scientific name of the plant affected by the disease (affectedPlantName),
    and 6) Any additional relevant details (otherDetails)'''

    gemini_api_key = "AIzaSyDBLpRAAfEFwUXRYV9jfqTMWXRJIqO9Tqg"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_api_key}"
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=data)
    response = response.json()
    response = response["candidates"][0]["content"]["parts"][0]["text"]
    return response

def run_predict(tracking_id, filename, firebaseService, user_id, langid):
    global model
    if model:
        try:
            incomplete_predictions.add(tracking_id)
            img_path = os.path.join(UPLOAD_FOLDER, filename)
            compressed_image = compress_image(img_path)
            b64_img = base64.b64encode(compressed_image).decode('utf-8')
            result, confidence = trainer.predict(img_path)
            grad_cam = trainer.generate_grad_cam(img_path)
            extra_details = more_details(result, langid)
            if user_id != 'null': save_report(json.loads(extra_details), firebaseService, result, b64_img, user_id)
            prediction_data[tracking_id] = {
                "result": result,
                "confidence": str(confidence),
                "grad_cam": grad_cam,
                "extra_details": extra_details
            }
        except Exception as e:
            pass
        incomplete_predictions.remove(tracking_id)
    else:
        run_train()
        model = trainer.load_model()
        run_predict(tracking_id, filename, firebaseService, user_id, langid)

def run_train():
    global trainer
    global IS_MODEL_TRAINING
    with train_lock:
        if IS_MODEL_TRAINING:
            return
        IS_MODEL_TRAINING = True

    trainer._load_dataset()
    trainer.prepare_model()
    trainer.train()
    # trainer.get_classification_report()
    trainer.test()
    trainer.save_model()

    IS_MODEL_TRAINING = False
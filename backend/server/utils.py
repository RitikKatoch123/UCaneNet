import os
import threading
import uuid
from learner.CaneNet import CaneNet

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
IS_MODEL_TRAINING = False
MODEL_NAME = "model.h5"

trainer = CaneNet()
model = trainer.load_model()
prediction_data = {}
incomplete_predictions = set()
train_lock = threading.Lock()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def run_predict(tracking_id, filename):
    if model:
        incomplete_predictions.add(tracking_id)
        img_path = os.path.join("backend/", UPLOAD_FOLDER, filename)
        result = trainer.predict(img_path)
        prediction_data[tracking_id] = result
        incomplete_predictions.remove(tracking_id)
    else:
        run_train()
        run_predict(tracking_id, filename)

def run_train():
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
import os
import uuid
import threading
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from .utils import allowed_file, run_predict, UPLOAD_FOLDER, incomplete_predictions, prediction_data

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def get_home():
    return "Server is running"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join("backend/", app.config['UPLOAD_FOLDER'], filename))
        tracking_id = str(uuid.uuid4())
        threading.Thread(target=run_predict, args=(tracking_id, filename)).start()
        return jsonify({'message': 'File uploaded successfully', 'filename': filename, 'tracking_id': tracking_id}), 201
    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route('/prediction_status/<string:tracking_id>', methods=['GET'])
def get_prediction_status(tracking_id):
    if tracking_id in incomplete_predictions:
        return jsonify({'status': 'in_progress'}), 200
    if tracking_id in prediction_data:
        return jsonify({'status': 'completed', 'result': prediction_data[tracking_id]}), 200
    return jsonify({'status': 'not_found'}), 404

import os
import uuid
import threading
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from .utils import allowed_file, run_predict, UPLOAD_FOLDER, incomplete_predictions, prediction_data
from .firebase_handler import FirebaseService
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

with open('server/config.json', 'r') as f:
    config_data = json.load(f)
    creds_path = f"server/{config_data['firebase_creds_file']}"
    collection_name = config_data['collection_name']

firebaseService = FirebaseService(creds_path, collection_name)

@app.route('/', methods=['GET'])
def get_home():
    return "Server is running"

@app.route('/upload/<string:user_id>', methods=['POST'])
def upload_file(user_id):
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        tracking_id = str(uuid.uuid4())
        langid = request.args.get('langid', default=None, type=int)
        try:
            threading.Thread(target=run_predict, args=(tracking_id, filename, firebaseService, user_id, langid)).start()
            return jsonify({'message': 'File uploaded successfully', 'filename': filename, 'tracking_id': tracking_id}), 201
        except Exception as e:
            incomplete_predictions.pop(tracking_id)
            return jsonify({'error': e}), 400

    else:
        return jsonify({'error': 'Invalid file format'}), 400

@app.route('/prediction_status/<string:tracking_id>', methods=['GET'])
def get_prediction_status(tracking_id):
    if tracking_id in incomplete_predictions:
        return jsonify({'status': 'in_progress'}), 200
    if tracking_id in prediction_data:
        return jsonify({'status': 'completed', 'result': prediction_data[tracking_id]}), 200
    return jsonify({'status': 'not_found'}), 404

@app.route('/create_profile', methods=['POST'])
def create_profile():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({'status': 'failed', 'message': 'Email is required'}), 400

    parsed_data = {
        "avatarUrl": data.get("profilePicture", ""),
        "username": data.get("username"),
        "email": email,
        "phone": "",
        "password": data.get("googleIdToken") or data.get("password"),
        "isEmailVerified": False,
        "isPhoneVerified": False,
        "selectedLanguageId": 0,
        "selectedThemeId": 0,
        "rated_app": 0,
        "review": ""
    }

    user_id = data.get("googleIdToken") or str(uuid.uuid4())
    status = bool(data.get("googleIdToken")) or firebaseService.add_user_details(user_id, parsed_data)
    if not status:
        return jsonify({'status': 'failed', 'message': 'Email already exists'}), 400

    return jsonify({
        'status': 'success',
        'user_id': data.get("googleIdToken") or user_id
    }), 201 if status else 400

@app.route('/get_profile/<string:user_id>', methods=['GET'])
def get_profile(user_id):
    user = firebaseService.get_user_details(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({'error': 'User not found'}), 404

@app.route('/update_profile/<string:user_id>', methods=['PUT'])
def update_profile(user_id):
    data = request.json
    parsed_data = {
        "avatarUrl": data.get("avatarUrl"),
        "username": data.get("username"),
        "email": data.get("email"),
        "phone": data.get("phone"),
    }
    status = firebaseService.update_user_details(user_id, parsed_data)
    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/verify_email/<string:user_id>', methods=['PUT'])
def verify_email(user_id):
    status = firebaseService.update_user_details(user_id, {"isEmailVerified": True})
    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/verify_phone/<string:user_id>', methods=['PUT'])
def verify_phone(user_id):
    status = firebaseService.update_user_details(user_id, {"isPhoneVerified": True})
    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/rate_app/<string:user_id>', methods=['PUT'])
def rate_app(user_id):
    data = request.json
    parsed_data = {
        "rated_app": data.get("rated_app"),
        "review": data.get("review")
    }
    status = firebaseService.update_user_details(user_id, parsed_data)

    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/update_language/<string:user_id>', methods=['PUT'])
def update_language(user_id):
    data = request.json
    parsed_data = {
        "selectedLanguageId": data.get("selectedLanguageId")
    }
    status = firebaseService.update_user_details(user_id, parsed_data)
    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/update_theme/<string:user_id>', methods=['PUT'])
def update_theme(user_id):
    data = request.json
    parsed_data = {
        "selectedThemeId": data.get("selectedThemeId")
    }
    status = firebaseService.update_user_details(user_id, data)
    return jsonify({'status': 'success' if status else 'failed'}), 200 if status else 400

@app.route('/add_report/<string:user_id>', methods=['POST'])
def add_report(user_id):
    data = request.json
    parsed_data = {
        "name": data.get("name"),
        "imageUrl": data.get("imageUrl"),
        "causes": data.get("causes"),
        "cures": data.get("cures"),
        "recognition": data.get("recognition"),
        "affectedPlantName": data.get("affectedPlantName"),
        "otherDetails": data.get("otherDetails"),
    }
    status = firebaseService.add_user_reports(user_id, parsed_data)
    return jsonify({'status': 'success' if status else 'failed'}), 201 if status else 400

@app.route('/get_reports/<string:user_id>', methods=['GET'])
def get_reports(user_id):
    reports = firebaseService.get_user_reports(user_id)
    return jsonify(reports), 200

@app.route('/add_notification/<string:user_id>', methods=['POST'])
def add_notification(user_id):
    data = request.json
    parsed_data = {
        "title": data.get("title"),
        "description": data.get("description"),
        "timestamp": data.get("timestamp"),
        "cropAvatar": data.get("cropAvatar"),
    }
    status = firebaseService.add_user_notifications(user_id, parsed_data)
    return jsonify({'status': 'success' if status else 'failed'}), 201 if status else 400

@app.route('/get_notifications/<string:user_id>', methods=['GET'])
def get_notifications(user_id):
    notifications = firebaseService.get_user_notifications(user_id)
    return jsonify(notifications), 200

@app.route('/signin_with_pass', methods=['PUT'])
def signin_with_pass():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'status': 'failed', 'message': 'Email and password are required'}), 400

    status, auth_token = firebaseService.get_user_details_by_creds(email, password)
    
    if status:
        return jsonify({'status': 'success', 'authToken': auth_token, 'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'status': 'failed', 'authToken': '', 'message': 'Wrong email or password'}), 400

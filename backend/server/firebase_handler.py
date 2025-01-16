import firebase_admin
from firebase_admin import credentials, firestore

class FirebaseService:
    def __init__(self, credential_path, collection_name):
        self.cred = credentials.Certificate(credential_path)
        self.app = firebase_admin.initialize_app(self.cred)
        self.store = firestore.client()
        self.users_doc_ref = self.store.collection(collection_name)

    def get_user_details(self, user_id):
        doc = self.users_doc_ref.document(user_id).get()
        if doc.exists:
            return doc.to_dict()
        return None

    def add_user_details(self, user_id, data):
        try:
            users_ref = self.users_doc_ref.where('email', '==', data['email']).get()
            if users_ref:
                return False

            self.users_doc_ref.document(user_id).set(data)
            return True
        except Exception as e:
            print(e)
            return False

    def update_user_details(self, user_id, data):
        self.users_doc_ref.document(user_id).update(data)
        return True

    def add_user_reports(self, user_id, data):
        self.users_doc_ref.document(user_id).collection('reports').add(data)
        return True

    def get_user_reports(self, user_id):
        reports = self.users_doc_ref.document(user_id).collection('reports').stream()
        return [report.to_dict() for report in reports]

    def add_user_notifications(self, user_id, data):
        self.users_doc_ref.document(user_id).collection('notifications').add(data)
        return True

    def get_user_notifications(self, user_id):
        notifications = self.users_doc_ref.document(user_id).collection('notifications').stream()
        return [notification.to_dict() for notification in notifications]

    def get_user_details_by_creds(self, email, password):
        try:
            users_ref = self.users_doc_ref.where('email', '==', email).limit(1).get()
            if not users_ref:
                return False, ''
            user_data = users_ref[0].to_dict()
            stored_password = user_data.get('password')
            if stored_password and stored_password == password:
                return True, user_data.get('user_id')
        except Exception as e:
            print(f"Error authenticating user: {e}")
        return False, ''
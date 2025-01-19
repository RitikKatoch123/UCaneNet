export default class Urls {
    constructor(authContext){        
        this.updateThemeUrl = `${authContext.EXPO_BACKEND_API_URL}/update_theme/${authContext.authToken}`;
        this.updateLanguageUrl = `${authContext.EXPO_BACKEND_API_URL}/update_language/${authContext.authToken}`;
        this.updateProfileUrl = `${authContext.EXPO_BACKEND_API_URL}/update_profile/${authContext.authToken}`;
        this.rateUrl = `${authContext.EXPO_BACKEND_API_URL}/rate_app/${authContext.authToken}`;
        this.passwordSigninUrl = `${authContext.EXPO_BACKEND_API_URL}/signin_with_pass`;
        this.getReportsUrl = `${authContext.EXPO_BACKEND_API_URL}/get_reports/${authContext.authToken}`;
        this.signUpUrl = `${authContext.EXPO_BACKEND_API_URL}/create_profile`;
        this.uploadUrl = `${authContext.EXPO_BACKEND_API_URL}/upload/${authContext.authToken}`;
        this.predictionStatusUrl = `${authContext.EXPO_BACKEND_API_URL}/prediction_status`;
        this.fetchNotificationUrl = `${authContext.EXPO_BACKEND_API_URL}/get_notifications/${authContext.authToken}`;
    }
}
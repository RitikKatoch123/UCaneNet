export default class Strings {
    constructor(languageCode) {
        this.languageCode = languageCode;

        this.logoName1 = "BH";
        this.logoName2 = "MI";
        this.proxyLabelHeading = "Set server URL";
        this.proxyLabelDescription = "Enter custom backend URL to connect to";
        this.proxySavedSuccessfully = "Proxy Saved successfully";
        this.proxyFailedToSave = "Failed to save proxy";
        this.backendUrlIsNotSet = "Backend URL is not set";
        this.noNotificationText = "No notifications found";
        if (this.languageCode === 0) { // Hindi
            this.logoSlogan = "किसान मित्र ऐप";
            this.welcomeText = "पर आपका स्वागत है";
            this.pageSlogan = "इसे आसान खेती बनाएं।";
            this.skipButtonText = "छोड़ें";
            this.signInWithLabel = "साइन इन करें";
            this.facebookButtonText = "फेसबुक";
            this.googleButtonText = "गूगल";
            this.emailButtonText = "ईमेल से शुरू करें";
            this.phoneButtonText = "फ़ोन से शुरू करें";
            this.signInOnAlreadyText = "पहले से ही खाता है? साइन इन करें";

            this.signUpHeading = "साइन अप करें";
            this.fullNameLabel = "पूरा नाम";
            this.emailLabel = "ईमेल";
            this.passwordLabel = "पासवर्ड";
            this.signUpButtonText = "साइन अप करें";
            this.alreadyHaveAccountText = "पहले से ही खाता है? साइन इन करें";
            this.signUpWithLabel = "साइन अप करें";

            this.loginHeading = "लॉगिन";
            this.loginButtonText = "लॉगिन";
            this.forgotPasswordText = "पासवर्ड भूल गए?";
            this.dontHaveAccountText = "खाता नहीं है? साइन अप करें";
            this.loginWithLabel = "साइन इन करें";

            this.resetHeading = "पासवर्ड रीसेट करें";
            this.resetDescription = "कृपया पासवर्ड रीसेट करने के लिए अपना ईमेल पता दर्ज करें";
            this.resetButtonText = "पासवर्ड रीसेट करें";

            this.phoneRegHeading = "रजिस्ट्रेशन";
            this.phoneRegDescription = "अपना फ़ोन नंबर दर्ज करें ताकि हम आपके खाते की पुष्टि कर सकें";
            this.phoneRegButtonText = "भेजें";

            this.otpHeading = "सत्यापन कोड";
            this.otpDescription = "कृपया भेजे गए सत्यापन कोड को दर्ज करें";
            this.otpButtonText = "मैंने कोड नहीं प्राप्त किया! कृपया फिर से भेजें";

            this.langscreenSubtitle = "भाषा चुनें";
            this.langscreenLang1 = "हिन्दी";
            this.langscreenLang2 = "English";
            this.langscreenDiscoverText = "अधिक जानें";
            this.langscreenFooterText = "हम कृषि बाजार में वैश्विक रूप से लोकप्रिय हैं";

            this.scanScreenPermissionRequest = "हमें कैमरा दिखाने के लिए आपकी अनुमति की आवश्यकता है";
            this.scanScreenPermissionButton = "अनुमति दें";

            this.featuresArray = [
                "कारण", "उपचार", "पहचान", "प्रभावित फसल का नाम", "अन्य विवरण"
            ];

            this.facebookLoginNotSupported = 'फेसबुक लॉगिन अभी समर्थित नहीं है';
            this.invalidEmailAddress = 'अमान्य ईमेल पता';
            this.pleaseFillAllFields = 'कृपया सभी फ़ील्ड भरें';
            this.passwordResetLinkSent = 'पासवर्ड रीसेट लिंक भेजा गया। कृपया अपना ईमेल जांचें';
            this.OTPSent = 'OTP भेजा गया';
            this.invalidPhone = 'अमान्य फ़ोन नंबर';
            this.googleSignupSucessful = 'गूगल साइन-अप सफल';
            this.signupSucessful = 'साइन-अप सफल';
            this.signUpFailed = 'साइन-अप विफल';
            this.phonesignupnotsupported = 'फ़ोन साइन-अप अभी समर्थित नहीं है।';
            this.verificationSuccessful = "सत्यापन सफल";
            this.invalidOTP = "अमान्य OTP";
            this.resendOTP = "OTP फिर से भेजा गया। कृपया नया कोड दर्ज करें।";
            this.profileUpdatedSuccessfully = "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई";
            this.galleryPermissionRequired = "गैलरी तक पहुंच के लिए अनुमति आवश्यक है!";
            this.fieldIsRequired = "रेटिंग या प्रतिक्रिया में से कोई एक फ़ील्ड खाली है";
            this.thanksRating = "हमें रेट करने के लिए धन्यवाद।";
            this.predictionNotFound = "पूर्वानुमान नहीं मिला";
            this.errorFetchingResult = "परिणाम प्राप्त करने में त्रुटि";
            this.errorUploadingImage = "तस्वीर अपलोड करने में त्रुटि";
            this.uploadingImage = "तस्वीर अपलोड हो रही है...";
            this.processingPrediction = "पूर्वानुमान प्रोसेस हो रहा है...";
            this.drawerTitles = {
                HOME_SCREEN: "मेरा घर",
                REPORT_SCREEN: "मेरी रिपोर्ट्स",
                PROFILE_SCREEN: "मेरा प्रोफाइल",
                RATING_SCREEN: "हमें रेट करें",
                CONTACT_SCREEN: "संपर्क करें",
                SCAN_SCREEN: "फसल स्कैन करें",
                RESULT_SCREEN: 'परिणाम',
                NOTIFICATION_SCREEN: "सूचनाएँ",
                BOTTOM_TABS_ROUTER: "टैब राउटर",
                PROXY_MANAGER_SCREEN: "Proxy घर"
            };
            this.ins1 = "प्रभावित फसल का चयन करें";
            this.ins2 = "फसल की तस्वीर अपलोड करें";
            this.ins3 = "समस्या का समाधान प्राप्त करें";
            this.startButtonText = "शुरू करें";
            this.categoryHeading = "श्रेणियाँ";
            this.category1 = "हमें रेट करें";
            this.category2 = "फसल देखभाल";
            this.category3 = "वीडियो";

            this.website = "www.bhoomi.in";
            this.ratingCharacter = "★";
            this.feedbackLabel = "कृपया हमारे साथ अपनी प्रतिक्रिया साझा करें";
            this.feedbackHint = "समीक्षा लिखें";
            this.submitText = "जमा करें";
            this.ratingsArray = ["", "बहुत बुरा", "बुरा", "औसत", "अच्छा", "पसंद आया!"];

            this.inputLabelPhone = "फ़ोन नंबर";
            this.profileSaveLabel = "सहेजें";
            this.profileEditLabel = "प्रोफ़ाइल संपादित करें";

            this.titleHeadingReport = "पिछले समाधान";
            this.backButtonText = "वापस";
            this.noReportsText = "कोई रिपोर्ट नहीं मिली";

            this.logoutText = "लॉग आउट करें";

            this.signInAuthError = "प्रमाणीकरण विफल। कृपया साइन इन करें";
            this.signInCancelledError = "साइन-इन रद्द कर दिया गया";
            this.signInInProgressError = "साइन-इन प्रगति पर है";
            this.playServiceError = "प्ले सेवाएं उपलब्ध नहीं हैं";
            this.signInFailedError = "गूगल साइन-इन विफल हुआ";
        } else { // English
            this.logoSlogan = "Farmer Friendly App";
            this.welcomeText = "Welcome to";
            this.pageSlogan = "Make Easy Farming with it.";
            this.skipButtonText = "Skip";
            this.signInWithLabel = "sign in with";
            this.facebookButtonText = "Facebook";
            this.googleButtonText = "Google";
            this.emailButtonText = "Start with Email";
            this.phoneButtonText = "Start with Phone";
            this.signInOnAlreadyText = "Already have an account? Sign In";

            this.signUpHeading = "Sign Up";
            this.fullNameLabel = "Full Name";
            this.emailLabel = "Email";
            this.passwordLabel = "Password";
            this.signUpButtonText = "Sign Up";
            this.alreadyHaveAccountText = "Already have an account? Sign In";
            this.signUpWithLabel = "Sign up with";

            this.loginHeading = "Login";
            this.loginButtonText = "Login";
            this.forgotPasswordText = "Forgot Password?";
            this.dontHaveAccountText = "Don't have an account? Sign Up";
            this.loginWithLabel = "Sign in with";

            this.resetHeading = "Reset Password";
            this.resetDescription = "Please enter your email address to request a password reset";
            this.resetButtonText = "Reset Password";

            this.phoneRegHeading = "Registration";
            this.phoneRegDescription = "Enter your phone number to verify your account";
            this.phoneRegButtonText = "Send";

            this.otpHeading = "Verification Code";
            this.otpDescription = "Please type the verification code sent to";
            this.otpButtonText = "I haven't received a code! Please resend";

            this.langscreenSubtitle = "Choose Language";
            this.langscreenLang1 = "हिन्दी";
            this.langscreenLang2 = "English";
            this.langscreenDiscoverText = "Discover More";
            this.langscreenFooterText = "We're popular in agriculture market globally";

            this.scanScreenPermissionRequest = "We need your permission to show the camera";
            this.scanScreenPermissionButton = "Grant Permission";

            this.featuresArray = [
                "Causes", "Cures", "Recognition", "Affected Plant Name", "Other Details"
            ];

            this.facebookLoginNotSupported = 'Facebook login is not supported yet';
            this.invalidEmailAddress = 'Invalid email address';
            this.pleaseFillAllFields = 'Please fill all fields';
            this.passwordResetLinkSent = 'Password reset link sent. Please check your email';
            this.OTPSent = 'OTP Sent';
            this.invalidPhone = 'Invalid phone number';
            this.googleSignupSucessful = 'Google Sign-Up Successful';
            this.signupSucessful = 'Sign-Up Successful';
            this.signUpFailed = 'Sign-Up Failed';
            this.phonesignupnotsupported = 'Phone signup is not supported yet.';
            this.verificationSuccessful = "Verification successful";
            this.invalidOTP = "Invalid OTP";
            this.resendOTP = "OTP resent again. Please enter the new code.";
            this.profileUpdatedSuccessfully = "Profile updated successfully";
            this.galleryPermissionRequired = "Permission to access gallery is required!";
            this.fieldIsRequired = "Either of rating or feedback field is empty";
            this.thanksRating = "Thanks for rating us.";
            this.predictionNotFound = "Prediction not found";
            this.errorFetchingResult = "Error fetching result";
            this.errorUploadingImage = "Error uploading result";
            this.uploadingImage = "Uploading Image...";
            this.processingPrediction = "Processing Prediction...";
            this.drawerTitles = {
                HOME_SCREEN: "My Home",
                REPORT_SCREEN: "My Reports",
                PROFILE_SCREEN: "My Profile",
                RATING_SCREEN: "Rate Us",
                CONTACT_SCREEN: "Contact Us",
                SCAN_SCREEN: "Scan Crop",
                RESULT_SCREEN: 'Result',
                NOTIFICATION_SCREEN: "Notification",
                BOTTOM_TABS_ROUTER: "Bottom Tabs Router",
                PROXY_MANAGER_SCREEN: "Proxy Manager"
            };
            this.ins1 = "Select Affected Crop";
            this.ins2 = "Upload Crop's Photo";
            this.ins3 = "Get Solution to Problem";
            this.startButtonText = "Start";
            this.categoryHeading = "Categories";
            this.category1 = "Rate Us";
            this.category2 = "Crop Care";
            this.category3 = "Videos";

            this.website = "www.bhoomi.in";
            this.ratingCharacter = "★";
            this.feedbackLabel = "Please Share Your Feedback With Us";
            this.feedbackHint = "Write review";
            this.submitText = "Submit";
            this.ratingsArray = ["", "Very Bad", "Bad", "Average", "Good", "Love it!"];

            this.inputLabelPhone = "Phone Number";
            this.profileSaveLabel = "Save";
            this.profileEditLabel = "Edit Profile";

            this.titleHeadingReport = "Past Solutions";
            this.backButtonText = "Back";
            this.noReportsText = "No report found";

            this.logoutText = "Log Out";

            this.signInAuthError = "Authentication failed. Please sign in";
            this.signInCancelledError = "Sign-In Cancelled";
            this.signInInProgressError = "Sign-In In Progress";
            this.playServiceError = "Play Services Not Available";
            this.signInFailedError = "Google Sign-In Failed";
        }
    }
}

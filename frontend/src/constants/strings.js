export default class Strings {
    constructor(languageCode) {
        this.languageCode = languageCode;
        this.logoName1 = "BH";
        this.logoName2 = "MI";
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

        // report screen texts
        this.featuresArray = [
            "Causes",
            "Cures",
            "Recognition",
            "Affected Plant Name",
            "Other Details"
        ]
        if (this.languageCode === 0) {
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
        }
        if (this.languageCode === 1) {
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

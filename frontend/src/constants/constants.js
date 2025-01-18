export default class Constants {
    constructor() {
        this.screenRoutes = {
            HOME_SCREEN: "HomeScreen",
            LANGUAGE_SCREEN: "LanguageScreen",
            LOGIN_SCREEN: "LoginScreen",
            NOTIFICATION_SCREEN: "NotificationScreen",
            OTP_VERIFICATION_SCREEN: "OTPVerificationScreen",
            PASSWORD_RESET_SCREEN: "PasswordResetScreen",
            PHONE_REGISTRATION_SCREEN: "PhoneRegistrationScreen",
            PROFILE_SCREEN: "ProfileScreen",
            RATING_SCREEN: "RatingScreen",
            REPORT_SCREEN: "ReportScreen",
            SCAN_SCREEN: "ScanScreen",
            SIGN_UP_SCREEN: "SignUpScreen",
            SPLASH_SCREEN: "SplashScreen",
            WELCOME_SCREEN: "WelcomeScreen",
            DASHBOARD_ROUTER: "DashboardRouter",
            RESULT_SCREEN: 'ResultScreen',
            BOTTOM_TABS_ROUTER: "BottomTabsRouter",
        };
        this.drawerRoutes = {
            HOME_SCREEN: "HomeScreen",
            REPORT_SCREEN: "ReportScreen",
            PROFILE_SCREEN: "ProfileScreen",
            RATING_SCREEN: "RatingScreen",
            CONTACT_SCREEN: "ContactScreen",
            SCAN_SCREEN: "ScanScreen",
            RESULT_SCREEN: 'ResultScreen',
            NOTIFICATION_SCREEN: "NotificationScreen",
            BOTTOM_TABS_ROUTER: "BottomTabsRouter",
            PROXY_MANAGER_SCREEN: "ProxyManagerScreen"
        };

        this.SPLASH_DELAY = 1000;

        // welcome screen constants
        this.logoName1 = "BH";
        this.logoName2 = "MI";

        this.bottomTabsRoutes = {
            DASHBOARD_TAB: 'DashboardTab',
            REPORT_TAB: 'ReportTab',
            SCAN_TAB: 'ScanTab',
            NOTIFICATION_TAB: 'NotificationTab',
            PROFILE_TAB: 'ProfileTab',
            RATING_TAB: 'RatingTab'
        }
    }
}
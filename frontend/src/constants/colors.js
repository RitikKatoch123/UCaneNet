export default class Colors {
    constructor(themeType) {
        this.themeType = themeType;
        if (this.themeType === 0) {
            this.primaryColor = "#34A853";
            this.primaryTextColor = "#ffffff";
            this.iconColor = "#D3D1D8";
            this.splashScreenBackground = "#34A853";
            this.secondaryColor = '#fefefe';
            this.tertiaryColor = '#000000';
            this.appBackgroundColor = '#f2f3f3'
        } else {
            this.primaryColor = "#34A853";
            this.primaryTextColor = "#ffffff";
            this.iconColor = "#D3D1D8";
            this.splashScreenBackground = "#34A853";
        }

        // welcome screen colors
        this.gradientColors = ['rgba(165, 59, 0, 0.54)', 'rgba(156, 156, 156, 0.44)', 'rgba(26, 85, 42, 0.7)'];
        this.skipButtonBackground = '#FFFFFF';
        this.skipButtonTextColor = '#34A853';
        this.headingT1Color = '#FFFFFF';
        this.headingT2Color = '#0DFF4D';
        this.pageSloganColor = '#FFFFFF';
        this.signInWithLabelColor = '#FFFFFF';
        this.lineColor = 'rgba(255, 255, 255, 0.5)';
        this.buttonType1Background = '#FFFFFF';
        this.buttonType1TextColor = '#000000';
        this.buttonType2Background = 'rgba(255, 255, 255, 0.2)';
        this.buttonType2BorderColor = '#FFFFFF';
        this.buttonType2TextColor = '#FEFEFE';
        this.signInOnAlreadyColor = '#FFFFFF';

        // sign-up screen colors
        this.signUpHeadingColor = "#000000";
        this.inputLabelColor = '#9796A1';
        this.inputBorderColorName = '#FE724C';
        this.inputBorderColorEmail = '#2372CF';
        this.inputBorderColorPassword = '#34A853';
        this.inputTextColor = '#111719';
        this.inputBackgroundColor = 'transparent';
        this.signUpButtonBackground = '#34A853';
        this.signUpButtonTextColor = '#ffffff';
        this.alreadyHaveAccountTextColor = '#333';
        this.signInWithLabelColor = '#333';
        this.signInWithLabelColor1 = '#FFFFFF';
        this.buttonType1Background = '#FFFFFF';
        this.buttonType1TextColor = '#000000';
        this.buttonType1ShadowColor = '#000';
        this.circle1Color = 'rgba(254, 114, 76, 0.69)';
        this.circle2Color = 'rgba(254, 114, 76, 0.69)';
        this.circle3Color = "#34A853";
        this.circle1BorderColor = '#34A853';
        this.circle2BackgroundColor = 'rgba(254, 114, 76, 0.69)';
        this.circle3BackgroundColor = "#34A853";
        this.containerBackgroundColor = '#f5f5f5';
        this.lineBackgroundColor = '#ddd';
        this.alreadyHaveAccountTextColor = '#5B5B5E';
        this.signInWithLabelColor = '#5B5B5E';

        // login screen colors
        this.forgotPasswordTextColor = '#34A853';

        // lang screen colors
        this.screenOverlayColor = 'rgba(206, 210, 179, 0.4)';
        this.langButtonColor = "#FFD29A";
        this.discoverTextColor = "#EEC044"

        // home screen colors
        this.guideGradientColors = ['#EEEEEE', '#73C388'];
        this.instructionColor = '#026500'
        this.categoryBackgroundColor = '#fefefe'
        
        // rating screen colors
        this.ratingColor = '#FFC529';
        this.placeholderColorRating = 'rgba(0,0,0,0.2)';
        this.ratingLessColor = '#d3d3d3';

        // profile screen colors
        this.profileCirlce1 = '#FE724C';
        this.profileCirlce2 = 'rgba(24, 119, 242, 0.4)';   
    }
}
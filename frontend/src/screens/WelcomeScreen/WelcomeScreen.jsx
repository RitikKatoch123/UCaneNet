import { Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import welcomeBackground from '../../../assets/welcome-background.png';
import tractorLogo from '../../../assets/icons/tractor-icon.png';
import facebookLogo from '../../../assets/icons/facebook-logo.png';
import googleLogo from '../../../assets/icons/google-logo.png';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import Urls from '../../constants/Urls';
import LoadingOverlay from '../../components/LoadingOverlay';

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);

  const handleSkip = () => {
    navigation.replace(constants.screenRoutes.LANGUAGE_SCREEN);
  };

  const handleFacebookLogin = () => {
    ToastAndroid.show(strings.facebookLoginNotSupported, ToastAndroid.SHORT);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true); // Start loading

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data.user;

      await axios.post(urls.signUpUrl, {
        username: user.name,
        email: user.email,
        profilePicture: user.photo,
        googleIdToken: user.id,
        selectedLanguageId: appContext.languageId,
        selectedThemeId: appContext.themeId,
      }).then(response => {
        authContext.setAuthToken(response.data.user_id);
        navigation.replace(constants.screenRoutes.LANGUAGE_SCREEN);
      });
    } catch (error) {
      const errorMessage = error.code === statusCodes.SIGN_IN_CANCELLED
        ? strings.signInCancelledError
        : error.code === statusCodes.IN_PROGRESS
          ? strings.signInInProgressError
          : error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
            ? strings.playServiceError
            : strings.signInFailedError;

      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false); // Stop loading after the request completes
    }
  };

  const handleEmailSignUp = () => {
    navigation.navigate(constants.screenRoutes.SIGN_UP_SCREEN);
  };

  const handlePhoneSignUp = () => {
    ToastAndroid.show(strings.phonesignupnotsupported, ToastAndroid.SHORT);
  };

  const handleSignIn = () => {
    navigation.navigate(constants.screenRoutes.LOGIN_SCREEN);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tractorLogoContainer: {
      marginTop: 10,
    },
    logo: {
      width: 43,
      height: 33,
      resizeMode: 'contain',
    },
    skipButton: {
      color: 'white',
      alignSelf: 'flex-end',
      margin: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: colors.skipButtonBackground,
      borderRadius: 50,
    },
    skipButtonText: {
      color: colors.skipButtonTextColor,
      fontSize: 14,
      fontFamily: "Alatsi-Regular"
    },
    centralContainer: {
      marginTop: 10,
      maxHeight: 365,
      width: 260,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'left',
      alignSelf: 'center',
    },
    subcentralContainer: {
      alignItems: 'left',
    },
    headingT1: {
      color: colors.headingT1Color,
      fontSize: 35,
      fontFamily: "AoboshiOne-Regular"
    },
    headingT2: {
      color: colors.headingT2Color,
      fontSize: 45,
      fontFamily: "AoboshiOne-Regular"
    },
    pageSlogan: {
      color: colors.pageSloganColor,
      fontSize: 18,
      fontFamily: "Alatsi-Regular"
    },
    signInWithLabel: {
      color: colors.signInWithLabelColor1,
      fontSize: 16,
      alignSelf: 'center',
      marginBottom: 5,
      fontFamily: "AmiriQuran-Regular"
    },
    signInLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      maxWidth: 84,
      height: 1,
      backgroundColor: colors.lineColor,
      marginHorizontal: 10,
    },
    type1Container: {
      width: "100%",
      flexDirection: 'row',
      marginVertical: 5,
      justifyContent: 'center',
    },
    buttonType1: {
      flexDirection: 'row',
      width: 140,
      height: 54,
      backgroundColor: colors.buttonType1Background,
      borderRadius: 50,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonType1Text: {
      color: colors.buttonType1TextColor,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: "AmiriQuran-Regular"
    },
    type2Container: {
      marginVertical: 10,
      alignItems: 'center',
    },
    buttonType2: {
      width: 304,
      height: 45,
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.buttonType2Background,
      borderRadius: 30,
      borderColor: colors.buttonType2BorderColor,
      borderWidth: 1,
    },
    buttonType2Text: {
      color: colors.buttonType2TextColor,
      fontSize: 16,
      fontFamily: "AmiriQuran-Regular",
    },
    signInOnAlready: {
      color: colors.signInOnAlreadyColor,
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 20,
      fontFamily: "Alatsi-Regular",
    },
    loginLogo: {
      width: 30,
      height: 30,
      marginRight: 5,
    },
  });

  return (
    <ImageBackground source={welcomeBackground} style={styles.container}>
      <LinearGradient
        colors={colors.gradientColors}
        style={styles.overlay}
      />
      <LoadingOverlay isLoading={isLoading} /> {/* Show loading overlay */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>{strings.skipButtonText}</Text>
      </TouchableOpacity>
      <View style={styles.centralContainer}>
        <View style={styles.subcentralContainer}>
          <Text style={styles.headingT1}>{strings.welcomeText}</Text>
          <View style={styles.logoContainer}>
            <Text style={styles.headingT2}>{constants.logoName1}</Text>
            <View style={styles.tractorLogoContainer}>
              <Image source={tractorLogo} style={styles.logo} />
            </View>
            <Text style={styles.headingT2}>{constants.logoName2}</Text>
          </View>
        </View>
        <Text style={styles.pageSlogan}>{strings.pageSlogan}</Text>
      </View>
      <View style={styles.signInLabelContainer}>
        <View style={styles.line} />
        <Text style={styles.signInWithLabel}>{strings.signInWithLabel}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.type1Container}>
        <TouchableOpacity style={styles.buttonType1} onPress={handleFacebookLogin}>
          <Image source={facebookLogo} style={styles.loginLogo} />
          <Text style={styles.buttonType1Text}>{strings.facebookButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonType1} onPress={handleGoogleLogin}>
          <Image source={googleLogo} style={styles.loginLogo} />
          <Text style={styles.buttonType1Text}>{strings.googleButtonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.type2Container}>
        <TouchableOpacity onPress={handleEmailSignUp} style={styles.buttonType2}>
          <Text style={styles.buttonType2Text}>{strings.emailButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePhoneSignUp} style={styles.buttonType2}>
          <Text style={styles.buttonType2Text}>{strings.phoneButtonText}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signInOnAlready}>{strings.signInOnAlreadyText}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;

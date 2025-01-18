import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import facebookLogo from '../../../assets/icons/facebook-logo.png'
import googleLogo from '../../../assets/icons/google-logo.png'
import eyeIcon from '../../../assets/icons/eye-icon.png'
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import Urls from '../../constants/Urls'
import LoadingOverlay from '../../components/LoadingOverlay';
import backIcon from '../../../assets/icons/back-icon.png'

const LoginScreen = ({ navigation }) => {
  const appContext = useContext(AppContext)
  const strings = new Strings(appContext.language)
  const colors = new Colors(appContext.theme)
  const constants = new Constants()
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookLogin = () => {
    ToastAndroid.show(strings.facebookLoginNotSupported, ToastAndroid.SHORT)
  }

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      authContext.setAuthToken(userInfo.data.user.id);
      navigation.replace(constants.screenRoutes.LANGUAGE_SCREEN);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show(strings.signInCancelledError, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(strings.signInFailedError, ToastAndroid.SHORT);
      }
    }
  }

  const handleLogin = () => {
    if (email && password) {
      if (validateEmail(email)) {
        setIsLoading(true);
        axios.put(urls.passwordSigninUrl, {
          email: email,
          password: password
        })
          .then(response => {
            setIsLoading(false);
            if (response.status !== 200) {
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              return;
            }
            authContext.setAuthToken(response.data.authToken);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            !authContext.loading && navigation.replace(constants.screenRoutes.LANGUAGE_SCREEN);
          })
          .catch(error => {
            setIsLoading(false);
            ToastAndroid.show(`${error.message}: ${urls.passwordSigninUrl}`, ToastAndroid.SHORT);
            console.log(JSON.stringify(urls));
            
          })
      } else {
        ToastAndroid.show(strings.invalidEmailAddress, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(strings.pleaseFillAllFields, ToastAndroid.SHORT);
    }
  }

  const handleSignUp = () => {
    navigation.navigate(constants.screenRoutes.SIGN_UP_SCREEN);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleForgotPassword = () => {
    navigation.replace(constants.screenRoutes.PASSWORD_RESET_SCREEN);
  }

  const goBack = () => {
    navigation.goBack();
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.containerBackgroundColor,
    },
    overlay: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    circles: {
      position: 'absolute',
      borderRadius: 100,
    },
    circle1: {
      backgroundColor: 'transparent',
      borderWidth: 30,
      borderColor: colors.circle1BorderColor,
      height: 96,
      width: 96,
      top: -21,
      left: -46,
      zIndex: 1
    },
    circle2: {
      backgroundColor: colors.circle2BackgroundColor,
      height: 165,
      width: 165,
      top: -99,
      left: -5,
    },
    circle3: {
      backgroundColor: colors.circle3BackgroundColor,
      height: 181,
      width: 181,
      top: -109,
      left: 298,
    },
    heading: {
      flexDirection: 'row',
      marginVertical: 5,
      alignSelf: 'flex-start',
      marginLeft: '10%',
    },
    headingText: {
      marginTop: 120,
      color: colors.signUpHeadingColor,
      fontSize: 36.41,
      fontFamily: 'AverageSans-Regular',
    },
    inputGroup: {
      marginVertical: 10,
    },
    inputLabel: {
      color: colors.inputLabelColor,
      fontSize: 16,
      marginVertical: 5,
      fontFamily: 'Alatsi-Regular',
    },
    input: {
      width: 300,
      height: 65,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.inputBackgroundColor,
    },
    nameInput: {
      height: 50,
      borderColor: colors.inputBorderColorName,
      color: colors.inputTextColor,
      fontSize: 17,
      fontFamily: 'Alatsi-Regular',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.inputBorderColorPassword,
      borderWidth: 1,
      borderRadius: 10,
      height: 50,
      width: 300,
      paddingHorizontal: 10,
      backgroundColor: colors.inputBackgroundColor,
    },
    passwordInput: {
      flex: 1,
      color: colors.inputTextColor,
      fontSize: 17,
      fontFamily: 'Alatsi-Regular',
    },
    eyeIconContainer: {
      padding: 5,
    },
    eyeIcon: {
      width: 17,
      height: 12,
    },
    signupButton: {
      width: 248,
      height: 60,
      backgroundColor: colors.signUpButtonBackground,
      borderRadius: 28.5,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupButtonText: {
      color: colors.signUpButtonTextColor,
      fontSize: 18,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'AverageSans-Regular',
    },
    alreadyHaveAccount: {
      marginVertical: 20,
    },
    alreadyHaveAccountText: {
      color: colors.alreadyHaveAccountTextColor,
      fontSize: 14,
      fontFamily: 'AmiriQuran-Regular',
    },
    signInLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      maxWidth: 84,
      height: 1,
      backgroundColor: colors.lineBackgroundColor,
      marginHorizontal: 10,
    },
    signInWithLabel: {
      color: colors.signInWithLabelColor,
      fontSize: 16,
      alignSelf: 'center',
      fontFamily: 'AverageSans-Regular',
    },
    type1Container: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonType1: {
      flexDirection: 'row',
      backgroundColor: colors.buttonType1Background,
      height: 57,
      width: 147,
      borderRadius: 50,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonType1Text: {
      color: colors.buttonType1TextColor,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'AmiriQuran-Regular',
    },
    loginLogo: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 0.5,
    },
    forgotPasswordText: {
      color: colors.forgotPasswordTextColor,
      fontSize: 14,
      alignSelf: 'flex-end',
      fontFamily: 'Alatsi-Regular',
    },
    backButton: {
      position: 'absolute',
      top: 27,
      left: 27,
      height: 38,
      width: 38,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      zIndex: 2
    },
    backImage: {
      width: 5,
      height: 10
    }
  })

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <TouchableOpacity style={[styles.backButton, styles.shadow]} onPress={goBack}>
        <Image source={backIcon} style={styles.backImage} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{strings.loginHeading}</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{strings.emailLabel}</Text>
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="Your email or phone"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{strings.passwordLabel}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput]}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            autoCompleteType="password"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <Image source={eyeIcon} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable style={({ pressed }) => [styles.alreadyHaveAccount, pressed && { opacity: 0.6 }]} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>{strings.forgotPasswordText}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }, styles.shadow]} onPress={handleLogin}>
        <Text style={styles.signupButtonText}>{strings.loginButtonText}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.alreadyHaveAccount, pressed && { opacity: 0.6 }]} onPress={handleSignUp}>
        <Text style={styles.alreadyHaveAccountText}>{strings.dontHaveAccountText}</Text>
      </Pressable>
      <View style={styles.signInLabelContainer}>
        <View style={styles.line} />
        <Text style={styles.signInWithLabel}>{strings.loginWithLabel}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.type1Container}>
        <Pressable style={({ pressed }) => [styles.buttonType1, styles.shadow, pressed && { opacity: 0.6 }]} onPress={handleFacebookLogin}>
          <Image source={facebookLogo} style={styles.loginLogo} />
          <Text style={styles.buttonType1Text}>{strings.facebookButtonText}</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.buttonType1, styles.shadow, pressed && { opacity: 0.6 }]} onPress={handleGoogleLogin}>
          <Image source={googleLogo} style={styles.loginLogo} />
          <Text style={styles.buttonType1Text}>{strings.googleButtonText}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen;

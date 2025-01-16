import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import facebookLogo from '../../../assets/icons/facebook-logo.png'
import googleLogo from '../../../assets/icons/google-logo.png'
import eyeIcon from '../../../assets/icons/eye-icon.png'
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Urls from '../../constants/Urls'

const SignUpScreen = ({ navigation }) => {
  const appContext = useContext(AppContext) 
  const authContext = useContext(AuthContext)
  const strings = new Strings(appContext.language)
  const colors = new Colors(appContext.theme)
  const constants = new Constants()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const urls = new Urls(authContext);

  const handleFacebookLogin = () => {
    ToastAndroid.show('Facebook login is not supported yet.', ToastAndroid.SHORT)
  }

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo.data;

      const response = await axios.post(urls.signUpUrl, {
        username: user.name,
        email: user.email,
        profilePicture: user.photo,
        googleIdToken: user.id,
        selectedLanguageId: appContext.languageId,
        selectedThemeId: appContext.themeId,
      });
      authContext.setAuthToken(response.data.user_id);
      navigation.replace(constants.screenRoutes.LANGUAGE_SCREEN);
      ToastAndroid.show('Google Sign-Up Successful', ToastAndroid.SHORT);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('Sign-In Cancelled', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('Play Services Not Available', ToastAndroid.SHORT);
      } else {
        console.error(error);
        ToastAndroid.show('Google Sign-In Failed', ToastAndroid.SHORT);
      }
    }
  };

  const handleSignUp = () => {
    if (fullName && email && password) {
      if (validateEmail(email)) {
        axios.post(urls.signUpUrl, {
          username: fullName,
          email: email,
          profilePicture: '',
          password: password,
          selectedLanguageId: appContext.languageId,
          selectedThemeId: appContext.themeId,
        })
          .then((response) => {
            authContext.setAuthToken(response.data.user_id);
            navigation.navigate(constants.screenRoutes.LANGUAGE_SCREEN);
            ToastAndroid.show('Sign-Up Successful', ToastAndroid.SHORT);
          })
          .catch((error) => {
            console.error(error);
            ToastAndroid.show('Sign-Up Failed', ToastAndroid.SHORT);
          });
      } else {
        ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
    }
  };

  const handleSignIn = () => {
    navigation.navigate(constants.screenRoutes.LOGIN_SCREEN)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
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
      height: 36,
      width: 36,
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
      marginVertical: 30,
      alignSelf: 'flex-start',
      marginLeft: '10%',
    },
    headingText: {
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
    emailInput: {
      height: 50,
      borderColor: colors.inputBorderColorEmail,
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
      fontWeight: '300',
      fontFamily: 'AverageSans-Regular',
    },
    alreadyHaveAccount: {
      marginVertical: 10,
    },
    alreadyHaveAccountText: {
      color: colors.alreadyHaveAccountTextColor,
      fontSize: 14,
      fontFamily: 'Alatsi-Regular',
    },
    signInLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flex: 1,
      maxWidth: 80,
      height: 1,
      backgroundColor: colors.lineBackgroundColor,
      marginHorizontal: 10,
    },
    signInWithLabel: {
      marginVertical: 10,
      color: colors.signInWithLabelColor,
      fontSize: 16,
      alignSelf: 'center',
      fontFamily: 'AmiriQuran-Regular',
    },
    type1Container: {
      width: "100%",
      flexDirection: 'row',
      marginVertical: 5,
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
  })
  
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{strings.signUpHeading}</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{strings.fullNameLabel}</Text>
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="Enter your full name"
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{strings.emailLabel}</Text>
        <TextInput
          style={[styles.input, styles.emailInput]}
          placeholder="Enter your email"
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
      <Pressable style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }]} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>{strings.signUpButtonText}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.alreadyHaveAccount, pressed && { opacity: 0.6 }]} onPress={handleSignIn}>
        <Text style={styles.alreadyHaveAccountText}>{strings.alreadyHaveAccountText}</Text>
      </Pressable>
      <View style={styles.signInLabelContainer}>
        <View style={styles.line} />
        <Text style={styles.signInWithLabel}>{strings.signUpWithLabel}</Text>
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

export default SignUpScreen

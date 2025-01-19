import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import backIcon from '../../../assets/icons/back-icon.png';
import { AppContext } from '../../contexts/AppContext';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import LoadingOverlay from "../../components/LoadingOverlay";

const OTPVerificationScreen = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      handleConfirm();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const handleConfirm = () => {
    if (otp.join('').length === 3) {
      setLoading(true);
      ToastAndroid.show(strings.verificationSuccessful, ToastAndroid.SHORT);
      navigation.navigate(constants.screenRoutes.LANGUAGE_SCREEN);
      setLoading(false);
    } else {
      ToastAndroid.show(strings.invalidOTP, ToastAndroid.SHORT);
    }
  };

  const handleResend = () => {
    setLoading(true);
    ToastAndroid.show(strings.resendOTP, ToastAndroid.SHORT);
    setLoading(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
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
      height: 96,
      width: 96,
      borderWidth: 30,
      borderColor: colors.circle1BorderColor,
      top: -21,
      left: -46,
    },
    circle2: {
      backgroundColor: colors.circle2BackgroundColor,
      height: 165,
      width: 165,
      top: -99,
      left: -5,
      zIndex: -1,
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
      alignSelf: 'flex-start',
      marginLeft: '10%',
    },
    headingText: {
      marginTop: 200,
      color: colors.signUpHeadingColor,
      fontSize: 36.41,
      fontFamily: 'AverageSans-Regular',
    },
    inputGroup: {
      marginVertical: 10,
    },
    inputLabel: {
      maxWidth: 280,
      color: colors.inputLabelColor,
      fontSize: 16,
      marginBottom: 30,
      fontFamily: 'Alatsi-Regular',
    },
    input: {
      width: 65,
      height: 65,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.inputBackgroundColor,
      justifyContent: 'center',
      textAlign: 'center',
    },
    nameInput: {
      height: 65,
      borderColor: colors.inputBorderColorPassword,
      color: colors.circle3Color,
      fontSize: 27,
      fontFamily: 'AmiriQuran-Regular',
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
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 0.5,
    },
    backButton: {
      position: 'absolute',
      top: 27,
      left: 27,
      height: 38,
      width: 38,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    backImage: {
      width: 5,
      height: 10,
    },
    otpBoxContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
  
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay />}
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <TouchableOpacity style={[styles.backButton, styles.shadow]} onPress={goBack}>
        <Image source={backIcon} style={styles.backImage} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{strings.otpHeading}</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{strings.otpDescription}</Text>
        <View style={styles.otpBoxContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.input, styles.nameInput]}
              keyboardType="number-pad"
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
            />
          ))}
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [styles.alreadyHaveAccount, pressed && { opacity: 0.6 }]}
        onPress={handleResend}
      >
        <Text style={styles.alreadyHaveAccountText}>{strings.otpButtonText}</Text>
      </Pressable>

    </View>
  );
};

export default OTPVerificationScreen;

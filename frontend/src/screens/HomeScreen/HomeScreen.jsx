import { Image, StyleSheet, Text, View, Pressable, BackHandler, Linking } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import arrowImage from "../../../assets/icons/down-arrow.png";
import instrction1image from "../../../assets/icons/instruction1image.png";
import instrction2image from "../../../assets/icons/instruction2image.png";
import instrction3image from "../../../assets/icons/instruction3image.png";
import ratingStar from "../../../assets/icons/rate-star.png";
import pinImage from "../../../assets/icons/pin.png";
import videoImage from "../../../assets/icons/video.png";
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import Category from './components/Category';
import { AuthContext } from '../../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();
  const authContext = useContext(AuthContext);
  const channelId = authContext.EXPO_YOUTUBE_CHANNEL_ID;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.containerBackgroundColor,
    },
    guideContainer: {
      width: 329,
      height: 433,
      overflow: 'hidden',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 15
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    circles: {
      position: 'absolute',
      borderRadius: 100,
      opacity: 0.69,
    },
    circle1: {
      backgroundColor: 'transparent',
      height: 36,
      width: 36,
      borderWidth: 30,
      borderColor: colors.circle1BorderColor,
      height: 81,
      width: 81,
      top: -90,
      left: -40,
      zIndex: 0,
    },
    circle2: {
      backgroundColor: colors.circle2BackgroundColor,
      height: 121,
      width: 121,
      top: -170,
      left: 35,
    },
    circle3: {
      backgroundColor: colors.circle3BackgroundColor,
      height: 133,
      width: 133,
      top: -170,
      left: 240,
    },
    instruction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 20
    },
    instructionImage: {
      height: 60,
      width: 60,
      marginHorizontal: 10
    },
    arrowImage: {
      marginTop: 10,
      marginLeft: 30,
      height: 40,
      width: 40,
    },
    instructionText: {
      fontSize: 20,
      color: colors.instructionColor,
      textAlignVertical: 'center',
      fontFamily: "RobotoCondensed-Regular"
    },
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    startButton: {
      marginTop: 20,
      height: 50,
      width: 126,
      backgroundColor: colors.instructionColor,
      alignSelf: 'center',
      borderRadius: 450,
      justifyContent: 'center'
    },
    startButtonText: {
      textAlign: 'center',
      fontSize: 20,
      color: colors.primaryTextColor,
      fontFamily: "RobotoCondensed-SemiBold"
    },
    categoryImage: {
      height: 30,
      width: 30
    },
    categoryContainer: {
      width: "100%",
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between'
    },
    category: {
      height: 80,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: colors.categoryBackgroundColor,
    },
    categoryText: {
      textAlign: 'center',
      fontSize: 10,
      marginTop: 5,
      fontFamily: "AoboshiOne-Regular"
    },
    categoryHeading: {
      fontSize: 16,
      paddingHorizontal: 20,
      paddingVertical: 30,
      fontFamily: "Alatsi-Regular"
    }
  })
  
  const handleStart = () => navigation.navigate(constants.screenRoutes.SCAN_SCREEN);
  const handleBhoomiCare = () => {
    Linking.openURL(authContext.EXPO_APP_WEBSITE).catch((err) => {
      console.error("Failed to open URL: ", err);
    });
  }

  const navigate2BhoomiChannel = () => {
    Linking.canOpenURL('vnd.youtube://channel/' + channelId).then(supported => {
      if (supported) {
        return Linking.openURL('vnd.youtube://channel/' + channelId);
      } else {
        return Linking.openURL('https://www.youtube.com/channel/' + channelId);
      }
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <View style={[styles.guideContainer, styles.shadow]}>
        <LinearGradient colors={colors.guideGradientColors} style={styles.overlay} />
        {[{ img: instrction1image, text: strings.ins1 },
        { img: instrction2image, text: strings.ins2 },
        { img: instrction3image, text: strings.ins3 }].map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.instruction}>
              <Image style={styles.instructionImage} source={item.img} />
              <Text style={styles.instructionText}>{item.text}</Text>
            </View>
            {index < 2 && <Image source={arrowImage} style={styles.arrowImage} />}
          </React.Fragment>
        ))}
        <Pressable style={({ pressed }) => [styles.startButton, styles.shadow, pressed && styles.pressedCategory]} onPress={handleStart}>
          <Text style={styles.startButtonText}>{strings.startButtonText}</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.categoryHeading}>{strings.categoryHeading}</Text>
        <View style={styles.categoryContainer}>
          <Category styles={styles} onPress={() => navigation.navigate(constants.screenRoutes.RATING_SCREEN)} imageSource={ratingStar} text={strings.category1} />
          <Category styles={styles} onPress={handleBhoomiCare} imageSource={pinImage} text={strings.category2} />
          <Category styles={styles} onPress={navigate2BhoomiChannel} imageSource={videoImage} text={strings.category3} />
        </View>
      </View>
    </View>
  );
};



export default HomeScreen;

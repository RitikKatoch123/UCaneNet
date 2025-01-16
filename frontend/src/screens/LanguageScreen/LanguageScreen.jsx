import { Image, ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import languageBackground from "../../../assets/icons/language-background.jpg"
import tractorLogo from '../../../assets/icons/tractor-icon.png';
// TODO: font
const LanguageScreen = ({ navigation }) => {
  const appContext = useContext(AppContext)
  const strings = new Strings(appContext.language)
  const colors = new Colors(appContext.theme)
  const constants = new Constants()
  const handleHindi = () => {
    appContext.setLanguage(0)
    navigation.replace(constants.drawerRoutes.BOTTOM_TABS_ROUTER)
  }
  const handleEnglish = () => {
    appContext.setLanguage(1)
    navigation.replace(constants.drawerRoutes.BOTTOM_TABS_ROUTER)
  }
  const handleDiscover = () => {
  }

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
      backgroundColor: colors.screenOverlayColor
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
      top: 8,
      left: -48,
      zIndex: 1
    },
    circle2: {
      backgroundColor: colors.circle2BackgroundColor,
      height: 165,
      width: 165,
      top: -102,
      left: -48,
    },
    circle3: {
      backgroundColor: colors.circle3BackgroundColor,
      height: 181,
      width: 181,
      top: -54,
      left: 270,
    },
    centralContainer: {
      marginTop: 200,
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
    },
    headingT1: {
      textAlign: 'center',
      color: colors.headingT1Color,
      fontSize: 45,
      fontFamily: "Inter18pt-BlackItalic"
    },
    headingT2: {
      textAlign: 'center',
      color: colors.headingT1Color,
      fontSize: 45,
      fontFamily: "Inter18pt-BlackItalic"
    },
    pageSlogan: {
      color: colors.pageSloganColor,
      fontSize: 18,
      marginTop: 50,
      fontFamily: "Inter18pt-BlackRegular"
    },
    subcentralContainer: {
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 50,
      height: 45,
    },
    langList: {
      marginTop: 100,
      width: "100%",
      justifyContent: "space-around",
      flexDirection: 'row'
    },
    langButton: {
      height: 49,
      width: 142,
      backgroundColor: colors.langButtonColor,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100
    },
    langButtonText: {
      fontSize: 20,
      fontFamily: "RobotoCondensed-SemiBold"
    },
    discoverButton: {
      marginTop: 120,
      width: 144,
      height: 39,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: colors.discoverTextColor,
    },
    discoverButtonText: {
      fontSize: 14,
      fontFamily: "Manrope-Regular"
    },
    slogan: {
      marginTop: 10,
      width: 200,
      fontSize: 15,
      color: colors.primaryTextColor,
      textAlign: "center",
      fontFamily: "Manrope-ExtraBold"
    }
  })

  return (
    <ImageBackground source={languageBackground} style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <View style={styles.centralContainer}>
        <View style={styles.subcentralContainer}>
          <Text style={styles.headingT1}>{strings.welcomeText}</Text>
          <View style={styles.logoContainer}>
            <Text style={styles.headingT2}>{constants.logoName1}</Text>
            <Image source={tractorLogo} style={styles.logo} />
            <Text style={styles.headingT2}>{constants.logoName2}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.pageSlogan}>{strings.langscreenSubtitle}</Text>
      <View style={styles.langList}>
        <Pressable style={({ pressed }) => [styles.langButton, pressed && { opacity: 0.8 }]} onPress={handleHindi}>
          <Text style={styles.langButtonText}>
            {strings.langscreenLang1}
          </Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.langButton, pressed && { opacity: 0.8 }]} onPress={handleEnglish}>
          <Text style={styles.langButtonText}>
            {strings.langscreenLang2}
          </Text>
        </Pressable>
      </View>
      <Pressable style={({ pressed }) => [styles.discoverButton, pressed && { opacity: 0.8 }]} onPress={handleDiscover}>
        <Text style={styles.discoverButtonText}>
          {strings.langscreenDiscoverText}
        </Text>
      </Pressable>
      <Text style={styles.slogan}>
        {strings.langscreenFooterText}
      </Text>
    </ImageBackground>
  )
}

export default LanguageScreen

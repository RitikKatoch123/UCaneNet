import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthContext } from "../../contexts/AuthContext";
import Color from "../../constants/colors";
import SplashIconLogo from "../../../assets/icons/splash-icon-main.png";
import TractorIcon from "../../../assets/icons/tractor-icon.png";
import Constants from "../../constants/constants";
import Strings from "../../constants/strings";
import loadFonts from "../../utils/fontLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const color = new Color(appContext.theme);
  const { screenRoutes, SPLASH_DELAY } = new Constants();
  const { logoName1, logoName2, logoSlogan } = new Strings(appContext.language);
  const isAuthenticated = !!authContext.authToken;

  const [isReady, setIsReady] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadFonts();

        const savedTheme = await AsyncStorage.getItem("theme");
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedTheme !== null) appContext.setTheme(parseInt(savedTheme, 10));
        if (savedLanguage !== null) appContext.setLanguage(parseInt(savedLanguage, 10));

        setIsReady(true);
      } catch (error) {
        console.log("Initialization error:", error);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (!authContext.loading) {
      setIsAuthChecked(true);
    }
  }, [authContext.loading]);

  useEffect(() => {
    if (isReady && isAuthChecked) {
      const targetRoute = isAuthenticated
        ? screenRoutes.BOTTOM_TABS_ROUTER
        : screenRoutes.WELCOME_SCREEN;

      const timer = setTimeout(() => {
        navigation.replace(targetRoute);
      }, SPLASH_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isReady, isAuthChecked, isAuthenticated, navigation, SPLASH_DELAY, screenRoutes]);

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.splashScreenBackground,
    },
    logoImage: {
      height: 160,
      width: 200,
      resizeMode: 'contain'
    },
    logoImage2: {
      height: 90,
      width: 120,
      alignSelf: "center",
      justifyContent: "center",
      marginHorizontal: -5,
    },
    logoNameContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "hidden",
    },
    logoName: {
      fontSize: 64,
      color: color.primaryTextColor,
      textTransform: "uppercase",
      textAlign: "center",
      fontFamily: "RobotoExtra-Light",
    },
    logoSlogan: {
      marginTop: 10,
      fontSize: 14,
      color: color.primaryTextColor,
      textAlign: "center",
      fontFamily: "Manjari-Bold",
    },
  });

  return (isReady) && (
    <View style={styles.main}>
      <Image source={SplashIconLogo} style={styles.logoImage} />
      <View style={styles.logoNameContainer}>
        <Text style={styles.logoName}>{logoName1}</Text>
        <Image source={TractorIcon} style={styles.logoImage2} />
        <Text style={styles.logoName}>{logoName2}</Text>
      </View>
      <Text style={styles.logoSlogan}>{logoSlogan}</Text>
    </View>
  );
};

export default SplashScreen;

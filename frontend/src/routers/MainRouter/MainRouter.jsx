import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../../contexts/AppContext";
import autoUpdateFetch from "../../utils/autoUpdateFetch";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import DashboardRouter from "../DashboardRouter/DashboardRouter";
import NotificationScreen from "../../screens/NotificationScreen/NotificationScreen";
import OTPVerificationScreen from "../../screens/OTPVerificationScreen/OTPVerificationScreen";
import PasswordResetScreen from "../../screens/PasswordResetScreen/PasswordResetScreen";
import PhoneRegistrationScreen from "../../screens/PhoneRegistrationScreen/PhoneRegistrationScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import RatingScreen from "../../screens/RatingScreen/RatingScreen";
import ReportScreen from "../../screens/ReportScreen/ReportScreen";
import ScanScreen from "../../screens/ScanScreen/ScanScreen";
import SignUpScreen from "../../screens/SignUpScreen/SignUpScreen";
import SplashScreen from "../../screens/SplashScreen/SplashScreen";
import WelcomeScreen from "../../screens/WelcomeScreen/WelcomeScreen";
import LanguageScreen from "../../screens/LanguageScreen/LanguageScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import Constants from "../../constants/constants";
import ResultScreen from "../../screens/ResultScreen/ResultScreen";
import { AuthProvider } from '../../contexts/AuthContext';
import BottomTabsRouter from "../BottomTabsRouter/BottomTabsRouter";

const { screenRoutes } = new Constants();
const Stack = createStackNavigator();

const MainRouter = () => {
  useEffect(() => {
    if (!__DEV__) {
      autoUpdateFetch();
    }
  }, []);

  return (
    <AuthProvider>
    <AppProvider>
      <StatusBar backgroundColor={"transparent"} translucent />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={screenRoutes.SPLASH_SCREEN}>
          <Stack.Screen name={screenRoutes.SPLASH_SCREEN} component={SplashScreen} />
          <Stack.Screen name={screenRoutes.WELCOME_SCREEN} component={WelcomeScreen} />
          <Stack.Screen name={screenRoutes.LANGUAGE_SCREEN} component={LanguageScreen} />
          <Stack.Screen name={screenRoutes.HOME_SCREEN} component={HomeScreen}/>
          <Stack.Screen name={screenRoutes.LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen name={screenRoutes.NOTIFICATION_SCREEN} component={NotificationScreen} />
          <Stack.Screen name={screenRoutes.OTP_VERIFICATION_SCREEN} component={OTPVerificationScreen} />
          <Stack.Screen name={screenRoutes.PASSWORD_RESET_SCREEN} component={PasswordResetScreen} />
          <Stack.Screen name={screenRoutes.PHONE_REGISTRATION_SCREEN} component={PhoneRegistrationScreen} />
          <Stack.Screen name={screenRoutes.PROFILE_SCREEN} component={ProfileScreen} />
          <Stack.Screen name={screenRoutes.RATING_SCREEN} component={RatingScreen} />
          <Stack.Screen name={screenRoutes.REPORT_SCREEN} component={ReportScreen} />
          <Stack.Screen name={screenRoutes.SCAN_SCREEN} component={ScanScreen} />
          <Stack.Screen name={screenRoutes.SIGN_UP_SCREEN} component={SignUpScreen} />
          <Stack.Screen name={screenRoutes.DASHBOARD_ROUTER} component={DashboardRouter} />
          <Stack.Screen name={screenRoutes.RESULT_SCREEN} component={ResultScreen} />
          <Stack.Screen name={screenRoutes.BOTTOM_TABS_ROUTER} component={BottomTabsRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
    </AuthProvider>
  )
}

export default MainRouter
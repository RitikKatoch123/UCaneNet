import React, { createContext, useEffect, useState } from "react";
import placeholderImage from "../../assets/profile-picture-avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import Constants from "../constants/constants";
import axios from "axios";
import { EXPO_GCP_WEB_CLIENT_ID, EXPO_YOUTUBE_CHANNEL_ID, EXPO_APP_WEBSITE } from "@env";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Strings from "../constants/strings";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfilePicture, setUserProfilePicture] = useState(placeholderImage);
  const [userName, setUserName] = useState("Guest");
  const [authToken, setAuthToken] = useState(null);
  const [appRating, setAppRating] = useState(0);
  const [appReview, setAppReview] = useState(null);
  const [userEmail, setUserEmail] = useState("agrigrow@gmail.com");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [userPhone, setUserPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [EXPO_BACKEND_API_URL, setEXPO_BACKEND_API_URL] = useState(null);
  const constants = new Constants();
  const strings = new Strings(1);
  let EXPO_GCP_WEB_CLIENT_ID = EXPO_GCP_WEB_CLIENT_ID ?? "902917005569-841gll6oh160jqbtg0ou0vgj4hck7tj8.apps.googleusercontent.com";
  let EXPO_YOUTUBE_CHANNEL_ID = EXPO_YOUTUBE_CHANNEL_ID ?? "UCwAC7GLiu6JkZZF3vUgXtuw";
  let EXPO_APP_WEBSITE = EXPO_APP_WEBSITE ?? "https://www.bhoomi.in";
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_GCP_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);
  const saveProxyUrl = async (url) => {
    try {
      setEXPO_BACKEND_API_URL(url);
      await AsyncStorage.setItem("proxy_url", url);
      ToastAndroid.show("Proxy URL updated", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Error saving proxy URL", ToastAndroid.SHORT);
    }
  };
  const loadLocalAuth = () => {
    AsyncStorage.getItem("proxy_url")
      .then(savedProxyUrl => {
        if (savedProxyUrl) {
          setEXPO_BACKEND_API_URL(savedProxyUrl);
          AsyncStorage.getItem("authToken")
            .then(savedAuthToken => {
              if (!savedAuthToken) {
                setLoading(false);
                return;
              }

              const getProfileUrl = `${savedProxyUrl}/get_profile/${savedAuthToken}`;
              axios
                .get(getProfileUrl)
                .then(response => {
                  if (response.status === 200) {
                    const data = response.data;
                    setAuthToken(savedAuthToken);
                    setUserProfilePicture(data.avatarUrl);
                    setUserName(data.username);
                    setAppRating(data.rated_app);
                    setAppReview(data.review);
                    setUserEmail(data.email);
                    setIsEmailVerified(data.isEmailVerified);
                    setIsPhoneVerified(data.isPhoneVerified);
                    setUserPhone(data.phone);
                  } else {
                    ToastAndroid.show(response.data.error || strings.signInAuthError, ToastAndroid.SHORT);
                  }
                })
                .catch(error => {
                  ToastAndroid.show(error.message || strings.signInAuthError, ToastAndroid.SHORT);
                })
                .finally(() => {
                  setLoading(false);
                });
            })
            .catch(error => {
              ToastAndroid.show(error.message || strings.signInAuthError, ToastAndroid.SHORT);
            })
            .finally(()=>{
              setLoading(false);
            });
        }
      }).catch(error=>{
        ToastAndroid.show(strings.backendUrlIsNotSet, ToastAndroid.SHORT)
      })
      .finally(()=>{
        setLoading(false)
      })

  };
  useEffect(() => {
    loadLocalAuth();
  }, [])
  useEffect(() => {
    if (authToken) {
      AsyncStorage.setItem("authToken", authToken);
      loadLocalAuth();
    }
  }, [authToken]);
  const logout = async () => {
    setAuthToken(null);
    setUserProfilePicture(null);
    setUserName("Guest");
    setAppRating(0);
    setAppReview(null);
    setUserEmail("agrigrow@gmail.com");
    setIsEmailVerified(false);
    setIsPhoneVerified(false);
    setUserPhone(null);
    await AsyncStorage.removeItem("authToken");
  };

  const contextValues = {
    EXPO_BACKEND_API_URL,
    saveProxyUrl,
    EXPO_GCP_WEB_CLIENT_ID,
    EXPO_YOUTUBE_CHANNEL_ID,
    EXPO_APP_WEBSITE,
    userProfilePicture,
    setUserProfilePicture,
    userName,
    setUserName,
    authToken,
    setAuthToken,
    loading,
    appRating,
    setAppRating,
    appReview,
    setAppReview,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
    isEmailVerified,
    setIsEmailVerified,
    isPhoneVerified,
    setIsPhoneVerified,
    logout
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

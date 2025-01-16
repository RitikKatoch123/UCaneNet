import React, { createContext, useEffect, useState } from "react";
import placeholderImage from "../../assets/profile-picture-avatar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import Constants from "../constants/constants";
import axios from "axios";
import { EXPO_BACKEND_API_URL, EXPO_GCP_WEB_CLIENT_ID, EXPO_YOUTUBE_CHANNEL_ID, EXPO_APP_WEBSITE } from "@env";
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

  const constants = new Constants();
  const strings = new Strings(1);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_GCP_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const loadLocalAuth = () => {
    AsyncStorage.getItem("authToken")
      .then(savedAuthToken => {
        if (!savedAuthToken) {
          setLoading(false);
          return;
        }

        const getProfileUrl = `${EXPO_BACKEND_API_URL}/get_profile/${savedAuthToken}`;
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
        setLoading(false);
      });
  };
  useEffect(()=>{
    loadLocalAuth();
  }, [])
  useEffect(() => {
    if(authToken){
      AsyncStorage.setItem("authToken", authToken);
      loadLocalAuth();
    }
  }, [authToken]);

  const contextValues = {
    EXPO_BACKEND_API_URL,
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
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

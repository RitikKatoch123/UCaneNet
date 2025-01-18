import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import Urls from "../constants/Urls";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setThemeState] = useState(0);
  const [language, setLanguageState] = useState(0);
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        const savedLanguage = await AsyncStorage.getItem("language");

        if (savedTheme !== null) setThemeState(parseInt(savedTheme));
        if (savedLanguage !== null) setLanguageState(parseInt(savedLanguage));
      } catch (error) {
        console.log("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  const setTheme = useCallback(
    async (newTheme) => {
      setThemeState(newTheme);
      try {
        await AsyncStorage.setItem("theme", newTheme.toString());
        if (authContext.authToken) {
          axios
            .put(urls.updateThemeUrl, { selectedThemeId: newTheme })
            .catch((error) => ToastAndroid.show(error.message, ToastAndroid.SHORT));
        }
      } catch (error) {
        console.log("Error saving theme:", error);
      }
    },
    [authContext.authToken, urls]
  );

  const setLanguage = useCallback(
    async (newLanguage) => {
      setLanguageState(newLanguage);
      try {
        await AsyncStorage.setItem("language", newLanguage.toString());
        if (authContext.authToken) {
          axios
            .put(urls.updateLanguageUrl, { selectedLanguageId: newLanguage })
            .catch((error) => ToastAndroid.show(error.message, ToastAndroid.SHORT));
        }
      } catch (error) {
        console.log("Error saving language:", error);
      }
    },
    [authContext.authToken, urls]
  );

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from './AuthContext';
import { ToastAndroid } from "react-native";
import Urls from "../constants/Urls";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(0);
  const [language, setLanguage] = useState(0);
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("theme", theme.toString());
        if (authContext.authToken) {
          axios.put(urls.updateThemeUrl, { selectedThemeId: theme })
            .then((response) => ToastAndroid.show(response.data.status, ToastAndroid.SHORT))
            .catch((error) => ToastAndroid.show(error.message, ToastAndroid.SHORT));
        }
      } catch (error) {
        console.log("Error saving theme:", error);
      }
    };
    saveTheme();
  }, [theme]);

  useEffect(() => {
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem("language", language.toString());        
        if (authContext.authToken) {
          axios.put(urls.updateLanguageUrl, { selectedLanguageId: language })
            .then((response) => ToastAndroid.show(response.data.status, ToastAndroid.SHORT))
            .catch((error) => ToastAndroid.show(error.message, ToastAndroid.SHORT));
        }
      } catch (error) {
        console.log("Error saving language:", error);
      }
    };
    saveLanguage();
  }, [language]);

  const objectsToExport = {
    theme,
    setTheme,
    language,
    setLanguage,
  };

  return (
    <AppContext.Provider value={objectsToExport}>{children}</AppContext.Provider>
  );
};


import { StyleSheet, Text, View, Image, FlatList, Pressable, ToastAndroid, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import Solution from './components/Solution';
import axios from 'axios';
import placeholderImage from "../../../assets/profile-picture-avatar.png";
import Urls from '../../constants/Urls';

const ReportScreen = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const urls = new Urls(authContext);

  const fetchReports = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    axios
      .get(urls.getReportsUrl, {
        timeout: 80000,
        responseType: 'json',
       })
      .then(response => {
        setSolutions(response.data);
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        if (isRefresh) setRefreshing(false);
        else setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchReports(true);
  };

  useEffect(() => {
    if (!!authContext.authToken) {
      fetchReports();
    } else {
      setLoading(false);
    }
  }, [authContext.authToken]);

  const handleBack = () => {
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    },
    circle1: {
      height: 205,
      width: 124,
      backgroundColor: colors.profileCirlce1,
      top: -157,
      left: 0,
      zIndex: 0,
      borderTopEndRadius: 200,
      borderBottomStartRadius: 200,
    },
    circle2: {
      backgroundColor: colors.profileCirlce2,
      height: 60,
      width: 60,
      top: -99,
      left: 134,
      borderRadius: 100,
    },
    circle3: {
      backgroundColor: colors.circle3BackgroundColor,
      height: 285,
      width: 174,
      top: -192,
      left: 204,
      borderTopStartRadius: 200,
      borderBottomRightRadius: 200,
    },
    centralContainer: {
      flex: 1,
      alignItems: 'center',
    },
    profileContainer: {
      marginTop: 30,
    },
    pictureContainer: {
      borderWidth: 9,
      borderColor: colors.appBackgroundColor,
      borderRadius: 100,
    },
    pictureContainerImage: {
      height: 90,
      width: 90,
      borderRadius: 100,
    },
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 0.1,
    },
    pageTitle: {
      fontSize: 24,
      marginBottom: 22,
      marginTop: 48,
      color: colors.primaryColor,
      fontFamily: "RobotoCondensed-SemiBold",
    },
    solutionContainer: {
      width: '100%',
    },
    signupButton: {
      width: 248,
      height: 60,
      backgroundColor: colors.signUpButtonBackground,
      borderRadius: 28.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    signupButtonText: {
      color: colors.signUpButtonTextColor,
      fontSize: 18,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'AverageSans-Regular',
    },
    noReportsText: {
      fontSize: 16,
      color: colors.tertiaryColor,
      textAlign: 'center',
      marginTop: 30,
      fontFamily: "RobotoExtra-Light",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <View style={styles.centralContainer}>
        <View style={[styles.profileContainer, styles.shadow]}>
          <View style={[styles.pictureContainer, styles.shadow]}>
            <Image
              source={authContext.userProfilePicture && authContext.userProfilePicture.length > 0 ? { uri: `${authContext.userProfilePicture.includes('https://') ? '' : 'data:image/jpeg;base64,'}${authContext.userProfilePicture}` } : placeholderImage}
              style={styles.pictureContainerImage}
            />
          </View>
        </View>
        <Text style={styles.pageTitle}>{strings.titleHeadingReport}</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primaryColor} />
        ) : solutions.length === 0 ? (
          <Text style={styles.noReportsText}>{strings.noReportsText}</Text>
        ) : (
          <FlatList
            data={solutions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Solution item={item} colors={colors} />}
            contentContainerStyle={styles.solutionContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.primaryColor]}
              />
            }
          />
        )}
      </View>
      <Pressable
        style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }, styles.shadow]}
        onPress={handleBack}
      >
        <Text style={styles.signupButtonText}>{strings.backButtonText}</Text>
      </Pressable>
    </View>
  );
};

export default ReportScreen;

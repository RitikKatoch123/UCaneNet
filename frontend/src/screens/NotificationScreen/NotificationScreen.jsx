import { StyleSheet, View, FlatList, ToastAndroid, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationItem from './components/NotificationItem';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import Urls from '../../constants/Urls';
import { AuthContext } from '../../contexts/AuthContext';

const NotificationScreen = () => {
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 5,
    },
    list: {
      paddingBottom: 10,
      marginVertical: 34,
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
    noReportsText: {
      fontSize: 16,
      color: colors.tertiaryColor,
      textAlign: 'center',
      marginTop: 30,
      fontFamily: "RobotoExtra-Light",
    },
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotification = async () => {
    setLoading(true);
    axios
      .get(urls.fetchNotificationUrl)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    axios
      .get(urls.fetchNotificationUrl)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (!!authContext.authToken) {
      fetchNotification();
    } else {
      setLoading(false);
    }
  }, [authContext.authToken]);

  const renderItem = ({ item }) => (
    <NotificationItem
      image={item.image}
      title={item.title}
      description={item.description}
      timeStamp={item.timestamp}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryColor} />
      ) : notifications.length === 0 ? (
        <Text style={styles.noReportsText}>{strings.noNotificationText}</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
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
  );
};

export default NotificationScreen;

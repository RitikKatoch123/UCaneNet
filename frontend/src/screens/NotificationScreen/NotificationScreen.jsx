import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import NotificationItem from './components/NotificationItem';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { useContext } from 'react';

const NotificationScreen = () => {
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();

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
  });
  const notifications = [
    {
      id: '1',
      image: null,
      title: 'Detected new disease',
      description: 'Detailed description about the detected disease.',
      timeStamp: '10:12',
    },
    {
      id: '2',
      image: null,
      title: 'Reminder for checkup',
      description: 'Your scheduled checkup is due tomorrow.',
      timeStamp: '12:30',
    },
    {
      id: '3',
      image: null,
      title: 'New vaccine available',
      description: 'A new vaccine is now available at your nearest center.',
      timeStamp: '09:45',
    },
    {
      id: '4',
      image: null,
      title: 'Health tip of the day',
      description: 'Drink at least 8 glasses of water daily to stay hydrated.',
      timeStamp: '08:00',
    },
  ];

  const renderItem = ({ item }) => (
    <NotificationItem
      image={item.image}
      title={item.title}
      description={item.description}
      timeStamp={item.timeStamp}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default NotificationScreen;


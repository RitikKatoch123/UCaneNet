import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Color from "../../constants/colors";
import Constants from "../../constants/constants";
import ReportScreen from '../../screens/ReportScreen/ReportScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import RatingScreen from '../../screens/RatingScreen/RatingScreen';
import ContactScreen from '../../screens/ContactScreen/ContactScreen';
import NoticationScreen from '../../screens/NotificationScreen/NotificationScreen';
import HomeIcon from '../../../assets/icons/Vector.png';
import MessageIcon from '../../../assets/icons/message-icon.png';
import StarIcon from '../../../assets/icons/star-icon.png';
import UserIcon from '../../../assets/icons/prof-icon.png';
import ReportIcon from '../../../assets/icons/doc-icon.png';
import { Image, StyleSheet } from 'react-native';
import ScanScreen from '../../screens/ScanScreen/ScanScreen';
import ResultScreen from '../../screens/ResultScreen/ResultScreen';
import BackButton from './components/BackButton';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileButton from './components/ProfileButton';
import AppLogo from './components/AppLogo';
import LeftBurgerIcon from './components/LeftBurgerIcon';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const { drawerRoutes, drawerTitles } = new Constants();

const DashboardRouter = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext)
  const colors = new Color(appContext.theme);
  const constants = new Constants();
  const styles = StyleSheet.create({
    dashboardIcon: {
      height: 24,
      width: 24,
    },
    drawerStyle: {
      backgroundColor: colors.secondaryColor,
      width: 251,
      borderTopEndRadius: 40,
      borderBottomEndRadius: 40,
    },
    headerStyle: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
    },
    drawerItemHidden: {
      display: 'none',
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => <LeftBurgerIcon />,
        headerStyle: styles.headerStyle,
        drawerStyle: styles.drawerStyle,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} authContext={authContext}/>}
      initialRouteName={drawerRoutes.HOME_SCREEN}
    >
      <Drawer.Screen
        name={drawerRoutes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: drawerTitles.HOME_SCREEN,
          drawerIcon: () => <Image source={HomeIcon} style={styles.dashboardIcon} />,
          headerTitle: () => <AppLogo constants={constants} colors={colors} />,
          drawerItemStyle: styles.drawerItemHidden,
          headerTitleAlign: 'center',
          headerRight: () => <ProfileButton authContext={authContext} colors={colors} constants={constants} />,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.SCAN_SCREEN}
        component={ScanScreen}
        options={{
          title: drawerTitles.SCAN_SCREEN,
          drawerIcon: () => <Image source={HomeIcon} style={styles.dashboardIcon} />,
          drawerItemStyle: styles.drawerItemHidden,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.REPORT_SCREEN}
        component={ReportScreen}
        options={{
          title: drawerTitles.REPORT_SCREEN,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerTitle: '',
          drawerIcon: () => <Image source={ReportIcon} style={styles.dashboardIcon} />,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          title: drawerTitles.PROFILE_SCREEN,
          drawerIcon: () => <Image source={UserIcon} style={styles.dashboardIcon} />,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.RATING_SCREEN}
        component={RatingScreen}
        options={{
          title: drawerTitles.RATING_SCREEN,
          drawerIcon: () => <Image source={StarIcon} style={styles.dashboardIcon} />,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.CONTACT_SCREEN}
        component={ContactScreen}
        options={{
          title: drawerTitles.CONTACT_SCREEN,
          drawerIcon: () => <Image source={MessageIcon} style={styles.dashboardIcon} />,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.RESULT_SCREEN}
        component={ResultScreen}
        options={{
          title: drawerTitles.RESULT_SCREEN,
          drawerIcon: () => <Image source={MessageIcon} style={styles.dashboardIcon} />,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          drawerItemStyle: styles.drawerItemHidden,
        }}
      />
      <Drawer.Screen
        name={drawerRoutes.NOTIFICATION_SCREEN}
        component={NoticationScreen}
        options={{
          title: drawerTitles.NOTIFICATION_SCREEN,
          drawerIcon: () => <Image source={MessageIcon} style={styles.dashboardIcon} />,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerRight: () => <ProfileButton authContext={authContext} colors={colors} constants={constants} />,
          drawerItemStyle: styles.drawerItemHidden,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DashboardRouter;

import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersIcon from '../../../assets/icons/Users.png';
import HomeIcon from '../../../assets/icons/Home.png';
import NotificationIcon from '../../../assets/icons/Notification.png';
import ScanIcon from '../../../assets/icons/Scan.png';
import ReportIcon from '../../../assets/icons/Report.png';
import NotificationScreen from '../../screens/NotificationScreen/NotificationScreen';
import ScanScreen from '../../screens/ScanScreen/ScanScreen';
import ReportScreen from '../../screens/ReportScreen/ReportScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import DashboardRouter from '../DashboardRouter/DashboardRouter';
import BackButton from '../DashboardRouter/components/BackButton';
import ProfileButton from '../DashboardRouter/components/ProfileButton';
import { AuthContext } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';
import Color from '../../constants/colors';
import Constants from '../../constants/constants';

const Tab = createBottomTabNavigator();

const BottomTabsRouter = ({ navigation }) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const colors = new Color(appContext.theme);
    const { bottomTabsRoutes } = new Constants();

    const styles = StyleSheet.create({
        icon: {
            height: 30,
            width: 30,
            resizeMode: 'contain',
            transition: 'transform 0.3s ease',
        },
        activeIcon: {
            transform: [{ scale: 1.1 }],
        },
        tabBarStyle: {
            height: 60,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        iconWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        },
        scanIcon: {
            marginTop: 20,
            height: 25,
            width: 25,
        },
        notificationTabTitle: {
            fontSize: 16,
            fontFamily: 'Alatsi-Regular'
        }
    });

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' },
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name={bottomTabsRoutes.DASHBOARD_TAB}
                component={DashboardRouter}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={HomeIcon}
                                style={[styles.icon, focused && styles.activeIcon]}
                            />
                        </View>
                    ),
                    tabBarLabel: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={bottomTabsRoutes.REPORT_TAB}
                component={ReportScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={ReportIcon}
                                style={[styles.icon, focused && styles.activeIcon]}
                            />
                        </View>
                    ),
                    tabBarLabel: '',
                    headerLeft: () => <BackButton navigation={navigation} />,
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    tabBarStyle: { display: 'none' },
                })}
            />
            <Tab.Screen
                name={bottomTabsRoutes.SCAN_TAB}
                component={ScanScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={ScanIcon}
                                style={[styles.icon, styles.scanIcon, focused && styles.activeIcon]}
                            />
                        </View>
                    ),
                    tabBarLabel: '',
                    headerTitleAlign: 'center',
                    headerTitle: () => <Text style={styles.notificationTabTitle}>Scan a plant</Text>,
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
            <Tab.Screen
                name={bottomTabsRoutes.NOTIFICATION_TAB}
                component={NotificationScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={NotificationIcon}
                                style={[styles.icon, focused && styles.activeIcon]}
                            />
                        </View>
                    ),
                    tabBarLabel: '',
                    headerLeft: () => <BackButton navigation={navigation} />,
                    headerTitleAlign: 'center',
                    headerTitle: ()=><Text style={styles.notificationTabTitle}>Notification</Text>,
                    headerRight: () => <ProfileButton authContext={authContext} colors={colors} />,
                })}
            />
            <Tab.Screen
                name={bottomTabsRoutes.PROFILE_TAB}
                component={ProfileScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconWrapper}>
                            <Image
                                source={UsersIcon}
                                style={[styles.icon, focused && styles.activeIcon]}
                            />
                        </View>
                    ),
                    tabBarLabel: '',
                    tabBarStyle: { display: 'none' },
                    headerTitle: '',
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
        </Tab.Navigator>
    );
};

export default BottomTabsRouter;

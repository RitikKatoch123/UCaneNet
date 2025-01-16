import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import NotificationScreen from '../../screens/NotificationScreen/NotificationScreen';
import HomeIcon from '../../../assets/icons/Vector.png';
import ProfileIcon from '../../../assets/icons/Profile.png';
import NotificationIcon from '../../../assets/icons/Message.png';

const BottomTab = () => {
    const [activeTab, setActiveTab] = useState('');

    const renderScreen = () => {
        switch (activeTab) {
            case 'Home':
                return <HomeScreen />;
            case 'Profile':
                return <ProfileScreen />;
            case 'Notifications':
                return <NotificationScreen />;
            default:
                return <HomeScreen />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('Home')}
                >
                    <Image
                        source={HomeIcon}
                        style={[
                            styles.icon,
                            { tintColor: activeTab === 'Home' ? '#673ab7' : '#222' },
                        ]}
                    />
                    <Text style={{ color: activeTab === 'Home' ? '#673ab7' : '#222' }}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('Profile')}
                >
                    <Image
                        source={ProfileIcon}
                        style={[
                            styles.icon,
                            { tintColor: activeTab === 'Profile' ? '#673ab7' : '#222' },
                        ]}
                    />
                    <Text style={{ color: activeTab === 'Profile' ? '#673ab7' : '#222' }}>
                        Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('Notifications')}
                >
                    <Image
                        source={NotificationIcon}
                        style={[
                            styles.icon,
                            { tintColor: activeTab === 'Notifications' ? '#673ab7' : '#222' },
                        ]}
                    />
                    <Text
                        style={{
                            color: activeTab === 'Notifications' ? '#673ab7' : '#222',
                        }}
                    >
                        Notifications
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
});

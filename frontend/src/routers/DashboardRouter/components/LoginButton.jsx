import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import logoutButtonIcon from '../../../../assets/icons/logoutbuttonicon.png';
import placeholderImage from "../../../../assets/profile-picture-avatar.png";
import Colors from '../../../constants/colors';
import { AppContext } from '../../../contexts/AppContext';
import { AuthContext } from '../../../contexts/AuthContext';
import Constants from '../../../constants/constants';
import { useNavigation } from '@react-navigation/native';
import Strings from '../../../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginButton = () => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const colors = new Colors(appContext.theme);
    const constants = new Constants();
    const strings = new Strings(appContext.language)
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 24,
            marginBottom: 24,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: colors.primaryColor,
            borderRadius: 28,
            shadowColor: colors.tertiaryColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        image: {
            height: 24,
            width: 24,
            marginRight: 8,
        },
        text: {
            fontSize: 16,
            color: colors.primaryTextColor,
            fontWeight: '600',
        },
    });
    const handleLogin = async () => {
        navigation.replace(constants.screenRoutes.WELCOME_SCREEN)
    }
    return (
        <TouchableOpacity onPress={handleLogin} style={styles.container}>
            <Image source={logoutButtonIcon} style={styles.image} />
            <Text style={styles.text}>{strings.loginHeading}</Text>
        </TouchableOpacity>
    )
}

export default LoginButton
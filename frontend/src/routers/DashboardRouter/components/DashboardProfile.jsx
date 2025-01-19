import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import { AppContext } from '../../../contexts/AppContext';
import { useContext } from "react";
import Colors from '../../../constants/colors';
import Constants from '../../../constants/constants';
import placeHolderImage from "../../../../assets/profile-picture-avatar.png"
import { useNavigation } from '@react-navigation/native';

const DashboardProfile = () => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const colors = new Colors(appContext.theme);
    const constants = new Constants()   
    const nav = useNavigation();
    const naviagateToProfile = () => {
        nav.navigate(constants.bottomTabsRoutes.PROFILE_TAB);
    }
    const styles = StyleSheet.create({
        container: {
            marginLeft: 29,
        },
        pictureContainerImage: {
            width: 90,
            height: 90,
            borderRadius: 100
        },
        username: {
            fontSize: 20,
            marginTop: 21,
            fontFamily: 'Alatsi-Regular'
        },
        email: {
            fontSize: 14,
            color: colors.inputLabelColor,
            marginBottom: 21,
            fontFamily: 'Alatsi-Regular'
        }
    });
    return (
        <Pressable style={styles.container} onPress={naviagateToProfile}>
            <Image source={(authContext.userProfilePicture && authContext.userProfilePicture.length > 0 ? { uri: `${authContext.userProfilePicture.includes('https://') ? '' : 'data:image/jpeg;base64,'}${authContext.userProfilePicture}` } : placeHolderImage)} style={styles.pictureContainerImage} />
            <Text style={styles.username}>{authContext.userName}</Text>
            <Text style={styles.email}>{authContext.userEmail}</Text>
        </Pressable>
    )
}

export default DashboardProfile


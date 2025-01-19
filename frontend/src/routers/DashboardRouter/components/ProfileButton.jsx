import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import placeHolderImage from "../../../../assets/profile-picture-avatar.png"
import Constants from '../../../constants/constants'

const ProfileButton = ({ authContext, colors }) => {
    const navigation = useNavigation();
    const constants = new Constants()
    const goToProfile = () => {        
        navigation.navigate(constants.bottomTabsRoutes.PROFILE_TAB)
    }
    const styles = StyleSheet.create({
        shadow: {
            shadowColor: colors.buttonType1ShadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 0.5,
        },
        profilePicContainer: {
            position: 'absolute',
            top: 15,
            right: 23
        },
        profilePicImage: {
            height: 38,
            width: 38,
            borderRadius: 12
        }
    });
    return (
        <TouchableOpacity style={[styles.profilePicContainer, styles.shadow]} onPress={goToProfile}>
            <Image source={(authContext.userProfilePicture && authContext.userProfilePicture.length > 0 ? { uri: `${authContext.userProfilePicture.includes('https://') ? '' : 'data:image/jpeg;base64,'}${authContext.userProfilePicture}` } : placeHolderImage)} style={styles.profilePicImage} />
        </TouchableOpacity>
    );
}

export default ProfileButton
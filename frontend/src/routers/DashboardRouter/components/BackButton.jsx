import { StyleSheet, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native';
import React, { useContext } from 'react';
import backIcon from '../../../../assets/icons/back-icon.png';
import { AppContext } from '../../../contexts/AppContext';
import Colors from '../../../constants/colors';

const BackButton = () => {
    const appContext = useContext(AppContext);
    const colors = new Colors(appContext.theme);

    const triggerHardwareBack = () => {
        DeviceEventEmitter.emit('hardwareBackPress');
    };

    const styles = StyleSheet.create({
        shadow: {
            shadowColor: colors.buttonType1ShadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 0.5,
        },
        backButton: {
            position: 'absolute',
            top: 15,
            left: 23,
            height: 38,
            width: 38,
            backgroundColor: colors.secondaryColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            zIndex: 2,
        },
        backImage: {
            width: 5,
            height: 10,
        },
    });

    return (
        <TouchableOpacity style={[styles.backButton, styles.shadow]} onPress={triggerHardwareBack}>
            <Image source={backIcon} style={styles.backImage} />
        </TouchableOpacity>
    );
};

export default BackButton;

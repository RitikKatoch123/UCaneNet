import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import ResultComponent from './components/ResultComponent';

const ResultScreen = ({ route }) => {
    const { imageUri } = route.params;
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const strings = new Strings(appContext.language);
    const colors = new Colors(appContext.theme);
    const constants = new Constants();
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            width: "100%",
            backgroundColor: colors.containerBackgroundColor,
        },
        circles: {
            position: 'absolute',
            borderRadius: 100,
            opacity: 0.69,
        },
        circle1: {
            backgroundColor: 'transparent',
            borderWidth: 30,
            borderColor: colors.circle1BorderColor,
            height: 81,
            width: 81,
            top: -90,
            left: -220,
            zIndex: 0,
        },
        circle2: {
            backgroundColor: colors.circle2BackgroundColor,
            height: 121,
            width: 121,
            top: -170,
            left: -150,
        },
        circle3: {
            backgroundColor: colors.circle3BackgroundColor,
            height: 133,
            width: 133,
            top: -170,
            left: 50,
        },
        text: {
            fontSize: 16,
            marginBottom: 20,
            fontFamily: "RobotoExtra-Light"
        },
        image: {
            width: 300,
            height: 400,
            borderRadius: 10,
        },
    });
    return ( 
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={[styles.circle1, styles.circles]} />
                <View style={[styles.circle2, styles.circles]} />
                <View style={[styles.circle3, styles.circles]} />
            </View>
            {imageUri ? (
                <ResultComponent imageUri={imageUri} />
            ) : (
                <Text style={styles.text}>No image found</Text>
            )}
        </View> 
    );
};

export default ResultScreen;


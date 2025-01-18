import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import { AuthContext } from '../../contexts/AuthContext'

const ProxyManagerScreen = ({ navigation }) => {
    const appContext = useContext(AppContext)
    const strings = new Strings(appContext.language)
    const colors = new Colors(appContext.theme)
    const constants = new Constants()
    const authContext = useContext(AuthContext);
    const [url, setUrl] = useState(authContext.EXPO_BACKEND_API_URL);
    const handleReset = () => {
        if (url !== null) {
            authContext.saveProxyUrl(url)
                .then(() => {
                    ToastAndroid.show(strings.proxySavedSuccessfully, ToastAndroid.SHORT);
                })
                .catch(error => {
                    ToastAndroid.show(strings.proxyFailedToSave, ToastAndroid.SHORT);
                })
        }
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
        },
        overlay: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        circles: {
            position: 'absolute',
            borderRadius: 100,
        },
        circle1: {
            backgroundColor: 'transparent',
            height: 36,
            width: 36,
            borderWidth: 30,
            borderColor: colors.circle1BorderColor,
            height: 96,
            width: 96,
            top: -100,
            left: -46,
        },
        circle2: {
            backgroundColor: colors.circle2BackgroundColor,
            height: 165,
            width: 165,
            top: -180,
            left: -5,
            zIndex: -1,
        },
        circle3: {
            backgroundColor: colors.circle3BackgroundColor,
            height: 181,
            width: 181,
            top: -200,
            left: 298,
        },
        heading: {
        },
        headingText: {
            marginTop: 200,
            color: colors.signUpHeadingColor,
            fontSize: 36.41,
            fontFamily: 'AverageSans-Regular',
            textAlign: 'center'
        },
        inputGroup: {
            marginVertical: 10,
        },
        inputLabel: {
            maxWidth: 280,
            color: colors.inputLabelColor,
            fontSize: 16,
            marginBottom: 30,
            fontFamily: 'Alatsi-Regular',
        },
        input: {
            width: 280,
            height: 65,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: colors.inputBackgroundColor,
        },
        nameInput: {
            height: 50,
            borderColor: colors.inputBorderColorEmail,
            color: colors.inputTextColor,
            fontSize: 17,
            fontFamily: 'AmiriQuran-Regular',
        },
        signupButton: {
            width: 248,
            height: 60,
            backgroundColor: colors.signUpButtonBackground,
            borderRadius: 28.5,
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        signupButtonText: {
            color: colors.signUpButtonTextColor,
            fontSize: 18,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: '300',
            fontFamily: 'AverageSans-Regular',
        },
        shadow: {
            shadowColor: colors.buttonType1ShadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 0.5,
        },
        backButton: {
            position: 'absolute',
            top: 27,
            left: 27,
            height: 38,
            width: 38,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
        },
        backImage: {
            width: 5,
            height: 10
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={[styles.circle1, styles.circles]} />
                <View style={[styles.circle2, styles.circles]} />
                <View style={[styles.circle3, styles.circles]} />
            </View>
            <View style={styles.heading}>
                <Text style={styles.headingText}>{strings.proxyLabelHeading}</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{strings.proxyLabelDescription}</Text>
                <TextInput
                    style={[styles.input, styles.nameInput]}
                    autoCapitalize="none"
                    value={url}
                    onChangeText={setUrl}
                />
            </View>
            <Pressable style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }, styles.shadow]} onPress={handleReset}>
                <Text style={styles.signupButtonText}>{strings.profileSaveLabel}</Text>
            </Pressable>
        </View>
    )
}

export default ProxyManagerScreen

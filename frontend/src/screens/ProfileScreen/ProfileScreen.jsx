import { Image, StyleSheet, Text, View, TextInput, Pressable, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import { AuthContext } from '../../contexts/AuthContext'
import placeHolderImage from "../../../assets/profile-picture-avatar.png"
import cameraIcon from "../../../assets/icons/camera-icon.png";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import * as FileSystem from "expo-file-system";
import Urls from '../../constants/Urls'

const ProfileScreen = () => {
  const appContext = useContext(AppContext)
  const authContext = useContext(AuthContext)
  const strings = new Strings(appContext.language)
  const colors = new Colors(appContext.theme)
  const constants = new Constants()
  const [number, setNumber] = useState(authContext.userPhone)
  const [fullName, setFullName] = useState(authContext.userName)
  const [email, setEmail] = useState(authContext.userEmail)
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleSave = async () => {
    const authToken = authContext.authToken;
    let base64Image = null;
    if (selectedImage) {
      base64Image = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
    const urls = new Urls(authContext);
    authToken && axios.put(urls.updateProfileUrl, {
      "avatarUrl": base64Image,
      "username": fullName,
      "email": email,
      "phone": number,
    })
    .then(response=>{
      if (response.data.status =='success'){
        ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
      }
      else{
        throw new Error(`Failed to update: ${response.data.status}`);
      }
    })
    .catch(error=>{
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    })
  }

  const handlePickPicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        ToastAndroid.show("Permission to access gallery is required!", ToastAndroid.SHORT);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
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
    },
    circle1: {
      height: 205,
      width: 124,
      backgroundColor: colors.profileCirlce1,
      top: -157,
      left: 0,
      zIndex: 1,
      borderTopEndRadius: 200,
      borderBottomStartRadius: 200,
      zIndex: 0
    },
    circle2: {
      backgroundColor: colors.profileCirlce2,
      height: 60,
      width: 60,
      top: -99,
      left: 134,
      borderRadius: 100
    },
    circle3: {
      backgroundColor: colors.circle3BackgroundColor,
      height: 285,
      width: 174,
      top: -192,
      left: 204,
      borderTopStartRadius: 200,
      borderBottomRightRadius: 200
    },
    inputGroup: {
      marginVertical: 10,
    },
    inputLabel: {
      color: colors.inputLabelColor,
      fontSize: 16,
      marginVertical: 5,
      fontFamily: 'Alatsi-Regular',
    },
    input: {
      width: 300,
      height: 65,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.inputBackgroundColor,
    },
    nameInput: {
      height: 50,
      borderColor: colors.inputBorderColorName,
      color: colors.inputTextColor,
      fontSize: 17,
      fontFamily: 'Alatsi-Regular',
    },
    emailInput: {
      height: 50,
      borderColor: colors.inputBorderColorEmail,
      color: colors.inputTextColor,
      fontSize: 17,
      fontFamily: 'Alatsi-Regular',
    },
    numberInput: {
      height: 50,
      borderColor: colors.inputBorderColorPassword,
      color: colors.inputTextColor,
      fontSize: 17,
      fontFamily: 'Alatsi-Regular',
    },
    signupButton: {
      width: 248,
      height: 60,
      backgroundColor: colors.signUpButtonBackground,
      borderRadius: 28.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupButtonText: {
      color: colors.signUpButtonTextColor,
      fontSize: 18,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'AverageSans-Regular',
    },
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 0.1,
    },
    centralContainer: {
      flex: 1,
      alignItems: 'center'
    },
    profileContainer: {
      marginTop: 40
    },
    pictureContainer: {
      borderWidth: 9,
      borderColor: colors.appBackgroundColor,
      borderRadius: 100
    },
    pictureContainerText1: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'AverageSans-Regular',
    },
    pictureContainerText2: {
      fontSize: 14,
      textAlign: 'center',
      color: colors.inputLabelColor,
      fontFamily: 'AverageSans-Regular',
    },
    pictureContainerImage: {
      height: 90,
      width: 90,
      borderRadius: 100,
    },
    editSection: {
      marginVertical: 25
    },
    cameraIconImage: {
      height: 11,
      width: 11,
    },
    cameraIconContainer: {
      position: 'absolute',
      padding: 7,
      backgroundColor: colors.appBackgroundColor,
      borderRadius: 100,
      width: 27,
      height: 27,
      justifyContent: 'center',
      alignItems: 'center',
      left: 80,
      top: 70
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      <View style={styles.centralContainer}>
        <Pressable style={({ pressed }) => [styles.profileContainer, pressed && { opacity: 0.6 }, styles.shadow]} onPress={handlePickPicture}>
          <View style={[styles.pictureContainer, styles.shadow]}>
            <Image source={selectedImage ? { uri: selectedImage } : (authContext.userProfilePicture && authContext.userProfilePicture.length > 0 ? { uri: `${authContext.userProfilePicture.includes('https://') ? '' : 'data:image/jpeg;base64,'}${authContext.userProfilePicture}` } : placeHolderImage)} style={styles.pictureContainerImage} />
          </View>
          <View style={[styles.cameraIconContainer, styles.shadow]}>
            <Image style={styles.cameraIconImage} source={cameraIcon}></Image>
          </View>
          <Text style={styles.pictureContainerText1}>{authContext.userName}</Text>
          <Text style={styles.pictureContainerText2}>{strings.profileEditLabel}</Text>
        </Pressable>
        <View style={styles.editSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{strings.fullNameLabel}</Text>
            <TextInput
              style={[styles.input, styles.nameInput]}
              placeholder="Enter your full name"
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{strings.emailLabel}</Text>
            <TextInput
              style={[styles.input, styles.emailInput]}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{strings.inputLabelPhone}</Text>
            <TextInput
              style={[styles.input, styles.numberInput]}
              placeholder="+91 XXXXXXXXXX"
              keyboardType="phone-pad"
              value={number}
              onChangeText={setNumber}
              maxLength={10}
            />
          </View>
        </View>
        <Pressable style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }, styles.shadow]} onPress={handleSave}>
          <Text style={styles.signupButtonText}>{strings.profileSaveLabel}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ProfileScreen

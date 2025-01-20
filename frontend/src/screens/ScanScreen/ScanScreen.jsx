import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import cameraImage from "../../../assets/icons/camera-image.png";
import galleryImage from "../../../assets/icons/gallery-icon.png";
import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import Constants from '../../constants/constants';
import { AppContext } from '../../contexts/AppContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function ScanScreen() {
  const appContext = useContext(AppContext);
  const strings = new Strings(appContext.language);
  const colors = new Colors(appContext.theme);
  const constants = new Constants();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    camera: {
      marginTop: 20,
      flex: 1,
      maxHeight: 500,
      width: 300,
      borderRadius: 10,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    captureContainer: {
      marginTop: 20,
      backgroundColor: colors.secondaryColor,
      padding: 20,
      borderRadius: 100,
    },
    captureContainer2: {
      marginTop: 30,
      backgroundColor: colors.primaryColor,
      padding: 15,
      borderRadius: 100,
      marginBottom: 10,
    },
      
    shadow: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    captureButton: {
      height: 40,
      width: 40,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    buttonContainer2: {
      flexDirection: 'row',
      marginLeft: 120,
      width: 200,
      justifyContent: 'space-between'
    },
    actionButton: {
      backgroundColor: colors.primaryColor,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      marginHorizontal: 20,
      marginTop: 20,
    },
    actionButtonText: {
      color: colors.primaryTextColor,
      fontWeight: 'bold',
    },
    pickButton: {
      height: 30,
      width: 30,
      tintColor: 'white'
    }
  });

  const [permission, requestPermission] = useCameraPermissions();
  const [hasCaptured, setHasCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (permission && permission.granted) {
      requestPermission();
    }
    setHasCaptured(false);
    setCapturedImage(null);
  }, []);
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{strings.scanScreenPermissionRequest}</Text>
        <Button onPress={requestPermission} title={strings.scanScreenPermissionButton} />
      </View>
    );
  }

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        skipProcessing: true,
        quality: 1,
      });
      setCapturedImage(photo.uri);
      setHasCaptured(true);
    }
  };
  const pickImage = async () => {
    try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          ToastAndroid.show(strings.galleryPermissionRequired, ToastAndroid.SHORT);
          return;
        }
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsEditing: true,
        });
  
        if (!result.canceled) {
          setCapturedImage(result.assets[0].uri);
          setHasCaptured(true);
        }
    } catch (error) {
      console.error(error);
    }
  }
  const retryCapture = () => {
    setCapturedImage(null);
    setHasCaptured(false);
  };

  const doneCapture = () => {
    navigation.navigate(constants.bottomTabsRoutes.DASHBOARD_TAB, {
      screen: constants.drawerRoutes.RESULT_SCREEN,
      params: {imageUri: capturedImage.toString()}
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={[styles.circle1, styles.circles]} />
        <View style={[styles.circle2, styles.circles]} />
        <View style={[styles.circle3, styles.circles]} />
      </View>
      {!hasCaptured ? (
        <>
          <CameraView ref={cameraRef} style={[styles.camera, styles.shadow]} facing={'back'} />
          <View style={[styles.buttonContainer2]}>
            <TouchableOpacity style={[styles.captureContainer, styles.shadow]} onPress={captureImage}>
              <Image source={cameraImage} style={styles.captureButton} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.captureContainer2, styles.shadow]} onPress={pickImage}>
              <Image source={galleryImage} style={styles.pickButton} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: capturedImage }} style={[styles.camera, styles.shadow]} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.shadow]} onPress={retryCapture}>
              <Text style={styles.actionButtonText}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.shadow]} onPress={doneCapture}>
              <Text style={styles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

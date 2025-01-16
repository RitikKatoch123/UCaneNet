import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Pressable, TextInput } from 'react-native-gesture-handler';
import splashIconMain from '../../../assets/icons/splash-icon-main.png';
import Strings from '../../constants/strings'
import Colors from '../../constants/colors'
import Constants from '../../constants/constants'
import { AppContext } from '../../contexts/AppContext'
import tractorLogo from '../../../assets/icons/tractor-icon.png';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Urls from '../../constants/Urls';
 
const RatingScreen = () => {
  const appContext = useContext(AppContext)
  const strings = new Strings(appContext.language)
  const colors = new Colors(appContext.theme)
  const constants = new Constants()
  const authContext = useContext(AuthContext);
  const urls = new Urls(authContext);

  const [rating, setRating] = useState(4);
  const [ratingAnnotation, setRatingAnnotation] = useState("");
  const [feedback, setFeedback] = useState('');

  useEffect(()=>{
    setRatingAnnotation(strings.ratingsArray[rating])
  }, [rating])

  const handleSubmit = () => {
    if(feedback==='' || rating<1){
      ToastAndroid.show("Either of rating or feedback field is empty", ToastAndroid.SHORT);
      return;
    }
    axios.put(urls.rateUrl, {
      rated_app: rating.toString(),
      review: feedback
    })
    .then((response) => {
      if(response.data.status=='success'){
        ToastAndroid.show("Thanks for rating us.", ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show(response.data.status, ToastAndroid.SHORT)
      }
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    centralCard: {
      height: 660,
      width: 323,
      alignItems: 'center',
    },
    background: {
      height: 172,
      width: 323,
      backgroundColor: colors.primaryColor,
      borderRadius: 10
    },
    appProfile: {
      borderWidth: 13,
      borderColor: colors.appBackgroundColor,
      borderRadius: 100,
      marginTop: -40
    },
    appProfileImage: {
      height: 60.75,
      width: 62.55,
      padding: 20,
      backgroundColor: colors.primaryColor,
      borderRadius: 40,
    },
    headingT2: {
      textAlign: 'center',
      color: colors.tertiaryColor,
      fontSize: 20,
      fontFamily: 'AverageSans-Regular',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10
    },
    logo: {
      width: 25,
      height: 20,
    },
    website: {
      fontSize: 13,
      color: colors.inputLabelColor,
      fontFamily: 'Alatsi-Regular',
    },
    ratingAnnotation: {
      fontSize: 22,
      color: colors.primaryColor,
      marginTop: 20,
      fontFamily: 'Alatsi-Regular',
    },
    feedbackLabel: {
      fontSize: 18,
      marginBottom: 25,
      fontFamily: 'AverageSans-Regular',
    },
    feedbackInput: {
      height: 101,
      width: 323,
      borderColor: colors.screenOverlayColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 16,
      paddingTop: 20,
      textAlignVertical: 'top',
      fontSize: 16,
      fontFamily: 'Alatsi-Regular',
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
      fontFamily: 'AverageSans-Regular',
    },
    shadow: {
      shadowColor: colors.buttonType1ShadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 0.5,
    },
    ratingShadow: {
      textShadowColor: colors.ratingColor,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 1,
      elevation: 0.5,
    },
    ratingBarContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
  })
  
  return (
    <View style={styles.container}>
      <View style={styles.centralCard}>
        <View style={styles.background} />
        <View style={styles.appProfile}>
          <Image source={splashIconMain} style={styles.appProfileImage} />
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.headingT2}>{constants.logoName1}</Text>
          <Image source={tractorLogo} style={styles.logo} />
          <Text style={styles.headingT2}>{constants.logoName2}</Text>
        </View>
        <Text style={styles.website}>
          {strings.website}
        </Text>
        <Text style={styles.ratingAnnotation}>
          {ratingAnnotation}
        </Text>
        <View style={styles.ratingBarContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Pressable key={index} onPress={() => setRating(index + 1)}>
              <Text style={[{ fontSize: 50, color: index < rating ? colors.ratingColor : colors.ratingLessColor, }, styles.ratingShadow]}>
                {strings.ratingCharacter}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.feedbackLabel}>
          {strings.feedbackLabel}
        </Text>
        <TextInput style={styles.feedbackInput} 
        placeholder={strings.feedbackLabel}
        placeholderTextColor={colors.placeholderColorRating}
          cursorColor={colors.ratingColor}
          value={feedback}
          onChangeText={setFeedback}
        />
        <Pressable style={({ pressed }) => [styles.signupButton, pressed && { opacity: 0.6 }, styles.shadow]} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>{strings.submitText}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RatingScreen

import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import tractorLogo from '../../../../assets/icons/tractor-icon.png';

const AppLogo = ({ constants, colors }) => {
  const styles = StyleSheet.create({
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 25,
      height: 20,
    },
    headingT2: {
      textAlign: 'center',
      color: colors.tertiaryColor,
      fontSize: 20,
    },
  })
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.headingT2}>{constants.logoName1}</Text>
      <Image source={tractorLogo} style={styles.logo} />
      <Text style={styles.headingT2}>{constants.logoName2}</Text>
    </View>
  )
}

export default AppLogo

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NavTitle = ({ title, colors }) => {
    const styles = StyleSheet.create({
        container: {

        },
        titleText: {
            color: colors.tertiaryColor,
            fontFamily: 'Alatsi-Regular',
            fontSize: 16,
            textAlignVertical: 'center'
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

export default NavTitle

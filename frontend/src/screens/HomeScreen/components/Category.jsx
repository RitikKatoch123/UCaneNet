import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

  const Category = ({ onPress, imageSource, text, styles }) => (
    <Pressable style={({ pressed }) => [styles.category, styles.shadow, pressed && styles.pressedCategory]} onPress={onPress}>
      <Image style={styles.categoryImage} source={imageSource} />
      <Text style={styles.categoryText}>{text}</Text>
    </Pressable>
  );

export default Category

const styles = StyleSheet.create({})
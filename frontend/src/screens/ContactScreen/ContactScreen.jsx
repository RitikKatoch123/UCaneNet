import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const ContactScreen = () => {
  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com');yr1s
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Phone:</Text>
        <TouchableOpacity onPress={handleCall}>
          <Text style={styles.contactDetail}>+123 456 7890</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Email:</Text>
        <TouchableOpacity onPress={handleEmail}>
          <Text style={styles.contactDetail}>support@example.com</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Address:</Text>
        <Text style={styles.contactDetail}>123 Example Street, City, Country</Text>
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  contactDetail: {
    fontSize: 16,
    color: '#0066cc',
  },
});

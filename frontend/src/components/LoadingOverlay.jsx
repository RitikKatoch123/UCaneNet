import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";

const LoadingOverlay = ({ isLoading, message = "Loading..." }) => {
    return (
        <Modal
            transparent={true}
            visible={isLoading}
            animationType="fade"
            onRequestClose={() => { }}
        >
            <View style={styles.overlay}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 20,
        borderRadius: 10,
    },
    loadingText: {
        marginTop: 10,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Roboto",
    },
});

export default LoadingOverlay;

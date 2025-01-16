import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const PredictionContainer = ({ result, gradCam, confidence }) => {
    return ( 
        <View style={styles.resultContainer}>
            {result && result.length > 0 ? (
                <> 
                    <Image source={{ uri: `data:image/jpeg;base64,${gradCam}` }} style={styles.image} />
                    <Text style={styles.resultText}>{result}</Text>
                </>
            ) : (
                <Text style={styles.placeholderText}>No prediction available</Text>
            )}
        </View>
    );
};

export default PredictionContainer;

const styles = StyleSheet.create({
    resultContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
        width: width * 0.9,
        alignSelf: "center",
    },
    resultText: {
        fontSize: 18,
        marginTop: 10,
        color: "#333",
        textAlign: "center",
        fontFamily: "Inter18pt-BlackRegular"
    },
    placeholderText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "RobotoExtra-Light"
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 10,
        marginTop: 10,
    },
});

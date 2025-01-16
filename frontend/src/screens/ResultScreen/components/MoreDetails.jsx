import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const MoreDetails = ({ rawDiseaseDetails }) => {
    const [diseaseDetails, setDiseaseDetails] = useState(null);
    const parseDiseaseData = (data) => {
        const parsedData = {
            causes: data?.causes || "N/A",
            cures: data?.cures || "N/A",
            recognition: data?.recognition || "N/A",
            scientificName: data?.scientificName || "N/A",
            affectedPlantName: data?.affectedPlantScientificName || "N/A",
            otherDetails: data?.otherDetails || "N/A",
        };
        setDiseaseDetails(parsedData);
    };

    useEffect(() => {
        parseDiseaseData(JSON.parse(rawDiseaseDetails));
    }, [rawDiseaseDetails]);

    return (
        <View style={styles.container}>
            {diseaseDetails && (
                <>
                    <Text style={styles.sectionTitle}>How to Recognize</Text>
                    <Text style={styles.text}>{diseaseDetails.recognition}</Text>

                    <Text style={styles.sectionTitle}>Causes</Text>
                    <Text style={styles.text}>{diseaseDetails.causes}</Text>

                    <Text style={styles.sectionTitle}>Cures</Text>
                    <Text style={styles.text}>{diseaseDetails.cures}</Text>

                    <Text style={styles.sectionTitle}>Scientific Name</Text>
                    <Text style={styles.text}>{diseaseDetails.scientificName}</Text>

                    <Text style={styles.sectionTitle}>Other Details</Text>
                    <Text style={styles.text}>{diseaseDetails.otherDetails}</Text>
                </>
            )}
        </View>
    );
};

export default MoreDetails;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontFamily: "Manrope-ExtraBold",
        textAlign: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "RobotoCondensed-SemiBold",
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
        color: "#333",
        fontFamily: "Manrope-Regular"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "black",
        fontFamily: "RobotoExtra-Light"
    },
});

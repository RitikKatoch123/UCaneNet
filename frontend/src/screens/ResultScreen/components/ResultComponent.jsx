import { StyleSheet, ScrollView, View, Text, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import PredictionContainer from "./PredictionContainer";
import MoreDetails from "./MoreDetails";
import { AuthContext } from "../../../contexts/AuthContext";
import Urls from "../../../constants/Urls";
import Strings from "../../../constants/strings";
import { AppContext } from "../../../contexts/AppContext";
import { useFocusEffect } from '@react-navigation/core';

const ResultComponent = ({ imageUri }) => {
    const [predictionStatus, setPredictionStatus] = useState(null);
    const [result, setResult] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [gradCam, setGradCam] = useState(null);
    const [rawDiseaseDetails, setRawDiseaseDetails] = useState(null);
    const authContext = useContext(AuthContext);
    const urls = new Urls(authContext);
    const appContext = useContext(AppContext);
    const strings = new Strings(appContext.language);

    const isMounted = useRef(true);
    const pollInterval = useRef(null);

    const fetchResultFromImage = () => {
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            name: "image.jpg",
            type: "image/jpeg",
        });

        axios.post(urls.uploadUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "ngrok-skip-browser-warning": "true",
            },
            params: {
                langid: appContext.language,
            },
        })
            .then((uploadResponse) => {
                const { tracking_id } = uploadResponse.data;
                setPredictionStatus("in_progress");

                pollInterval.current = setInterval(() => {
                    axios.get(`${urls.predictionStatusUrl}/${tracking_id}`)
                        .then((statusResponse) => {
                            const statusData = statusResponse.data;

                            if (statusData.status === "completed") {
                                if (isMounted.current) {
                                    clearInterval(pollInterval.current);
                                    setPredictionStatus("completed");
                                    setResult(statusData.result.result);
                                    setGradCam(statusData.result.grad_cam);
                                    setRawDiseaseDetails(statusData.result.extra_details);
                                    setConfidence(statusData.result.confidence);
                                }
                            } else if (statusData.status === "not_found") {
                                if (isMounted.current) {
                                    clearInterval(pollInterval.current);
                                    setPredictionStatus("not_found");
                                    ToastAndroid.show(strings.predictionNotFound, ToastAndroid.SHORT);
                                }
                            }
                        })
                        .catch((error) => {
                            console.error("Error polling prediction status:", error.message);
                            if (isMounted.current) {
                                clearInterval(pollInterval.current);
                                ToastAndroid.show(strings.errorFetchingResult, ToastAndroid.SHORT);
                            }
                        });
                }, 2000);
            })
            .catch((error) => {
                console.error("Error uploading image:", error.message);
                ToastAndroid.show(strings.errorUploadingImage, ToastAndroid.SHORT);
            });
    };

    useEffect(() => {
        isMounted.current = true;
        fetchResultFromImage();

        return () => {
            isMounted.current = false;
            clearInterval(pollInterval.current);
        };
    }, [imageUri]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                clearInterval(pollInterval.current);
                isMounted.current = false;
            };
        }, [])
    );

    return predictionStatus === null || predictionStatus === "in_progress" ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9fbfff" />
            <Text style={styles.loadingText}>
                {predictionStatus === null ? strings.uploadingImage : strings.processingPrediction}
            </Text>
        </View>
    ) : (
        <ScrollView contentContainerStyle={styles.container}>
            <PredictionContainer
                predictionStatus={predictionStatus}
                result={result}
                gradCam={gradCam}
                confidence={confidence}
            />
            <MoreDetails rawDiseaseDetails={rawDiseaseDetails} strings={strings} />
        </ScrollView>
    );
};

export default ResultComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "black",
        fontFamily: "RobotoExtra-Light",
    },
});

import React, { useState, useRef, useContext } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
    Animated,
} from "react-native";
import downArrow from "../../../../assets/icons/down-arrow2.png";
import { AppContext } from "../../../contexts/AppContext";
import Strings from "../../../constants/strings";
import Colors from "../../../constants/colors";

const Solution = ({ item }) => {
    const [collapsed, setCollapsed] = useState(true);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const appContext = useContext(AppContext);
    const strings = new Strings(appContext.language);
    const colors = new Colors(appContext.theme);
    const toggleCollapse = () => {
        setCollapsed((prev) => !prev);
        Animated.timing(rotateAnim, {
            toValue: collapsed ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["-90deg", "0deg"],
    });
    
    const details = [
        { label: strings.featuresArray[0], value: item.causes },
        { label: strings.featuresArray[1], value: item.cures },
        { label: strings.featuresArray[2], value: item.recognition },
        { label: strings.featuresArray[3], value: item.affectedPlantName },
        { label: strings.featuresArray[4], value: item.otherDetails },
    ];
    const styles = StyleSheet.create({
        container: {
            marginVertical: 10,
            marginHorizontal: 20,
            backgroundColor: colors.appBackgroundColor,
            borderRadius: 20,
            shadowColor: colors.tertiaryColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            padding: 10,
        },
        image: {
            height: 40,
            width: 40,
            borderRadius: 100,
            marginLeft: 19,
            marginVertical: 12,
        },
        solutionTitle: {
            fontSize: 24,
            fontFamily: "RobotoExtra-Light",
        },
        solutionDescription: {
            fontSize: 14,
            marginHorizontal: 22,
            marginBottom: 20,
            fontFamily: "RobotoExtra-Light",
        },
        solutionDescriptionMisc: {
            marginBottom: 0,
            fontFamily: "RobotoCondensed-Regular",
        },
        rowFirst: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        },
        arrow: {
            width: 18,
            height: 12,
            marginRight: 10,
        },
    });
    return (
        <View style={styles.container}>
            <Pressable onPress={toggleCollapse} style={styles.rowFirst}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${item.imageUrl}` }}
                    style={styles.image}
                />
                <Text style={styles.solutionTitle} numberOfLines={1}>
                    {item.name}
                </Text>
                <Animated.Image
                    source={downArrow}
                    style={[styles.arrow, { transform: [{ rotate: rotateInterpolate }] }]}
                />
            </Pressable>
            {!collapsed && (
                <View>
                    {details.map((detail, index) => (
                        <View key={index}>
                            <Text style={[styles.solutionDescription, styles.solutionDescriptionMisc]}>
                                {detail.label}
                            </Text>
                            <Text style={styles.solutionDescription}>{detail.value}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default Solution;



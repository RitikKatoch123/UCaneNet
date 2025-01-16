import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import notificationPlaceHolderImage from '../../../../assets/notif-placeholder-image.png';

const NotificationItem = ({image, title, description, timeStamp}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <Image source={image? image: notificationPlaceHolderImage} style={styles.image} />
            <View style={styles.details}>
                <View style={styles.singleRow}>
                    <Text style={styles.notifTitle} numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                    <Text style={styles.timeStamp}>{timeStamp}</Text>
                </View>
                <TouchableOpacity onPress={toggleDescription}>
                    <Text
                        style={styles.notifDescription}
                        numberOfLines={isExpanded ? undefined : 2}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NotificationItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'flex-start',
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    singleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    notifTitle: {
        fontSize: 13,
        fontFamily: "Rubik-Medium",
        flex: 1,
        marginRight: 10,
    },
    timeStamp: {
        fontSize: 11,
        color: 'gray',
        fontFamily: "Rubik-Medium",
    },
    notifDescription: {
        fontSize: 12,
        color: 'gray',
        fontFamily: "Manrope-Regular",
    },
});

import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { db, auth } from "../../../firebase";
import PropTypes from "prop-types";
import Notification from "../../../components/Notification";

export default function PrivateScreen({ navigation }) {
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        db.collection("privateNotifications")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setNotifications(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
    }, []);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Private!!",
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <ScrollView>
                {notifications?.map(({ id, data }) => {
                    const { title, message, timestamp, user } = data;
                    if (user === auth.currentUser.email) {
                        return (
                            <Notification
                                key={id}
                                id={id}
                                title={title}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                            />
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
}

PrivateScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});

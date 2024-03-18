import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function AboutScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "About Me!!",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "Back",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);
    return (
        <View>
            <StatusBar style="auto" />
            <Text style={styles.main_content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien lacus, maximus et nunc at, dignissim posuere magna. Duis cursus vel sem non mollis. Donec vestibulum purus et arcu tempus, et aliquam erat venenatis. Nulla facilisi. Nulla consectetur est nec porta consequat. Proin quis ligula non neque venenatis suscipit in id lacus. Vivamus eget ullamcorper mauris, at ornare velit. Sed efficitur, orci sed ornare dignissim, elit mauris pellentesque arcu, eu elementum augue orci sed velit. Nullam rutrum nisl ac dolor blandit posuere. Etiam at nulla vel libero placerat posuere eu in urna. Donec maximus, dui eu pharetra molestie, quam erat congue felis, ac sodales leo est vitae ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In commodo mollis varius.
            </Text>
        </View>
    );
}

AboutScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    main_content: {},
});

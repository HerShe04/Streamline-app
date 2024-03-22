import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "About Me!!",
            headerLeft: () => (
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={globalStyles.headerIcon}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <Card>
                    <Card.Title>So you want to know about Me?</Card.Title>
                    <Card.Divider />
                    <Text style={[globalStyles.font, styles.content]}>
                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi assumenda veritatis earum expedita itaque cum hic rerum? Molestias inventore unde recusandae accusantium dolor alias facilis earum aperiam ab? Incidunt, quos.
                    </Text>
                </Card>
            </ScrollView>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: "#594d4c",
    },
});

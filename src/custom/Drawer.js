import React, { useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";

export default function CustomDrawer({ progress, ...props }) {
    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
    const toggleTheme = () => {
        if (darkThemeEnabled) {
            //TODO: Enable Dark Theme
        } else {
             <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList
                        {...props}
                        labelStyle={{ fontSize: 14 }}
                        activeBackgroundColor="#F1F1F1"
                        activeTintColor="#000000"
                        inactiveTintColor="#818181"
                        itemStyle={{
                            marginLeft: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                        }}
                    />
                </Animated.View>
            //TODO: Disable Dark Theme
        }
    };
    return (
        <>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flex: 1 }}
                style={styles.container}
            >
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList
                        {...props}
                        labelStyle={{ fontSize: 14 }}
                        activeBackgroundColor="#F1F1F1"
                        activeTintColor="#000000"
                        inactiveTintColor="#818181"
                        itemStyle={{
                            marginLeft: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                        }}
                    />
                </Animated.View>
            </DrawerContentScrollView>
            <Animated.View style={{ transform: [{ translateX }] }}>
                <Text
                    style={{
                        color: "#818181",
                        marginBottom: 8,
                        alignSelf: "center",
                    }}
                >
                    Style
                </Text>
                <View
                    style={{
                        alignSelf: "center",
                        borderTopWidth: 2,
                        borderTopColor: "#818181",
                    }}
                >
                    <View
                        style={{
                            marginTop: 8,
                            marginBottom: 8,
                            display: "flex",
                            flexDirection: "row",
                            padding: 30,
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}
                    >
                        <Text style={{ color: "#818181" }}>Dark Theme</Text>
                        <View style={{ marginLeft: 70 }}>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#2be317",
                                }}
                                thumbColor="#f4f3f4"
                                a="#3e3e3e"
                                onValueChange={() => {
                                    setDarkThemeEnabled((enable) => !enable);
                                }}
                                onChange={toggleTheme}
                                value={darkThemeEnabled}
                            />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </>
    );
}

CustomDrawer.propTypes = {
    progress: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {},
});

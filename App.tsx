import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import {
    // Platform,
    // InteractionManager,
    useColorScheme,
    LogBox,
} from "react-native";
import { useFonts } from "expo-font";
import { Provider as ReduxProvider } from "react-redux";
import LightTheme from "./src/themes/LightTheme";
import DarkTheme from "./src/themes/DarkTheme";
import reduxStore from "./src/redux/store";
import LoadingIndicator from "./src/components/Loading";
import { auth } from "./src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import registerForPushNotifications from "./src/utils/pushNotification/registerForPushNotification";
import * as Notifications from "expo-notifications";
import errorAlertShower from "./src/utils/alertShowers/errorAlertShower";

// const _setTimeout = global.setTimeout;
// const _clearTimeout = global.clearTimeout;
// const MAX_TIMER_DURATION_MS = 60 * 1000;

// if (Platform.OS === "android") {
//     const timerFix: any = {};
//     const runTask = (id: any, fn: any, ttl: any, args: any) => {
//         const waitingTime = ttl - Date.now();
//         if (waitingTime <= 1) {
//             InteractionManager.runAfterInteractions(() => {
//                 if (!timerFix[id]) {
//                     return;
//                 }
//                 delete timerFix[id];
//                 fn(...args);
//             });
//             return;
//         }

//         const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
//         timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
//     };

//     global.setTimeout = (fn: any, time: any, ...args: any[]) => {
//         if (MAX_TIMER_DURATION_MS < time) {
//             const ttl = Date.now() + time;
//             const id = "_lt_" + Object.keys(timerFix).length;
//             runTask(id, fn, ttl, args);
//             return id;
//         }
//         return _setTimeout(fn, time, ...args);
//     };

//     global.clearTimeout = (id: any) => {
//         if (typeof id === "string" && id.startsWith("_lt_")) {
//             _clearTimeout(timerFix[id]);
//             delete timerFix[id];
//             return;
//         }
//         _clearTimeout(id);
//     };
// }

LogBox.ignoreLogs([
]);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const App = () => {
    const [, userLoading, userError] = useAuthState(auth);
    const scheme = useColorScheme();
    const [fontsLoaded, fontsError] = useFonts({
        OtomanopeeOne: require("./assets/fonts/OtomanopeeOne-Regular.ttf"),
    });
    const [, setExpoPushToken] = useState("");

    useEffect(() => {
        registerForPushNotifications().then((token) => {
            setExpoPushToken(token!);
        });
    }, []);

    if (fontsError || userError) errorAlertShower(fontsError || userError);

    if (!fontsLoaded || userLoading) {
        return (
            <LoadingIndicator
                dimensions={{ width: 70, height: 70 }}
                containerStyle={{ flex: 1 }}
            />
        );
    }

    return (
        <ReduxProvider store={reduxStore}>
            <NavigationContainer
                theme={scheme === "dark" ? DarkTheme : LightTheme}
            >
                <DrawerNavigator />
            </NavigationContainer>
        </ReduxProvider>
    );
};

export default App;

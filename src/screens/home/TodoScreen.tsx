import { useNavigation } from "@react-navigation/native";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    View,
    TouchableOpacity,
    Text,
    useColorScheme,
    Keyboard,
    LayoutRectangle,
} from "react-native";
import { BottomTabStackNavigationProps } from "@/@types/navigation";
import LoadingIndicator from "@components/Loading";
import { auth, db } from "@utils/firebase";
import errorAlertShower from "@utils/alertShowers/errorAlertShower";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "@utils/globalStyles";
import StatusBar from "@components/StatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useHideBottomTab } from "@hooks/useBottomTab";
import Header from "@components/Header";
import { checkAncestoryDoc } from "@utils/checkAncestoryDoc";
import messageAlertShower from "@/src/utils/alertShowers/messageAlertShower";
import { Platform } from "react-native";

const WriteTodo = ({
    type,
    editingTodo,
    setWritingNewTodo,
}: {
    setWritingNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
    type: "create" | "edit";
    editingTodo?: {
        id: string;
        data: DocumentData;
    };
}) => {
    const [todoText, setTodoText] = useState(
        type === "create" ? "" : editingTodo?.data.value
    );
    const [user] = useAuthState(auth);
    const colorScheme = useColorScheme();
    const [writingTodo, setWritingTodo] = useState<boolean>(false);

    const writeTodo = async () => {
        setWritingTodo(true);
        if (type === "create") {
            await checkAncestoryDoc(user!);
            await setDoc(
                doc(
                    db,
                    "users",
                    user?.uid!,
                    "todos",
                    todoText.replaceAll("\n", ";").replaceAll(" ", "_")
                ),
                {
                    value: todoText,
                    timestamp: serverTimestamp(),
                }
            );
        } else if (type === "edit") {
            await deleteDoc(
                doc(db, "users", user?.uid!, "todos", editingTodo?.id!)
            );
            await setDoc(
                doc(
                    db,
                    "users",
                    user?.uid!,
                    "todos",
                    todoText.replaceAll("\n", ";").replaceAll(" ", "_")
                ),
                {
                    value: todoText,
                    timestamp: editingTodo?.data.timestamp,
                }
            );
        }
        setWritingNewTodo(false);
        setWritingTodo(false);
        setTodoText("");
    };

    return (
        <View
            className={`${writingTodo ? "hidden" : ""} mb-5 px-7 ${
                colorScheme == "dark" ? "bg-[#272934]" : "bg-[#fff]"
            } mx-4 rounded-lg p-5 shadow-md`}
        >
            <View className="flex flex-row items-center justify-between">
                <TextInput
                    placeholder={type === "create" ? "Enter Todo" : "Edit Todo"}
                    className={`${
                        colorScheme === "dark"
                            ? "text-[#fff]"
                            : "text-[#000000]"
                    } mr-5 flex-1 text-sm`}
                    placeholderTextColor={"#9CA3AF"}
                    style={globalStyles.font}
                    onChangeText={(e) => setTodoText(e)}
                            <ScrollView className="mt-5" ref={scrollRef}>
                        {todos?.map(({ id, data }, i) => (
                            <Todo
                                id={id}
                                key={id}
                                data={data}
                                setEditingTodo={setEditingTodo}
                                alreadyEditingTodo={
                                    editingTodo || creatingNewTodo
                                }
                                index={i}
                                itemsCoords={itemsCoords}
                                setItemsCoords={setItemCoords}
                                setScrollToIndex={setScrollToIndex}
                            />
                        ))}
                        {creatingNewTodo && (
                            <>
                                <WriteTodo
                                    setWritingNewTodo={setCreatingNewTodo}
                                    type="create"
                                />
                                <View className="mb-2" />
                            </>
                        )}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default TodoScreen;

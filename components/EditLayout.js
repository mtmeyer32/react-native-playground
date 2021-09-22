import React from "react";
import { DraxProvider, DraxView } from "react-native-drax";
import { Text, StyleSheet, View, Pressable } from "react-native";
import TextInputMask from "react-native-text-input-mask";
import { useSelector, useDispatch } from "react-redux";
import { setIp } from "../actions/remoteActions";

export const editLayout = () => {
    let editState = useSelector((state) => state);
    let localIp = editState.remote.ip;

    const dispatch = useDispatch();

    const handleIpChange = (ip) => {
        dispatch(setIp(ip));
    }

    return (
        <View style={styles.container}>
            <Text>Genie IP Address:</Text>
            <TextInputMask
                value={localIp}
                style={styles.input}
                mask={'[099]{.}[099]{.}[099]{.}[099]'}
                onChangeText={(formatted) => {
                    localIp = formatted;
                }}
            />
            <Pressable
                style={[styles.button, , styles.buttonSubmit]}
                onPress={() => handleIpChange(localIp)}
            >
                <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 167,
        backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    channel: {
        height: 100,
        width: 100,
        backgroundColor: "red"
    },
    tvTL: {
        position: "absolute",
        top: 100,
        left: 20,
        width: 200,
        height: 200,
        backgroundColor: "red",
    },
    tvTR: {
        position: "absolute",
        top: 100,
        right: 20,
        width: 200,
        height: 200,
        backgroundColor: "red",
    },
    tvBL: {
        position: "absolute",
        bottom: 187,
        left: 20,
        width: 200,
        height: 200,
        backgroundColor: "red",
    },
    tvBR: {
        position: "absolute",
        bottom: 187,
        right: 20,
        width: 200,
        height: 200,
        backgroundColor: "red",
    },
    tvMid: {
        position: "absolute",
        top: 283,
        left: 547,
        width: 200,
        height: 200,
        backgroundColor: "red",
    },
    settingsIcon: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 68,
        margin: 12
    },
    buttonSubmit: {
        backgroundColor: "#2196F3",
    },
});

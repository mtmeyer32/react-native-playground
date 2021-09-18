import React from "react";
import { DraxProvider } from "react-native-drax";
import { Text, StyleSheet } from "react-native";

export const editLayout = () => {
    return (
        <DraxProvider>
            <View style={styles.container}>
            <DraxView style={styles.tvTL} onDragStart={() => { console.log("start drag") }} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}><Text>{tvState.remote.status[0].zchannel}</Text></DraxView>
            </View>
        </DraxProvider>
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
    }
  });
  
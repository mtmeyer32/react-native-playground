import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initTVs, setIp } from "../actions/remoteActions";
import { View, StyleSheet, Text, Modal, Pressable, KeyboardAvoidingView } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { Icon } from "react-native-elements"
import TextInputMask from 'react-native-text-input-mask';

export const TvLayout = ({ navigation }) => {

  const dispatch = useDispatch();
  let tvState = useSelector((state) => state);

  useEffect(() => {
    console.log("useEffect: ");
    console.log(tvState.remote.ip);
    if (tvState.remote.ip != "") {
      console.log("useEffect if");
      dispatch(initTVs(tvState.remote.ip));
    }
  }, [dispatch]);

  let localIp = "";
  const handleChannelDrop = (channel, tv) => {
    console.log(channel);
  }

  const handleIpChange = (ip) => {
    dispatch(setIp(ip));
  }

  if (tvState.remote.ip === "") {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          visible={true}

          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <KeyboardAvoidingView behavior={"padding"} style={styles.safeAreaView}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Input IP Address:</Text>
                <TextInputMask
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
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    )
  } else {
    console.log("Render:");
    console.log(tvState.remote.ip);
    return (
      <DraxProvider>
        <View style={styles.container}>
          <Icon style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")} reverse name="settings" type="ionicon" color="red" />
          <DraxView style={[styles.tvContainer, styles.tvTL]} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}>
            <Text>{tvState.remote.status[0].zchannel}</Text>
            <Text>{tvState.remote.status[0].zcallsign}</Text>
            <Text>{tvState.remote.status[0].ztitle}</Text>
          </DraxView>
          <DraxView style={[styles.tvContainer, styles.tvTR]} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}>
            <Text>{tvState.remote.status[1].zchannel}</Text>
            <Text>{tvState.remote.status[1].zcallsign}</Text>
            <Text>{tvState.remote.status[1].ztitle}</Text>
          </DraxView>
          <DraxView style={[styles.tvContainer, styles.tvMid]} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}>
            <Text>{tvState.remote.status[3].zchannel}</Text>
            <Text>{tvState.remote.status[3].zcallsign}</Text>
            <Text>{tvState.remote.status[3].ztitle}</Text>
          </DraxView>
          <DraxView style={[styles.tvContainer, styles.tvBL]} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}>
            <Text>{tvState.remote.status[2].zchannel}</Text>
            <Text>{tvState.remote.status[2].zcallsign}</Text>
            <Text>{tvState.remote.status[2].ztitle}</Text>
          </DraxView>
          <DraxView style={[styles.tvContainer, styles.tvBR]} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}>
            <Text>{tvState.remote.status[2].zchannel}</Text>
            <Text>{tvState.remote.status[2].zcallsign}</Text>
            <Text>{tvState.remote.status[2].ztitle}</Text>
          </DraxView>
          <View style={styles.bottom}>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="202">
              <Text>CBS</Text>
              <Text>11</Text>
            </DraxView>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="203">
              <Text>NBC</Text>
              <Text>5</Text>
            </DraxView>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="206">
              <Text>ESPN</Text>
              <Text>206</Text>
            </DraxView>
          </View>
        </View>
      </DraxProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  tvContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  tvTL: {
    position: "absolute",
    top: 100,
    left: 50,
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  tvTR: {
    position: "absolute",
    top: 100,
    right: 50,
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  tvBL: {
    position: "absolute",
    bottom: 187,
    left: 50,
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  tvBR: {
    position: "absolute",
    bottom: 187,
    right: 50,
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
  tvMid: {
    position: "absolute",
    top: 233,
    left: 497,
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
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonSubmit: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

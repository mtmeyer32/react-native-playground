import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getTuned, initTVs, processKey, tune } from "../actions/remoteActions";
import { View, StyleSheet, Text } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import { Icon } from "react-native-elements"

export const TvLayout = ({ navigation }) => {

  const dispatch = useDispatch();
  let tvState = useSelector((state) => state);

  useEffect(() => {
    dispatch(initTVs("192.168.1.33"));
    // dispatch(getLocations("192.168.1.33"))
    //   .then((response) => {
    // console.log("in then");
    // dispatch(getTuned("192.168.1.33", "0"));
    // console.log(response);
    // console.log(tvState.remote.status);
    // });
    // console.log("After then.");
    // console.log(tvState.remote.status);
  }, [dispatch]);

  const handleChannelDrop = (channel, tv) => {
    console.log(channel);
  }

  if (tvState.remote.rawLocations.length === 0) {
    return <View style={styles.container}></View>;
  } else {
    console.log("Render:");
    console.log(tvState.remote.status);
    return (
      <DraxProvider>
        <View style={styles.container}>
          <Icon style={styles.settingsIcon} onPress={() => navigation.navigate("Edit")} reverse name="settings" type="ionicon" color="red" />
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
  }
});

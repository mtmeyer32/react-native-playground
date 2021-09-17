import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getTuned, processKey, tune } from "../actions/remoteActions";
import { View, StyleSheet, Text } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";

export const TvLayout = () => {
  const dispatch = useDispatch();
  let tvState = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLocations("192.168.1.33"));
    // dispatch(tune("192.168.1.33", "10", "B42A0E5118AE"));
    // tvState.remote.status.forEach(tv => dispatch(getTuned("192.168.1.33", tv.clientAddr)));
    dispatch(getTuned("192.168.1.33", "B42A0E5118AE"));
    // dispatch(processKey("192.168.1.33", "poweron", "keyPress","B42A0E5118AE"));
    
    //dispatch(getTuned("192.168.1.33", "B42A0E5118AE"));
  }, [dispatch]);

  const handleChannelDrop = (channel, tv) => {
    console.log(channel);
  }

  if (tvState.remote.rawLocations.length === 0) {
    return <View style={styles.container}></View>;
  } else {
      console.log("in tvlayout");
      console.log(tvState.remote.status);
    return (
      <DraxProvider>
        <View style={styles.container}>
          <DraxView style={styles.tvTL} onReceiveDragEnter={({ dragged: { payload } }) => { handleChannelDrop(payload) }}><Text>{tvState.remote.status[0].zchannel}</Text></DraxView>
          <Text style={styles.tvTR}>{tvState.remote.status[1].zchannel}</Text>
          <Text style={styles.tvMid}>{tvState.remote.status[2].zchannel}</Text>
          <Text style={styles.tvBL}>{tvState.remote.status[3].zchannel}</Text>
          <Text style={styles.tvBR}>{tvState.remote.rawLocations[3].locationName}</Text>
          <View style={styles.bottom}>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="202"><Text>CBS</Text></DraxView>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="203"><Text>NBC</Text></DraxView>
            <DraxView style={styles.channel} onDragStart={() => { console.log("start drag") }} payload="206"><Text>ESPN</Text></DraxView>
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
    alignItems: "center",
    justifyContent: "center",
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
    top: 20,
    left: 20,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  tvTR: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  tvBL: {
    position: "absolute",
    bottom: 187,
    left: 20,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  tvBR: {
    position: "absolute",
    bottom: 187,
    right: 20,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  tvMid: {
    position: "absolute",
    top: 283,
    left: 547,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});

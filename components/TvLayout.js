import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getTuned } from "../actions/remoteActions";
import { View, StyleSheet, Text } from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";

export const TvLayout = () => {
  const dispatch = useDispatch();
  let tvState = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLocations("192.168.1.33")); 
    //dispatch(getTuned("192.168.1.33", "0"));
  }, [dispatch]);

  if (tvState.remote.rawLocations.length === 0) {
    return <View style={styles.container}></View>;
  } else {
    // console.log("in tvlayout");
    console.log(tvState.remote.status);
    return (
      <DraxProvider>
        <View style={styles.container}>
          <DraxView style={styles.tvTL} onReceiveDragEnter={({ dragged: { payload } }) => { console.log(payload); }}><Text>{tvState.remote.rawLocations[0].locationName}</Text></DraxView>
          <Text style={styles.tvTR}>{tvState.remote.rawLocations[1].locationName}</Text>
          <Text style={styles.tvMid}>{tvState.remote.rawLocations[2].locationName}</Text>
          <Text style={styles.tvBL}>{tvState.remote.rawLocations[3].locationName}</Text>
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

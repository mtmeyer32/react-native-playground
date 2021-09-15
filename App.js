// import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { AppRegistry } from "react-native";
//import { Provider as PaperProvider } from "react-native-paper";
//import { Appbar } from "react-native-paper";
import { Provider } from "react-redux";

import { TvLayout } from "./components/TvLayout";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <TvLayout />
    </Provider>
  );
}

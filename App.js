// import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StyleSheet, Text, View } from "react-native";
// import { AppRegistry } from "react-native";
//import { Provider as PaperProvider } from "react-native-paper";
//import { Appbar } from "react-native-paper";
import { Provider } from "react-redux";

import { TvLayout } from "./components/TvLayout";
import { editLayout } from "./components/EditLayout";
import { store } from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const ref = React.useRef(null);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Remote">
          <Stack.Screen name="Remote" component={TvLayout} />
          <Stack.Screen name="Settings" component={editLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

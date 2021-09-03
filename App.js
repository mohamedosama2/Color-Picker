import React from "react";
import { StyleSheet, View } from "react-native";
import ColorPicker from "./ColorPicker";

export default function App() {
  return (
    <View style={styles.container}>
      <ColorPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

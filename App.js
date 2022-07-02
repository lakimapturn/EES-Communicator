import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import { useFonts } from "expo-font";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import CustomText from "./src/components/custom/Text";
import StackNavigator from "./src/navigation/StackNavigator";
import { useEffect } from "react";

const theme = extendTheme({
  fonts: {
    heading: "Sora",
    body: "Sora",
    mono: "Sora",
  },
});

export default function App() {
  const [loaded] = useFonts({
    Sora: require("./assets/fonts/Sora.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StackNavigator />
    </NativeBaseProvider>
  );
}

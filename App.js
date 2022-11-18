import { useFonts } from "expo-font";
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import { NativeBaseProvider } from "native-base";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import StackNavigator from "./src/navigation/StackNavigator";
import userReducer from "./src/store/reducers/userReducer";
import { Provider } from "react-redux";
import postReducer from "./src/store/reducers/postReducer";
import AnimatedSplash from "react-native-animated-splash-screen";
import { useEffect, useRef, useState } from "react";
import examReducer from "./src/store/reducers/examReducer";
import { registerForPushNotificationsAsync } from "./src/constants/notifications";
import { Linking, Text, View } from "react-native";

const appReducer = {
  user: userReducer,
  post: postReducer,
  exam: examReducer,
};

const store = configureStore(
  { reducer: appReducer },
  applyMiddleware(ReduxThunk)
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // App Loaded State
  const [appLoaded, setAppLoaded] = useState(false);

  // Notification variables
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // try expo-google-fonts
  const [loaded] = useFonts({
    Sora: Sora_400Regular,
    SoraLight: Sora_300Light,
    SoraBold: Sora_700Bold,
  });

  setTimeout(() => setAppLoaded(true), 1000);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((err) => console.log("remove user's device"));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("Received!", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("something" + response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (lastNotificationResponse) {
      Linking.openURL(
        lastNotificationResponse.notification.request.content.data.url
      );
    }
  }, [lastNotificationResponse]);

  if (!loaded) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={appLoaded}
      logoImage={require("./assets/EES-Logo.png")}
      backgroundColor={"#36454F"}
      logoHeight={350}
      logoWidth={350}
    >
      <NativeBaseProvider>
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      </NativeBaseProvider>
    </AnimatedSplash>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);

    await AsyncStorage.setItem("enabledNotifications", JSON.stringify(true));
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export const setNotifications = async (token) => {
  try {
    const jsonValue = await AsyncStorage.getItem("enabledNotifications");
    const notificationsAreEnabled = JSON.parse(jsonValue);

    const data = {
      device_id: token,
    };

    await AsyncStorage.setItem(
      "enabledNotifications",
      JSON.stringify(!notificationsAreEnabled)
    );

    const response = await fetch(
      "http://localhost/communicator-api/api/notifications.php",
      {
        method: notificationsAreEnabled ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Something Went Wrong, Please Try Again Later!");
  }
};

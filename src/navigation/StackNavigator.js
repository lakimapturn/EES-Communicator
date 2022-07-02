import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Attendance from "../screens/Attendance";
import Post from "../screens/Post";
import PostsList from "../screens/PostsList";
import SubjectsList from "../screens/SubjectsList";
import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.titleStyle,
        cardStyle: { backgroundColor: colors.white },
        headerBackgroundContainerStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen
        name="Post"
        component={Post}
        options={({ route }) => ({
          title: route.params.data.title,
        })}
      />
      <Stack.Screen name="Posts" component={PostsList} />
      <Stack.Screen name="Subjects" component={SubjectsList} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.black,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  titleStyle: {
    fontFamily: "Sora",
    fontWeight: "bold",
    fontSize: 26,
    color: colors.white,
  },
});

export default StackNavigator;

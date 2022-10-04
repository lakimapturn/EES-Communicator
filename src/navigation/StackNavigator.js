import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Icon, IconButton } from "native-base";
import Ionicon from "react-native-vector-icons/Ionicons";

import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Attendance from "../screens/Attendance";
import colors from "../constants/Colors";
import SubjectsList from "../screens/SubjectsList";
import PostsList from "../screens/PostsList";
import Post from "../screens/Post";
import AssessmentReport from "../screens/AssessmentReport";
import AssessmentsList from "../screens/AssessmentsList";
import Settings from "../screens/Settings";
import ErrorScreen from "../screens/Error";
import { navigationRef } from "../constants/navigation";
import AttachmentScreen from "../screens/Attachment";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer ref={navigationRef}>
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
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon={
                <Icon
                  size={7}
                  color={colors.white}
                  as={Ionicon}
                  name="ios-cog-outline"
                />
              }
              marginRight="3.5"
              borderRadius="full"
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          ),
        })}
      />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Subjects" component={SubjectsList} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="Assessments" component={AssessmentsList} />
      <Stack.Screen
        options={({ route }) => ({
          title: route.params.title,
        })}
        name="Assessment Report"
        component={AssessmentReport}
      />

      <Stack.Screen
        name="Posts"
        component={PostsList}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="Post" component={Post} />

      <Stack.Screen name="Error" component={ErrorScreen} />
      <Stack.Screen name="Attachment" component={AttachmentScreen} />
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
    fontSize: 22,
    color: colors.white,
  },
});

export default StackNavigator;

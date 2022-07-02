import { Button, Icon, Input, View } from "native-base";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import Octicon from "react-native-vector-icons/Octicons";
import CustomText from "../components/custom/Text";

import colors from "../constants/Colors";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onChangeUsernameHandler = (text) => {
    setUsername(text);
  };

  const onChangePasswordHandler = (text) => {
    setPassword(text);
  };

  const login = () => {
    setUsername();
    setPassword();
    props.navigation.replace("Dashboard");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {!isKeyboardVisible && (
        <View alignSelf="center" marginTop="8" marginBottom="3">
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/EES-Logo.jpg")}
          />
        </View>
      )}
      <View marginY="4">
        <Card style={styles.inputContainer}>
          <Input
            marginY="2"
            variant="filled"
            placeholder="Username"
            selectionColor={colors.blue}
            autoCapitalize={false}
            fontSize="sm"
            backgroundColor={colors.white}
            borderBottomWidth="3"
            value={username}
            onChangeText={(text) => onChangeUsernameHandler(text)}
            type="text"
            InputLeftElement={
              <Icon
                as={<Octicon name="person" />}
                size={6}
                ml="2"
                color={colors.blue}
              />
            }
          />
          <Input
            marginY="2"
            variant="filled"
            placeholder="Password"
            selectionColor={colors.blue}
            fontSize="sm"
            backgroundColor={colors.white}
            borderBottomWidth="3"
            value={password}
            onChangeText={(text) => onChangePasswordHandler(text)}
            type="password"
            InputLeftElement={
              <Icon
                as={<Octicon name="key" />}
                size={6}
                ml="2"
                color={colors.blue}
              />
            }
          />
          <Button
            marginTop="3"
            borderRadius="full"
            alignSelf="center"
            bg={colors.green}
            onPress={login}
          >
            <CustomText color={colors.white} paddingX="5">
              Login
            </CustomText>
          </Button>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    alignSelf: "center",
    paddingHorizontal: "6%",
    paddingVertical: "14%",
    width: "70%",
    borderRadius: 20,
    backgroundColor: colors.navy,
  },
});

export default Login;

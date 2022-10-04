import { Button, Icon, Input, View } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";

import Container from "../components/Container";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import { authenticate, syncData } from "../store/actions/userActions";
import { screens } from "../constants/navigation";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [error, setError] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("session")
      .then((jsonValue) => {
        if (jsonValue !== null) {
          dispatch(syncData(jsonValue));
          props.navigation.replace(screens.dashboard);
        }
      })
      .catch((err) =>
        setError("Something went wrong while trying to sign you in!")
      );
  }, []);

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

  const onChangeEmailHandler = (text) => {
    setEmail(text);
    if (email.length < 2) isButtonDisabledHandler();
  };

  const onChangePasswordHandler = (text) => {
    setPassword(text);
    if (password.length < 2) isButtonDisabledHandler();
    isButtonDisabledHandler();
  };

  const isButtonDisabledHandler = () => {
    setIsButtonDisabled(email === "" || password === "");
  };

  const login = async () => {
    setShowLoading(true);
    try {
      await dispatch(authenticate(email, password));
      props.navigation.replace(screens.dashboard);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Invalid Credentials!");
      setShowLoading(false);
    }
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
        <Container color={colors.navy} style={styles.inputContainer}>
          {error !== "" && (
            <CustomText style={{ textAlign: "center" }} color={colors.white}>
              {error}
            </CustomText>
          )}
          <Input
            marginY="2"
            paddingY="2"
            variant="filled"
            placeholder="Email"
            selectionColor={colors.blue}
            autoCapitalize="none"
            fontSize="sm"
            backgroundColor={colors.white}
            borderBottomWidth="3"
            borderColor={colors.navy}
            value={email}
            onChangeText={(text) => onChangeEmailHandler(text)}
            type="text"
            InputLeftElement={
              <Icon
                as={<FontAwesome5Icon name="at" />}
                size={5}
                ml="2"
                color={colors.blue}
              />
            }
          />
          <Input
            marginY="2"
            paddingY="2"
            variant="filled"
            placeholder="Password"
            autoCapitalize="none"
            selectionColor={colors.blue}
            fontSize="sm"
            backgroundColor={colors.white}
            borderColor={colors.navy}
            borderBottomWidth="3"
            value={password}
            onChangeText={(text) => onChangePasswordHandler(text)}
            type="password"
            InputLeftElement={
              <Icon
                as={<FontAwesome5Icon name="key" />}
                size={5}
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
            shadow={8}
            style={{ shadowColor: "#fff" }}
            disabled={isButtonDisabled}
            opacity={isButtonDisabled ? "0.5" : "1"}
          >
            {showLoading ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <CustomText color={colors.white} paddingX="5">
                Login
              </CustomText>
            )}
          </Button>
        </Container>
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
  },
});

export default Login;

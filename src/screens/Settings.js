import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Divider,
  Icon,
  Modal,
  Popover,
  Switch,
  TextArea,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { List } from "react-native-paper";
import { useDispatch } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";

import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import {
  registerForPushNotificationsAsync,
  setNotifications,
} from "../constants/notifications";
import { logoutUser } from "../store/actions/userActions";
import { screens } from "../constants/navigation";

const Settings = (props) => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // setPushNotifications(
    //   AsyncStorage.getItem("enabledNotifications").then((jsonValue) =>
    //     JSON.parse(jsonValue)
    //   )
    // );
    setLoading(false);
  }, []);

  const turnOnPushNotifications = () => {
    // setNotifications();
  };

  const logout = async () => {
    try {
      dispatch(logoutUser());
      // setErrorMsg("Something");
      props.navigation.reset({
        index: 0,
        routes: [{ name: screens.login }],
      });
    } catch (err) {
      setErrorMsg(err);
    }
  };

  const submitFeedback = () => {};

  return (
    <>
      {/* {error !== "" && (
        <Alert status="error">
          <View>
            <CustomText>{error}</CustomText>
          </View>
        </Alert>
      )} */}
      <VStack flex={1} paddingX="4" paddingY="3" justifyContent="space-between">
        <View>
          <List.Section>
            <CustomText fontSize={18}>Notifications</CustomText>
            <List.Item
              title="Push Notifications"
              titleStyle={{ fontFamily: "Sora", fontSize: 14 }}
              right={() => (
                // <Switch
                //   size="md"
                //   value={pushNotifications}
                //   onToggle={() => registerForPushNotificationsAsync()}
                // />
                <Popover
                  isOpen={pushNotifications}
                  placement="left"
                  trigger={(triggerProps) => (
                    <Button
                      variant="outline"
                      {...triggerProps}
                      onPress={() =>
                        setPushNotifications((prevState) => !prevState)
                      }
                      borderRadius="full"
                      startIcon={
                        <Icon
                          as={Ionicon}
                          name="information"
                          size="lg"
                          color="coolGray.500"
                        />
                      }
                      padding="0"
                    ></Button>
                  )}
                >
                  <Popover.Content
                    w="48"
                    bgColor={colors.black}
                    accessibilityLabel="Filter Posts"
                  >
                    <Popover.CloseButton
                      onPress={() => setPushNotifications(false)}
                    />
                    <Popover.Body>
                      Turn on/off Push Notifications from the settings app!
                    </Popover.Body>
                  </Popover.Content>
                </Popover>
              )}
            />
          </List.Section>
          <Divider borderRadius="full" thickness="1.5" />
          <List.Section>
            <CustomText fontSize={18}>Suggestions/Feedback</CustomText>
            <Button marginY="3" onPress={() => setModalVisible(true)}>
              <CustomText color={colors.white}>
                Have any suggestions or feedback?
              </CustomText>
            </Button>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>
                  <CustomText>Suggestions/Feedback form</CustomText>
                </Modal.Header>
                <Modal.Body>
                  <TextArea />
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      backgroundColor={colors.blue}
                    >
                      Submit
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </List.Section>
        </View>

        <List.Section>
          <Button colorScheme="secondary" onPress={logout}>
            <CustomText color={colors.white}>Logout</CustomText>
          </Button>
        </List.Section>
      </VStack>
    </>
  );
};

export default Settings;

import { HStack, Icon, VStack } from "native-base";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import Container from "./Container";
import CustomText from "./custom/Text";
import colors from "../constants/Colors";

const ActionButton = (props) => {
  return (
    <Container padding="0" color={props.bg} style={styles.container}>
      <TouchableHighlight
        underlayColor="#ffffff20"
        style={styles.touchableContainer}
        onPress={props.onPress}
      >
        <VStack
          paddingTop={3}
          alignItems={"center"}
          justifyContent="space-between"
        >
          {props.icon && (
            <HStack>
              <Icon
                as={props.icon.as}
                name={props.icon.name}
                size={props.icon.size ? props.icon.size : 10}
                ml="2"
                color={props.icon.color ? props.icon.color : colors.white}
              />
            </HStack>
          )}

          <HStack marginY={0.5}>
            <CustomText
              color={props.text.color ? props.text.color : colors.white}
              textAlign="center"
              style={[
                styles.actionButtonText,
                {
                  fontSize: props.text.size ? props.text.size : 16,
                  lineHeight: props.text.size ? props.text.size + 4 : 20,
                },
              ]}
            >
              {props.text.text}
            </CustomText>
          </HStack>
          {props.showViewButton && (
            <HStack alignItems="center">
              <CustomText
                underline
                italic
                color={colors.white}
                style={[styles.actionButtonText, { fontSize: 12 }]}
              >
                View
              </CustomText>
              <CustomText color={colors.white}>{" >"}</CustomText>
            </HStack>
          )}
        </VStack>
      </TouchableHighlight>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { width: "45%" },
  touchableContainer: {
    padding: "12%",
  },
});

export default ActionButton;

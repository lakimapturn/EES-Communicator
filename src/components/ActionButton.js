import { HStack, Icon } from "native-base";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";

import Container from "./Container";
import CustomText from "./custom/Text";
import colors from "../constants/Colors";

const ActionButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.touchableContainer}
      onPress={props.onPress}
    >
      <Container color={props.bg} style={styles.actionButton}>
        <HStack>
          <Icon
            as={props.icon.as}
            name={props.icon.name}
            size={props.icon.size ? props.icon.size : 10}
            ml="2"
            color={colors.white}
          />
        </HStack>
        <HStack marginY={0.5}>
          <CustomText
            color={colors.white}
            style={[styles.actionButtonText, { fontSize: 16 }]}
          >
            {props.text}
          </CustomText>
        </HStack>
        <HStack alignItems="center">
          <CustomText
            underline
            italic
            color={colors.white}
            style={[styles.actionButtonText, { fontSize: 12 }]}
          >
            View
          </CustomText>
          <Icon
            as={<EntypoIcon name="chevron-small-right" />}
            size={4}
            color={colors.white}
          />
        </HStack>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    paddingTop: "20%",
    alignItems: "center",
  },
  touchableContainer: {
    width: "45%",
  },
});

export default ActionButton;

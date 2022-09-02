import { Box, View } from "native-base";
import { StyleSheet } from "react-native";
import colors from "../constants/Colors";

const Container = (props) => {
  return (
    <View
      shadow={props.shadow ? props.shadow : 0}
      padding={props.padding ? props.padding : 4}
      borderRadius={props.borderRadius ? props.borderRadius : "3xl"}
      bg={props.color ? props.color : "blue.100"}
      style={[{ ...props.style }, styles.container]}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
  },
});

export default Container;

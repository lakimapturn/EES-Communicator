import { Text } from "native-base";
import { StyleSheet } from "react-native";

const CustomText = (props) => {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        props.style,
        {
          color: props.color,
          textDecorationLine: props.underline && "underline",
          fontWeight: props.bold && "bold",
          fontStyle: props.italic && "italic",
        },
      ]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Sora",
  },
});

export default CustomText;

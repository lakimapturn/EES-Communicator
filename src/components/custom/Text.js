import { Text } from "native-base";
import { StyleSheet } from "react-native";

const CustomText = (props) => {
  let font = "Sora";
  if (props.light) font = "SoraLight";
  else if (props.bold) font = "SoraBold";

  return (
    <Text
      {...props}
      bold={false}
      style={[
        styles.text,
        props.style,
        {
          color: props.color,
          textDecorationLine: props.underline && "underline",
          fontFamily: font,
          // fontStyle: props.italic && "italic",
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

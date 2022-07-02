import { StyleSheet, View } from "react-native";

const Container = (props) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.color, ...props.style },
      ]}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: "5%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default Container;

import { ActivityIndicator, View } from "react-native";
import colors from "../constants/Colors";
import CustomText from "./custom/Text";

const Loading = (props) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={colors.navy} />
    <CustomText>{props.text ? props.text : "Loading..."}</CustomText>
  </View>
);

export default Loading;

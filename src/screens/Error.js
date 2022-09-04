import { VStack } from "native-base";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";

const width = Dimensions.get("window").width - 100;

const ErrorScreen = (props) => {
  const onPressReturn = () => {
    props.navigation.popToTop();
  };

  const message = props.route.params.message;

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space={4}>
      <Image
        source={require("../../assets/EES-Logo.jpg")}
        style={{ width, height: width }}
      />
      <CustomText fontSize={36} bold>
        500 - Server Error!
      </CustomText>
      <View style={{ alignItems: "center" }}>
        <CustomText fontSize={18}>
          {message ? message : "Oops! Something Went Wrong..."}
        </CustomText>
        <CustomText fontSize={18}>Please Try Again Later</CustomText>
      </View>

      <Button
        icon="home"
        mode="text"
        color={colors.green}
        onPress={onPressReturn}
        uppercase={false}
        compact
        style={{ borderColor: colors.green, borderWidth: 1 }}
      >
        <CustomText color={colors.green}>Home Page</CustomText>
      </Button>
    </VStack>
  );
};

export default ErrorScreen;

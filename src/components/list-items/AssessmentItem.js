import { HStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import colors from "../../constants/Colors";
import Container from "../Container";
import CustomText from "../custom/Text";

const AssessmentItem = (props) => {
  return (
    <TouchableOpacity
      style={{ marginVertical: "3.5%" }}
      onPress={() => props.onPressHandler(props.assessment.examname)}
      activeOpacity={0.7}
    >
      <Container color={colors.navy}>
        <HStack justifyContent="space-between" paddingX={4} alignItems="center">
          <CustomText style={{ fontSize: 18 }} color={colors.white}>
            {props.assessment.examname}
          </CustomText>
          <Icon
            as={FeatherIcon}
            name="chevron-right"
            size={8}
            color={colors.white}
          />
        </HStack>
      </Container>
    </TouchableOpacity>
  );
};

export default AssessmentItem;

import { HStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import colors from "../../constants/Colors";
import Container from "../Container";
import CustomText from "../custom/Text";

const SubjectItem = (props) => {
  return (
    <TouchableOpacity
      key={props.subject.id}
      style={{ marginVertical: "3.5%" }}
      onPress={() => props.onPressHandler(props.subject)}
      activeOpacity={0.7}
    >
      <Container color={colors.navy}>
        <HStack justifyContent="space-between" paddingX={4} alignItems="center">
          <Icon as={FeatherIcon} name="folder" size={8} color={colors.white} />
          <CustomText style={{ fontSize: 18 }} color={colors.white}>
            {props.subject.subject_name}
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

export default SubjectItem;

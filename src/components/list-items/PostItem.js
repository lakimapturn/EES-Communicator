import { Avatar, HStack, Icon, VStack } from "native-base";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import colors from "../../constants/Colors";
import Container from "../Container";
import CustomText from "../custom/Text";

const PostItem = (props) => {
  const [loading, setLoading] = useState(false);

  // Check on Papa's Iphone if u need this function
  const onPostPressedHandler = () => {
    setLoading(true);
    props.onPressHandler(props.post.id);
    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={onPostPressedHandler}
      style={{ marginBottom: "6%" }}
      activeOpacity={0.7}
    >
      <Container color={colors.navy}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <HStack justifyContent="space-around">
            <VStack space={1} maxWidth="56">
              <HStack alignItems="center" space={1}>
                <Avatar
                  bg="cyan.500"
                  source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                  size="sm"
                >
                  Laksh Makhija
                  {/* props.post.post_teacher.name full name */}
                </Avatar>
                <CustomText
                  bold
                  color={colors.white}
                  fontSize={15}
                  numberOfLines={1}
                >
                  {props.post.post_title}
                </CustomText>
              </HStack>

              <CustomText
                color={colors.white}
                light
                fontSize={13}
                numberOfLines={1}
              >
                {props.post.post_content}
              </CustomText>

              <CustomText light color={colors.white} fontSize={10}>
                {props.post.post_date}
              </CustomText>
            </VStack>
            <VStack justifyContent="center">
              <Icon
                as={FeatherIcon}
                name="chevron-right"
                size={8}
                color={colors.white}
              />
            </VStack>
          </HStack>
        )}
      </Container>
    </TouchableOpacity>
  );
};

export default PostItem;

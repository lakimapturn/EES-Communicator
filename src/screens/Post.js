import { Badge, Divider, HStack, Skeleton, VStack } from "native-base";
import { ScrollView, useWindowDimensions, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { List } from "react-native-paper";
import RenderHTML from "react-native-render-html";

import ActionButton from "../components/ActionButton";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { screens } from "../constants/navigation";

const exampleData = ["Grade 11", "Grade 12", "Subject"];

const Post = (props) => {
  const { width } = useWindowDimensions();

  const post = useSelector((state) =>
    state.post.posts.find((post) => post.id === props.route.params.id)
  );

  const renderAttach = () => {
    const attachments = [];
    for (let i = 1; i <= 3; i++) {
      if (post[`post_attachment${i}`])
        attachments.push({
          attachment: post[`post_attachment${i}`],
          name: post[`post_attachment${i}_name`],
        });
    }

    if (attachments.length === 0) return null;
    return (
      <>
        {attachments.map((attachment) => {
          const uri = attachment.attachment.toString();
          return (
            <List.Item
              key={uri}
              title={attachment.name}
              titleStyle={{ fontFamily: "SoraLight" }}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="file-powerpoint-outline"
                  color={colors.red}
                />
              )}
              onPress={() =>
                props.navigation.navigate(screens.attachment, { uri: uri })
              }
            />
          );
        })}
      </>
    );
  };

  const renderAttachments = (attachment) => (
    <>
      <ActionButton
        bg={colors.white}
        icon={{
          as: MaterialCommunityIcons,
          name: "microsoft-powerpoint",
          color: colors.red,
        }}
        text={{ text: "attachment.ppt", color: colors.black, size: 10 }}
      />

      <View style={{ width: "4%" }} />
    </>
  );

  return (
    <View style={{ flex: 1, marginBottom: "8%" }}>
      <ScrollView
        style={{ marginHorizontal: "4%" }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={2} marginTop="4">
          <CustomText fontSize={24} bold>
            {post.post_title}
          </CustomText>

          <View>
            <HStack space={2}>
              <Badge backgroundColor={colors.blue} borderRadius="full">
                <CustomText fontSize={11} color={colors.white}>
                  {post.subject_code_name}
                </CustomText>
              </Badge>
            </HStack>

            <HStack justifyContent={"flex-end"}>
              <CustomText fontSize={16}>Teacher</CustomText>
            </HStack>
          </View>
        </VStack>

        <Divider
          marginY={3}
          borderRadius="full"
          thickness="2.5"
          backgroundColor={colors.black}
        />

        <VStack space={2}>
          <CustomText fontSize={20} bold underline>
            Description
          </CustomText>

          <RenderHTML
            contentWidth={width}
            ignoredDomTags={["o:p"]}
            source={{ html: post.post_content }}
          />
        </VStack>

        <Divider
          marginY={3}
          borderRadius="full"
          thickness="2.5"
          backgroundColor={colors.black}
        />

        {renderAttach() && (
          <>
            <VStack space={3}>
              <CustomText fontSize={20} bold underline>
                Attachments
              </CustomText>
              {renderAttach()}
            </VStack>

            <Divider
              marginY={3}
              borderRadius="full"
              thickness="2.5"
              backgroundColor={colors.black}
            />
          </>
        )}

        <VStack alignItems="center" paddingBottom={2}>
          <CustomText>{post.post_date}</CustomText>
        </VStack>
      </ScrollView>

      {/* <VStack
        padding={3}
        style={{ bottom: -5 }}
        borderTopRadius={10}
        borderWidth="1"
        borderColor={colors.black}
        space={3}
        bg={colors.black}
      >
        <CustomText color={colors.white} fontSize={20} bold underline>
          Attachments
        </CustomText>

        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: "2%", width: "100%" }}
        >
          <ActionButton
            bg={colors.white}
            icon={{
              as: MaterialCommunityIcons,
              name: "microsoft-powerpoint",
              color: colors.red,
            }}
            text={{ text: "attachment.ppt", color: colors.black, size: 10 }}
          />

          <View style={{ width: "4%" }} />

          <ActionButton
            bg={colors.white}
            icon={{
              as: FontAwesome,
              name: "file-pdf-o",
              color: colors.red,
              size: 8,
            }}
            text={{ text: "attachment.pdf", color: colors.black, size: 10 }}
          />

          <View style={{ width: "4%" }} />

          <ActionButton
            bg={colors.white}
            icon={{
              as: FontAwesome,
              name: "file-pdf-o",
              color: colors.red,
              size: 8,
            }}
            text={{ text: "attachment.pdf", color: colors.black, size: 10 }}
          />
        </ScrollView>
      </VStack> */}
    </View>
  );
};

export default Post;

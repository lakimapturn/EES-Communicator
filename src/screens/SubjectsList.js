import { Button, HStack, Icon, Popover, VStack } from "native-base";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomText from "../components/custom/Text";
import SubjectItem from "../components/list-items/SubjectItem";
import Loading from "../components/Loading";
import colors from "../constants/Colors";
import { fetchSubjects } from "../store/actions/postActions";
import { screens } from "../constants/navigation";

const SubjectsList = (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const subjects = useSelector((state) => state.post.subjects);
  const isDataFetching = useSelector((state) => state.post.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("session")
      .then((jsonValue) => JSON.parse(jsonValue))
      .then((user) => {
        dispatch(fetchSubjects(user.id));
      })
      .catch((err) => console.log("Error: " + err));
  }, []);

  const onPressSubject = (subject) => {
    props.navigation.navigate(screens.postsList, {
      title: subject,
    });
  };

  const renderItem = ({ item }) => (
    <SubjectItem
      subject={item}
      onPressHandler={(subject) => onPressSubject(subject.subject_name)}
    />
  );

  if (isDataFetching && subjects.length === 0) {
    return <Loading text="Fetching Subjects..." />;
  }

  return (
    <VStack padding={3.5}>
      <HStack
        borderBottomWidth={2}
        padding={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomText style={{ fontSize: 18 }}>Subjects:</CustomText>
        <Popover
          isOpen={isFilterOpen}
          placement="bottom left"
          trigger={(triggerProps) => (
            <Button
              size="xs"
              {...triggerProps}
              onPress={() => setIsFilterOpen(true)}
              bg={colors.blue}
              borderRadius="full"
              shadow={4}
            >
              <HStack alignItems="center" space={1}>
                <Icon
                  as={AntDesignIcon}
                  name="filter"
                  size={4}
                  color={colors.white}
                />
                <CustomText color={colors.white}>Filter</CustomText>
              </HStack>
            </Button>
          )}
        >
          <Popover.Content
            w="48"
            bgColor={colors.black}
            accessibilityLabel="Filter Posts"
          >
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsFilterOpen(false)} />
            <Popover.Header>Filter Posts</Popover.Header>
            <Popover.Body>Something</Popover.Body>
          </Popover.Content>
        </Popover>
      </HStack>
      <FlatList
        contentContainerStyle={{
          padding: "4%",
        }}
        keyExtractor={(item) => item.id}
        data={subjects}
        renderItem={renderItem}
      />
    </VStack>
  );
};

export default SubjectsList;

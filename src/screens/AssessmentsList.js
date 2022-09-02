import { Button, HStack, Icon, Popover, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";

import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import AssessmentItem from "../components/list-items/AssessmentItem";
import { fetchExams } from "../store/actions/examActions";
import Loading from "../components/Loading";

const AssessmentsList = (props) => {
  // const [assessments, setAssessments] = useState(dummy_assessments);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isDataFetching = useSelector((state) => state.exam.isFetching);
  const assessments = useSelector((state) => state.exam.exams);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExams());
  }, []);

  const onPressAssessment = (assessment) => {
    props.navigation.navigate("Assessment Report", {
      title: assessment,
    });
  };

  const renderItem = ({ item }) => (
    <AssessmentItem
      assessment={item}
      onPressHandler={(assessment) => onPressAssessment(assessment)}
    />
  );

  if (isDataFetching && assessments.length === 0)
    return <Loading text="Fetching Exam List..." />;

  return (
    <VStack padding={3.5}>
      <HStack
        borderBottomWidth={2}
        padding={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomText style={{ fontSize: 18 }}>Assessments:</CustomText>
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
            w="56"
            bgColor={colors.black}
            accessibilityLabel="Filter Assessments"
          >
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsFilterOpen(false)} />
            <Popover.Header>Filter Assessments</Popover.Header>
            <Popover.Body>Something</Popover.Body>
          </Popover.Content>
        </Popover>
      </HStack>
      <FlatList
        contentContainerStyle={{
          padding: "4%",
        }}
        data={assessments}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
      />
    </VStack>
  );
};

export default AssessmentsList;

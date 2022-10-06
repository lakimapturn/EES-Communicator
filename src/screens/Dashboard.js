import { HStack, Icon, VStack, Avatar } from "native-base";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import Octicon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import ActionButton from "../components/ActionButton";
import Container from "../components/Container";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import { screens } from "../constants/navigation";

const Dashboard = (props) => {
  const user = useSelector((state) => state.user);

  const attendanceOnPressHandler = () => {
    props.navigation.push(screens.attendance);
  };

  const postsOnPressHandler = () => {
    props.navigation.push(screens.subjectList);
  };

  const assessmentsOnPressHandler = () => {
    props.navigation.push(screens.assessmentList);
  };

  return (
    <ScrollView>
      <VStack space="5" padding={8} justifyContent="space-between">
        <View>
          <CustomText light fontSize={16}>
            Welcome Back,
          </CustomText>
          <CustomText fontSize={22}>{user.name}!</CustomText>
        </View>

        <View>
          <Container color={colors.blue}>
            <HStack space={6}>
              <VStack justifyContent="center">
                {/* student image goes here */}
                <Avatar
                  size="lg"
                  bg="cyan.500"
                  source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                >
                  {user.name}
                </Avatar>
              </VStack>
              <VStack space={2.5}>
                <CustomText color={colors.white} style={styles.userInfo}>
                  <CustomText bold>Full Name:</CustomText> {"\n"}
                  {user.name}
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  <CustomText bold>Grade:</CustomText> {user.grade}-
                  {user.section}
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  <CustomText bold>DOB:</CustomText> {user.dob}
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  <CustomText bold>Academic Year:</CustomText> {"\n"}
                  {user.academic_year}
                </CustomText>
              </VStack>
            </HStack>
          </Container>
        </View>

        <HStack justifyContent="space-between">
          <ActionButton
            bg={colors.red}
            text={{ text: "Attendance", size: 14 }}
            icon={{ as: Octicon, name: "checklist" }}
            onPress={attendanceOnPressHandler}
          />
          <ActionButton
            bg={colors.yellow}
            text={{ text: "Posts", size: 14 }}
            icon={{ as: MaterialIcon, name: "post-add", size: 12 }}
            onPress={postsOnPressHandler}
          />
        </HStack>

        <HStack justifyContent={"center"}>
          <ActionButton
            bg={colors.navy}
            text={{ text: "Assessment Report", size: 14 }}
            icon={{ as: MaterialIcon, name: "assessment", size: 12 }}
            onPress={assessmentsOnPressHandler}
          />
        </HStack>

        <View>
          <Container color={colors.green}>
            <VStack alignItems={"center"} space={2.5}>
              <HStack marginTop={2}>
                <Icon
                  as={<Ionicon name="ios-receipt-outline" />}
                  size={12}
                  ml="2"
                  color={colors.white}
                />
              </HStack>
              <HStack>
                <CustomText color={colors.white} style={styles.feesText}>
                  Outstanding Fees: {"\n"}0 AED
                </CustomText>
              </HStack>
              <HStack>
                <CustomText color={colors.white} style={styles.asOfDate}>
                  As of {new Date().toDateString()}
                </CustomText>
              </HStack>
            </VStack>
          </Container>
        </View>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    fontSize: 14,
    lineHeight: 22,
    flexWrap: "wrap",
  },
  feesText: {
    fontSize: 15,
    textAlign: "center",
  },
  asOfDate: {
    fontSize: 10,
  },
});

export default Dashboard;

import { HStack, Icon, VStack } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Octicon from "react-native-vector-icons/Octicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";

import ActionButton from "../components/ActionButton";
import Container from "../components/Container";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";

const Dashboard = (props) => {
  const attendanceOnPressHandler = () => {
    props.navigation.navigate("Attendance");
  };

  const postsOnPressHandler = () => {
    props.navigation.navigate("Posts");
  };

  return (
    <ScrollView>
      <VStack space={4} style={styles.container}>
        <View>
          <CustomText style={styles.welcomeText}>
            Welcome Back, Laksh Makhija!
          </CustomText>
        </View>

        <View>
          <Container color={colors.blue}>
            <HStack space={5}>
              <VStack justifyContent="center">
                <Icon
                  as={<Octicon name="person" />}
                  size={10}
                  ml="2"
                  color={colors.white}
                />
              </VStack>
              <VStack space={2.5}>
                <CustomText color={colors.white} style={styles.userInfo}>
                  Full Name: {"\n"}Laksh Makhija
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  Grade: 12-D
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  DOB: 09/04/2005
                </CustomText>
                <CustomText color={colors.white} style={styles.userInfo}>
                  Academic Year: {"\n"}2022-2023
                </CustomText>
              </VStack>
            </HStack>
          </Container>
        </View>

        <HStack justifyContent="space-between">
          <ActionButton
            bg={colors.red}
            text="Attendance"
            icon={{ as: Octicon, name: "checklist" }}
            onPress={attendanceOnPressHandler}
          />
          <ActionButton
            bg={colors.yellow}
            text="Posts"
            icon={{ as: MaterialIcon, name: "post-add", size: 12 }}
            onPress={postsOnPressHandler}
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
    padding: "5%",
  },
  welcomeText: {
    fontSize: 20,
  },
  userInfo: {
    fontSize: 16,
    lineHeight: 22,
    flexWrap: "wrap",
  },
  feesText: {
    fontSize: 16,
    textAlign: "center",
  },
  asOfDate: {
    fontSize: 10,
  },
});

export default Dashboard;

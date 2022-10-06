import { HStack, Icon, VStack } from "native-base";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { PieChart } from "react-native-gifted-charts";
import EntypoIcon from "react-native-vector-icons/Entypo";

import Container from "../components/Container";
import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import DateItem from "../components/list-items/DateItem";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { fetchAttendance } from "../store/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const calendarWidth = Dimensions.get("window").width * 0.95;

const today = new Date();
today.setHours(0, 0, 0, 0);

const minDate = "2022-04-01";

const maxDate = new Date(
  Math.min(
    new Date().getTime() - 864 * 100000,
    new Date("2023-03-01").getTime()
  )
).toDateString();

const Attendance = (props) => {
  const absentDates = useSelector((state) => state.user.absent_dates);
  const absentPerc = useSelector((state) => state.user.absent_perc);
  const isFetching = useSelector((state) => state.user.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("session")
      .then((jsonValue) => JSON.parse(jsonValue))
      .then((user) => dispatch(fetchAttendance(user)))
      .catch((err) => console.log("Error: " + err));
  }, []);

  if (isFetching) return <Loading text="Loading Attendance..." />;

  console.log(absentPerc);

  const pieData = [
    {
      key: "present",
      value: 100 - absentPerc,
      color: colors.green,
      text: `${100 - absentPerc}%`,
    },
    {
      key: "absent",
      value: absentPerc,
      color: colors.red,
      text: `${absentPerc}%`,
    },
  ];

  const markedDates = () => {
    const marked = {};
    for (let date in absentDates) {
      const dateObj = new Date(date);

      if (dateObj.getUTCDate() !== today.getUTCDate() + 1)
        marked[date] = {
          selected: true,
          selectedColor: "transparent",
          selectedTextColor: colors.red,
          // selectedColor: colors.red,
        };
    }
    return marked;
  };

  return (
    <ScrollView>
      <VStack paddingTop={10} space={6}>
        <HStack paddingX={4} justifyContent="space-evenly">
          <HStack alignItems="center">
            <Container style={styles.legendColor} color={colors.green} />
            <CustomText>{"  "}Present</CustomText>
          </HStack>
          <HStack alignItems="center">
            <Container style={styles.legendColor} color={colors.red} />
            <CustomText>{"  "}Absent</CustomText>
          </HStack>
        </HStack>

        <HStack justifyContent={"center"}>
          <PieChart
            donut
            showText
            textColor={colors.white}
            radius={120}
            textSize={20}
            data={pieData}
          />
        </HStack>

        <HStack justifyContent="center">
          <Calendar
            markedDates={markedDates()}
            disabledDaysIndexes={[5, 6]}
            enableSwipeMonths
            dayComponent={({ date, state }) => (
              <DateItem
                date={date}
                state={state}
                absent={absentDates?.includes(date.dateString)}
              />
            )}
            theme={{
              backgroundColor: "#f8f8f8",
              calendarBackground: "#f8f8f8",
              dayTextColor: colors.green,
              todayBackgroundColor: colors.black,
              todayTextColor: colors.white,
              textSectionTitleColor: colors.black,
              textDayFontSize: 14,
              textMonthFontFamily: "Sora",
              textDayFontFamily: "Sora",
            }}
            minDate={minDate}
            maxDate={maxDate}
            style={{ width: calendarWidth }}
            hideExtraDays={true}
            renderArrow={(direction) => (
              <Icon
                as={EntypoIcon}
                name={direction === "right" ? "chevron-right" : "chevron-left"}
                size={6}
                color={colors.blue}
              />
            )}
            firstDay={1}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  legendColor: {
    height: 10,
    width: 20,
  },
});

export default Attendance;

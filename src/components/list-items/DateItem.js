import { View, StyleSheet } from "react-native";

import colors from "../../constants/Colors";
import { dummy_dates } from "../../constants/dummy-data";
import CustomText from "../custom/Text";

const DateItem = (props) => {
  const absent = props.absent; // check if student was absent on the given date
  const day = new Date(props.date.dateString).getDay(); // check which day of the week the given date is
  const weekend = day === 6 || day === 0; // checking if day is saturday or sunday respectively

  let color = colors.green;
  if (props.state === "today") color = colors.white;
  else if (weekend) color = "lightgray";
  else if (props.state === "disabled") color = colors.black;
  else if (absent) color = colors.red;

  return (
    <View
      style={[
        styles.dayContainer,
        {
          backgroundColor:
            props.state === "today" ? colors.black : "transparent",
        },
      ]}
    >
      <CustomText color={color} style={styles.day}>
        {props.date.day}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    padding: 6,
    borderRadius: 20,
  },
  day: {
    textAlign: "center",
  },
});

export default DateItem;

import AsyncStorage from "@react-native-async-storage/async-storage";

export const FETCHING = "FETCHING";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const FETCH_ATTENDANCE = "FETCH_ATTENDANCE";

export const authenticate = (email, password) => {
  return async (dispatch) => {
    const data = { email: email, password: password };
    try {
      const response = await fetch(
        "http://localhost/communicator-api/api/auth.php",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);

      if (!result.error) {
        await AsyncStorage.setItem("session", JSON.stringify(result));
      } else {
        throw new Error("Invalid Credentials!");
      }

      dispatch({
        type: AUTHENTICATE,
        payload: { user: result },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const fetchAttendance = (userId) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    const data = { user_id: userId };
    try {
      const response = await fetch(
        // `https://communicator-hate.herokuapp.com/api/calendar.php?id=${userId}`,
        `http://ees-communicator.infinityfreeapp.com/api/calendar.php?id=10634`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      await console.log(result);

      dispatch({
        type: FETCH_ATTENDANCE,
        payload: {
          absent: result[0].absent,
          absentPerc: result[1].absent_perc,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.removeItem("session");

      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      throw new Error("Failed to logout user, try again later");
    }
  };
};

// pushes the session variable details into state
export const syncData = (jsonValue) => {
  return async (dispatch) => {
    try {
      const user = await JSON.parse(jsonValue);

      dispatch({
        type: AUTHENTICATE,
        payload: { user: user },
      });
    } catch (err) {
      throw new Error("Something went wrong! Try again later!");
    }
  };
};

export const submitFeedback = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      throw new Error("Failed to logout user, try again later");
    }
  };
};

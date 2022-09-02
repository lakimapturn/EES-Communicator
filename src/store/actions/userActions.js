import AsyncStorage from "@react-native-async-storage/async-storage";

export const FETCHING = "FETCHING";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (email, password) => {
  return async (dispatch) => {
    const data = { email: email, password: password };
    try {
      const response = await fetch(
        "https://communicator-hate.herokuapp.com/api/auth.php",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(!result.error);

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

export const FETCHING = "FETCHING";
export const FETCH_EXAMS = "FETCH_EXAMS";

export const fetchExams = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING });

      const response = await fetch(
        `https://communicator-hate.herokuapp.com/api/exams.php`
      );
      const result = await response.json();
      // console.log(result);

      dispatch({
        type: FETCH_EXAMS,
        payload: { exams: result },
      });
    } catch (err) {
      navigateToErrorPage({ message: "Error Fetching Exam List!" });
      console.log("Error: " + err);
    }
  };
};

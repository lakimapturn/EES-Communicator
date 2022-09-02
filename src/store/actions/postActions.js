export const FETCHING = "FETCHING";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_SUBJECTS = "FETCH_SUBJECTS";

export const fetchPosts = (grade, section) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const response = await fetch(
        `https://communicator-hate.herokuapp.com/api/posts.php`
      );
      const result = await response.json();

      dispatch({
        type: FETCH_POSTS,
        payload: { posts: result },
      });
    } catch (err) {
      console.log("Error: " + err);
    }
  };
};

export const fetchSubjects = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCHING });
      const response = await fetch(
        `https://communicator-hate.herokuapp.com/api/subjects.php?user_id=7310`
      );
      const result = await response.json();
      // console.log(result);

      dispatch({
        type: FETCH_SUBJECTS,
        payload: { subjects: result },
      });
    } catch (err) {
      console.log("Error: " + err);
    }
  };
};

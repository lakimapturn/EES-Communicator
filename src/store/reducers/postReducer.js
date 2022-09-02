import { FETCHING, FETCH_POSTS, FETCH_SUBJECTS } from "../actions/postActions";

const initialState = {
  isFetching: false,
  posts: [],
  subjects: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case FETCH_POSTS: {
      return Object.assign({}, state, {
        ...state,
        posts: action.payload.posts,
        isFetching: false,
      });
    }

    case FETCH_SUBJECTS: {
      return Object.assign({}, state, {
        ...state,
        subjects: action.payload.subjects,
        isFetching: false,
      });
    }

    default: {
      return state;
    }
  }
};

export default postReducer;

// class Post {

//   Post() {
//     this.id = 0;
//     this.staff_id = null,
//   this.post_title = "",
//   this.post_content = "",
//   this.post_date = null,
//   this.post_subject_code = "",
//   this.post_subject_name = "",
//   this.post_attachment1_name = "",
//   this.post_attachment1 = "",
//   post_attachment2_name: "",
//   post_attachment2: "",
//   post_attachment3_name: "",
//   post_attachment3: "",
//   }
// }

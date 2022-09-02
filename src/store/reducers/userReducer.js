// store id, name, role_id, grno, email, grade, section, is_active, is_subscribed, second_name, picture in session variable

import { AUTHENTICATE, FETCHING, LOGOUT } from "../actions/userActions";

const initialState = {
  isFetching: false,
  id: null,
  name: "",
  academic_year: "",
  dob: null,
  role_id: null,
  grno: "",
  email: "",
  grade: "",
  section: "",
  is_active: false,
  is_subscribed: false,
  second_name: "",
  picture: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case AUTHENTICATE: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        id: action.payload.user.id,
        name: action.payload.user.name,
        academic_year: action.payload.user.academic_year,
        dob: action.payload.user.dob,
        second_name: action.payload.user.second_name,
        grade: action.payload.user.grade,
        section: action.payload.user.section,
        grno: action.payload.user.grno,
        picture: action.payload.user.picture,
      });
    }

    case LOGOUT: {
      return Object.assign({}, state, initialState);
    }

    default: {
      return state;
    }
  }
};

export default userReducer;

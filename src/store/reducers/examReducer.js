import { FETCHING, FETCH_EXAMS } from "../actions/examActions";

const initialState = {
  isFetching: false,
  exams: [],
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case FETCH_EXAMS: {
      return Object.assign({}, state, {
        ...state,
        exams: action.payload.exams,
        isFetching: false,
      });
    }

    default: {
      return state;
    }
  }
};

export default examReducer;

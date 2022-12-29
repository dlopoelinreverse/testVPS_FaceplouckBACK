import { GET_POST_ERRORS } from "../actions/posts.actions";

const initialState = { postErrors: [], userErrors: [] };

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        ...state,
        postErrors: action.payload,
      };

    default:
      return state;
  }
}

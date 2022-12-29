import { combineReducers } from "redux";
import usersReducer from "./users.reducer";
import formsReducer from "./forms.reducer";
import postsReducer from "./posts.reducer";
import errorsReducer from "./errors.reducer";
import profilsReducer from "./profils.reducer";

export default combineReducers({
  usersReducer,
  formsReducer,
  postsReducer,
  errorsReducer,
  profilsReducer,
});

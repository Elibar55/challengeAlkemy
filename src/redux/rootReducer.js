import { combineReducers } from "redux";
import mealReducer from "./mealMenu/mealReducer";
import searchReducer from "./recentSearch/searchReducer";

const rootReducer = combineReducers({
  meal: mealReducer,
  search: searchReducer,
});

export default rootReducer;

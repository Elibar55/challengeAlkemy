import { ADD_MEAL } from "./mealTypes";
import { REMOVE_MEAL } from "./mealTypes";

const initialState = {
  mealMenu: [],
};
const mealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MEAL:
      return {
        mealMenu: state.mealMenu.concat(payload),
      };
    case REMOVE_MEAL:
      return {
        mealMenu: state.mealMenu.filter((meal) => meal.id !== payload.id),
      };
    default:
      return state;
  }
};

export default mealReducer;

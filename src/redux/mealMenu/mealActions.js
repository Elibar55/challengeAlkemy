import { ADD_MEAL } from "./mealTypes";
import { REMOVE_MEAL } from "./mealTypes";

export const addMeal = (meal) => {
  return {
    type: ADD_MEAL,
    payload: meal,
  };
};
export const removeMeal = (meal) => {
  return {
    type: REMOVE_MEAL,
    payload: meal,
  };
};

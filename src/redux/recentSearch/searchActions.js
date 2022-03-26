import { UPDATE_RECENT_SEARCH } from "./searchTypes";

export const updateRecentSearch = (meals) => {
  return {
    type: UPDATE_RECENT_SEARCH,
    payload: meals,
  };
};

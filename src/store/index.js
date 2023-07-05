import { configureStore } from "@reduxjs/toolkit";

import characterReducer from "./slice/character";
import searchReducer from "./slice/search";
import pagingReducer from "./slice/paging";

export default configureStore({
  reducer: {
    character: characterReducer,
    search: searchReducer,
    paging: pagingReducer,
  },
});

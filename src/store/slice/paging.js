import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageCount: 0,
  currentPage: 1,
  nextURL: "",
  prevURL: "",
};

export const getPageNumberFromURL = (url) => {
  const queryStringStartIndex = url.indexOf("?");
  if (queryStringStartIndex !== -1) {
    const queryString = url.substring(queryStringStartIndex + 1);
    const paramList = queryString.split("&");
    for (const param of paramList) {
      const [key, value] = param.split("=");
      if (key === "page") {
        return parseInt(value, 10);
      }
    }
  }
  return null;
};

export const pagingSlice = createSlice({
  name: "paging",
  initialState,
  reducers: {
    setPaging: (state, action) => {
      const { payload } = action;
      const currentPage = payload.next
        ? getPageNumberFromURL(payload.next) - 1
        : getPageNumberFromURL(payload.prev) + 1;

      state.pageCount = payload.count;
      state.currentPage = currentPage;
      state.nextURL = payload.next;
      state.prevURL = payload.prev;
    },
  },
});

export const { setPaging } = pagingSlice.actions;

export default pagingSlice.reducer;

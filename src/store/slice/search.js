import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  criterion: {},
  searchCriteria: {
    status: ["Alive", "Dead", "Unknown"],
    species: [
      "Human",
      "Alien",
      "Humanoid",
      "Mytholog",
      "Animal",
      "Robot",
      "Cronenberg",
      "Disease",
      "Unknown",
      "Poopybutthole",
    ],
    gender: ["Female", "Male", "Genderless", "Unknown"],
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCriterion: (state, action) => {
      state.criterion = { ...state.criterion, ...action.payload };
    },
    unsetCriterion: (state) => {
      state.criterion = {};
    },
  },
});

export const { setCriterion, unsetCriterion } = searchSlice.actions;

export default searchSlice.reducer;

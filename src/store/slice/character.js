import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collection: [],
  favorites: [],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites: (state, action) => {
      const newfavorites = state.favorites.filter((character) => {
        return character.id !== action.payload;
      });

      state.favorites = newfavorites;
    },
  },
});

export const { setCollection, addToFavorites, removeFromFavorites } =
  characterSlice.actions;

export default characterSlice.reducer;

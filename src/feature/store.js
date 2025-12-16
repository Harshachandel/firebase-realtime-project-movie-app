import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./moiveSlices";
import genreReducer from "./genreSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    genre: genreReducer,
  },
});

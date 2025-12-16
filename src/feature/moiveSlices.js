import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, push, ref, remove, set, update } from "firebase/database";
import { db } from "../firebase";

/* ================= CREATE ================= */
export const addMovie = createAsyncThunk("movie/add", async (data) => {
  await set(push(ref(db, "movieApp/movies")), data);
  return data;
});

/* ================= READ ================= */
export const getMovie = createAsyncThunk("movie/get", async () => {
  const snapshot = await get(ref(db, "movieApp/movies"));
  const data = snapshot.val();

  let arr = [];
  for (let id in data) {
    arr.push({ id, ...data[id] });
  }
  return arr;
});

/* ================= DELETE ================= */
export const deleteMovie = createAsyncThunk("movie/delete", async (id) => {
  await remove(ref(db, `movieApp/movies/${id}`));
  return id;
});

/* ================= UPDATE ================= */
export const updateMovie = createAsyncThunk(
  "movie/update",
  async ({ id, data }) => {
    await update(ref(db, `movieApp/movies/${id}`), data);
    return { id, ...data };
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movie.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movie = state.movie.filter(
          (m) => m.id !== action.payload
        );
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movie.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.movie[index] = action.payload;
        }
      });
  },
});

export default movieSlice.reducer;

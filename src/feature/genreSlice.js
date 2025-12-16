import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./Api";

// POST - Add Genre
export const addGenre = createAsyncThunk("addGenre", async (data) => {
  const res = await Api.post("/gener", data);
  return res.data;
});

// GET - All Genre
export const getGenre = createAsyncThunk("getGenre", async () => {
  const res = await Api.get("/gener");
  return res.data;
});

// DELETE
export const deleteGenre = createAsyncThunk("deleteGenre", async (id) => {
  await Api.delete(`/gener/${id}`);
  return id;
});

// UPDATE
export const updateGenre = createAsyncThunk("updateGenre", async ({ id, data }) => {
  const res = await Api.put(`/gener/${id}`, data);
  return res.data;
});

const genreSlice = createSlice({
  name: "gener",
  initialState: {
    gener: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGenre.fulfilled, (state, action) => {
        state.gener.push(action.payload);
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.gener = action.payload;
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.gener = state.gener.filter((g) => g.id !== action.payload);
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.gener = state.gener.map((g) =>
          g.id === action.payload.id ? action.payload : g
        );
      });
  },
});

export default genreSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    addArray: (_, action) => {
      return action.payload;
    }
  },
});

export const { addArray } = wordListSlice.actions;
export default wordListSlice.reducer;

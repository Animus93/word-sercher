import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const listofPhrasesIncludeWordSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    listofPhrasesIncludeWord: (_, action) => {
      return action.payload;
    },
  },
});

export const {listofPhrasesIncludeWord} = listofPhrasesIncludeWordSlice.actions;
export default listofPhrasesIncludeWordSlice.reducer;
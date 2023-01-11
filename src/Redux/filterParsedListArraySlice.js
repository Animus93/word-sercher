import { createSlice } from '@reduxjs/toolkit';

const initialState = '';
export const filterParsedListArraySlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    filterParsedListArray: (_, action) => {
      return action.payload;
    },
  },
});

export const { filterParsedListArray } = filterParsedListArraySlice.actions;
export default filterParsedListArraySlice.reducer;

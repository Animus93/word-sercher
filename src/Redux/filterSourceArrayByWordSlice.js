import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const filterSourceArrayByWordSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    filterSourceArrayByWord: (_, action) => {
      return action.payload;
    },
  },
});

export const {filterSourceArrayByWord} = filterSourceArrayByWordSlice.actions;
export default filterSourceArrayByWordSlice.reducer;
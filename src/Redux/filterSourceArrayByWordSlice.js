import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const filterSourceArrayByWordSlice = createSlice({
  name: 'wordList',
  initialState,
  reducers: {
    filterSource: (_, action) => {
      return action.payload;
    },
  },
});

export const {filterSource} = filterSourceArrayByWordSlice.actions;
export default filterSourceArrayByWordSlice.reducer;
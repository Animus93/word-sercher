import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

export const filterArrayOfWordsSlice = createSlice({
    name: 'wordList',
    initialState,
    reducers: {
        filterArrayOfWords: (_,action) => {
            return action.payload
        }
    }
})

export const {filterArrayOfWords} = filterArrayOfWordsSlice.actions;
export default filterArrayOfWordsSlice.reducer;
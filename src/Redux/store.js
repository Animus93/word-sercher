import { configureStore } from '@reduxjs/toolkit';
import filterArrayOfWordsSlice from './filterArrayOfWordsSlice';
import filterSourceArrayByWordSlice from './filterSourceArrayByWordSlice';
import wordListSlice from './wordListSlice';

export default configureStore({
  reducer: {
    wordList: wordListSlice,
    filterSourceArrayByWord: filterSourceArrayByWordSlice,
    filterArrayOfWords: filterArrayOfWordsSlice,
  },
});

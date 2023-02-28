import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterArrayOfWordsSlice from './filterArrayOfWordsSlice';
import filterParsedListArraySlice from './filterParsedListArraySlice';
import listofPhrasesIncludeWordSlice from './listofPhrasesIncludeWordSlice';
import wordListSlice from './wordListSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const presistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  wordList: wordListSlice,
  listofPhrasesIncludeWord: listofPhrasesIncludeWordSlice,
  filterArrayOfWords: filterArrayOfWordsSlice,
  filterParsedListArray: filterParsedListArraySlice,
})

const persistedReducer  = persistReducer(presistConfig,rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    })
});

export let presistor = persistStore(store)
export default store;
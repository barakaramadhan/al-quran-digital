import { configureStore } from '@reduxjs/toolkit';
import quranReducer from '../features/quranSlice';

export const store = configureStore({
  reducer: {
    quran: quranReducer,
  },
});
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllSurah, fetchDetailSurah } from '../services/quranAPi';

// THUNK
export const getAllSurah = createAsyncThunk(
  'quran/getAllSurah',
  async () => {
    const response = await fetchAllSurah();
    return response.data.data;
  }
);

export const getSurahDetail = createAsyncThunk(
  'quran/getDetail',
  async (nomor) => {
    const response = await fetchDetailSurah(nomor);
    return response.data.data;
  }
);

// INITIAL STATE
const initialState = {
  surahList: [],
  detailSurah: null,
  loading: false,
  error: null,
  searchTerm: '',
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

const quranSlice = createSlice({
  name: 'quran',
  initialState,

  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // 🔥 BOOKMARK
    toggleBookmark: (state, action) => {
      const exist = state.bookmarks.find(
        (item) =>
          item.nomorAyat === action.payload.nomorAyat &&
          item.surah === action.payload.surah
      );

      if (exist) {
        state.bookmarks = state.bookmarks.filter(
          (item) =>
            item.nomorAyat !== action.payload.nomorAyat ||
            item.surah !== action.payload.surah
        );
      } else {
        state.bookmarks.push(action.payload);
      }

      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllSurah.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSurah.fulfilled, (state, action) => {
        state.loading = false;
        state.surahList = action.payload;
      })
      .addCase(getAllSurah.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSurahDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSurahDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailSurah = action.payload;
      })
      .addCase(getSurahDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, toggleBookmark } = quranSlice.actions;
export default quranSlice.reducer;
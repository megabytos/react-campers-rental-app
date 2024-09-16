import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite(state, { payload }) {
      state.items.push(payload);
    },
    removeFavorite(state, { payload }) {
      state.items = state.items.filter(item => item.id !== payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

export const selectFavorites = state => state.favorites.items;
export const selectIsFavorite = (state, id) =>  state.favorites.items.some(product => product.id === id);

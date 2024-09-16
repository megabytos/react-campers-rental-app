import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './productsSlice';
import { filtersReducer } from './filtersSlice';
import { favoritesReducer } from './favoritesSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistFavoritesConfig = {
  key: 'favorites',
  storage, 
};
const persistedFavoritesReducer = persistReducer(persistFavoritesConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

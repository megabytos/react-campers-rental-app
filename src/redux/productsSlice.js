import { createSlice, createSelector} from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from './productsOps';
import { selectLocation, selectVehicleEquipment, selectVehicleType } from './filtersSlice';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.items = [];
  state.product = null;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],    
    product: null,
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    setPage(state, { payload }) {
      state.page = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
        state.product = null;
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
        state.items = [];
      })
      .addCase(fetchProductById.rejected, handleRejected);      
  },
});

export const { setPage } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

export const selectProducts = state => state.products.items;
export const selectLoading = state => state.products.loading;
export const selectError = state => state.products.error;
export const selectPage = state => state.products.page;
export const selectProductById = state => state.products.product;
export const selectProductReviewsById = state => state.products?.product?.reviews;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectLocation, selectVehicleEquipment, selectVehicleType],
  (products, location, vehicleEquipment, vehicleType) => {
    return products.filter(product => {
      if (location && !product.location.toLowerCase().includes(location.toLowerCase())) {        
        return false;
      }

      if (vehicleEquipment?.length > 0) {
        const equipmentPattern = {
          AC: product.AC,
          automatic: product.transmission === 'automatic',
          kitchen: product.kitchen,
          TV: product.TV,
          bathroom: product.bathroom,
        };

        for (const item of vehicleEquipment) {
          if (!equipmentPattern[item]) {
            return false;
          }
        }
      }

      if (vehicleType && product.form !== vehicleType) {
        return false;
      }

      return true;
    });
  }
);
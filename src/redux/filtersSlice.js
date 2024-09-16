import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    equipment: [],
    vehicleType: '',
  },
  reducers: {
    setFilters(state, { payload }) {
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectLocation = state => state.filters.location;
export const selectVehicleEquipment = state => state.filters.equipment;
export const selectVehicleType = state => state.filters.vehicleType;

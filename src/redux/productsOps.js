import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/campers');    
    return response.data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/campers/${id}`);    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});



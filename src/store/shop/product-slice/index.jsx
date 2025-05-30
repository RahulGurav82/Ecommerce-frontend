import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { URLSearchParams } from "url";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails : null
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams, sortParams}) => {

    const query = new URLSearchParams({
      ...filterParams,
      sortBy : sortParams
    })
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {

    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState: initialState,
  reducers: {
    setProductDetails : (state) => {
      state.productDetails = null;
    }
  },
  extraReducers: (buiuder) => {
    buiuder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = null;
      });
  },
});

export const { setProductDetails} = ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer;
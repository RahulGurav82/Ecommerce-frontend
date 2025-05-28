import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    searchResult : []
}

export const getSearchResults = createAsyncThunk('/search/getSearchResults', async (keyword) => {
    const response = await axios.get(`http://localhost:5000/api/shop/search/${keyword}`);
    return response?.data;
});

const searchSlice = createSlice({
    name : 'searchSlice',
    initialState,
    reducers : {
        resetSearchResult : (state) => {
            state.searchResult = [];
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true
        }).addCase(getSearchResults.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchResult = action.payload.data
        }).addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false
            state.searchResult = []
        });
    }
});
export const { resetSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
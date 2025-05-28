import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    featureImageList : []
}

export const getFeatureImage = createAsyncThunk('/common/getFeatureImage', async () => {
    const response = await axios.get(`http://localhost:5000/api/common/feature/get`);
    return response?.data;
});

export const addFeatureImage = createAsyncThunk('/common/addFeatureImage', async (image) => {
    const response = await axios.post(`http://localhost:5000/api/common/feature/add`, {image});
    return response?.data;
});

const commonSlice = createSlice({
    name : 'commonSlice',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(getFeatureImage.pending, (state) => {
            state.isLoading = true
        }).addCase(getFeatureImage.fulfilled, (state, action) => {
            state.isLoading = false
            state.featureImageList = action.payload.data
        }).addCase(getFeatureImage.rejected, (state) => {
            state.isLoading = false
            state.featureImageList = []
        });
    }
});
export default commonSlice.reducer;
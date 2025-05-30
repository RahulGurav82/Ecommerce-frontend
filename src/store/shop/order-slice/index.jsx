import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading : false,
    orderId : null,
    orderList : [],
    orderDetails : null,
}

export const createRazorpayOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/shop/order/razorpay`, orderData);
    return response?.data;
});
export const verifyRazorpayPayment = createAsyncThunk('/order/capturePayment', async (verificationData) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/shop/order/verify-razorpay`, verificationData);
    return response?.data;
});
export const getAllOrdersByUserId = createAsyncThunk('/order/getAllOrdersByUser', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/order/list/${userId}`);
    return response?.data;
});
export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async (id) => {
    console.log("getOrderDetails", id);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shop/order/details/${id}`);
    return response?.data;
});

const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {
        resetOrderDetails : (state) => {
            state.orderDetails = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(createRazorpayOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(createRazorpayOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderId = action.payload.orderId
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
        }).addCase(createRazorpayOrder.rejected, (state, action) => {
            state.isLoading = false
            state.orderId = []
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
        }).addCase(getAllOrdersByUserId.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrdersByUserId.fulfilled, (state,  action) => {
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(getAllOrdersByUserId.rejected, (state) => {
            state.isLoading = false
            state.orderList = []
        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetails.fulfilled, (state,  action) => {
            console.log(action.payload, "ot");
            state.isLoading = false
            state.orderDetails = action.payload.data
        }).addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false
            state.orderDetails = []
        });
    }
});

export const { resetOrderDetails} = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    approvalUrl : '',
    isLoading : false,
    orderId : null,
    orderList : [],
    orderDetails : null,
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder', async (orderData) => {
    const response = await axios.post('http://localhost:5000/api/shop/order/create', orderData);
    return response?.data;
});
export const capturePayment = createAsyncThunk('/order/capturePayment', async ({orderId, paypalOrderId}) => {
    const response = await axios.post('http://localhost:5000/api/shop/order/capture', {orderId, paypalOrderId});
    return response?.data;
});
export const getAllOrdersByUser = createAsyncThunk('/order/getAllOrdersByUser', async (userId) => {
    const response = await axios.post(`http://localhost:5000/api/shop/order/list/${userId}`);
    return response?.data;
});
export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async (id) => {
    const response = await axios.post(`http://localhost:5000/api/shop/order/list/${id}`);
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
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderId = action.payload.orderId
            state.approvalUrl = action.payload.approvalUrl
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
        }).addCase(getAllOrdersByUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrdersByUser.fulfilled, (state,  action) => {
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(getAllOrdersByUser.rejected, (state) => {
            state.isLoading = false
            state.orderList = []
        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetails.fulfilled, (state,  action) => {
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


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from "./admin/products-slice/index"

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : AdminProductsSlice
    },
});

export default store;
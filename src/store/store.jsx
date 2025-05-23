

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from "./admin/products-slice/index"
import ShoppingProductSlice from "./shop/product-slice/index"

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : AdminProductsSlice,
        shoppingProducts : ShoppingProductSlice
    },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from "./admin/products-slice/index"
import adminOrderSlice from "./admin/order-slice/index"
import ShoppingProductSlice from "./shop/product-slice/index"
import ShopPCartSlice from "./shop/cart-slice/index"
import addressSlice from "./shop/address-slice/index"
import shopOrderSlice from "./shop/order-slice/index"

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : AdminProductsSlice,
        adminOrder : adminOrderSlice,
        shoppingProducts : ShoppingProductSlice,
        shopCart : ShopPCartSlice,
        shopAddress : addressSlice,
        shopOrder : shopOrderSlice,
    },
});

export default store;
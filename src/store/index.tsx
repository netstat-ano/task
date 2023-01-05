import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
const store = configureStore({
    reducer: {
        products: product.reducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

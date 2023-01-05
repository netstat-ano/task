import { createSlice } from "@reduxjs/toolkit";
import Product from "../Models/Product";
interface ActionInit {
    payload: {
        totalProducts: Product[];
        products: Product[];
        totalPages: number;
        page: number;
    };
}
const product = createSlice({
    name: "product",
    initialState: {
        products: [] as Product[],
        totalProducts: [] as Product[],
        totalPages: 0 as number,
        page: 0 as number,
        perPage: 5 as number,
    },
    reducers: {
        init(state, action: ActionInit) {
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        replaceTotalProducts(state, action: { payload: Product[] }) {
            state.totalProducts = action.payload;
        },
        replaceProducts(state, action: { payload: Product[] }) {
            state.products = action.payload;
        },
        reset(state) {
            state.products = [];
            state.totalProducts = [];
        },
        copyTotalProductsToProducts(state) {
            state.products = state.totalProducts;
        },
        incrementCurrentPage(state) {
            state.page++;
        },
        decrementCurrentPage(state) {
            state.page--;
        },
    },
});

export default product;
export const productActions = product.actions;

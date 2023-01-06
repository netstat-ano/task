import { TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { productActions } from "../../store/product";
import styles from "./FilterForm.module.scss";
const FilterForm: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [filterValue, setFilterValue] = useState<number | string>("");
    const totalProducts = useAppSelector(
        (state) => state.products.totalProducts
    );
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchParams.set("id", String(filterValue));
        setSearchParams(searchParams);
    };
    const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(Number(e.target.value));
    };
    const onResetHandler = () => {
        searchParams.set("page", "1");
        searchParams.delete("id");
        setSearchParams(searchParams);
        setFilterValue("");
    };
    const filterProducts = useCallback(async () => {
        if (totalProducts && searchParams.get("id")) {
            const product = totalProducts.find(
                (product) => product.id === Number(searchParams.get("id"))
            );
            if (product) {
                dispatch(productActions.replaceProducts([product]));
            }
        }
    }, [totalProducts, dispatch, searchParams]);
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <TextField
                    id="productId"
                    label="Product id"
                    value={filterValue}
                    onChange={onInputChangeHandler}
                    type="number"
                />
            </div>
            <div className={styles["filter-form__btn"]}>
                <Button type="submit" variant="contained">
                    Filter
                </Button>
                <Button onClick={onResetHandler} type="reset">
                    Fetch all
                </Button>
            </div>
        </form>
    );
};
export default FilterForm;

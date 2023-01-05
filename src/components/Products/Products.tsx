import Product from "../../Models/Product";
import { useEffect, useState } from "react";
import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    Alert,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { productActions } from "../../store/product";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ProductRow from "../ProductRow/ProductRow";
const Products: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const totalProducts = useAppSelector(
        (state) => state.products.totalProducts
    );
    const products = useAppSelector((state) => state.products.products);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await Product.getProducts();

            if (response) {
                if (response.products) {
                    dispatch(
                        productActions.init({
                            totalProducts: response.products,
                            products: response.products,
                            totalPages: response.totalPages,
                            page:
                                Number(searchParams.get("page")) ||
                                response.page,
                        })
                    );
                    if (!searchParams.get("page")) {
                        searchParams.set("page", String(response.page));
                        setSearchParams(searchParams);
                    }
                }
            } else {
                dispatch(productActions.reset());
                setErrorMessage("Products not founded.");
            }
        };
        fetchProducts();
    }, []);
    return (
        <div>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {products.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((item) => (
                                <ProductRow key={item.id} item={item} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Pagination />
        </div>
    );
};
export default Products;

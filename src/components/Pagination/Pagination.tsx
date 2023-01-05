import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { productActions } from "../../store/product";
import { useEffect } from "react";
const Pagination: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const totalPages = useAppSelector((state) => state.products.totalPages);
    const currentPage = useAppSelector((state) => state.products.page);
    const products = useAppSelector((state) => state.products.products);
    const totalProducts = useAppSelector(
        (state) => state.products.totalProducts
    );
    const productsPerPage = useAppSelector((state) => state.products.perPage);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (totalProducts && !searchParams.get("id")) {
            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

            const currentProducts = totalProducts.slice(
                indexOfFirstProduct,
                indexOfLastProduct
            );
            dispatch(productActions.replaceProducts(currentProducts));
        }
    }, [searchParams.get("page"), totalProducts, searchParams.get("id")]);
    const onPreviousHandler = () => {
        if (currentPage - 1 >= 1) {
            searchParams.set("page", String(currentPage - 1));
            setSearchParams(searchParams);
            dispatch(productActions.decrementCurrentPage());
        }
    };
    const onNextHandler = () => {
        if (currentPage + 1 <= totalPages) {
            searchParams.set("page", String(currentPage + 1));
            setSearchParams(searchParams);
            dispatch(productActions.incrementCurrentPage());
        }
    };
    return (
        <div>
            <Button onClick={onPreviousHandler}>Previous</Button>
            <Button onClick={onNextHandler}>Next</Button>
        </div>
    );
};
export default Pagination;

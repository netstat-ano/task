import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Products from "./components/Products/Products";
import FilterForm from "./components/FilterForm/FilterForm";
import Container from "./components/Layout/Container";
function App() {
    return (
        <div className="App">
            <Container>
                <>
                    <FilterForm />
                    <Products />
                </>
            </Container>
        </div>
    );
}

export default App;

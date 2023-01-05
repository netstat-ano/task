class Product {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
    constructor(
        id: number,
        name: string,
        year: number,
        color: string,
        pantone_value: string
    ) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.color = color;
        this.pantone_value = pantone_value;
    }
    static async getProducts() {
        try {
            const response = await fetch("https://reqres.in/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                },
            });
            const resJson = await response.json();

            return {
                products: resJson.data as Product[],
                totalPages: resJson["total_pages"] as number,
                page: resJson.page as number,
            };
        } catch (err) {
            console.log(err);
        }
    }
}
export default Product;

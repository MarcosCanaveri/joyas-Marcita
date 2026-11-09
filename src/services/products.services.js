const products = [
    { id: 1, name: "Producto 1", price: 10.99 },
    { id: 2, name: "Producto 2", price: 19.99 },
    { id: 3, name: "Producto 3", price: 5.99 },
];

export const getAllProductsService = (req, res) => {
    return products;
};

export const getProductByIdService = async (id) => {
    return products.find(product => product.id == id);
};

export const createProductService = async (productData) => {
    const newProduct = {
        id: products.length + 1,
        name: productData.name,
        price: productData.price
    };
    products.push(newProduct);
    return newProduct;
    };

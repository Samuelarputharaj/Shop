// src/POSPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './POSPage.css';

const POSPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async () => {
        try {
            const res = await axios.post('/api/products', newProduct);
            setProducts([...products, res.data]);
            setNewProduct({ name: '', price: '', category: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="App">
            <h1>Point of Sale System</h1>
            <div className="product-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <p>{product.name}</p>
                        <p>${product.price}</p>
                        <p>{product.category}</p>
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default POSPage;

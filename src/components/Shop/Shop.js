import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);

    //initialize states using useState Hook
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    //button click handlers
    const handleAddProductToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            
            <div className="product-container">
                
                {
                    products.map((product, index) => <Product product={product} handleAddProductToCart = {handleAddProductToCart}></Product> )
                }
                
            </div>
            
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;
import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { getDatabaseCart, addToDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {

    //initialize states using useState Hook
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(()=>{
        fetch('http://ema-john-back.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length){
            const cartProducts = productKeys.map(key => {
                const product = products.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProducts);
        }
        
    }, [])


    //button click handlers
    const handleAddProductToCart = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
           count = sameProduct.quantity+1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== product.key)
           newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
    
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            
            <div className="product-container">
                
                {
                    products.map((product, index) => <Product product={product} key={index} handleAddProductToCart = {handleAddProductToCart}></Product> )
                }
                
            </div>
            
            <div className="cart-container">
                <Cart cart = {cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;
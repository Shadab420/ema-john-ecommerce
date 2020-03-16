import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const RemoveProduct = (productKey) => {
        
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, []);


    const thankYou = <img src={happyImage} alt="Order placed Img" /> 

    return (
        <div className="shop-container">
            <div className="product-container">
                
                <h2> { `Cart items: ${cart.length}` } </h2>
                {
                    cart.map((pd, index) => <ReviewItem product={pd} key={index} removeProduct={RemoveProduct} />)
                }

                {
                    orderPlaced && thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-btn" onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
        
    );
};

export default Review;
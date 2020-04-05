import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useAuth } from '../Login/useAuth';

const Review = () => {

    const [cart, setCart] = useState([]);

    //get auth hook
    const auth = useAuth();

    const RemoveProduct = (productKey) => {
        
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }


    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://ema-john-back.herokuapp.com/getProductsByKey', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>{
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            })
            setCart(cartProducts);
        })
        
        
    }, []);


    return (
        <div className="shop-container">
            <div className="product-container">
                
                <h2> { `Cart items: ${cart.length}` } </h2>
                {
                    cart.map((pd, index) => <ReviewItem product={pd} key={index} removeProduct={RemoveProduct} />)
                }

                {
                    !cart.length && <h1>Add something to cart first! <Link to="/shop">go to shop</Link></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user?
                            <button className="main-btn">Proceed Checkout</button>
                            : <button className="main-btn">Login to proceed</button>}

                    </Link>
                </Cart>
            </div>
        </div>
        
    );
};

export default Review;
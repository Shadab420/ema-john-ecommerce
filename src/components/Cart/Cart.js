import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Cart.css';
import { useAuth } from '../Login/useAuth';

const Cart = (props) => {

    const { cart } = props;
    const totalPrice = cart.reduce((total, product) => total + (product.price*product.quantity), 0);

    let shipping = 0;

    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }

    const formatNumber = num  => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    let tax = formatNumber(totalPrice / 10);
    const grandTotal = formatNumber(totalPrice + shipping + tax);

    const auth = useAuth();
    // console.log(auth.user);

    return (
        <div className="cart">
            <h2>Order Summary</h2>
            <p>Items ordered: {cart.length}</p>
            <p><small> Shipping cost ${shipping} </small></p>
            <p><small> tax ${tax} </small></p>            
            <p>items (without shipping) ${totalPrice}</p>
            <p>items (with shipping) ${ grandTotal }</p>
            <br/>
            {
                props.children 
            }
        </div>
    );
};

export default Cart;
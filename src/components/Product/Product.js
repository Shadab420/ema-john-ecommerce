import React from 'react';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
//module css
import './Product.css';

const Product = (props) => {

    const { name, img, seller, price, stock } = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
               <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left in stock - Order soon!</p>
                <button className="main-btn" onClick={() => props.handleAddProductToCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
    
        </div>
    );
};

export default Product;
import React from 'react';
import { Link } from 'react-router-dom';
// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
//module css
import './Product.css';

const Product = (props) => {

    const { name, img, seller, price, stock, key } = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
               <h4 className="product-name"><Link to={ `/product/${key}` }>{name}</Link></h4>
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
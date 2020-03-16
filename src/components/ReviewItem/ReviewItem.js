import React from 'react';

const ReviewItem = (props) => {
    const { key, name, quantity, price } = props.product;

    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity} </p>
            <small>{price}</small><br/>
            <button 
                className="main-btn"
                onClick={() => props.removeProduct(key)}
                >Remove</button>
        </div>
    );
};

export default ReviewItem;
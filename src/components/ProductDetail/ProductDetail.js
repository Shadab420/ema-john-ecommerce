import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        fetch(`http://ema-john-back.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    return (
        <div>
            <h1>Product details</h1>
            { 
                product && <h3> this is product {product.name} detail </h3>
            }
        </div>
    );
};

export default ProductDetail;
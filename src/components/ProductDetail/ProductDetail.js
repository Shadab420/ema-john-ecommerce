import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';

const ProductDetail = () => {
    const { productKey } = useParams();
    
    const product = fakeData.find(pd => pd.key === productKey);
        

    return (
        <div>
            { `this is product ${product.name} detail`}
        </div>
    );
};

export default ProductDetail;
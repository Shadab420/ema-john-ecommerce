import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null)

    const onSubmit = data => {
        setShipInfo(data);
     }

     const handlePlaceOrder = (payment) => {
        const savedCart = getDatabaseCart();

        const orderDetail = {
            email: auth.user.email,
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        }

        fetch('http://ema-john-back.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
        })
        .then(res => res.json())
        .then(order => {

            setOrderId(order._id)

            //clear localStorage cart
            clearLocalShoppingCart();
        })
     }

    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_Qxc5rcBn8snxoC7d0Xm7tlGi00eXYINh85');


    // console.log(watch('example')) // watch input value by passing the name of it

    return (
        <div className="container">
        <div className="row">
            <div className="col d-flex">
                <div className="col-md-6 col-sm-12" style={{ display: shipInfo && 'none'}}>
                    <h3>Shipment Information</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
                        {/* register your input into the hook by invoking the "register" function */}
                        {/* <input name="example" defaultValue="test" ref={register} /> */}
                        
                        {/* include validation with required or other standard HTML validation rules */}
                        <input name="name"  ref={register({ required: true })} placeholder="Name" value={auth.user.name} />
                        {/* errors will return when field validation fails  */}
                        {errors.name && <span className="error-msg">Name is required</span>}
                        
                        <input name="email"  ref={register({ required: true })} placeholder="Email" value={auth.user.email} />
                        {errors.email && <span className="error-msg">Email is required</span>}

                        <input name="address" ref={register({ required: true })} placeholder="Address"  />
                        {errors.address && <span className="error-msg"> Address is required</span>}

                        <input name="city" ref={register({ required: true })}  placeholder="City" />
                        {errors.city && <span className="error-msg">City is required</span>}

                        <input name="country" ref={register({ required: true })}  placeholder="Country" />
                        {errors.country && <span className="error-msg">Country is required</span>}
                        
                        <input name="zipcode" ref={register({ required: true })}  placeholder="Zipcode" />
                        {errors.zipcode && <span className="error-msg">Zipcode is required</span>}
                        
                        <input type="submit" />
                    </form>
                </div>

                <div 
                    className="col-md-6 col-sm-12"  
                    style={{ marginTop: '200px', display: shipInfo ? 'block': 'none'}}>
                    
                    <h3>Payment Information</h3>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}/>
                    </Elements>

                    {
                        orderId && (
                                <div>
                                    <h3>Thank you for shopping!</h3> 
                                    <p>Your order id is: {orderId} </p>                   }
                                </div>
                        )
                    }  
                </div>

            </div>

        </div>
        </div>
    )
};

export default Shipment;
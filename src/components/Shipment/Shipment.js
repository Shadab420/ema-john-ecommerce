import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => { console.log(data) }

    const auth = useAuth();

    // console.log(watch('example')) // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input name="example" defaultValue="test" ref={register} /> */}
        
        {/* include validation with required or other standard HTML validation rules */}
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>Name is required</span>}
        
        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
        {errors.email && <span>Email is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Address"  />
        {errors.address && <span> Address is required</span>}

        <input name="city" ref={register({ required: true })}  placeholder="City" />
        {errors.city && <span>City is required</span>}

        <input name="country" ref={register({ required: true })}  placeholder="Country" />
        {errors.country && <span>Country is required</span>}
        
        <input name="zipcode" ref={register({ required: true })}  placeholder="Zipcode" />
        {errors.zipcode && <span>Zipcode is required</span>}
        
        <input type="submit" />
        </form>
    )
};

export default Shipment;
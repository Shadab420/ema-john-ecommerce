import React, { useState, useRef, useEffect } from 'react';
import {
   
    Link
  } from "react-router-dom";
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';

//custom hook usePrevious
const usePrevious = value => {
    const prev = useRef();
    useEffect(() => {
        prev.current = value;
    }, [value])

    return prev.current;
}



const Header = () => {
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);
    const auth = useAuth();

    return (
        <div className="header">
            <h1>Count: {count} Previous: {previous}</h1>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    auth.user? 
                        <span style={{color: 'yellow'}}>
                            {auth.user.name}
                            <Link to="/login">Sign Out</Link>
                        </span>
                    :<Link to="/login">Login</Link>
                }
            </nav>
        </div>
    );
};

export default Header;
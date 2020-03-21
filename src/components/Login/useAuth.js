import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
//firebase
import * as firebase from  "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState, createContext } from "react";


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}

//custom hook barbar context import kore use kora theke bachar jonno.
export const useAuth = () => useContext(AuthContext);


export const PrivateRoute = ({ children, ...rest }) => {
  
    const auth = useAuth();

    return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const getUser = user => {
    const { displayName, email, photoURL } = user;
    return {
        name: displayName,
        email,
        photo: photoURL
    }
}

const Auth = () => {
    const [user, setUser] = useState(null);
    const provider = new firebase.auth.GoogleAuthProvider();


    const signInWithGoogle = () => {
        return firebase.auth().signInWithPopup(provider)
            .then(res => {

                const signedInUser = getUser(res.user);
                setUser(signedInUser);
                return res.user;
            })
            .catch(err=>{
                console.log(err);
                setUser(null)
                return err.message;
            })

    }

    const signOut = () => {
        return firebase.auth().signOut().then(function() {
            console.log("signed out success")
            setUser(null);
          })
          .catch(function(error) {
            console.log(error.message)
        });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const currentUser = getUser(user);
                setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
    },[])

    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;
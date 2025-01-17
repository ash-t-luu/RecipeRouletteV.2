import { useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loggingin, loggingout } from "../../../slices/authInputSlice";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userlogin = useSelector((state) => state.authInput)
 

  const handleLogin = async (data) => {
    // console.log('make request');
    fetch('/user/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        // if response status not 200
        if (!res.ok) {
          // parse response then destruct response body for error property
          return res.json().then(({ error }) => {
            // create an Error object from error property or response statusText
            throw new Error(error || res.statusText)
          })
        }
        // ! the response being sent from the server is not JSON
        return res;
      })
      .then((data) => {
        // console.log('success')
        // handle successful login
        // store token
        // update redux state
        // TODO: LINK GOES HERE 
        
        dispatch(loggingin());
        navigate('/home');
      })
      .catch((error) => {
        // display error in console
        console.error('There was a problem with the fetch operation from sign in:', error);
        // display error to user
        alert(error);
      })


  };

  const handleSignup = async (data) => {
    fetch('/user/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        // if response status not 200
        if (!res.ok) {
          console.log('AUTH PROVIDER LINE 65 FRONT END CHECK WHEN STATUS IS NOT 200')
          // parse response then destruct response body for error property
          return res.json().then(({ error }) => {
            // create an Error object from error property or response statusText
            throw new Error(error || res.statusText)
          })
        }
        // ! VERIFY the information being returned from the server, if not JSON, do not .json()
        // return res.json();
        console.log('STATUS IS 200 AND GOOD LINE 74 AUTHPROVIDER')
        return res;
      })
      .then((data) => {
        // handle successful signup
        // store token
        // update redux state
        // ? on successful signup redirect to login page. 
        navigate('/login');
      })
      .catch((error) => {
        // display error in console
        console.error('There was a problem with the fetch operation:', error);
        // display error to user
        alert(error);
      })
  }

  const handleLogout = () => {
    console.log('logging out')
    dispatch(loggingout());
    navigate('/login');
  }; 

  const value = {
    onLogin: handleLogin, 
    onSignup: handleSignup, 
    onLogout: handleLogout, 
  }

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 
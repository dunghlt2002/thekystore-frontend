import Axios from "axios";
import Cookie from 'js-cookie';
import http from "../http-common";

// import {
//   USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
//   USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
// } from "../constants/userConstants";

// viet lai theo kieu redux mapDispatchtoProps
const getProfileFetch = () => {
  console.log('vo getprofile theky ');
  return dispatch => {
    const token = localStorage.token;
    console.log('token lay tu local ' + token);
  }
}


const userLogoutFetch = () => {
  console.log('OUT');
  return dispatch => {
    Cookie.remove('userInfo');
    // dispatch(logoutUser)
    // dispatch({ type: 'USER_LOGOUT', payload: {} });
    dispatch({ type: 'USER_LOGOUT' });
  }
}


const userLoginFetch = (user, password) => async (dispatch) => {
  
  console.log('vo day la action 0711 ' + user);
  dispatch({ type: 'USER_SIGNIN_REQUEST', payload: {user, password} });
  try {
    // const { data } = await Axios.post("/api/users/signin", { email, password });
    return await fetch("http://localhost:8080/api/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user, password })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
      } else {
        console.log('data tra ve ' + JSON.stringify(data));
        // localStorage.setItem("token", JSON.stringify(data).token)
        localStorage.setItem("user", JSON.stringify(data).user);
        localStorage.setItem("password", JSON.stringify(data).password);
        console.log('login xong ne ' + data.error);
        if (data.error) {
          dispatch({ type: 'USER_SIGNIN_FAIL', payload: data });
        }
        else {
          Cookie.set('userInfo', data);
          dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: data });
          
        }
        
      }
    })
  } catch (error) {
    dispatch({ type: 'USER_SIGNIN_FAIL', payload: error });
  }
}

export { userLoginFetch, userLogoutFetch, getProfileFetch };
// export { register, update, userLoginFetch, userLogoutFetch, getProfileFetch };
// export { signin, register, logout, update, userLoginFetch };


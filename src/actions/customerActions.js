
import Cookie from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL

// viet lai theo kieu redux mapDispatchtoProps
const getProfileFetch = () => {
  console.log('vo getprofile theky ');
  return dispatch => {
    const token = localStorage.token;
    console.log('token lay tu local ' + token);
  }
}

const customerLogoutFetch = () => {
  console.log('OUT');
  return dispatch => {
    Cookie.remove('customerInfo');
    // dispatch(logoutcustomer)
    // dispatch({ type: 'customer_LOGOUT', payload: {} });
    dispatch({ type: 'CUSTOMER_LOGOUT' });
  }
}


const customerLoginFetch = (customers_email, customers_password) => async (dispatch) => {
  
  console.log('vo day la action 0925 ' + customers_email);
  dispatch({ type: 'CUSTOMER_SIGNIN_REQUEST', payload: {customers_email, customers_password} });
  try {
    // return await fetch("http://localhost:8080/api/customersignin", {
    return await fetch(API_URL + "customersignin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ customers_email, customers_password })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
      } else {
        console.log('data tra ve ' + JSON.stringify(data));
        localStorage.setItem("customer", JSON.stringify(data).customers_email);
        localStorage.setItem("password", JSON.stringify(data).customers_password);
        console.log('login xong ne ' + data.error);
        if (data.error) {
          dispatch({ type: 'CUSTOMER_SIGNIN_FAIL', payload: data });
        }
        else {
          Cookie.set('customerInfo', data);
          dispatch({ type: 'CUSTOMER_SIGNIN_SUCCESS', payload: data });
        }
      }
    })
  } catch (error) {
    dispatch({ type: 'CUSTOMER_SIGNIN_FAIL', payload: error });
  }
}

export { customerLoginFetch, customerLogoutFetch, getProfileFetch };



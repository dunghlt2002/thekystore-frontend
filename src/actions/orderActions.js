// import Cookie from 'js-cookie';
// import { connect } from 'react-redux';
// import axios from 'axios';

import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

// const token = localStorage.token;
// console.log('token lay tu local ' + token);
// Cookie.remove('userInfo');


const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  
  console.log('vo payOrder Action ' + paymentResult.create_time);
  dispatch({ type: 'ORDER_PAY_REQUEST', payload: {order, paymentResult} });
  const { customerSignin: { customerInfo } } = getState();
  const orderUpdate = {
    orders_status: 1,
    payment_status: paymentResult.status,
    payment_email: paymentResult.payer.email_address,
    payment_id: paymentResult.id,
    payment_update_time: paymentResult.create_time
  }
  try {

    const { data } = await Axios.put(API_URL + 'orderpay/' + order.id, orderUpdate, {
      headers: {
        'Authorization': 'Bearer ' + customerInfo.token
      }
    });
    dispatch({ type: 'ORDER_PAY_RESET' });
    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data });
   
  } catch (error) {
    const message = 
      error.response && error.resp.data.message
        ? error.resp.data.message
        : error.message
  
    dispatch({ type: 'ORDER_PAY_FAIL', payload: message });
  }
  
}

// Truyen bien trong store.js vo ACTION.js 12242020
// const mapStateToProps = (state, ownProps) => {
//   console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
  
//   return {
//       // currcustomer: state.customerSignin.customerInfo    // cu
//       currcustomer: state.customerSignin                // moi
//   }
// }

// Truyen bien trong store.js vo ACTION.js
// export default connect(mapStateToProps, null)( payOrder );

export { payOrder };



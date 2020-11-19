
import Cookie from 'js-cookie';

// const customerInfo = Cookie.getJSON("customerInfo") || null;
// console.log('customerinfo from reducer  ' + customerInfo);

//viet lai theo kieu mapDtoProps
// const initialState = { customerSignin: { customerInfo } };

function customerReducer(state = {}, action) {
  console.log('vo day chua theky - customerreducer  0925 ' + JSON.stringify(action.payload));

  console.log('vo reducer sign-in');
  switch (action.type) {
    case 'CUSTOMER_SIGNIN_REQUEST':
      return { loading: true };
    case 'CUSTOMER_SIGNIN_SUCCESS':
      return { loading: false, customerInfo: action.payload };
    case 'CUSTOMER_SIGNIN_FAIL':
      return { loading: false, error: action.payload.error };
    case 'CUSTOMER_LOGOUT':
      return {};
    default: return state;
  }
   
  }

// End phan viet lai theo kieu mapDtoProps

export {
  customerReducer
}

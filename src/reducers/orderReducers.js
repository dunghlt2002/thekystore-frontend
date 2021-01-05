
//viet lai theo kieu mapDtoProps
// const initialState = { userSignin: { userInfo } };

function orderPayReducer(state = {}, action) {
  console.log('vo orderreducer  1224 ' + JSON.stringify(action.payload));

  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return { loading: true };
    case 'ORDER_PAY_SUCCESS':
      return { loading: false, success: true };
    case 'ORDER_PAY_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_PAY_RESET':
      return {};
    default: return state;
  }
   
  }

// End phan viet lai theo kieu mapDtoProps

export {
  orderPayReducer
}

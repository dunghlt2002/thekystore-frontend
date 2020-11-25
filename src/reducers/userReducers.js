// import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

// import Cookie from 'js-cookie';

// const userInfo = Cookie.getJSON("userInfo") || null;
// console.log('userinfo from reducer  ' + userInfo);

//viet lai theo kieu mapDtoProps
// const initialState = { userSignin: { userInfo } };

function userReducer(state = {}, action) {
  console.log('vo day chua theky - userreducer  0711 ' + JSON.stringify(action.payload));

  console.log('vo reducer sign-in');
  switch (action.type) {
    case 'USER_SIGNIN_REQUEST':
      return { loading: true };
    case 'USER_SIGNIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_SIGNIN_FAIL':
      return { loading: false, error: action.payload.error };
    case 'USER_LOGOUT':
      return {};
    default: return state;
  }
   
  }

// End phan viet lai theo kieu mapDtoProps

// Redux kieu thunk
// function userSigninReducer(state = {}, action) {
//   console.log('vo reducer Signin');
//   switch (action.type) {
//     case USER_SIGNIN_REQUEST:
//       return { loading: true };
//     case USER_SIGNIN_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_SIGNIN_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LOGOUT:
//       return {};
//     default: return state;
//   }
// }

// function userUpdateReducer(state = {}, action) {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { loading: true };
//     case USER_UPDATE_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     default: return state;
//   }
// }

// function userRegisterReducer(state = {}, action) {
//   switch (action.type) {
//     case USER_REGISTER_REQUEST:
//       return { loading: true };
//     case USER_REGISTER_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_REGISTER_FAIL:
//       return { loading: false, error: action.payload };
//     default: return state;
//   }
// }
export {
  // userSigninReducer, userRegisterReducer, userUpdateReducer, userReducer
  userReducer
}

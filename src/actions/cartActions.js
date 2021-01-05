import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

const API_URL = process.env.REACT_APP_API_URL

const addToCart = (productId, qty) => async (dispatch, getState) => {
  console.log('Hihihihi add to cart ' + productId + " - " + qty);
  try {
    // const { data } = await Axios.get("http://localhost:8080/api/products/" + productId);
    const { data } = await Axios.get(API_URL + "products/" + productId);
    console.log('data in add to cart action' + JSON.stringify(data));
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data.id,
        name: data.products_name,
        image: data.products_image,
        price: data.products_price,
        countInStock: data.products_soluong,
        qty
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {

  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  Cookie.set("shippingAddress", JSON.stringify(data));
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  Cookie.set("paymentMethod", JSON.stringify(data));
}
export { addToCart, removeFromCart, saveShipping, savePayment }

import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import Cookie from 'js-cookie';

import axios from "axios";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'

import  { clearCart }  from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';
// import { connect, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import orderDataService from "../services/order.service";
import systemparaDataService from "../services/systempara.service";
import Axios from "axios";
import MessageBox from "./MessageBox";
// import { PayPalButton } from "react-paypal-button-v2";

// Tao hamm lay 2 so le toPrice
const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
// this.retrieveSystemPara('ShippingPrice');

class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeOrdersDes = this.onChangeOrdersDes.bind(this);
        
        this.state = {
            token: this.props.currcustomer.customerInfo?this.props.currcustomer.customerInfo.token:null,
            // hasError: false,
            REACT_APP_URL: process.env.REACT_APP_URL,
            REACT_APP_CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
            new_order_id: null,
            submitted: null,
            sdkReady: false,
            discount: 0.00,
            discountcode: 'TRY',
            // shippingStd: 5.55,
            taxRate: 7,
            orders_des: 'Write some thing to seller here ...',
            discountmessage:null,
            errMessage: null,   // Xu ly loi khi token expired
            message: null   // Xu ly noi dung email gui khach khi xong order
        };
    }
  // static getDerivedStateFromError(error) {
  //     return { failure: true, exception: error };
  // }

// phai dung arrow func o day
applyDiscountCode = (totalInit) => {

  // this.retrieveSystemPara(this.state.discountcodetemp);
  // chay luon o day
  systemparaDataService.findByKeyword(this.state.discountcodetemp)
    .then(response => {
      if (response.data[0]) {
        this.setState({
          discount: toPrice(this.props.cart.itemsPrice * response.data[0].value),
          discountcode: this.state.discountcodetemp
        });
        // dvalue = response.data[0].value;
        // this.props.cart.discount = toPrice(this.props.cart.itemsPrice * dvalue)
        this.props.cart.discount = this.state.discount
        // console.log('D value ' + this.state.discount);
        console.log('total D value return ' + this.props.cart.discount);
        this.getSummary();
        this.setState({
          discountmessage:null
        });
      } else {
        this.setState({
          discount: toPrice(0.00)
        });
        this.props.cart.discount = 0
        this.getSummary();
        this.setState({
          discount: 0.00,
          discountmessage: "This code is NOT eligible, pls try another one!"
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
  
  // if (this.state.discountcodetemp === 'HOLIDAYS20') {
  //   this.setState({
  //     discount: toPrice(this.props.cart.itemsPrice * 0.2),
  //     discountcode: this.state.discountcodetemp
  //   });
  //   this.props.cart.discount = toPrice(this.props.cart.itemsPrice * 0.2)
  // } else {
  //   this.setState({
  //     discount: toPrice(0)
  //   });
  //   this.props.cart.discount = 0
  // }
  
  console.log('sau chietkhau  ' + this.props.cart.totalPrice);
}

// retrieveSystemPara(search_keyword) {
//   console.log('tim cai gi ' + search_keyword);
// }

onChangeDiscount(e) {
    const discountcodetemp = e.target.value;
    this.setState({
      discountcodetemp: discountcodetemp
    });
    // this.getSummary();
    console.log('discount code temp' + this.state.discountcodetemp);
}

onChangeOrdersDes(e) {
  const orders_des = e.target.value;
  this.setState({
    orders_des: orders_des
  });
  this.getSummary();
  console.log('discount code temp' + this.state.discountcodetemp);
}

// errorPaymentHandler() {
//   this.props.history.push('/orders/' + this.state.new_order_id)
// }
// cancelPaymentHandler() {
//   this.props.history.push('/orders/' + this.state.new_order_id)
// }

// successPaymentHandler() {
//     // this.props.history.push('/orders/' + this.state.new_order_id)
// }

addPayPalScript = async () => {
    console.log('Vo load script ' + this.state.sdkReady);
  
      const {data} = await Axios.get(this.state.REACT_APP_URL + 'api/config/paypal');
      console.log('data load from api ' + JSON.stringify(data));
      
      const script = document.createElement('script');
      script.type="text/javascript";
      script.src = 'https://www.paypal.com/sdk/js?client-id='+data+'&disable-funding=credit,card';
      script.async = true;
      script.onload =  () => {
        console.log('dang load script...');
        
        this.setState({
          sdkReady: true
        });
      }
      document.body.appendChild(script);
      console.log('END load script ' + this.state.sdkReady);
};

componentDidMount() {
  console.log('this.props in placeorder' + JSON.stringify(this.props.cart));
  // console.log('place order ... ' + JSON.stringify(this.props.cart.itemsPrice));
  if (
      this.props.currcustomer.customerInfo && 
      this.props.cart.shippingAddress &&
      this.props.cart.paymentMethod && 
      this.props.cart.cartItems.length > 0
    ) {
      if(!window.paypal) {
        this.addPayPalScript();
      } else {
        this.setState({
          sdkReady: true
        });
      }
      if (!this.props.cart.shippingAddress) {
        this.props.history.push('/shipping');
      }
      if (!this.props.cart.paymentMethod) {
        this.props.history.push('/payment');
      }
      

      // this.props.cart.physicShippping = 0;
      this.props.cart.discount=0.00;
      this.props.cart.itemsPrice = toPrice(
        this.props.cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
      );
      this.props.cart.physicShippping = this.props.cart.cartItems.reduce((a, c) => a + c.weight,0);

      this.getSummary();
  } else {
    this.props.history.push('/page909');
  }

}

getSummary() {
  // const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    this.props.cart.shippingPrice = this.props.cart.physicShippping>0?
      (this.props.cart.itemsPrice >= 50 ?
        0 : toPrice(this.props.cart.shippingAddress.addressObj.shippingPriceStd)
      ):0;

    // default discount la 0
    // this.props.cart.discount = 0.00;
    console.log('discount in state ' + this.state.discount);
    console.log('discount in props ' + this.props.cart.discount);

    this.props.cart.taxPrice = toPrice(this.state.taxRate * (this.props.cart.itemsPrice- this.props.cart.discount)/100);

    this.props.cart.totalPrice = toPrice(this.props.cart.itemsPrice - this.props.cart.discount + this.props.cart.shippingPrice + this.props.cart.taxPrice);

    console.log('itemsPrice  : ' + this.props.cart.totalPrice);
}

placeOrderHandler = () => {
  
  // this.props.history.push("/underconstruction");
  
  // Bat dau save order 12/19/2020
  // console.log('vo save ORDER HEADER');
  console.log('data DETAIL post ' + JSON.stringify(this.props.cart.cartItems));

  var data = {
    orders_customer_id: this.props.currcustomer.customerInfo.id,
    orders_date: Date(),
    orders_status: 0,
    name: this.props.cart.shippingAddress.addressObj.fullname,
    address: this.props.cart.shippingAddress.addressObj.address,
    city: this.props.cart.shippingAddress.addressObj.city,
    state: this.props.cart.shippingAddress.addressObj.state,
    country: this.props.cart.shippingAddress.addressObj.country,
    zipcode: this.props.cart.shippingAddress.addressObj.postalcode,
    ship: this.props.cart.shippingPrice,
    tax: this.props.cart.taxPrice,
    grand_amount: this.props.cart.totalPrice,
    orders_des: this.state.orders_des,
    orders_promotion: this.state.discountcode,
    orderdetails: this.props.cart.cartItems,
    // rieng discount phai lay tu state
    discount: this.state.discount
  };
// console.log('data truoc khi save tai day xem cai ngay xem sao ta' + JSON.stringify(data));
// console.log('this.state.token ' + this.state.token);

  orderDataService.create(data, this.state.token)
    .then(response => {
      this.setState({
          new_order_id: response.data.id,
          message: 'Your order: ' + response.data.id + ' is saved ... ' ,
          submitted: true
      });
      console.log(response.data);
      
        // ---- email module: Send email to customer
        const messageHtml =  renderEmail(
          <MyEmail 
            name={this.props.cart.shippingAddress.addressObj.fullname} 
            mylink={this.state.REACT_APP_CLIENT_URL + "orders/" + this.state.new_order_id}
            childrenextra={"You has just created a new order. You can make payment by login then go to Menu - Orders History and select your order #: " + this.state.new_order_id + ". Total amount is: $ " + this.props.cart.totalPrice}
          >
             Click here, {this.state.message}
          </MyEmail>
          );

          axios({
              method: "POST", 
              url: this.state.REACT_APP_URL + "send", 
              data: 
              {
                name: this.props.currcustomer.customerInfo.customers_name,
                email: this.props.currcustomer.customerInfo.customers_email,
                subject: "The Ky Store: new order!",
                messageHtml: messageHtml
              }
          }).then((response)=>{
              if (response.data.msg === 'success'){
                  // alert("Please check your email for more detai."); 
                  // this.resetForm()
              }else if(response.data.msg === 'fail'){
                  alert("Oops, something went wrong. Try again...")
              }
          })
          // ---- End send email to customer
      
    })
    .catch(e => {
      console.log('loi trong order ne : ' + e);
      this.setState({
        errMessage: e=='Error: Request failed with status code 401'?'Token expired, please log-out and sign-in again!':'Unkown error, please try again later!'
      });
    });
    
    console.log('submit ne: ' + this.state.submitted);
    console.log('message ne: ' + this.state.message);
    console.log('order ID ne: ' + this.state.new_order_id);

    this.props.clearCart();
    

    if (this.state.submitted) {
      console.log('xong het roi order');
      this.props.history.push('/orders/' + this.state.new_order_id);
    }
}
        
render() {
  if (this.state.failure) {
    return <h1>I listened to your problems, now listen to mine: {this.state.exception}</h1>;
  } else {
  return (
  
    <div className="info">
      {this.state.message ?  
        <div className="card">
          <div className="card card-body">
            
            {!this.state.sdkReady? 
              this.state.message + '. Repeated!!! ' + this.state.sdkReady + ' - ' + this.state.grandTotal
            :
            (
              /* <PayPalButton amount={this.state.grandTotal} onSuccess={this.successPaymentHandler}> */
              
              <div>
                {this.state.submitted?
                  this.props.history.push('/orders/' + this.state.new_order_id)
                  :
                ( null
                /* <div>
                <div> Your order ID is: {this.state.new_order_id + ' thru Paypal system. Total amount is: $' + this.state.grandTotal}</div>
                <br></br>
                <br></br>
                <PayPalButton 
                  amount={this.state.grandTotal} 
                  onSuccess={this.successPaymentHandler}
                  onError={this.errorPaymentHandler}
                  onCancel={this.cancelPaymentHandler}
                >
                </PayPalButton>
                </div> */
                )}
              </div>
            )
            }

            
          <br></br>
          <br></br>

          </div>
          <div className="card card-body">
              {/* <Link to="/filterproducts/-1?usvn_longtieng=0">Browse All Products</Link> */}
              <a href ="filterproducts/-1?usvn_longtieng=0">Browse All Products</a>
            </div>
        </div>
      : 
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      }
      {/* {this.state.message ? null :  */}

        {this.state.errMessage != 'Token expired, please log-out and sign-in again!' ?
          <div className="row top">
        {/* <div className="col-2"> */}
        <div className="order-info">
          <div className="">
            
              <div className="card card-body">
              
                <h2>Shipping</h2>
                {this.props.cart.shippingAddress && this.props.cart.shippingAddress.addressObj?
                  <p>
                    <strong>Name:</strong> {this.props.cart.shippingAddress.addressObj.fullname} <br />
                    <strong>Address: </strong> {this.props.cart.shippingAddress.addressObj.address},
                    {this.props.cart.shippingAddress.addressObj.city}, 
                    {this.props.cart.shippingAddress.addressObj.state},
                    {this.props.cart.shippingAddress.addressObj.zip},
                    {this.props.cart.shippingAddress.addressObj.country}
                  </p>
                : null
                }
              </div>
            
            
              <div className="card card-body">
                <h2>Payment</h2>
                {this.props.cart.paymentMethod && this.props.cart.paymentMethod.paymentObj?
                <p>
                  <strong>Method:</strong> {this.props.cart.paymentMethod.paymentObj.paymentMethod}
                  . (<strong>Currency:</strong> {this.props.cart.paymentMethod.paymentObj.currency})
                </p>
                : null
                }
              </div>
            
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {this.props.cart.cartItems && this.props.cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div className="smallavatar">
                          <img
                            src={this.state.REACT_APP_URL + item.image}
                            alt={this.state.REACT_APP_URL + item.name}
                            width="100" heigth="100" 
                          ></img>
                        </div>
                        <div className="productname-placeorder">
                          <Link to={"/productview/" + item.product}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            
          </div>
        </div>

        <div className="col-4">
          <div className="card card-body-sum">
            <ul>
              <h2>Order Summary</h2>

                <div className="row">
                  <div className="">1. Order amount: </div>
                  <div className=""> $ {this.props.cart.itemsPrice}</div>
                </div>


                <div className="row">
                  <label htmlFor="discountcode">
                    (*) Discount Code
                </label>
                  <input type="text" name="discountcode" id="discountcode" 
                    value={this.state.discountcodetemp} 
                    onChange={(e) => this.onChangeDiscount(e)}>
                  </input>
                    <button
                        type="button"
                        onClick={() => this.applyDiscountCode(this.props.cart.itemsPrice)}
                        className="btn btn-info"
                      >Apply
                    </button>
                  </div>
                  {this.state.discountmessage?<MessageBox variant="danger">{this.state.discountmessage}</MessageBox>:null}

                <div className="row">
                  <div className="">2. Discount</div>
                  <div className=""> $ {this.state.discount}</div>
                </div>
                
                <br></br>

                <div className="row">
                  <div className="">3. Amount (before tax): </div>
                  <div className=""> $ {this.props.cart.itemsPrice - this.state.discount}</div>
                </div>
                
                <div className="row">
                  <div className="">+ Sale Tax ({this.state.taxRate}%)</div><br />
                  <div className=""> $ {this.props.cart.taxPrice}</div>
                </div>

                <div className="row">
                  <div className="">+ Shipping ({this.props.cart.physicShippping} items)</div>
                  <div className=""> $ {this.props.cart.shippingPrice}</div>
                </div>


                <div className="row">
                  <div className="">
                    <strong>4. Total amount</strong><br />
                  </div>
                  <div className="">
                    <strong> $ {this.props.cart.totalPrice}</strong>
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <label htmlFor="orders_des">
                    Note to seller
                  </label>
                  <textarea id="wmd-input" name="post-text" 
                    className="form-control" data-post-type-id="2" cols="1" rows="11" 
                    value={this.state.orders_des} onChange={(e) => this.onChangeOrdersDes(e)} 
                    placeholder="Endter content here">
                  </textarea>
                  <h6>(*) 200 characters, thank you</h6>
                </div>

                <br></br>

                <button
                  type="button"
                  onClick={this.placeOrderHandler}
                  className="btn-block btn-success"
                  disabled={this.props.cart.cartItems.length === 0}
                >
                  Place Order
                </button>

            </ul>
          </div>
        </div>
      </div>
        : 
        (
          <div className="card">
            <p>{this.state.errMessage}  
              <a href ="customersignin"> or Go back to Home Page ... </a>
            </p>
          </div>
        )
        }  
        
    </div>
  
  )
  
  }
}

}
const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
})


const mapStateToProps = (state, ownProps) => {
    console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
    
    return {
        // currcustomer: state.customerSignin.customerInfo    // cu
        cart: state.cart,
        currcustomer: state.customerSignin
    }
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

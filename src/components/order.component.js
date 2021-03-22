import React, { Component } from "react";
import orderDataService from "../services/order.service";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import  { payOrder }  from '../actions/orderActions';
import { connect } from 'react-redux';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

import myUtility from "../utils/utility";


class Order extends Component {
  constructor(props) {
    super(props);
    this.getOrder = this.getOrder.bind(this);
    this.updateorder_status = this.updateorder_status.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);

    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      token: this.props.currcustomer.customerInfo?this.props.currcustomer.customerInfo.token:null,
      currentOrder: {
        id: null,
        orders_date: "",
        payment_update_time: "",
        orders_status: 0,
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        discount: 0.00,
        tax: 0.00,
        ship: 0.00,
        grand_amount: 0.00
      },
      shippingPrice: 0.00,
      tax: 0.00,
      discount: 0.00,
      submitted: null,
      sdkReady: false,
      errorPay: this.props.orderPay.error,
      successPay: this.props.orderPay.success,
      loadingPay: this.props.orderPay.loading,
      message: null
    };
  }

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
    console.log('order detail here');
    this.getOrder(this.props.match.params.orders_id);

    if(!window.paypal) {
      this.addPayPalScript();
    } else {
      this.setState({
        sdkReady: true
      });
    }
  }
  // lo xa qua, khong can error cancel me gi rao 12282020
      errorPaymentHandler(paymentResult) {
        console.log('error payment errrrr' + JSON.stringify(paymentResult));
        console.log('hihihihihiiii err = ' + this.props.orderPay);
        
        // this.setState({
        //   message: "You can pay this order later by go to Order History - Pay by Paypal",
        //   errorPay: this.props.orderPay.error,
        //   submitted: true
        // });
        // console.log('error message: ' + this.state.message);
        if (!this.props.orderPay) {
          this.props.history.push('/orders/' + this.state.new_order_id)
        }
      }
  // lo xa qua, khong can error cancel me gi rao 12282020
      cancelPaymentHandler(paymentResult) {
        console.log('cancel payment thiet la cancel ' + JSON.stringify(paymentResult));
        console.log('this.props.orderPay.error  ' + this.props.orderPay);
        this.setState({
          message: "You can pay this order later by go to Order History - Pay by Paypal",
          errorPay: this.props.orderPay.error,
          submitted: true
        });
        console.log('cancel message: ' + this.state.message);
        // this.props.history.push('/orders/' + this.state.new_order_id)
      }
      
  successPaymentHandler = (paymentResult) => {
    console.log('result payment: ' + JSON.stringify(paymentResult));
    console.log('result payment: ' + JSON.stringify(this.state.currentOrder));
    this.setState({
      successPay: this.props.orderPay.success,
      submitted: true
    }); 
    this.props.payOrder(this.state.currentOrder, paymentResult);

      // this.props.history.push('/orders/' + this.state.new_order_id)
      this.setState({
        successPay: this.props.orderPay.success,
        submitted: true
      }); 
      console.log('successPay ' + this.state.successPay);
      
  }

  componentWillReceiveProps(nextProps) {
    console.log('this props ' + this.props.orderPay.success);
    console.log('next props ' + nextProps.orderPay.success);

    if (nextProps.orderPay.success) {
        this.setState({
          errorPay: nextProps.orderPay.error,
          successPay: nextProps.orderPay.success,
          loadingPay: nextProps.orderPay.loading,
        });
        
        this.setState(prevState => ({
          currentOrder: {
            ...prevState.currentOrder,
            orders_status: 1
          }
        }));
      }
      console.log('successPay will props thisthis   ' + this.state.successPay);
      console.log('oder status   ' + this.state.currentOrder.orders_status);
    // this.getOrder(this.props.match.params.orders_id);
      
  }

  getOrder(orders_id) {
    console.log('order id trg getOrder: ' + orders_id);
    orderDataService.get(orders_id, this.state.token)
      .then(response => {
        this.setState({
          currentOrder: response.data,
          shippingPrice: response.data.ship,
          discount: response.data.discount,
          tax: response.data.tax
        });
        console.log('get order xong thi data tu DB tra ve la :  ' + JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }

  orderDateTranslate(ngay) {
    const ngayNe = new Date(ngay).toLocaleDateString();
    return ngayNe
  }
  displayCustName(obj) {
    if (obj) {
      var custName = obj.customers_name;
      return custName
    } else {
      return false
    }
  }

  displayCustAddress(obj) {
    if (obj) {
      var custAddress = obj.customers_address + ", " + obj.customers_city + ", " + obj.customers_state  + ", " + obj.country;
      return custAddress
    } else {
      return false
    }
  }

  displayOrderdetails(orderDetailArr) {
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    const toPrice2 = (num) => Number(num.toFixed(2) ); // 5.123 => "5.12" => 5.12
    if (orderDetailArr) {
      var totalB4Tax = 0.00;
      var grand_amount = 0.00;
      orderDetailArr.forEach(element => {
        totalB4Tax = toPrice(totalB4Tax + element.ordersdetail_quantity*element.ordersdetail_price)
        grand_amount = toPrice(totalB4Tax - this.state.discount + this.state.tax + this.state.shippingPrice)
        // grand_amount = totalB4Tax + Number((totalB4Tax*this.state.tax).toExponential(2)) + this.state.shippingPrice
      });

      return (
      
      <div className="placeorder">
        <div className="placeorder-info">
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
            </ul>
            
              
            { // duyet mang orderDetailArr
            orderDetailArr.map(item =>
              
              
              <div className="cart" key={item.id} >
                      <div>{item.products_image}
                        <img src={this.state.REACT_APP_URL + item.product.products_image} 
                          data-ll-status="loaded" className="smallavatar" 
                          width="100" heigth="100" alt={item.product.products_image} 
                          />
                      </div>
                      <div>
                        <div className="cart-list">
                        <Link to={"/products/" + item.ordersdetail_product_id}>
                          {item.product.products_name}
                        </Link>
                        </div>
                        <div className="cart-list">
                          <p className="cart-list">Qty: {item.ordersdetail_quantity}</p>
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.ordersdetail_price}
                      </div>  
                </div>

            )   // end of map
            // END duyet mang orderDetailArr
            }
            
        </div>
        <div className="placeorder-action col">
              <ul>
                <li>
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Order Total</div>
                  <div>${totalB4Tax}</div>
                </li>
                <li>
                  <div>Discount</div>
                  <div>${this.state.discount}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${this.state.shippingPrice}</div>
                </li>
                <li>
                  <div>Taxxxx</div>
                  <div>${this.state.tax}</div>
                </li>
                <li>
                  <div>Grand Total</div>
                  <div>${grand_amount}</div>
                  {/* <div>${totalB4Tax + toPrice(totalB4Tax*this.state.tax) + this.state.shippingPrice}</div> */}
                  {/* totalB4Tax + Number((totalB4Tax*this.state.tax).toExponential(2)) + this.state.shippingPrice */}
                </li>
                <br></br>
                <li>
                {this.state.errorPay && (<MessageBox variant="danger">{this.state.error}</MessageBox>)}
                {this.state.loadingPay && (<LoadingBox>{this.state.loadingPay}</LoadingBox>)}
                  <div className="btn btn-block">
                    {this.state.currentOrder.orders_status === 0 ?
                    <PayPalButton 
                      amount = {this.state.currentOrder.grand_amount>0?this.state.currentOrder.grand_amount:0.01}
                      description = {'Order ' + this.state.currentOrder.id}
                      onSuccess={this.successPaymentHandler}
                      // lo xa qua, khong can error cancel me gi rao 12282020
                      // onError={this.errorPaymentHandler}
                      // onCancel={this.cancelPaymentHandler}
                    >
                    </PayPalButton>
                    : (null)
                  }
                  </div>
                </li>

              </ul>
          </div>
      </div>
      )   // end of return
    } else {
      return "Cart is empty"
    }
  }

  updateorder_status(status) {
    console.log('Dung update status ' + status);
    var data = {
      orders_id: this.state.currentOrder.id,
      orders_status: status
    };

    orderDataService.update(this.state.currentOrder.id, data)
      .then(response => {
        console.log('in update ' + data.orders_id);
        this.setState(prevState => ({
          currentOrder: {
            ...prevState.currentOrder,
            orders_status: status
          }
        }));
        console.log('after update status ' + response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //works great 6/26/2020
  updateOrder() {
    
    //console.log('CAT id trong update: ' + this.state.currentOrder.id);
    orderDataService.update(
      this.state.currentOrder.id,
      this.state.currentOrder
    )
      .then(response => {
        // Sequelize xong
        console.log(response.data);

        this.setState({
          message: "The order was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/orders";
  }

  //works great 6/26/2020
  deleteOrder() {  
    console.log('vo delete func ben trong order component   :  ' + this.state.currentOrder.id);  
    orderDataService.delete(this.state.currentOrder.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/orders')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;

    return (
    
      <div className="col">
        <br></br>
        <Link to={"/ordersbycustomer/" + this.props.currcustomer.customerInfo.id} >Back to Order History</Link>
        {currentOrder ? (
        <div className="col">
          <div className="order-header">
              <h2>Order Information</h2>
              <form>
                  <div className="order-info">
                    <label className="order-info-element"><strong>Order #:</strong></label>
                      {currentOrder.id}
                    <label className="order-info-element"><strong>Order Date:</strong></label>
                      {myUtility.toMyFormatDate(currentOrder.orders_date)}
                    <label className="order-info-element"><strong>Order Status: </strong></label>
                      {currentOrder.orders_status === 0 ? "New Order, Not Paid. " : currentOrder.orders_status === 1 ? "Paid Off. " : "Shipped. "}
                  </div>
                  <div className="order-info">
                    <label className="order-info-element"><strong>Payment info: </strong></label>
                      {currentOrder.payment_status ?  currentOrder.payment_status : "NA"}
                    <label className="order-info-element"><strong>Payment Date: </strong></label>
                      {currentOrder.payment_status ? myUtility.toMyFormatDate(currentOrder.payment_update_time) : " NA"}
                  </div>
                  <div className="order-info">
                    <label className="order-info-element"><strong>Customer: </strong></label>
                    { currentOrder.name? currentOrder.name:this.displayCustName(currentOrder.customer)}
                  
                    <label className="order-info-element"><strong>Address: </strong></label>
                    {currentOrder.address? (currentOrder.address + ", " + currentOrder.city + " - " + currentOrder.state + ", " + currentOrder.zipcode + ", " + currentOrder.country):this.displayCustAddress(currentOrder.customer)}
                  </div>

                  <div className="order-info">
                    <label className="order-info-element"><strong>Customer message: </strong></label>
                    {currentOrder.orders_des}
                  </div>

              </form>

              {/* Cac nut chuc nang */}
              {this.state.currentOrder.orders_status === 0 || this.props.currcustomer.customerInfo.chutcheo_city ?
                <div>
                  <hr></hr>
                    <button className="btn btn-danger"
                      //button badge-danger mr-2
                      onClick={this.deleteOrder}>
                      Delete
                    </button>
                    <p>{this.state.message}</p>
                </div>
                :
                (null)
              }
         
            </div>

              
            {/* Display detail of order */}
              
            { this.displayOrderdetails(currentOrder.orderdetails) }
            

              
  
          </div>

        
        ) 
        : // Neu currentOrder empty
        (
          <div>
            <br />
            <p>Empty order ...</p>
          </div>
        )
        // /end of check currentOrder
        }

      </div>

    );
  }
}


const mapDispatchToProps = dispatch => ({
  payOrder: (order,paymentResult) => dispatch(payOrder(order,paymentResult))
})

const mapStateToProps = (state, ownProps) => {
  console.log('orderPay phan mapstatetoprops order component' + JSON.stringify(state.orderPay));
  return {
    orderPay: state.orderPay,
    cart: state.cart,
    currcustomer: state.customerSignin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);

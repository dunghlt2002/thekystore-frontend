import React, { Component } from "react";
import orderDataService from "../services/order.service";
import { Link } from "react-router-dom";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.getOrder = this.getOrder.bind(this);
    this.updateorder_status = this.updateorder_status.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);

    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      currentOrder: {
        id: null,
        orders_date: "",
        orders_status: 0,
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: ""
      },
      totalPrice: 0,
      shippingPrice: 0,
      tax: 0.06,
      message: ""
    };
  }

  componentDidMount() {
    console.log('order detail here');
    this.getOrder(this.props.match.params.orders_id);
  }

  getOrder(orders_id) {
    console.log('order id trg getOrder: ' + orders_id);
    orderDataService.get(orders_id)
      .then(response => {
        this.setState({
          currentOrder: response.data,
          shippingPrice: response.data.ship
          // tax: response.data.tax
        });
        console.log(response.data);
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
    if (orderDetailArr) {
      var totalB4Tax = 0;
      orderDetailArr.forEach(element => {
        totalB4Tax = totalB4Tax + element.ordersdetail_quantity*element.ordersdetail_price
        
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
                      {/* <img src={"http://localhost:8080/" + item.product.products_image} data-ll-status="loaded" class="smallavatar" width="100" heigth="100" alt={item.product.products_image} /> */}
                        <img src={this.state.REACT_APP_URL + item.product.products_image} data-ll-status="loaded" class="smallavatar" width="100" heigth="100" alt={item.product.products_image} />
                      </div>
                      <div>
                        <tr className="cart-list">
                        <Link to={"/products/" + item.ordersdetail_product_id}>
                          {item.product.products_name}
                        </Link>
                        </tr>
                        <tr className="cart-list">
                          Qty: {item.ordersdetail_quantity}
                        </tr>
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
                  <div>Shipping</div>
                  <div>${this.state.shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>${Number((totalB4Tax*this.state.tax).toExponential(2))}</div>
                </li>
                <li>
                  <div>Grand Total</div>
                  <div>${totalB4Tax + Number((totalB4Tax*this.state.tax).toExponential(2)) + this.state.shippingPrice}</div>
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
    console.log('vo delete func   :  ' + this.state.currentOrder.id);  
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
        <Link to="/orders">Previous Page</Link>
        {currentOrder ? (
        <div className="col">
          <div className="order-header">
              <h2>Order Information</h2>
              <form>
                  <div className="order-info">
                    <label className="order-info-element"><strong>Order #:</strong></label>
                      {currentOrder.id}
                    <label className="order-info-element"><strong>Status: </strong></label>
                      {currentOrder.orders_status === 0 ? "New Order, Not Paid. " : currentOrder.orders_status === 1 ? "Paid Off. " : "Shipped. "}

                    {/* nut status update nay de hoc hoi cho vui chu hong co khac biet gi ro rang voi cac field khac */}
                    {(currentOrder.orders_status === 0) ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => this.updateorder_status(1)}
                      >
                        Pay Off this Order
                      </button>
                      
                    ) : (currentOrder.orders_status === 1) ? (
                      <button
                        className="btn btn-info mr-2"
                        //button badge-primary mr-2
                        onClick={() => this.updateorder_status(2)}
                      >
                        Ship this Order
                      </button>
                    ) : (
                      ". All Set!"
                    )
                  }
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
              <div>
                <hr></hr>
                  <button className="btn btn-danger"
                    //button badge-danger mr-2
                    onClick={this.deleteOrder}>
                    Delete
                  </button>

                  <button type="submit" className="btn btn-success"
                    // button badge-success
                    onClick={this.updateOrder}>
                    Update
                  </button>
                  <button onClick={this.props.history.goBack} 
                    type="button" className="btn btn-danger" data-dismiss="modal">
                    Discard
                  </button>
                  <p>{this.state.message}</p>
              </div>
         
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

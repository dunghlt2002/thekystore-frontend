import React, { Component } from "react";
import orderDataService from "../services/order.service";
import customerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class ordersList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchKeyword = this.onChangesearchKeyword.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.onChangesearchCustomer = this.onChangesearchCustomer.bind(this);
    this.searchCustomerInCustomer = this.searchCustomerInCustomer.bind(this);
    // this.searchCustomer = this.searchCustomer.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);

    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      searchKeyword: "",
      // searchKhach: [],
      searchCustomer: ""
    };
  }

  componentDidMount() {
    this.retrieveOrders();
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
      var custAddress = obj.customers_address + ", " + obj.customers_city + ", " + obj.customers_state;
      return custAddress
    } else {
      return false
    }
  }

  //works great 6/26/2020
  deleteOrder(order_id) {  
    //console.log('vo delete func   :  ' + order_id);  
    orderDataService.delete(order_id)
      .then(response => {
        console.log(response.data);
        // this.props.history.push('/orders')
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/orders";
  }

  onChangesearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  onChangesearchCustomer(e) {
    const searchCustomer = e.target.value;

    this.setState({
      searchCustomer: searchCustomer
    });

    customerDataService.findByKeyword(searchCustomer)
    .then(response => {
      this.setState({
        // searchKhach: response.data,
        searchKeyword: response.data[0].id
      });
      // console.log('data ' + this.state.searchKeyword);
      
    })
    .catch(e => {
      console.log(e);
    });

  }

  searchCustomerInCustomer() {
    // console.log('keyword cust CiC ' + this.state.searchCustomer);

    customerDataService.findByKeyword(this.state.searchCustomer)
      .then(response => {
        this.setState({
          // searchKhach: response.data,
          searchKeyword: response.data[0].id
        });
        // console.log('data ' + this.state.searchKeyword);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  // searchCustomer() {
  //   orderDataService.findByKeyword(this.state.searchCustomer)
  //     .then(response => {
  //       this.setState({
  //         orders: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  retrieveOrders() {
    orderDataService.getAll()
      .then(response => {
        this.setState({
          orders: response.data
        }
        );
        console.log(response.data);
        // console.log(response.data[5].customer.customers_name);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveorders();
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index
    });
  }

  searchKeyword() {
    // findOne ben backend no sai sai gi do khng tra ve data
    // orderDataService.findOne(this.state.searchKeyword)
    orderDataService.findByKeyword(this.state.searchKeyword)
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  render() {
    // const { searchKeyword, orders, currentOrder, currentIndex } = this.state;
    const { searchKeyword, searchCustomer, orders } = this.state;

    return (
      <div className="col mb-3 border">
          <div className="order-header">

            <input
              type="text"
              className="searchInput"
              placeholder="Search by order or customer #"
              value={searchKeyword}
              onChange={this.onChangesearchKeyword}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchKeyword}
            >
              Search Order
            </button>


            <input
              type="text"
              className="searchInput"
              placeholder="ONE WORD ... customer name to ID ==> "
              value={searchCustomer}
              onChange={this.onChangesearchCustomer}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.searchKeyword}
            >
              Search Order
            </button>
            
          </div>


          <table className="table col-12 center">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>Cust ID</th>
                <th>USER</th>
                <th>Address</th>
                <th>Country</th>
                <th>Status</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (<tr key={order.id}>
                <td>{order.id}</td>
                <td>{this.orderDateTranslate(order.orders_date)}</td>
                <td>{order.orders_customer_id}</td>
                <td>{ order.name? order.name:this.displayCustName(order.customer)}</td>
                <td>
                  {order.address? (order.address + ", " + order.city + " - " + order.state + ", " + order.zipcode):this.displayCustAddress(order.customer)}
                </td>
                <td>{order.country}</td>
                <td>{order.orders_status}</td>
                <td>
                  <Link to={"/orders/" + order.id} className="btn btn-info" >Details</Link>
                  <button type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>))}
            </tbody>
          </table>

      </div>
        
    );
  }
}

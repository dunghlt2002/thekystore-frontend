import React, { Component } from "react";
import customerDataService from "../services/customer.service";
// import axios from "axios";
// import myUtility from "../utils/utility";
import { customerLogoutFetch } from '../actions/customerActions';
import { connect } from 'react-redux';


// Ben thekystore khong su dung avatar

class CustomerProfile extends Component {
    constructor(props) {
      super(props);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
     
      this.getCustomer = this.getCustomer.bind(this);
      this.updateCustomer = this.updateCustomer.bind(this);

      this.state = {
          API_URL: process.env.REACT_APP_URL,
          loading: null,
          customerInfo: null,
          currentCustomer: {
            id: null,
            customers_email: '',
            customers_password: '',
            token: ''
          },
          message: "",
          error: null
      };
  }

  componentDidMount() {

    console.log('hi profilet diMount');
    if (this.props.currCustomer === null) {
      this.props.history.push("/customersignin");
    }
    else {
      console.log('params ' + this.props.match.params.id);
      console.log('params ' + this.props.currCustomer.id);
      this.getCustomer(this.props.match.params.id);   // kieu truyen ty signin hay list qua
      // this.getCustomer(this.props.currCustomer.customerInfo.id);    // kieu load tu cookie

      // this.getCustomer(this.props.currCustomer.customerInfo.id);
    }

  }

  onChangeEmail(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const customers_email = e.target.value;
    console.log('email moi ' +  customers_email);
    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          customers_email: customers_email
        }
      };
    });
    console.log('new customer ' + JSON.stringify(this.state.currentCustomer));
  }

  onChangePassword(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const customers_password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          customers_password: customers_password
        }
      };
    });
  }

  getCustomer(id) {
    console.log('customer id trg getCustomer: ' + id);
    customerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCustomer() {
    
    //console.log('CAT id trong update: ' + this.state.currentCustomer.id);
    customerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then(response => {
        // Sequelize xong
        console.log('customer updated ' + response.data);
        this.setState({
          message: "The customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  logoutHandler = (e) => {
    e.preventDefault();
    // dispatch(userLoginFetch(this.state.user, this.state.password));
    // this.props.userLogoutFetch(this.state.user,this.state.password);
    this.props.customerLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div className="profile-info">
      <div className="form">
        {/* <form onSubmit={this.submitHandler} > */}
        <form >
          <ul className="form-container">
            {
              (this.props.match.params.id === this.props.currCustomer.id) && 
            <li>
              <button type="button" onClick={this.logoutHandler} className="btn-block btn-danger">Logout</button>
            </li>
            }
            
            <li>
              <h2>Customer Profile  
              </h2>
            </li>
            <li>
              {this.state.loading && <div>Loading...</div>}
              {this.state.error && <div>{this.state.error}</div>}
              {this.state.message && <div>{this.state.message}</div>}
            </li>

            {/* htmlFor="email"> */}
            <li>
              <label >Email </label>
              <input value={currentCustomer.customers_email} type="text" name="customers_email" id="customers_email" onChange={(e) => this.onChangeEmail(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="password">Password</label>
              <input value={currentCustomer.customers_password} type="" id="customers_password" name="customers_password" onChange={(e) => this.onChangePassword(e)}>
              </input>
            </li>

            <li>
              <button type="button"  onClick={this.updateCustomer} className="btn-block btn-success">Update</button>
              {/* <button type="button"  onClick={this.updateCustomer} className="btn-block btn-danger">Delete</button> */}
            </li>
            
          </ul>
        </form>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  customerLogoutFetch: () => dispatch(customerLogoutFetch())
})
const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong Profile phan mapstatetoprops' + JSON.stringify(state.customerSignin));
  
  return {
      currCustomer: state.customerSignin.customerInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);


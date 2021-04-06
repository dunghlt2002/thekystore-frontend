import React, { Component } from "react";
import customerDataService from "../services/customer.service";

// import axios from "axios";
// import myUtility from "../utils/utility";

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

import { customerLogoutFetch } from '../actions/customerActions';
import { connect } from 'react-redux';

// Ben thekystore khong su dung avatar

class CustomerProfile extends Component {
    constructor(props) {
      super(props);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
      this.onChangeCity = this.onChangeCity.bind(this);
      this.onChangeState = this.onChangeState.bind(this);
      this.onChangeZip = this.onChangeZip.bind(this);
      this.onChangeCountry = this.onChangeCountry.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
     
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
            customers_address: '',
            customers_city: '',
            state: '',
            customers_zip: '',
            customers_country: '',
            customers_phone: '',
            customers_name: '',
            token: ''
          },
          customers_zip_note: 'Digit only',
          message: "",
          error: null
      };
  }

  componentDidMount() {
    console.log('profilet diMount - params ' + this.props.match.params.id);
    console.log('profilet diMount - curr login ' + this.props.currCustomer.id);
    if (this.props.currCustomer === null || 
      (this.props.match.params.id != this.props.currCustomer.id & !this.props.currCustomer.chutcheo_city)
    ) {
      this.props.history.push("/page909");
    }
    else {
      this.getCustomer(this.props.match.params.id);   // kieu truyen ty signin hay list qua
      // this.getCustomer(this.props.currCustomer.customerInfo.id);    // kieu load tu cookie
      // this.getCustomer(this.props.currCustomer.customerInfo.id);
    }

  }

  onChangeEmail(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const customers_email = e.target.value;
    // console.log('email moi ' +  customers_email);
    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          customers_email: customers_email
        }
      };
    });
    // console.log('new customer ' + JSON.stringify(this.state.currentCustomer));
  }
  onChangePassword(e) {
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
  onChangeName(e) {
    const fullname = e.target.value;
    // UPDATE STATE BY OBJECT style
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_name: fullname
      }
    }));
  }
  onChangeAddress(e) {
    const address = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_address: address
      }
    }));
  }
  onChangeCity(e) {
    const city = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_city: city
      }
    }));
  }
  onChangeState(e) {
    const state = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_state: state
      }
    }));
  }
  onChangeZip(e) {
    const zip = e.target.value;
    if (!Number(zip)) {
      console.log('ZIP: requires number');
      return;
    } else {
      this.setState(prevState => ({
        currentCustomer: {
          ...prevState.currentCustomer,
          customers_zip: zip
        }
      }));
    }
    
  }

  onChangeCountry(e) {
    const country = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_country: country
      }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;
    if (!Number(phone)) {
      console.log('PHONE : requires number');
      return;
    } else {
      this.setState(prevState => ({
        currentCustomer: {
          ...prevState.currentCustomer,
          customers_phone: phone
        }
      }));
    }
    
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
  discard = (e) => {
    // e.preventDefault();
    // this.props.history.push("/");
    this.props.history.goBack()
  }
  logoutHandler = (e) => {
    e.preventDefault();
    this.props.customerLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    const { currentCustomer } = this.state;

  return (
    <div className="profile-info">
      <div className="form">
        <form >
          <ul className="form-container">
            {
              (this.props.match.params.id == this.props.currCustomer.id) ? 
            (<li>
              <button type="button" onClick={this.logoutHandler} className="btn-block btn-danger">Logout</button>
            </li>) :
              (<LoadingBox variant="danger">{"Admin or different user info login"}</LoadingBox>)
            }
            
            <li>
              <h2>Customer Profile</h2>
            </li>
            <li>
              {this.state.loading && <div><MessageBox variant="success">{this.state.loading}</MessageBox></div>}
              {this.state.error && <div>><MessageBox variant="danger">{this.state.error}</MessageBox></div>}
              {this.state.message && <div><MessageBox variant="success">{this.state.message}</MessageBox></div>}
            </li>

            {/* htmlFor="email"> */}
            <li>
              <label >Email </label>
              <input value={currentCustomer.customers_email} type="text" name="customers_email" id="customers_email" onChange={(e) => this.onChangeEmail(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="password">Password</label>
              <input 
                value={currentCustomer.customers_password} type="" 
                id="customers_password" name="customers_password" 
                onChange={(e) => this.onChangePassword(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="address">Full Name</label>
              <input type="text" name="fullname" id="fullname" 
                value={currentCustomer.customers_name } 
                onChange={(e) => this.onChangeName(e)}>
              </input>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
                value={currentCustomer.customers_address } 
                onChange={(e) => this.onChangeAddress(e)}>
              </input>
            </li>
            <li>
              <label htmlFor="city">
                City
              </label>
              <input type="text" name="city" id="city" 
                value={currentCustomer.customers_city} 
                onChange={(e) => this.onChangeCity(e)}>
              </input>
            {/* </li>
            <li> */}
              <label htmlFor="state">State</label>
              <input type="text" name="state" id="state" 
                value={currentCustomer.customers_state} 
                onChange={(e) => this.onChangeState(e)}>
              </input>
            </li>
            <li>
              <label htmlFor="zip">
                Zip Code <h6>{this.state.customers_zip_note}</h6>
              </label>
              <input type="text" name="zip" id="zip" 
                value={currentCustomer.customers_zip} 
                onChange={(e) => this.onChangeZip(e)}>
              </input>
            {/* </li>
            <li> */}
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" 
                value={currentCustomer.customers_country } 
                onChange={(e) => this.onChangeCountry(e)}>
              </input>
            </li>
            <li>
              <label htmlFor="phone">
                Phone <h6>(Optional)</h6>
              </label>
              <input type="text" name="country" id="phone" 
                value={currentCustomer.customers_phone } 
                onChange={(e) => this.onChangePhone(e)}>
              </input>
            </li>

            <li>
              <button type="button"  onClick={this.updateCustomer} className="btn-block btn-success">Update</button>
              {/* <button type="button"  onClick={this.updateCustomer} className="btn-block btn-danger">Delete</button> */}
            </li>
            <li>
              <button type="button"  onClick={this.discard} className="btn-block btn-info">Discard</button>
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


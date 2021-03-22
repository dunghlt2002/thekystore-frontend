import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import axios from "axios";
import { Link } from "react-router-dom";

import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'

import MessageBox from '../components/MessageBox';
// import LoadingBox from '../components/LoadingBox';

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomers_name = this.onChangecustomers_name.bind(this);
    this.onChangecustomers_email = this.onChangecustomers_email.bind(this);
    this.onChangecustomers_password = this.onChangecustomers_password.bind(this);
    this.onChangecustomers_address = this.onChangecustomers_address.bind(this);
    this.onChangecustomers_city = this.onChangecustomers_city.bind(this);
    this.onChangecustomers_zip = this.onChangecustomers_zip.bind(this);
    this.onChangecustomers_state = this.onChangecustomers_state.bind(this);
    this.onChangecustomers_country = this.onChangecustomers_country.bind(this);
    this.onChangecustomers_phone = this.onChangecustomers_phone.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);
    this.onBlurCustomers_email = this.onBlurCustomers_email.bind(this);

    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      id: null,
      customers_name: "",
      customers_email: "", 
      customers_password: "", 
      customers_address: "", 
      customers_city: "", 
      customers_zip: "", 
      customers_state: "", 
      customers_country: "US", 
      customers_phone:'',
      custadv: false, // nhan quang cao On Off
      existingEmail: '',
      showFormDetail: false,
      submitted: false
    };
  }

  onChangecustomers_name(e) {
    this.setState({
      customers_name: e.target.value
    });
  }
  onChangecustomers_email(e) {
    this.setState({
      customers_email: e.target.value,
      existingEmail: ''
    });
  }
  onChangecustomers_password(e) {
    this.setState({
      customers_password: e.target.value
    });
  }
  onChangecustomers_address(e) {
    this.setState({
      customers_address: e.target.value
    });
  }
  onChangecustomers_city(e) {
    this.setState({
      customers_city: e.target.value
    });
  }
  onChangecustomers_zip(e) {
    this.setState({
      customers_zip: e.target.value
    });
  }
  onChangecustomers_state(e) {
    this.setState({
      customers_state: e.target.value
    });
  }
  onChangecustomers_country(e) {
    this.setState({
      customers_country: "US"
    });
  }
  onChangecustomers_phone(e) {
    this.setState({
      customers_phone: e.target.value
    });
  }

  // Khi go tung ky tu la onBLUR no kich hoat lien
  onBlurCustomers_email() {
    // console.log('hihihihihihi Blur  ' + this.state.customers_email);
    customerDataService.getByemail(this.state.customers_email)
        .then(response => {
          // console.log('data '  + JSON.stringify(response.data[0]));
          // console.log('err ' + JSON.stringify(response));
          if (response.data.length === 0 ) {
            this.setState({
              existingEmail: 'NEW email address, please fill-in your information',
              showFormDetail: true
            });
          }
          else {
            this.setState({
              currentCustomer: JSON.stringify(response.data[0]),
              existingEmail: 'This email is existing, please LOG-IN',
              showFormDetail: false
            });
          }
        })
        .catch(e => {
          console.log(e);
    });
  }

  saveCustomer() {
    console.log('vo save new customer');
    var data = {
      customers_name: this.state.customers_name,
      customers_email: this.state.customers_email,
      customers_password: this.state.customers_password,
      customers_address: this.state.customers_address,
      customers_city: this.state.customers_city,
      customers_state: this.state.customers_state,
      customers_country: this.state.customers_country,
      customers_phone: this.state.customers_phone,
      customers_zip: this.state.customers_zip
    };

    customerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          customers_name: response.data.customers_name,
          customers_email: response.data.customers_email,
          customers_address: response.data.customers_address,
          customers_city: response.data.customers_city,
          customers_state: response.data.customers_state,
          customers_country: response.data.customers_country,
          customers_phone: response.data.customers_phone,
          custadv: response.data.custadv,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

            // ---- email module: Send email to customer
            const messageHtml =  renderEmail(
              <MyEmail name={this.state.customers_name}> 
                "A customer name: {this.state.customers_name + " has just created in our system. Thank you for joinging us."}
              </MyEmail>
            );
    
            axios({
                method: "POST", 
                url: this.state.REACT_APP_URL + "send", 
                data: {
            name: this.state.customers_name,
            email: this.state.customers_email,
            subject: "www.thekystore.com: new customer account created",
            messageHtml: messageHtml
                }
            }).then((response)=>{
                if (response.data.msg === 'success'){
                    alert("Please check your email for more detai."); 
                    // this.resetForm()
                }else if(response.data.msg === 'fail'){
                    alert("Oops, something went wrong. Try again...")
                }
            })
            // End of mailling module
  }

  newCustomer() {
    this.setState({
      id: null,
      customers_name: "Full Name",
      customers_email: "aaa@bbb.com",
      customers_address: "cc dddddd",
      customers_city: "Eee",
      customers_state: "CA",
      customers_country: "US",
      customers_zip: "00000",
      custadv: false,
      showFormDetail: false,
      existingEmail: '',
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">

        {this.state.submitted ? (
          <div className="form-info">
            <MessageBox variant="success">Your new account has created successfully!</MessageBox>
            <button className="btn-block btn-primary" onClick={this.newCustomer}>
              Add another customer account
            </button>
            <li className="form">
              <Link to='/customersignin'>
                {/* onClick={this.backToSignIn} */}
                <button className="btn btn-primary">
                  Sign-in
                </button>
              </Link>
            </li>
          </div>
        ) : (
          <div className="form-container">
            <li>
              <h2>Add New Customer</h2>
            </li>

            <li>
              {this.state.showFormDetail && !this.state.submitted? 
                (
                  <div>
                    <MessageBox>{this.state.existingEmail}</MessageBox>
                  </div>
                ) : (
                  <div>
                      <Link to="/customersignin">{this.state.existingEmail}</Link>
                  </div>
                )
              }
            </li>

            {/* Bat dau phan render info fill-in cho new account */}
            <li>
              <label htmlFor="customers_email">Enter email (use to login)</label>
              <input
                type="text"
                className="form-control"
                id="customerssignin"
                required
                value={this.state.customers_email}
                onChange={this.onChangecustomers_email}
                onBlur={this.onBlurCustomers_email}
                name="customers_email"
              />
            </li>


            {this.state.showFormDetail ? (
            <div className="form-info">
            
                <li>
                  <label htmlFor="customers_password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerssignin"
                    required
                    value={this.state.customers_password}
                    onChange={this.onChangecustomers_password}
                    name="customers_password"
                  />
                </li>
                <li>
                  <label htmlFor="customers_name">Full name</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="fullname"
                    required
                    value={this.state.customers_name}
                    onChange={this.onChangecustomers_name}
                    name="customers_name"
                  />
                </li>

                <li>
                  <label htmlFor="customers_address">Address</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="address"
                    required
                    value={this.state.customers_address}
                    onChange={this.onChangecustomers_address}
                    name="customers_address"
                  />
                </li>

                <li>
                  <label htmlFor="customers_city">City</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="city"
                    required
                    value={this.state.customers_city}
                    onChange={this.onChangecustomers_city}
                    name="customers_city"
                  />
                {/* </li>
                <li> */}
                  <label htmlFor="customers_state">State</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="state"
                    required
                    value={this.state.customers_state}
                    onChange={this.onChangecustomers_state}
                    name="customers_state"
                  />
                </li>

                <li>
                  <label htmlFor="customers_zip">Zipcode</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="zip"
                    required
                    value={this.state.customers_zip}
                    onChange={this.onChangecustomers_zip}
                    name="customers_zip"
                  />
                {/* </li>
                <li> */}
                  <label htmlFor="customers_country">Country</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="country"
                    required
                    value={this.state.customers_country}
                    onChange={this.onChangecustomers_country}
                    name="customers_country"
                  />
                </li>

                <li>
                  <label htmlFor="customers_phone">Phone</label>
                  <input
                    type="text"
                    // className="form-control"
                    id="phone"
                    required
                    value={this.state.ccustomers_phone}
                    onChange={this.onChangecustomers_phone}
                    name="customers_phone"
                  />
                </li>

                {/* Buttons */}
                <li>
                  <button onClick={this.saveCustomer} className="btn-block btn-primary">
                    Create
                  </button>
                </li>

                <li className="form">
                  <Link to='/' className="btn btn-secondary">
                    <button className="btn btn-secondary">
                      Cancel
                    </button>
                  </Link>
                </li>

              </div>
              ) 
              // Cham dut phan render info fill-in cho new account
              :
              // Da co email existing, khong render gi nua
              (null)
              }
            
          </div>
        )}  
       
        {/* het phan check submitted */}

      </div>
    );
  }
}

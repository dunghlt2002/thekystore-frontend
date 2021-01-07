import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import axios from "axios";
import { Link } from "react-router-dom";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'


export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomers_email = this.onChangecustomers_email.bind(this);
    this.onChangecustomers_password = this.onChangecustomers_password.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.onBlurCustomers_email = this.onBlurCustomers_email.bind(this);
    
    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      REACT_APP_CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
      currentCustomer: {},
      id: null,
      customers_name: "",
      customers_email: "", 
      customers_password: "", 
      custadv: false, // nhan quang cao On Off
      existingEmail: '',
      showFormDetail: false,
      submitted: false
    };
  }

  backToSignIn() {
    // this.props.history.push("/customersignin");
    // window.location("/customersignin");
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

  onChangecustomers_country(e) {
    this.setState({
      customers_country: "US"
    });
  }

  onBlurCustomers_email() {
    console.log('hihihihihihi Blur  ' + this.state.customers_email);
    customerDataService.getByemail(this.state.customers_email)
        .then(response => {
          // console.log('data '  + JSON.stringify(response.data[0]));
          // console.log('err ' + JSON.stringify(response));
          
          if (response.data.length === 0 ) {
            this.setState({
              existingEmail: 'Not found this email, please try another one...',
              showFormDetail: false
            });
          }
          else {

            this.setState({
              id: JSON.stringify(response.data[0].id),
              customers_name: JSON.stringify(response.data[0].customers_name),
              existingEmail: 'Type your new password, ' + JSON.stringify(response.data[0].customers_name),
              showFormDetail: true
            });
          }
          
          console.log('2 ' + this.state.existingEmail + " - " + this.state.showFormDetail + " - " + this.state.customers_name);
          
        })
        .catch(e => {
          console.log(e);
    });
   
    
  }

  updateCustomer() {
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


  savePassword() {
    console.log('vo save pass');

    
    var data = {
      customers_email: this.state.customers_email,
      customers_password: this.state.customers_password
    };

  
    customerDataService.update(
      this.state.id,
      data
    )
      .then(response => {
        // Sequelize xong
        // console.log('customer password updated ' + response.data);
        this.setState({
          message: "Your password was updated successfully!",
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });

      // mailling
        const messageHtml =  renderEmail(
          <MyEmail mylink={this.state.REACT_APP_CLIENT_URL+'customersignin'} name={this.state.customers_name}> 
            "A password of : {this.state.customers_name + " has just updated in our system. Sing-in, click here."}
          </MyEmail>
        );

        axios({
            method: "POST", 
            url: this.state.REACT_APP_URL + "send", 
            data: {
        name: this.state.customers_name,
        email: this.state.customers_email,
        subject: "www.thekystore.com: new password updated",
        messageHtml: messageHtml
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                // alert("Your password is updated!"); 
            }else if(response.data.msg === 'fail'){
                alert("Oops, something went wrong. Try again")
            }
        })

  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-container-small">
            {this.state.message}
            <div>
              <Link to="/customersignin">Sign-in, click here</Link>
            </div>
          </div>
        ) : (
          <div className="form-container-small">
            <li>
              <h2>Update Password</h2>
            </li>

            <li>
              {this.state.showFormDetail && !this.state.submitted? (
                  <div>
                    {this.state.existingEmail}
                  </div>
              ) : (
                <div>
                    <Link to="/customersignin">{this.state.existingEmail}</Link>
                  </div>
                )

              }
              
            </li>


            <li>
              <label htmlFor="customers_email">Email (is used to login)</label>
              <input
                type="text"
                id="signininput"
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
                id="signininput"
                required
                value={this.state.customers_password}
                onChange={this.onChangecustomers_password}
                name="customers_password"
              />
            </li>


            <button onClick={this.savePassword} className="btn-block btn-primary">
              Reset Password
            </button>
            {/* <button onClick={this.backToSignIn} className="btn-block btn-primary">
              Sign-in
            </button> */}
            <div className="card">
              <Link to="/customersignin">or Sign-in, click here</Link>
            </div>

          </div>
        ) : (null)
            }



            
          </div>
        )}  
        {/* het phan check submitted */}

      </div>
    );
  }
}

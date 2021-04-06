import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'
import customerDataService from "../services/customer.service";
import MessageBox from '../components/MessageBox';

export default class ResetPasswordAskEmail extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomers_email = this.onChangecustomers_email.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      REACT_APP_CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
      id: null,
      customers_email: "", 
      existingEmail: '',
      showFormDetail: false,
      submitted: false
    };
  }

  backToSignIn() {
    this.props.history.push("/customersignin");
  }

  onChangecustomers_email(e) {
    this.setState({
      customers_email: e.target.value,
      existingEmail: ''
    });
  }
  

  sendEmail() {
    
    // console.log('vo send email ... ' + this.state.customers_email);

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(this.state.customers_email)) {
      console.log('email khong dung');
      this.setState({
        messageNote: 'Email is not valid!'
      });
    } else {
      this.setState({
        messageNote: null,
      });

      // console.log('hihihihihihi Blur  ' + this.state.customers_email);
      customerDataService.resetPasswordRequest(this.state.customers_email)
      .then(response => {
        // console.log(response.data);
        // console.log('do do do ');
        // console.log('data '  + JSON.stringify(response.data[0]));
        console.log('err ' + JSON.stringify(response));
        if (response.data.length === 0 ) {
          this.setState({
            messageNote: 'No email found, try again'
          });
        }
        else {
          
          
          this.setState({
            // currentCustomer: JSON.stringify(response.data[0]),
            existingEmail: 'A reset password link has just sent to your email related with account. Check email and reset your password, thank you!',
            customers_passwordtoken: response.data.customers_passwordtoken
          });

          // Send email 
            const messageHtml =  renderEmail(
              // We have received a request to reset your Amazon password. Use the following password reset PIN when entering your new Password:
              <MyEmail mylink={this.state.REACT_APP_CLIENT_URL +`resetpassword/` + this.state.customers_email + `oehctuhcdd` + this.state.customers_passwordtoken} name={this.state.customers_email}>
                We have received a request to reset your password, click here to continue.
              </MyEmail>
            );

            axios({
                method: "POST", 
                url: this.state.REACT_APP_URL + "send",
                data: {
                  email: this.state.customers_email,
                  subject: "www.thekystore.com: reset password link",
                  messageHtml: messageHtml
                }
            }).then((response)=>{
                if (response.data.msg === 'success'){
                    // alert("Please check your email for reset password link. Thank you!"); 
                    // this.resetForm()
                }else if(response.data.msg === 'fail'){
                    alert("Oops, something went wrong. Try again")
                }
            })
            this.setState({
              submitted: true
            });
          // End send email 

        }
      })
      .catch(e => {
        console.log(e);
      });


    }

   

  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-container">
            <h4>{this.state.existingEmail}</h4>
          </div>
        ) : (
          <div className="form-container-small">
            <li>
              <h2>Reset Password</h2>
            </li>

            <li>
              {!this.state.submitted? (
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

            {this.state.messageNote && 
              <div>
                <MessageBox variant="danger">{this.state.messageNote}</MessageBox>
              </div>
            }

            <li>
              <label htmlFor="customers_email">Email (is used to login)</label>
              <input
                type="text"
                id="signininput"
                required
                value={this.state.customers_email}
                onChange={this.onChangecustomers_email}
                name="customers_email"
              />
            </li>
            <li className="form">
              <button onClick={this.sendEmail} className="btn-block btn-success">
                Send Reset Link
              </button>
            </li>
            <li className="form">
              <Link to='/customersignin'>
                {/* onClick={this.backToSignIn} */}
                <button className="btn btn-primary">
                  Sign-in
                </button>
              </Link>
            </li>
            
          </div>
        )}  
        {/* het phan check submitted */}

      </div>
    );
  }
}

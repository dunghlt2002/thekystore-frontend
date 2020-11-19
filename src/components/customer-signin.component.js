import React, { Component } from "react";
// import customerDataService from "../services/customer.service";
import { Link, Redirect } from "react-router-dom";
import { customerLoginFetch } from '../actions/customerActions';
import { connect } from 'react-redux';


class SigninScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: '',
          loading: null,
          error: null,
          customerInfo: null,
          customers_email:'',
          customers_password:''
      }
  }
  
  isChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      //console.log(name);
      //console.log(value);
      this.setState({
          [name]: value
      });
      // console.log('ten cua truong la ' + [name]); // nho dat ten input text giong y nhu ten bien
      // console.log('gia tri  cua truong la ' + value);
  }
  
  // thu thoi, chay roi 07132020
  componentWillReceiveProps(nextProps) {
    if (nextProps.currCustomer) {
      //  this.props.history.push("/customers");
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      console.log('this.props.location.search: ' + this.props.location.search); //?redirecting=shipping
      console.log('Will Mount thi redirect la gi ta: ' + redirect);
      this.props.history.push(redirect);   // to sign-in before process cart
    }
  }

  componentDidMount() {
      console.log('customerInfo trong signin, phan DiMount ' + JSON.stringify(this.props.currCustomer));
      
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      console.log('this.props.location.search: ' + this.props.location.search); //?redirecting=shipping
      console.log('DiMount thi redirect la gi ta: ' + redirect);

      if (this.props.currCustomer) {
        console.log('currCustomer ' + JSON.stringify(this.props.currCustomer));
        this.props.history.push(redirect);   // to sign-in before process cart
        // this.props.history.push("/customers"); // for testing before process cart
      }      
  }

  submitHandler = (e) => {
    console.log('submit login ne');
    e.preventDefault();
    // dispatch(customerLoginFetch(this.state.customer, this.state.password));
    this.props.customerLoginFetch(this.state.customers_email,this.state.customers_password);
    console.log('con khong ta');
  }

render() {
  return (
  <div className="form">
    <form onSubmit={(e) => this.submitHandler(e)}>
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {this.state.loading && <div>Loading...</div>}
          {!this.props.currCustomer && <div>{this.props.currError.error}</div>}
          {/* {!this.props.currCustomer.customerInfo && <div>{this.props.currCustomer.error}</div>} */}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input name="customers_email" id="customers_email" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <label htmlFor="customers_password">Password</label>
          <input type="customers_password" id="customers_password" name="customers_password" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <button type="submit" className="btn btn-primary">Signin</button>
        </li>
        <li>
            <Link to="/addCustomer">New to Thekystore?</Link>
        </li>
        <li>
          {/* <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link> */}
        </li>
      </ul>
    </form>
  </div>
  )  
}
}

const mapDispatchToProps = dispatch => ({
  customerLoginFetch: (customers_email,customers_password) => dispatch(customerLoginFetch(customers_email,customers_password))
})
const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong Signin phan mapstatetoprops' + JSON.stringify(state.customerSignin));
  console.log('customerInfo trong Signin phan mapstatetoprops' + JSON.stringify(state.customerSignin.customerInfo));
  
  return {
      currCustomer: state.customerSignin.customerInfo,
      currError: state.customerSignin
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);

// export default SigninScreen;
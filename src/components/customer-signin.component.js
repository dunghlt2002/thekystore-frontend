import React, { Component } from "react";
// import customerDataService from "../services/customer.service";
// import { Link, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { customerLoginFetch } from '../actions/customerActions';
import { connect } from 'react-redux';
import MessageBox from '../components/MessageBox';
// import LoadingBox from '../components/LoadingBox';

class SigninScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: '',
          loading: null,
          error: null,
          customerInfo: null,
          customers_email:'',
          customers_password:'',
          chutcheo_adm: false
      }
  }
  
  // isChange la lam gon cac INPUT ve cung 1 function
  // nhung cung co vai bat tien khi muon 1 input nay se lam thay doi input khac ...
  // tuy truong hop ma dung CHUNG nhu vay hay TACH RIENG ra se hop ly hon
  isChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
          [name]: value
      });
      // this.props LUON LUON update khi can thiet. hinh nhu khong re-render
      this.props.currError.error='';
  }
  
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
    // console.log('submit login ne');
    e.preventDefault();
    this.props.customerLoginFetch(this.state.customers_email,this.state.customers_password);
    // console.log('con khong ta');
  }

render() {
  return (
  <div className="form">
    <form onSubmit={(e) => this.submitHandler(e)}>
      <ul className="form-container-small">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {this.state.loading && <div>Loading...</div>}
          {/* {!this.props.currCustomer && <div>{this.props.currError.error}</div>} */}
          {this.props.currError.error ? <div><MessageBox variant="danger">{this.props.currError.error}</MessageBox></div>:null}
        </li>
        <li>
          <label htmlFor="customers_email">
            Email
          </label>
          <input name="customers_email" id="signininput" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <label htmlFor="customers_password">Password</label>
          <input type="customers_password" id="signininput" name="customers_password" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <button type="submit" className="btn-block btn-primary">Signin</button>
        </li>
        <li>
            <Link to="/resetpasswordaskemail">Reset password</Link>
        </li>
        <li>
            <Link to="/addCustomer">New to thekystore.com? Create account</Link>
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
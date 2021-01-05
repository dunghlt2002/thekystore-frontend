import React, { Component } from "react";
// import userDataService from "../services/product.service";
// import { Link, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLoginFetch } from '../actions/userActions';
import { connect } from 'react-redux';


class SigninScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: '',
          loading: null,
          error: null,
          userInfo: null,
          user:'',
          email:'',
          password:''
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
    if (nextProps.currUser) {
      //  this.props.history.push("/customers");
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      console.log('this.props.location.search: ' + this.props.location.search); //?redirecting=shipping
      console.log('Will Mount thi redirect la gi ta: ' + redirect);
      this.props.history.push(redirect);   // to sign-in before process cart
    }
  }

  componentDidMount() {
      console.log('useInfo trong signin, phan DiMount ' + JSON.stringify(this.props.currUser));
      
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      console.log('this.props.location.search: ' + this.props.location.search); //?redirecting=shipping
      console.log('DiMount thi redirect la gi ta: ' + redirect);

      if (this.props.currUser) {
        console.log('currUser ' + JSON.stringify(this.props.currUser));
        this.props.history.push(redirect);   // to sign-in before process cart
        // this.props.history.push("/customers"); // for testing before process cart
      }      
  }

  submitHandler = (e) => {
    console.log('submit login ne');
    e.preventDefault();
    // dispatch(userLoginFetch(this.state.user, this.state.password));
    this.props.userLoginFetch(this.state.user,this.state.password);
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
          {!this.props.currUser && <div>{this.props.currError.error}</div>}
          {/* {!this.props.currUser.userInfo && <div>{this.props.currUser.error}</div>} */}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input name="user" id="user" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => this.isChange(e)}>
          </input>
        </li>
        <li>
          <button type="submit" className="btn btn-primary">Signin</button>
        </li>
        <li>
            <Link to="/adduser">New to Thekystore?</Link>
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
  userLoginFetch: (user,password) => dispatch(userLoginFetch(user,password))
})

const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong Signin phan mapstatetoprops' + JSON.stringify(state.userSignin));
  console.log('userInfo trong Signin phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo));
  
  return {
      currUser: state.userSignin.userInfo,
      currError: state.userSignin
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);

// export default SigninScreen;
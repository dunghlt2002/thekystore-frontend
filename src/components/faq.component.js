import React, { Component } from "react";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class UnderConstruction extends Component {
    constructor(props) {
      super(props);

      this.state = {
          REACT_APP_URL:  process.env.REACT_APP_URL
      };
  }


  render() {
    const { REACT_APP_URL } = this.state;

    return (
      <div className="order-info">
          {/* <img  className="product-image"  width="66%" src={REACT_APP_URL + "avatars/UnderConstruction.jpeg"} alt="under" /> */}
          <br></br>
          <h1 className="form">
            Common FAQ
          </h1>
            <div className="form-info">
            <strong>Customer outside USA</strong>
              <li>
                 Vietnam: Can not ship.
              </li>
              <li>
                 Canada: Can not ship.
              </li>
              <li>
                 Others: Can not ship.
              </li>
            </div>
            <div className="form-info">
              <strong>What is DVD-R vs Retail?</strong>
              <li>
                 DVD-R: collection by many format of DVD.
              </li>
              <li>
                 Retial: in sealed box.
              </li>
            </div>
            <div className="form-info">
              <strong>Shipping rate</strong>
              <li>
                 Regular shipping fee: $6.75
              </li>
              <li>
                 Free shipping: order over $50 (USPS only)
              </li>
           </div>
          <br></br> 
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLogoutFetch: () => dispatch(userLogoutFetch())
})
const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin));
  // console.log('ID  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.id));
  // console.log('token  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.token));
  
  return {
      currUser: state.userSignin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction);


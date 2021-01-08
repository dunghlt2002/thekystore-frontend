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
          {/* <img className="product-image" width="66%" src={REACT_APP_URL + "avatars/UnderConstruction.jpeg"} alt="under" /> */}
          <br></br>
          <br></br>
          <h1 className="form">
            About thekystore: www.thekystore.com
          </h1>
          <br></br>
          <div className="form">
            We have more than 15-year experience in retail in Goergia. From now we are completely selling our products online through this website.
          </div>
          {/* <div className="form">
            We love Chinese series movie, famous product from authors like Kim Dung, Co Long,... and now we are collecting them. We are selling them on ebay, on this website to people who has the same passion and want to collect these movies.
          </div>
          <div className="form">
            This is collection movies, most of them were prodeced in '80s, '90s decades and the quality is accepatable, not perfect like 4k, 1080. Do not expect on old fashion with a perfect shape. We have passion to collect them and share with any person who like us. Thank you!
          </div>
          <div className="form">
            Some of them, we have retail (in seal box). Most of them are not. But they are in new condition (DVD-R) when we ship. We use USPS (a cheap media rate) to delivery it to all of our customer. We try to ship it out as soon as we can, ussually on the same purchase date. But USPS take the rest to make sure it come to your door. We con not control the process in USPS. Please contact us to look for a better solution if you could not receive it on time or as you expect and thank you for all understanding.
          </div> */}
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


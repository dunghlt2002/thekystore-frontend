import React, { Component } from "react";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class page909UnderConstruction extends Component {
    constructor(props) {
      super(props);
      // this.onChangeUser = this.onChangeUser.bind(this);
      // this.onChangePassword = this.onChangePassword.bind(this);

      this.state = {
          REACT_APP_URL:  process.env.REACT_APP_URL
          // isadmin: 0
      };
  }

  componentDidMount() {

  }


  render() {
    const { REACT_APP_URL } = this.state;

    return (
      <div className="">
        {/* <div style={{textAlign: 'center', width: '100%'}}> */}
        <div className="under-out">
          {/* <img width="600rem" src={REACT_APP_URL + "avatars/UnderConstruction.jpeg"} alt="under" /> */}
          <br></br>
          <br></br>
          <br></br>
          <h3>
            Something went wrong. Please head back to <a href="/" target="new">our HomePage </a> or check our stores on eBay:
          </h3>    
          <br></br> 
        </div>        

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
export default connect(mapStateToProps, mapDispatchToProps)(page909UnderConstruction);


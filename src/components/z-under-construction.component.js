import React, { Component } from "react";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class UnderConstruction extends Component {
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

  
  logoutHandler = (e) => {
    e.preventDefault();
    // dispatch(userLoginFetch(this.state.user, this.state.password));
    // this.props.userLogoutFetch(this.state.user,this.state.password);
    this.props.userLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    const { REACT_APP_URL } = this.state;

    return (
      <div className="">
        {/* <div style={{textAlign: 'center', width: '100%'}}> */}
        <div className="under-out">
          <img width="600rem" src={REACT_APP_URL + "avatars/UnderConstruction.jpeg"} alt="under" />
          <br></br>
          <br></br>
          <br></br>
          <h3>
            Mong quý khách thông cảm và tạm thời đặt hàng trên 2 stores của chúng tôi trên eBay.
          </h3>    
          <br></br> 
          <h2 className="under">
            <a href="https://www.ebay.com/str/chutcheo2010" target="new">Chutcheo2010</a><br /><br />
            <a href="https://www.ebay.com/str/PHIMBO2K/" target="new">PHIMBO2K</a>
          </h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction);


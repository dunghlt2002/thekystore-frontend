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
    <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-md-4">
              <div className="cardfaq text-center">
                    <div className="overflow">
                      <img className="cardfaq-img-top" src={REACT_APP_URL + "avatars/global-trade-free-vector-3619.jpg"}>
                      </img>
                    </div>
                    <div className="cardfaq-body text-dark">
                        <h4 className="card-title">Outside USA</h4>
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
              </div>
          </div>
          <div className="col-md-4">
              <div className="cardfaq text-center">
                    <div className="overflow">
                      <img className="cardfaq-img-top" src={REACT_APP_URL + "avatars/dvd-disk-hi.png"}>
                      </img>
                    </div>
                    <div className="cardfaq-body text-dark">
                        <h4 className="card-title">What is DVD-R</h4>
                        <li>
                          DVD-R: collection by many format of DVD.
                        </li>
                        <li>
                          Retial: in sealed box.
                        </li>
                    </div>
              </div>
          </div>

          <div className="col-md-4">
              <div className="cardfaq text-center">
                    <div className="overflow">
                      <img className="cardfaq-img-top" src={REACT_APP_URL + "avatars/free_shipping_PNG70.png"}>
                      </img>
                    </div>
                    <div className="cardfaq-body text-dark">
                        <h4 className="card-title">Shipping in US</h4>
                        <li>
                          Regular shipping fee: $7.95
                        </li>
                        <li>
                          Free shipping: order over $50
                        </li>
                        <li>
                          USPS service only
                        </li>                                  
                    </div>
              </div>
          </div>
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


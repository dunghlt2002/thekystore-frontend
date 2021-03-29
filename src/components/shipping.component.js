import React, { Component } from "react";
import { Link } from "react-router-dom";
import customertDataService from "../services/customer.service";
import productDataService from "../services/product.service";
import systemparaDataService from "../services/systempara.service";
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

import { connect } from 'react-redux';

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    

    this.state = {
      currentCustomer: {
        id: null,
        customers_name: '',
        customers_address: '',
        customers_city: '',
        customers_state: '',
        customers_zip: '',
        customers_country: '',
        customers_phone: '',
        customers_email: '',
        customers_password: '',
        token: ''
      },
      shippingPriceStd: 6.00
    };
  }

  componentDidMount() {
    
    // console.log('hihihi vo shipping, can load data cua customer ... ' + this.props.currCustomer.customerInfo.id);
    // this.props.match.params.id
    // this.props.detailsProduct(this.props.match.params.products_id);
    // console.log('admin ' + this.props.currCustomer.customerInfo.chutcheo_city);
    
    if (this.props.currCustomer.customerInfo && this.props.currCustomer.customerInfo.chutcheo_city) {
      this.retrieveSystemPara('ShippingPrice');
      console.log('shippingPrice 2 ' + this.state.shippingStd);
      this.getCustomer(this.props.currCustomer.customerInfo.id);
    } else {
      this.props.history.push("/page404");
     }
  }

  retrieveSystemPara(search_keyword) {
    systemparaDataService.findByKeyword(search_keyword)
      .then(response => {
        this.setState({
          shippingPriceStd: response.data[0].value
        });
        console.log('shippingPrice 1 ' + this.state.shippingPriceStd);
      })
      .catch(e => {
        console.log(e);
      });
  }


  getCustomer(id) {
    console.log('customer id trg getCustomer: ' + id);
    customertDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  submitHandler = (e) => {
    console.log('ship 3 ' + this.state.shippingPriceStd);
    
    e.preventDefault();
    const addressObj = {
      shippingPriceStd: this.state.shippingPriceStd,
      fullname: this.state.currentCustomer.customers_name,
      address: this.state.currentCustomer.customers_address,
      city: this.state.currentCustomer.customers_city,
      state: this.state.currentCustomer.customers_state,
      zip: this.state.currentCustomer.customers_zip,
      country: this.state.currentCustomer.customers_country,
      phone: this.state.currentCustomer.customers_phone,
      email: this.state.currentCustomer.customers_email
    }
    this.props.saveShipping({ addressObj })
    this.props.history.push('payment');
  }

  onChangeFullName(e) {
    const fullname = e.target.value;
    // UPDATE STATE BY OBJECT style
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_name: fullname
      }
    }));
  }
  onChangeAddress(e) {
    const address = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_address: address
      }
    }));
  }
  onChangeCity(e) {
    const city = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_city: city
      }
    }));
  }
  onChangeState(e) {
    const state = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_state: state
      }
    }));
  }
  onChangeZip(e) {
    const zip = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_zip: zip
      }
    }));
  }
  onChangeCountry(e) {
    const country = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_country: country
      }
    }));
  }
  onChangePhone(e) {
    const phone = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_phone: phone
      }
    }));
  }
  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        customers_email: email
      }
    }));
  }

  removeAllproducts() {
    productDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;
    // const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div>
  
        <CheckoutSteps step1 step2 ></CheckoutSteps>
          <div className="form">
            <form onSubmit={this.submitHandler} >
              <ul className="form-container">
                <li>
                  <h2>Shipping Information</h2>
                  <br></br>
                  {
                    this.props.currCustomer.customerInfo ? 
                      <Link to="/cart"> View {this.props.currCustomer.customerInfo.customers_email}'s Cart
                      </Link> 
                      : null
                  }
                </li>
                <br></br>

                <li>
                  <label htmlFor="fullname">Full Name</label>
                  <input type="text" name="fullname" id="fullname" 
                    value={currentCustomer.customers_name } 
                    onChange={(e) => this.onChangeFullName(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" id="address" 
                    value={currentCustomer.customers_address } 
                    onChange={(e) => this.onChangeAddress(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" id="city" 
                    value={currentCustomer.customers_city} 
                    onChange={(e) => this.onChangeCity(e)}>
                  </input>
                {/* </li>
                <li> */}
                  <label htmlFor="state">State</label>
                  <input type="text" name="state" id="state" 
                    value={currentCustomer.customers_state} 
                    onChange={(e) => this.onChangeState(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="zip">Zip Code</label>
                  <input type="text" name="zip" id="zip" 
                    value={currentCustomer.customers_zip} 
                    onChange={(e) => this.onChangeZip(e)}>
                  </input>
                {/* </li>
                <li> */}
                  <label htmlFor="country">
                    Country
                </label>
                  <input type="text" name="country" id="country" 
                    value={currentCustomer.customers_country } 
                    onChange={(e) => this.onChangeCountry(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="phone">
                    Phone
                </label>
                  <input type="text" name="country" id="phone" 
                    value={currentCustomer.customers_phone } 
                    onChange={(e) => this.onChangePhone(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="customers_email">
                    Email
                </label>
                  <input type="text" name="customers_email" id="customers_email" 
                    value={currentCustomer.customers_email } 
                    onChange={(e) => this.onChangeEmail(e)}>
                  </input>
                </li>                

                <li>
                  <button type="submit" className="btn-block btn-primary">Continue</button>
                </li>

              </ul>
            </form>
          </div>


      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveShipping: ( data ) => dispatch(saveShipping( data ))
})

const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
  
  return {
      // cart: state.cart,                  // Khong can cart o shipping
      currCustomer: state.customerSignin    // moi
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Shipping);

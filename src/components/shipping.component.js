import React, { Component } from "react";
import productDataService from "../services/product.service";
// import { Link } from "react-router-dom";
// import queryString from 'query-string';

import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

import { connect } from 'react-redux';

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangePostalCode = this.onChangePostalCode.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);

    this.state = {
      address: '',
      city: '',
      postalcode: '',
      country:''
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    // dispatch(saveShipping({ address, city, postalCode, country }));
    // this.props.saveShipping( { address, city, postalCode, country } );
    const addressObj = {
      address: this.state.address,
      city: this.state.city,
      postalcode: this.state.postalcode,
      country: this.state.country
    }
    this.props.saveShipping({ addressObj })
    this.props.history.push('payment');
  }


  onChangeAddress(e) {
    const address = e.target.value;
    this.setState({
      address: address
    });
  }
  onChangeCity(e) {
    const city = e.target.value;
    this.setState({
      city: city
    });
  }
  onChangePostalCode(e) {
    const postalCode = e.target.value;
    this.setState({
      postalCode: postalCode
    });
  }
  onChangeCountry(e) {
    const country = e.target.value;
    this.setState({
      country: country
    });
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
    // const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div>
  
        <CheckoutSteps step1 step2 ></CheckoutSteps>
          <div className="form">
            <form onSubmit={this.submitHandler} >
              <ul className="form-container">
                <li>
                  <h2>Shipping</h2>
                </li>

                <li>
                  <label htmlFor="address">
                    Address
                </label>
                  <input type="text" name="address" id="address" onChange={(e) => this.onChangeAddress(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="city">
                    City
                </label>
                  <input type="text" name="city" id="city" onChange={(e) => this.onChangeCity(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="postalCode">
                    Postal Code
                </label>
                  <input type="text" name="postalCode" id="postalCode" onChange={(e) => this.onChangePostalCode(e)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="country">
                    Country
                </label>
                  <input type="text" name="country" id="country" onChange={(e) => this.onChangeCountry(e)}>
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
  // saveShipping({ address, city, postalCode, country })
  saveShipping: ( data ) => dispatch(saveShipping( data ))
})

export default connect(null, mapDispatchToProps)(Shipping);

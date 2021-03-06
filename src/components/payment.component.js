import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
// import { connect, useDispatch } from 'react-redux';
import { connect } from 'react-redux';


class Payment extends Component {
  constructor(props) {
    super(props);
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
    // this.onChangeCity = this.onChangeCity.bind(this);
    // this.onChangePostalCode = this.onChangePostalCode.bind(this);
    // this.onChangeCountry = this.onChangeCountry.bind(this);

    this.state = {
      paymentMethod: 'Paypal'
    };
  }

  // const [paymentMethod, setPaymentMethod] = useState('');

  componentDidMount() {
    // console.log('this.props shipping address' + JSON.stringify(this.props.cart));
    
    
    if (this.props.cart.shippingAddress === null) {
      this.props.history.push('/shipping');
    }
    if (this.props.currCustomer.customerInfo && this.props.currCustomer.customerInfo.chutcheo_city) {

    } else {
      this.props.history.push("/page404");
     }

  }


  submitHandler = (e) => {
    e.preventDefault();
    const paymentObj = {
      paymentMethod: this.state.paymentMethod,
      currency: 'USD'
    }
    this.props.savePayment({ paymentObj })
    this.props.history.push('placeorder');
  }

  onChangePaymentMethod(e) {
    const paymentMethod = e.target.value;
    this.setState({
      paymentMethod: paymentMethod
    });
  }

render() {
  
  return (
    <div>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <div className="form">
        <form onSubmit={this.submitHandler} >
          <ul className="form-container-small">
            <li>
              <h2>Payment Method</h2>
            </li>

            <li>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" checked required
                  onChange={(e) => this.onChangePaymentMethod(e)}>
                </input>
                <label htmlFor="paymentMethod">
                  Paypal
                </label>
                <div><h5><i>At this time, we only support Paypal, a safe and reliable method for our customer. Thank you!</i></h5></div>
              </div>
            </li>

            {/* <li>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethodz" value="zelle"
                  onChange={(e) => this.onChangePaymentMethod(e)}>
                </input>
                <label htmlFor="paymentMethodz">
                  Zelle method
                </label>
              </div>
            </li> */}



            <li>
              <button type="submit" className="btn-block btn-primary">Continue</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
  )

  }
}

const mapDispatchToProps = dispatch => ({
  // saveShipping({ address, city, postalCode, country })
  // savePayment({ paymentMethod })
  savePayment: ( data ) => dispatch(savePayment( data ))
})

const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
  
  return {
      cart: state.cart,
      currCustomer: state.customerSignin                // moi
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
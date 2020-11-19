import React, { Component } from "react";
// import productDataService from "../services/product.service";
// import { Link } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { connect } from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
    // this.onChangeCity = this.onChangeCity.bind(this);
    // this.onChangePostalCode = this.onChangePostalCode.bind(this);
    // this.onChangeCountry = this.onChangeCountry.bind(this);

    this.state = {
      paymentMethod: ''

    };
  }

  // const [paymentMethod, setPaymentMethod] = useState('');

  // const dispatch = useDispatch();

  submitHandler = (e) => {
    e.preventDefault();
    const paymentObj = {
      paymentMethod: this.state.paymentMethod
    }
    this.props.saveShipping({ paymentObj })
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
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
                  onChange={(e) => this.onChangePaymentMethod(e)}>
                </input>
                <label htmlFor="paymentMethod">
                  Paypal
            </label>
              </div>

            </li>

            <li>
              <button type="submit" className="btn btn-primary">Continue</button>
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

export default connect(null, mapDispatchToProps)(Payment);
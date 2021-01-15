import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Cookie from "js-cookie";

class CartView extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      physicShip: false,
      REACT_APP_URL: process.env.REACT_APP_URL,
      // checkoutButton: this.props.currCustomer?this.props.currCustomer.chutcheo_city:0,
      productId: this.props.match.params.products_id,
      qty: this.props.location.search ? Number(this.props.location.search.split("=")[1]) : 1,
      cartItems: this.props.cart
    };
  }
  
  freeShipCheck(xetWeightFree) {
    console.log('xetWeightFree ' + xetWeightFree);
    console.log('this.state.physicShip ' + this.state.physicShip);
    if (this.state.physicShip === false) {
      if (xetWeightFree === 1) {
        this.setState({
          physicShip: true
        });
      }
    }
    console.log('this.state.physicShip ' + this.state.physicShip);
  }

  removeFromCartHandler = (productId) => {
    this.props.removeFromCart(productId);
    this.setState({
      cartItems: this.props.cart
    })
    this.setState({
      physicShip: false
    });
  }

  componentDidMount () {
    console.log('hihi Cart ' + this.props.match.params.products_id);
    console.log('hihi QTY ' + this.props.location.search ? Number(this.props.location.search.split("=")[1]) : 1);
      if (this.state.productId) {
        this.props.addToCart(this.state.productId,this.state.qty);
      }
      // this.setState({
      //   cartItems: this.props.cart
      // })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart) {
      this.setState({
        cartItems: nextProps.cart
      })
    }
  }
  
  // checkoutHandler = (e) => {
  //   // Doi hoan thanh paypal moi chay lenh nay 
  //   // 12/11/2020: da lam duoc them phan getCustomer
  //   // this.props.history.push("/customersignin?redirect=shipping");
    
  //   this.props.history.push("/underconstruction");
  // }

  checkoutHandlerTesting = (e) => {
    // console.log('this.state.physicShip in CART js' + this.state.physicShip);
    // this.props.history.push(`/customersignin?redirect=shipping?physicShip=${this.state.physicShip}`);
    this.props.history.push(`/customersignin?redirect=shipping`);
    Cookie.set("physicShip", this.state.physicShip);
  }

render() {
  return (

<div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping Cart
            </h3>
            <div>
              Price
            </div>
          </li>
          {
            this.state.cartItems.length === 0 ?
            // this.state.cartItems === null ?
                <div>Cart is empty</div>
            :
            this.state.cartItems.map(item =>
              <li>
                <div className="cart-image">
                
                  {/* <img src={"http://localhost:8080/" + item.image} alt="product" /> */}
                  <img src={this.state.REACT_APP_URL + item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    {/* <Link to={'/productview/' + product.id}>{product.id + product.products_name}</Link> */}
                    <Link to={"/productview/" + item.product}>
                      {item.product + " - " + item.name + ", (free shipping: " + (item.weight?"No)":"Yes)")}
                    </Link>
                  {this.freeShipCheck(item.weight)}
                  </div>
                  <div>
                    Qty:
                  <select value={item.qty} onChange={(e) => this.props.addToCart(item.product, e.target.value)}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="btn btn-danger" onClick={() => this.removeFromCartHandler(item.product)} >
                    {/* <button type="button" className="btn btn-danger" > */}
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
              
            )
          }
        </ul>

      </div>
      
      <div className="">
        {/* <div style={{textAlign: 'center', width: '100%'}}> */}
        <div className="under-out">
          <img width="500rem" src={this.state.REACT_APP_URL + "avatars/UnderConstruction.jpeg"} alt="under" />
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

      
      <div className="cart-action">
        <h3>
          Subtotal ( {this.state.cartItems.reduce((a, c) => a + c.qty, 0)} items)
          :
          $ {this.state.cartItems.reduce((a, c) => Math.fround((a + c.price * c.qty)*100)/100, 0)}
        </h3>
        <h3>Estimated shipping cost: $ {this.state.physicShip?7.95:0}</h3>
        {/* <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}></button> */}

        {this.state.cartItems.length === 0?
            <Link to="/"/>
        :
          // <button onClick={(e) => this.checkoutHandler(e)} className="button btn-primary full-width" type="button" disabled={this.state.cartItems.length === 0}>
          //   Proceed to Checkout
          // </button>
          <button onClick={(e) => this.checkoutHandlerTesting(e)} className="button btn-primary full-width" type="button" disabled={this.state.cartItems.length === 0}>
            Checkout is pending ...
          </button>
        }
        {/* Chi dung trong qua trinh test phan checkout */}
        {this.state.checkoutButton?
            <button onClick={(e) => this.checkoutHandlerTesting(e)} className="button btn-primary full-width" type="button" disabled={this.state.cartItems.length === 0}>
              Checkout for testing
            </button>
        : null
        }
        {/* Chi dung trong qua trinh test phan checkout */}

      </div>

    </div>


  )
    
    
 }
}


const mapDispatchToProps = dispatch => ({
  addToCart: (productId,qty) => dispatch(addToCart(productId,qty)),
  removeFromCart: (productId) => dispatch(removeFromCart(productId))
})

const mapStateToProps = (state, ownProps) => {
  console.log('Cart trong  mapstatetoprops' + JSON.stringify(state.cart));
  // console.log('Cart LEN trong  mapstatetoprops ' + JSON.stringify(state.cart.cartItems).length);
  
  return {
      cart: state.cart.cartItems,
      currCustomer: state.customerSignin.customerInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartView);

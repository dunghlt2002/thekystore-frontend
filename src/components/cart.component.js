import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

class CartView extends Component {
  constructor(props) {
    super(props);
    // this.cartItems = this.cartItems.bind(this);
    // this.retrieveCustomers = this.retrieveCustomers.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveCustomer = this.setActiveCustomer.bind(this);
    // this.searchKeyword = this.searchKeyword.bind(this);
    // this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
    
    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      productId: this.props.match.params.products_id,
      qty: this.props.location.search ? Number(this.props.location.search.split("=")[1]) : 1,
      cartItems: this.props.cart
    };
  }

  removeFromCartHandler = (productId) => {
    this.props.removeFromCart(productId);
    this.setState({
      cartItems: this.props.cart
    })
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
  
  checkoutHandler = (e) => {
    // Doi hoan thanh paypal moi chay lenh nay
    // this.props.history.push("/customersignin?redirect=shipping");
    
    this.props.history.push("/underconstruction");
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
                      {item.product + " - " + item.name}
                    </Link>

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
      
      <div className="cart-action">
        <h3>
          Subtotal ( {this.state.cartItems.reduce((a, c) => a + c.qty, 0)} items)
          :
          $ {this.state.cartItems.reduce((a, c) => Math.fround((a + c.price * c.qty)*100)/100, 0)}
        </h3>
        {/* <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}></button> */}

        {this.state.cartItems.length === 0?
            <Link to="/"/>
        :
          // <button onClick={(e) => this.checkoutHandler(e)} className="button btn-primary full-width" type="button" disabled={this.state.cartItems.length === 0}>
          //   Proceed to Checkout
          // </button>
          <button onClick={(e) => this.checkoutHandler(e)} className="button btn-primary full-width" type="button" disabled={this.state.cartItems.length === 0}>
            Checkout is pending ...
          </button>
        }
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
      cart: state.cart.cartItems
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartView);

// Cac Luu Y:
// Qui uoc 1 ve Sign-in: khi noi ve sign-in la y ve customer sign-in
// Qui uoc 2 ve Sign-in: khi noi ve customer sign-in (admin function) se la customer-sign-in

// 1/18/2021:
// - ErrorBoundary chua xai duoc
// - 



import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { connect } from 'react-redux';

import AdminRoute from './components/privateAdminRoute';
import PrivateRoute from './components/privateRoute';
import ErrorBoundary from "./components/errorBoundary";
import homePage from "./components/home.component";
import underconstruction from "./components/z-under-construction.component";
import page404construction from "./components/z-page404-construction.component";
import page909construction from "./components/z-page909-construction.component";

import aboutTheKy from "./components/aboutTheKy.component";
import faq from "./components/faq.component";

import categoryDataService from "./services/category.service";

import retailStore from "./components/retail-store.component";
import ProductView from "./components/product-view.component";
import CartView from "./components/cart.component";
import Shipping from "./components/shipping.component";
import Payment from "./components/payment.component";
import PlaceOrder from "./components/placeorder.component";

import ProductsList from "./components/product-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";

import CategoriesList from "./components/category-list.component";
import Category from "./components/category.component";

import OrdersList from "./components/order-list.component";
import Order from "./components/order.component";

// Su dung customer lam user luon 12/31/2020
import UsersList from "./components/user-list.component"; //usor  
import UserSigninScreen from "./components/user-signin.component";
import UserProfile from "./components/profile.component";
import { userLogoutFetch } from './actions/userActions';

import CustomersList from "./components/customer-list.component";
import AddCustomers from "./components/add-customer.component";
import CustomerSigninScreen from "./components/customer-signin.component";
import CustomerProfile from "./components/customer-profile.component";
import ResetPasswordAskEmail from "./components/resetPasswordAskEmail.component";
import ResetPassword from "./components/resetPassword.component";
import { customerLogoutFetch } from './actions/customerActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usvn_longtieng: 0,
      masternotcategories: [],
      customer:'',
      password: '',
      email:''
  }
  }
  
  logoutHandler = (e) => {
    e.preventDefault();
    this.props.customerLogoutFetch();
    // this.props.history.push("/");
    window.location="/";
  }

  componentDidMount() {
    this.retrieveNotMasterCategories();
  }

  retrieveNotMasterCategories() {
    categoryDataService.getNotMaster()
      .then(response => {
        this.setState({
          masternotcategories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  isActionChange = (event) => {
    // var name = event.target.name;
    var value = event.target.value;
    // console.log('doi tuong : ' + name);
    // console.log('gia tri : ' + value);
    this.setState({ 
      usvn_longtieng: value
    });
  }


  render() {

  return (

    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={this.openMenu}>
                  &#9776;
            </button>
            <a href="/">The Ky Store</a>
            {/* <a href="/filterproducts/-1">The Ky Store</a> */}
            {/* <Link to="/filterproducts/-1" > The Ky Store</Link> */}
          </div>

          {/* Phan menu cua user*/}
          {/* Admin menu */}
          
          <div className="header-links">
            <div className="dropdown">
                <Link to="/cart">{this.props.cart.cartItems.length>0?"Cart (" + this.props.cart.cartItems.length + ")":null }
                </Link> 
            </div>
            {
              this.props.currcustomer.customerInfo ?
              <>
                


                <div className="dropdown">
                <Link to="#">
                  {this.props.currcustomer.customerInfo.customers_name} menu <i className="fa fa-caret-down"></i>{' '}
                </Link>
                        <ul className="dropdown-content">
                          <li className="fa fa-caret-down">
                            <Link to={"/customerProfile/" + this.props.currcustomer.customerInfo.id}>Profile</Link> 
                          </li>
                          <li>
                          <Link to={"/ordersbycustomer/" + this.props.currcustomer.customerInfo.id} >Orders History</Link>
                          </li>
 
                          {this.props.currcustomer.customerInfo.chutcheo_city?
                                <>
                                  <li>
                                    <Link to="/customers">Customers List</Link>
                                  </li>
                                  <li>
                                    <Link to="/products">Products List</Link>
                                  </li>
                                  <li>
                                    <Link to="/categories">Categories List</Link>
                                  </li>
                                  <li>
                                    ------------------------------
                                  </li>
                                  <li>
                                    <Link to="/addProduct">Add Product</Link>
                                  </li>
                                  <li>
                                    <Link to="/addCustomer">Add Customer</Link>
                                  </li>
                                </>
                          : null
                          }

                          <li>
                            ------------------------------
                          </li>
                          <li>
                            <Link onClick={this.logoutHandler}>Logout</Link>
                          </li>
                        </ul>

                          
                </div>          
              </>
              :
             
                <Link to="/customersignin">Sign In</Link>
            }
              {/* menu ABOUT             */}
              <div className="dropdown">
                {/* Ten menu        */}
                <Link to="#">
                  About <i className="fa fa-caret-down"></i>
                </Link>
                {/* Chi tiet menu */}
                <ul className="dropdown-content">
                  <li>
                    <Link to="/aboutTheky">About us</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
              {/* End of menu ABOUT             */}
          </div>
        </header>
        
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={this.closeMenu}>x</button>
          <ul>
              <div>
                <label className="form-label"><strong>Long tieng:</strong>
                    <input onChange={(event)=> this.isActionChange(event)} value="0" type="radio" className="form-input" name="usvn_longtieng" defaultChecked='0' />US
                    <input onChange={(event)=> this.isActionChange(event)} value="1" type="radio" className="form-input" name="usvn_longtieng" />VN
                </label>
              </div>
          </ul>

          <ul>
                <li>
                  <a href="/filterproducts/-1">ALL categoriesssss</a>
                </li>
                {this.state.masternotcategories.map((mastercategory) => 
                <li>
                  <a href={'/filterproducts/'+this.state.usvn_longtieng+'?retail=-1&category='+ mastercategory.id}>{mastercategory.categories_name}</a>
                </li>
                
                        /* <option  key={mastercategory.id}
                        selected={mastercategory.id === currentCategory.parent_id? true:false}
                        value={mastercategory.id}>{mastercategory.categories_name}
                         </option> */
                
                        
                )}
          </ul>
          <ul>
            {/* 9 la so tao lao thoi */}
            <li>
              <a href={"/filterproducts/"+this.state.usvn_longtieng+"?retail=-1"}>ALL formats</a>
            </li>
            <li>
              <a href={"/filterproducts/"+this.state.usvn_longtieng+"?retail=1"}>Retail Seal Box</a>
            </li>

            <li>
              <a href={"/filterproducts/"+this.state.usvn_longtieng+"?retail=0"}>Regular DVD-R</a>
            </li>
            

          </ul>
        </aside>

        <div>
          <div className="container">
            <Switch>
              <Route exact path={"/orders"} component={OrdersList} />
              <Route exact path={"/ordersbycustomer/:customer_id"} component={OrdersList} />
              <Route exact path={"/placeorder"} component={PlaceOrder} />
              {/* <Route exact path={"/orders/:orders_id"} component={Order} /> */}
              <PrivateRoute
                path="/orders/:orders_id"
                component={Order}
              ></PrivateRoute>

              {/* <Route path="/" exact={true} component={retailStore} /> */}
              <Route path="/" exact={true} component={homePage} />
              <Route path="/filterproducts/:usvn_longtieng" component={retailStore} />
              <Route path="/productview/:products_id" component={ProductView} />
              <Route exact path={["/cart", "/cart/:products_id"]} component={CartView} />
              <Route exact path={"/shipping"} component={Shipping} />
              <Route exact path={"/payment"} component={Payment} />
              
              {/* <Route exact path={["/products"]} component={ProductsList} /> */}
              <AdminRoute
                exact path="/products"
                component={ProductsList}
              ></AdminRoute>
              <Route exact path={"/addProduct"} component={AddProduct} />
              {/* <Route path="/products/:products_id" component={Product} /> */}
              <AdminRoute
                exact path="/products/:products_id"
                component={Product}
              ></AdminRoute>
              
              <Route exact path={["/customersignin"]} component={CustomerSigninScreen} />
              {/* <Route exact path={"/customerProfile/:id"} component={CustomerProfile} /> */}
              {/* <Route exact path={"/customers"} component={CustomersList} /> */}
              <AdminRoute
                exact path="/customers"
                component={CustomersList}
              ></AdminRoute>
              
              <PrivateRoute
                path="/customerProfile/:id"
                component={CustomerProfile}
              ></PrivateRoute>
              <Route exact path={"/addCustomer"} component={AddCustomers} />
              <Route exact path={"/resetpasswordaskemail"} component={ResetPasswordAskEmail} />
              <Route exact path={"/resetpassword"} component={ResetPassword} />
              
              {/* <Route exact path={"/categories"} component={CategoriesList} /> */}
              <AdminRoute
                exact path="/categories"
                component={CategoriesList}
              ></AdminRoute>
              <Route path="/categories/:categories_id" component={Category} />
              
              {/* Su dung customer lam user luon 12/31/2020 */}
              {/* <Route exact path={"/users"} component={UsersList} />
              <Route exact path={"/userProfile/:id"} component={UserProfile} />
              <Route exact path={["/usersignin"]} component={UserSigninScreen} /> */}

              <Route exact path={["/underconstruction"]} component={underconstruction} />
              <Route exact path={["/aboutTheKy"]} component={aboutTheKy} />
              <Route exact path={["/faq"]} component={faq} />
              <Route exact path={["/page909"]} component={page909construction} />
              <Route exact path={["*"]} component={page404construction} />
            </Switch>
          </div>
        </div>
      </div>
      
    </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  customerLogoutFetch: () => dispatch(customerLogoutFetch())
})

const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong App.js ' + JSON.stringify(state.customerSignin.customerInfo));
  console.log('cartItems trong App.js ' + typeof(state.cart.cartItems));
  console.log('cartItems trong App.js ' + state.cart.cartItems.length);
  
  return {
      // currcustomer: state.customerSignin.customerInfo
      currcustomer: state.customerSignin,
      cart: state.cart
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

// REACT_APP_API_URL = http://localhost:8080/api/
// REACT_APP_URL = http://localhost:8080/
// REACT_APP_CLIENT_URL = http://localhost:8081/

// REACT_APP_API_URL = https://thekyadminbackend.herokuapp.com/api/
// REACT_APP_URL = https://thekyadminbackend.herokuapp.com/
// REACT_APP_CLIENT_URL = http://thekyadminfontend.herokuapp.com/

// "re-carousel": "^2.4.0",
// "infinite-react-carousel": "^1.2.11",

// REACT_APP_API_URL = http://localhost:8080/api/
// REACT_APP_URL = http://localhost:8080/
// REACT_APP_CLIENT_URL = http://localhost:8081/

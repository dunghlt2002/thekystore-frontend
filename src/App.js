// Cac Luu Y:
// Qui uoc 1 ve Sign-in: khi noi ve sign-in la y ve customer sign-in
// Qui uoc 2 ve Sign-in: khi noi ve customer sign-in (admin function) se la customer-sign-in

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { connect } from 'react-redux';


import homePage from "./components/home.component";
import categoryDataService from "./services/category.service";

import retailStore from "./components/retail-store.component";
import ProductView from "./components/product-view.component";
import CartView from "./components/cart.component";
import Shipping from "./components/shipping.component";
import Payment from "./components/payment.component";

import ProductsList from "./components/product-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";

import CategoriesList from "./components/category-list.component";
import Category from "./components/category.component";

import OrdersList from "./components/order-list.component";
import Order from "./components/order.component";

import UsersList from "./components/user-list.component"; //usor  
import UserSigninScreen from "./components/user-signin.component";   //usor
import UserProfile from "./components/profile.component"; //usor
import { userLogoutFetch } from './actions/userActions';  //usor

import CustomersList from "./components/customer-list.component";
import AddCustomers from "./components/add-customer.component";
import CustomerSigninScreen from "./components/customer-signin.component";
import CustomerProfile from "./components/customer-profile.component";
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
    var name = event.target.name;
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
        <header className="header">
          <div className="brand">
            <button onClick={this.openMenu}>
                  &#9776;
            </button>
            <a href="/">The Ky Store</a>
            {/* <a href="/filterproducts/-1">The Ky Store</a> */}
            {/* <Link to="/filterproducts/-1" > The Ky Store</Link> */}
          </div>
          <div className="header-links">
            
            {
              this.props.currcustomer.customerInfo ? <Link to="/cart"> {this.props.currcustomer.customerInfo.customers_email}: Cart</Link> : null
            }
            
            
            {/* {customerInfo && customerInfo.isAdmin && ( */}
            {(
              <div className="dropdown">
                <a>
                  {this.props.currcustomer.customerInfo ? "Menu" : null
                  }
                </a>
                
                    {
                    this.props.currcustomer.customerInfo ? 
                      <ul className="dropdown-content">
                        <li>
                          <Link to={"/customerProfile/" + this.props.currcustomer.customerInfo.id}>Profile: {this.props.currcustomer.customerInfo.customers_email}</Link> 
                          <Link onClick={this.logoutHandler}>Logout</Link>
                        </li>
                      </ul>
                    : <Link to="/customersignin">Sign In</Link>
                    }
                  
                
              </div>
            )}


{(
              <div className="dropdown">
                <a>
                  {this.props.currcustomer.customerInfo ? "Admin" : null
                  }
                </a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders List</Link>
                  </li>
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
                    <Link to="/users">Users List - Testing</Link>
                  </li>

                      {/* Phan quyen so so */}
                      {/* { this.props.currcustomer.customerInfo ? ( this.props.currcustomer.customerInfo.isadmin === 0 ? */}
                      { this.props.currcustomer.customerInfo ? ( this.props.currcustomer.customerInfo.customers_email === "dunghlt2002@yahoo.com" ?
                        <li>
                          <Link to="/addProduct">Add Product</Link>
                          <Link to="/addCustomer">Add Customer</Link>                    
                        </li>
                      : null ) : null
                      }

                  
                </ul>
              </div>
            )}



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
                  <a href="/filterproducts/-1">ALL category</a>
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
              <a href={"/filterproducts/"+this.state.usvn_longtieng+"?retail=-1"}>ALL format</a>
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
              {/* <Route path="/" exact={true} component={retailStore} /> */}
              <Route path="/" exact={true} component={homePage} />
              <Route path="/filterproducts/:usvn_longtieng" component={retailStore} />
              <Route path="/productview/:products_id" component={ProductView} />
              <Route exact path={["/cart", "/cart/:products_id"]} component={CartView} />
              <Route exact path={"/shipping"} component={Shipping} />
              <Route exact path={"/payment"} component={Payment} />

              <Route exact path={"/orders/:orders_id"} component={Order} />
              
              <Route exact path={["/products"]} component={ProductsList} />
              <Route exact path={"/addProduct"} component={AddProduct} />
              <Route path="/products/:products_id" component={Product} />
              
              <Route exact path={["/customersignin"]} component={CustomerSigninScreen} />
              <Route exact path={"/customers"} component={CustomersList} />
              <Route exact path={"/customerProfile/:id"} component={CustomerProfile} />
              <Route exact path={"/addCustomer"} component={AddCustomers} />

              <Route exact path={"/categories"} component={CategoriesList} />
              <Route path="/categories/:categories_id" component={Category} />

              <Route exact path={"/users"} component={UsersList} />
              <Route exact path={"/userProfile/:id"} component={UserProfile} />
              <Route exact path={["/usersignin"]} component={UserSigninScreen} />

            </Switch>
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
  
  return {
      // currcustomer: state.customerSignin.customerInfo    // cu
      currcustomer: state.customerSignin                // moi
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;

// REACT_APP_API_URL = http://localhost:8080/api/
// REACT_APP_URL = http://localhost:8080/
// REACT_APP_CLIENT_URL = http://localhost:3000/

// REACT_APP_API_URL = https://dd-dailystock-node.herokuapp.com/api/
// REACT_APP_URL = https://dd-dailystock-node.herokuapp.com/
// REACT_APP_CLIENT_URL = https://dd-react.herokuapp.com/

// "re-carousel": "^2.4.0",
// "infinite-react-carousel": "^1.2.11",
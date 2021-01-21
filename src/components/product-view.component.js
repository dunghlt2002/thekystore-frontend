import React, { Component } from "react";
import { detailsProduct } from '../actions/productActions';
import { connect } from 'react-redux';
// import productDataService from "../services/product.service";
// import axios from 'axios' ;
import { Link } from "react-router-dom";

class ProductView extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeQty = this.onChangeQty.bind(this);
    // this.getProduct = this.getProduct.bind(this);

    this.state = {
        // currentProduct: detailsProduct,
        REACT_APP_URL:  process.env.REACT_APP_API_URL,
        qty: 1,
        message: ""
    };
  }

  componentDidMount() {
    console.log('hihih ivo product view');
    
        console.log('id : '  + this.props.match.params.products_id);
        // this.props.match.params.id
        this.props.detailsProduct(this.props.match.params.products_id);
        // dispatch(detailsProduct(props.match.params.id));
    // this.getProduct(this.props.match.params.products_id);
  }

//   const [qty, setQty] = useState(1);
//   const productDetails = useSelector(state => state.productDetails);
//   const { product, loading, error } = productDetails;
//   const dispatch = useDispatch();


  handleAddToCart = () => {
    this.props.history.push("/cart/" + this.props.match.params.products_id + "?qty=" + this.state.qty)
  }

  onChangeQty(e) {
    const qty = e.target.value;

    this.setState({
      qty: qty
    });
  }


  render() {
    return (
        <div>
        <div className="back-to-result">
            <Link to="/filterproducts/-1?usvn_longtieng=0">Browse All Products</Link>
        </div>
        {this.props.currentResult.loading ? <div>Loading...</div> :
            this.props.currentResult.error ? <div>{this.props.currentResult.error} </div> :
            (

            <div className="details">
                <div className="details-image">
                    <img src={this.state.REACT_APP_URL + this.props.currentProduct.products_image} alt="product" ></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{this.props.currentProduct.products_name}</h4>
                        </li>
                        <li>
                            Price: <b>${this.props.currentProduct.products_price}</b>
                        </li>
                        <li>
                            <b>{this.props.currentProduct.products_sotap} episode/dvd</b>
                        </li>
                        <li>
                            Nguon phim: {this.props.currentProduct.products_nguonphim}
                        </li>
                        <li>
                            Dien vien: {this.props.currentProduct.products_dienvien}
                        </li>

                    </ul>
                </div>
                
                <div className="details-action">
                    <ul>
                        <li>
                            Price: {this.props.currentProduct.products_price}
                            
                        </li>
                        <li>
                            Status: {this.props.currentProduct.products_soluong > 0 ? "In Stock" : "Unavailable."}
                            - Qty: {this.props.currentProduct.products_soluong}
                        </li>
                          <li>
                                Qty: <select value={this.state.qty} onChange={(e) => this.onChangeQty(e)}>
                                {[...Array(this.props.currentProduct.products_soluong).keys()].map(x =>
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                )}
                                </select>
                            </li>
                        <li>
                            {this.props.currentProduct.products_soluong > 0 && 
                                <button onClick={this.handleAddToCart} className="btn btn-warning" >Add to Cart</button>
                            }
                        </li>
                    </ul>
                </div>
            
                <div className="details-info">
                    <ul>
                        <li>
                            Description:
                            <div className="card-dd">
                                <div dangerouslySetInnerHTML={{ __html: this.props.currentProduct.products_description} }></div>
                                {/* {this.props.currentProduct.products_description} */}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="details-image-large">
                    {/* <img src={this.state.REACT_APP_URL + this.props.currentProduct.products_image_large} alt="product large" ></img> */}
                    <img src={this.state.REACT_APP_URL + this.props.currentProduct.products_image} alt="product large" ></img>
                </div>

            </div>
            ) 
        }


    </div>
  )
}
}

const mapDispatchToProps = dispatch => ({
    
    detailsProduct: (productId) => dispatch(detailsProduct(productId))
  })

  const mapStateToProps = (state, ownProps) => {
    console.log('current Product phan mapstatetoprops' + JSON.stringify(state.productDetails.product));
    // console.log('currentResult phan mapstatetoprops' + JSON.stringify(state.productDetails.product).id);
    // console.log('userInfo trong Signin phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo));
    
    return {
        currentResult: state.productDetails,
        currentProduct: state.productDetails.product
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
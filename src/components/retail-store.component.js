import React, { Component } from "react";
import productDataService from "../services/product.service";
import { Link } from "react-router-dom";
import Pagination from 'pagination-component';
import queryString from 'query-string';

import categoryDataService from "../services/category.service";
import providerDataService from "../services/provider.service";

import MessageBox from '../components/MessageBox';

import { connect } from 'react-redux';

class retailStore extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
    this.retrieveproducts = this.retrieveproducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveproduct = this.setActiveproduct.bind(this);
    this.removeAllproducts = this.removeAllproducts.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handledisplayNoShow = this.handledisplayNoShow.bind(this);
    
    let url = this.props.location.search;
    let params = queryString.parse(url);

    this.state = {
      lettersArray: ["A","B","C","D","E","G","H","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y"],
      REACT_APP_URL:  process.env.REACT_APP_URL,
      // 1 la DISPLAY. khach thuong se xem duoc DISPLAY
      // 0 la NO DISPLAY. ADMIN  se xem duoc DISPLAY va ca NO DISPLAY
      displayNoShow: 1, 
      loading: '',
      error: '',
      masternotcategories: [],
      search_category: params.category,
      context_category:'',
      masterProvider: [],
      search_provider: params.provider,
      context_provider:'',
      search_retail: params.retail,
      search_abc: params.search_abc,
      usvn_longtieng: this.props.match.params.usvn_longtieng,
      postsPerPage:15,
      totalPages: 1,
      currentPage: 1,
      currentIndex: -1,  // phan tu dau tien trong list duoc selected
      products: [],
      currentProduct: null,
      searchKeyword: ""
    };
  }

  componentDidMount() {
    console.log('params chinh la usvn_longtieng ' + this.state.usvn_longtieng);
    console.log('hi abc ' + this.state.search_abc);
    // var retailFlag = -1
    // if (this.props.match.params.retail) {
    //   retailFlag = this.props.match.params.retail
    // } else {
    //   retailFlag = -1
    // }

    console.log('reatil moi ne ' + this.state.search_retail);
    console.log('cat moi ne ' + this.state.search_category);
    console.log('search_provider moi ne ' + this.state.search_provider);
    this.retrieveNotMasterCategories();
    this.retrieveProviders();
    this.retrieveproducts(1);
    // this.retrieveproducts(this.state.currentPage,this.state.searchKeyword,this.state.search_retail,this.state.search_category);
    
    
  }
  retrieveProviders() {
    providerDataService.getAll()
      .then(response => {
        this.setState({
          masterProvider: response.data
        });
        console.log(response.data);

        this.contextProvider(this.state.search_provider);
      })
      .catch(e => {
        console.log(e);
      });
  }

  contextProvider(timcaigi) {
    console.log('context Provider');
    
    console.log(this.state.masterProvider);
    
    var fistFoundArray = this.state.masterProvider
          .filter(timloai => timloai.id == timcaigi)
        console.log('fistFoundArray ' + fistFoundArray[0].providers_name);
        this.setState({
          context_provider: fistFoundArray[0].providers_name
        });
  }

  retrieveNotMasterCategories() {
    categoryDataService.getNotMaster()
      .then(response => {
        this.setState({
          masternotcategories: response.data
        });
        console.log(response.data);

        this.contextCategory(this.state.search_category);
      })
      .catch(e => {
        console.log(e);
      });
  }

  contextCategory(timcaigi) {
    console.log('context');
    
    console.log(this.state.masternotcategories);
    
    var fistFoundArray = this.state.masternotcategories
          .filter(timloai => timloai.id == timcaigi)
        console.log('fistFoundArray ' + fistFoundArray[0].categories_name);
        this.setState({
          context_category: fistFoundArray[0].categories_name
        });
  }

  searchComb(searchCatID) {
    console.log('Cat ID search ' + searchCatID);
    this.setState({
      error: null,
      search_category: searchCatID
    });
    
  }

  handleAddToCart(product_id) {
    console.log('hi add to cart ' + product_id);
    this.props.history.push("/cart/" + product_id + "?qty=1")
  }

  onChangeCurrentPage(i) {
    console.log('i la : ' + i);
    this.setState({
      currentPage: i+1
    })

    console.log('trang thu chinh xac :  ' + this.state.currentPage + ' hay la i+1 ' + (i+1));
    this.retrieveproducts((i+1));
  }

  searchKeyword(e) {
    e.preventDefault();

    console.log('displayNoShow khi bam Search ' + this.state.displayNoShow);

    if (this.state.search_category > 0) {
      this.contextCategory(this.state.search_category)
    } else {
      this.setState({
        context_category: ''
      });
    }

    if (this.state.search_category < 0) {
      this.setState({
        search_category: null,
        search_abc: null,
        search_provider: null
      });
    }

    this.retrieveproducts(1);
    
  }

  handledisplayNoShow(e) {
    const displayNoShow = e.target.value;
    
    if (this.state.displayNoShow > 0) {
      this.setState({
        displayNoShow: 0
      });
    } else {
      this.setState({
        displayNoShow: 1
      });
    }
    console.log('displayNoShow  ' + this.state.displayNoShow);
  }

  onChangeSearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  retrieveproducts(currentPage) {
    console.log('vo tim list productssss ' + this.state.search_abc + ' ' + this.state.search_provider + ' display ALL ' + this.state.displayNoShow);
    
    productDataService.getAllPerPage(currentPage,this.state.searchKeyword,this.state.search_retail,this.state.search_category,this.state.usvn_longtieng,this.state.search_abc,this.state.search_provider, this.state.displayNoShow)
      .then(response => {
        this.setState({
          error: null,
          products: response.data.data,
          totalPages: response.data.pages
        });
        console.log(response.data);
        // console.log('ket qua data la:' + JSON.stringify(response.data));
        // console.log('ket qua total pages tim thay la: ' + response.data.pages);
      })
      .catch(e => {
        
        this.setState({
          // error: e.message
          products: [],
          error: "No data found, please try again"
        });
        console.log("loi neeeee :   " + e);
      });
      
  }

  refreshList() {
    this.retrieveproducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveproduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
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

  // chi de dot dong lap FOR chu khong lam gi ra hon ca
  showAZ() {
    // var letters = "ABCDEGHIKLMNOPQRSTUVXY";
    var letters = "ABCD";
    var nextCharList = ""
    // var alphabetList = ""
    for (var i = 0; i < letters.length; i++) {
      var nextChar = letters.charAt(i);
      // var letter = "<div class='col-md-3 col-sm-3 col-xs-12'><div id='" + nextChar + "'><h2>" + nextChar + "</h2></div></div>";
      nextCharList = nextCharList + "<Link to='/filterproducts/:usvn_longtiengin'>" + nextChar +  " </Link>";
    }
    return (null
      // <div>
      //     {nextCharList}
      //     <Link to="filterproducts/:usvn_longtiengin">{nextCharList}</Link>
      // </div>
    )
  }

  render() {
  // const { searchName, products, currentProduct, currentIndex, loading, error } = this.state;
  const { products, error, REACT_APP_URL } = this.state;

  return (
    <div className="">
        <br></br>
        <div className="control">
          {/* <Link to="/filterproducts/-1?usvn_longtieng=0">Browse All Products</Link> */}
          <a href ="filterproducts/-1?usvn_longtieng=0">Browse All Products</a>
        </div>
        <div>
          {this.showAZ()}
        </div>
        <div> Select by alphabet :  
            {this.state.lettersArray.map((letter) => 
                  <a href={'filterproducts/'+this.state.usvn_longtieng+'?retail=-1&search_abc='+ letter}>{letter}   </a>

            )}
        </div >
        <br></br>
        <div className="card">
            <form type="submit" onSubmit={(e) => this.searchKeyword(e)}>
                  <input type="text" className="searchInputLong"
                    placeholder="Search by movie name" value={this.state.searchKeyword}
                    onChange={this.onChangeSearchKeyword} />
                      <select onChange={(e) => this.searchComb(e.target.value)}>
                          <option value='-1'>All</option>
                          {this.state.masternotcategories.map(x =>
                            <option key={x.id} value={x.id}>{x.categories_name}</option>
                          )}
                        </select>

                  <button className="btn btn-secondary"
                    type="submit" onClick={(e) => this.searchKeyword(e)}>
                    Search 
                  </button>
                  {
                    this.props.currCustomer.customerInfo ?
                      this.props.currCustomer.customerInfo.chutcheo_city ?
                      <>
                        <input type="checkbox" 
                          value={this.state.displayNoShow}
                          onChange={(event) => this.handledisplayNoShow(event)}
                        />
                        <lable>   Display NO SHOW ITEMS</lable>
                      </>
                      : null
                    : null
                  }
            </form>
        </div>

        <div>
            {'Home '}
            {this.state.search_abc?' > ' + this.state.search_abc:null}
            {this.state.search_provider?' > ' + this.state.context_provider:null}
            {this.state.search_category?' > ' + this.state.context_category :null}
        </div>

        {error && <div><MessageBox variant="danger">{error}</MessageBox></div>
        

            /* Show all categories de khach click vao */}
            {/* <div className="col-divide">
                {this.state.masternotcategories.map((masterFive, key) => 
                    <a key={key} href={'/filterproducts/0?retail=-1&category='+ masterFive.id}>{masterFive.categories_name + "  "}</a>
                  )}
            </div> */}

            <div className="row">
            
              {
                products.map(product =>
                  // <div key={product.id} className="col-3">
                  <div key={product.id} className="col-4 lg-auto">
                      <div  className="card">
                        <div className="product-name">
                            {/* <Link to={'/productview/' + product.id}>{product.products_name + "(" + product.id + ")"}</Link> */}
                            <Link to={'/productview/' + product.id}>{product.products_name }</Link>
                        </div>
                        <div  className="products">
                          <div>
                            <Link to={'/productview/' + product.id}>
                                {/* <img src={this.state.REACT_APP_URL + this.props.currentProduct.products_image} alt="product large" ></img> */}
                                <img className="product-image" src={REACT_APP_URL + product.products_image} alt={this.state.REACT_APP_URL} />
                            </Link>
                          </div>
                          {/* <div className="product-rating">{product.rating} Stars ({product.numReiews} Reviews)</div> */}
                          <div className="product-brand">
                              {product.products_nguonphim}
                          </div>
                          <div className="product-brand">
                              <a href={'/filterproducts/'+this.state.usvn_longtieng+'?retail=-1&provider='+ product.providers_id}>
                                  {product.provider?product.provider.providers_name:'NA'} ({product.providers_id})
                              </a>
                          </div>
                          {/* <div className="product-retail">{product.category.categories_name} <h6>({product.categories_id})</h6></div> */}
                          <div className="product-brand">
                              <a href={'/filterproducts/'+this.state.usvn_longtieng+'?retail=-1&category='+ product.categories_id}>
                                {product.category?product.category.categories_name:'NA'} ({product.categories_id})</a>
                          </div>
                          <div className="product-price">
                            ${product.products_price}
                            <span className="product-retail">
                              {product.products_retail ? 
                              <a href={"/filterproducts/-1?retail=1"}>{'  '} Retail</a> :
                              <a href={"/filterproducts/-1?retail=0"}>{'  '} DVD-R</a>}
                            </span>
                          </div>
                          <div className="product-rating">{product.products_sotap} {}</div>
                          {/* <div className="product-retail">{product.products_retail ? 
                              <a href={"/filterproducts/-1?retail=1"}>Retail</a> :
                              <a href={"/filterproducts/-1?retail=0"}>DVD-R</a>}
                          </div> */}
                          </div>
                          <div>
                            {product.products_soluong > 0 ?
                                <button onClick={() => this.handleAddToCart(product.id)} className="btn btn-warning" >Add to Cart</button>
                              : "Out of stock, come back later!"
                            }
                            {/* <button onClick={() => this.handleAddToCart(product.id)} className="btn btn-warning" >Add to Cart</button> */}
                          </div>

                          {this.props.currCustomer.customerInfo ?
                            this.props.currCustomer.customerInfo.chutcheo_city ?
                              <div>
                                <Link
                                to={"/products/" + product.id}
                                className="btn btn-block btn-secondary">
                                  Edit this product
                                </Link>
                              </div>
                            : null
                          : null
                          }
                    </div>
                  </div>
                )
              }
          </div>

            
        <div className="header col">
            <Pagination 
                  currentPage={this.state.currentPage-1}
                  pageCount={this.state.totalPages}
                  pageLinkClassName="page-link"
                  currentLinkClassName="current-link"
                  onPageClick={i => {
                    console.log(`Link to page ${i-1} was clicked.`);
                    this.onChangeCurrentPage(i);
                  }} />
            
              currentPage: {this.state.currentPage} / pageCount: {this.state.totalPages}
              {/* <li>pageLinkClassName: "page-link"</li>
              <li>currentLinkClassName="current-link"</li> */}
            
          </div>

            

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('customerSignin trong retail-store ' + JSON.stringify(state.customerSignin.customerInfo));
  
  return {
      currCustomer: state.customerSignin
  }
}

export default connect(mapStateToProps, null)(retailStore);



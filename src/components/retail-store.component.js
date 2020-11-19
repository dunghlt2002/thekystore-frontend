import React, { Component } from "react";
import productDataService from "../services/product.service";
import { Link } from "react-router-dom";
import Pagination from 'pagination-component';
import queryString from 'query-string';
import categoryDataService from "../services/category.service";

class retailStore extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
    this.retrieveproducts = this.retrieveproducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveproduct = this.setActiveproduct.bind(this);
    this.removeAllproducts = this.removeAllproducts.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    
    let url = this.props.location.search;
    let params = queryString.parse(url);

    this.state = {
      masternotcategories: [],
      postsPerPage:15,
      totalPages: 1,
      currentPage: 1,
      currentIndex: -1,  // phan tu dau tien trong list duoc selected
      searchKeyword: '',
      search_category: params.category,
      search_retail: params.retail,
      search_abc: params.search_abc,
      usvn_longtieng: this.props.match.params.usvn_longtieng,
      products: [],
      currentProduct: null,
      searchKeyword: ""
    };
  }

  searchComb(searchCatID) {
      console.log('Cat ID search ' + searchCatID);
      this.setState({
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

  componentDidMount() {
    console.log('params chinh la usvn_longtoeng ' + this.state.usvn_longtieng);
    console.log('hi abc ' + this.state.search_abc);
    // var retailFlag = -1
    // if (this.props.match.params.retail) {
    //   retailFlag = this.props.match.params.retail
    // } else {
    //   retailFlag = -1
    // }

    console.log('reatil moi ne ' + this.state.search_retail);
    console.log('cat moi ne ' + this.state.search_category);
    this.retrieveproducts(1);
    // this.retrieveproducts(this.state.currentPage,this.state.searchKeyword,this.state.search_retail,this.state.search_category);
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


  searchKeyword(e) {
    e.preventDefault();
    // this.setState({
    //     // customers: [],
    //     // totalPages: 1,
    //     currentIndex: -1,
    //     currentCustomer: null
    // })
    this.retrieveproducts(1);
    
  }

  onChangeSearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  retrieveproducts(currentPage) {
    productDataService.getAllPerPage(currentPage,this.state.searchKeyword,this.state.search_retail,this.state.search_category,this.state.usvn_longtieng,this.state.search_abc)
      .then(response => {
        this.setState({
          products: response.data.data,
          totalPages: response.data.pages
        });
        console.log(response.data);
        console.log('ket qua total pages' + response.data.pages);
      })
      .catch(e => {
        console.log(e);
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

  render() {
    const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div>
            <ul className="col-md">
              <div>
                <form type="submit" onSubmit={(e) => this.searchKeyword(e)}>
                      <input type="text" className="searchInputLong"
                        placeholder="Search by movie name" value={this.state.searchKeyword}
                        onChange={this.onChangeSearchKeyword} />
                    
                    
                          <select onChange={(e) => this.searchComb(e.target.value)}>
                              <option value='0'>All</option>
                              {this.state.masternotcategories.map(x =>
                                <option key={x.id} value={x.id}>{x.categories_name}</option>
                              )}
                            </select>
                    

                      <button className="btn btn-secondary"
                        type="submit" onClick={(e) => this.searchKeyword(e)}>
                        Search </button>
            
                      Sort By {'      '}
                      {/* onChange={sortHandler} */}
                      <select name="sortOrder" >
                        <option value="">Newest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                      </select>
                </form>
              </div>
              
            </ul>

            {/* {loading ? <div>Loading...</div> :
              error ? <div>{error}</div> : */}
            <div className="container">
              <div className="row">
                  {
                    products.map(product =>
                      <div key={product.id} className="col">
                          <div  className="card">
                            <div  className="products">
                              <div className="product-name">
                                  <Link to={'/productview/' + product.id}>{product.id + product.products_name}</Link>
                              </div>
                              <div>
                                <Link to={'/productview/' + product.id}>
                                    <img className="product-image" src={"http://localhost:8080/" + product.products_image} alt="product" />
                                </Link>
                              </div>
                            
                              <div className="product-brand">
                                  {/* <Link to={'/category/' + product.brand}>{product.brand}</Link> <i>(in progress, not work now!)</i> */}
                                  {product.products_nguonphim}
                              </div>
                              <div className="product-price">${product.products_price}</div>
                              <div className="product-rating">{product.products_sotap} {product.products_retail}</div>
                              <div className="product-retail">{product.products_retail ? 
                                  <a href={"/filterproducts/-1?retail=1"}>Retail</a> :
                                  <a href={"/filterproducts/-1?retail=0"}>DVD-R</a>}
                              </div>
                              <div className="product-retail">Category: {product.categories_id}</div>
                              {/* <div className="product-rating">{product.rating} Stars ({product.numReiews} Reviews)</div> */}
                              </div>                          
                              <div>
                                <button onClick={() => this.handleAddToCart(product.id)} className="btn btn-warning" >Add to Cart</button>
                              </div>
                        </div>
                      </div>
                    )
                  }
                
            {/* } */} 
                  </div>
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

export default retailStore;
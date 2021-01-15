import React, { Component } from "react";
import productDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class productsList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchName = this.onChangesearchName.bind(this);
    this.retrieveproducts = this.retrieveproducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveproduct = this.setActiveproduct.bind(this);
    this.removeAllproducts = this.removeAllproducts.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      REACT_APP_URL: process.env.REACT_APP_URL,
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveproducts();
  }

  onChangesearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveproducts() {
    productDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
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
    console.log('hihihi vo day chon product '  + JSON.stringify(product));
    
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

  searchName() {
    productDataService.findByKeyword(this.state.searchName)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="searchInput"
              placeholder="Search by product name"
              value={searchName}
              onChange={this.onChangesearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Products List</h2>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveproduct(product, index)}
                  key={index}
                >
                  {product.products_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            // onClick={this.removeAllproducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md">
          {currentProduct ? (
            <div>
              <h2>Product Information</h2>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.products_name}
                <Link
                  to={"/products/" + currentProduct.id}
                  className="button badge-warning"
                >
                  Edit this product
                </Link>
              </div>
              
              <div>
                <label>
                  <strong></strong>
                </label>{" "}

                {/* <div><img src={"http://localhost:8080/" + currentProduct.products_image} data-ll-status="loaded" class="smallavatar" width="200" heigth="200" alt={currentProduct.products_image} /></div> */}
                <div>
                  <img src={this.state.REACT_APP_URL + currentProduct.products_image} data-ll-status="loaded" className="smallavatar" width="200" heigth="200" alt={currentProduct.products_image} />
                </div>
              </div>

              <div>
                <label>
                  <strong>Provider: </strong>
                </label>{" "}
                {currentProduct.provider.providers_name}
              </div>

              <div>
                <label>
                  <strong>Category: </strong>
                </label>{" "}
                {currentProduct.category.categories_name}
              </div>

              <div>
                <label>
                  <strong>Price: $</strong>
                </label>{" "}
                {currentProduct.products_price}
              </div>
              <div>
                <label>
                  <strong>Qty:</strong>
                </label>{" "}
                {currentProduct.products_soluong}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProduct.products_status ? "No Display" : "For Display"}
              </div>
              <div>
                <label>
                  <strong>Retail:</strong>
                </label>{" "}
                {currentProduct.products_retail ? "Retail Box" : "DVD-R"}
              </div>
              <div>
                <label>
                  <strong>Episode:</strong>
                </label>{" "}
                {currentProduct.products_sotap}
              </div>
              <div>
                <label>
                  <strong>Source:</strong>
                </label>{" "}
                {currentProduct.products_nguonphim}
              </div>
              <div>
                <label>
                  <strong>Quality:</strong>
                </label>{" "}
                {currentProduct.products_chatluong}
              </div>
              <div>
                <label>
                  <strong>Actors:</strong>
                </label>{" "}
                {currentProduct.products_dienvien}
              </div>
              <div>
                <label>
                  <strong>Release date:</strong>
                </label>{" "}
                {currentProduct.products_ngaynhaphang}
              </div>
              <div>
                <label>
                  <strong>Destiption:</strong>
                </label>{" "}
                <div dangerouslySetInnerHTML={{ __html: currentProduct.products_description }}>
                </div>
              </div>

              <Link
                to={"/products/" + currentProduct.id}
                className="button badge-warning"
              >
                Edit this product
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a product to see detail...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

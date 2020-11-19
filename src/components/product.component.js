import React, { Component } from "react";
import productDataService from "../services/product.service";
import axios from 'axios' ;
import { Link } from "react-router-dom";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeproducts_name = this.onChangeproducts_name.bind(this);
    this.onChangeproducts_price = this.onChangeproducts_price.bind(this);
    this.onChangeproducts_image = this.onChangeproducts_image.bind(this);
    this.onChangeproducts_soluong = this.onChangeproducts_soluong.bind(this);
    this.onChangeproducts_sotap = this.onChangeproducts_sotap.bind(this);
    this.onChangeproducts_nguonphim = this.onChangeproducts_nguonphim.bind(this);
    this.onChangeproducts_chatluong = this.onChangeproducts_chatluong.bind(this);
    this.onChangeproducts_dienvien = this.onChangeproducts_dienvien.bind(this);
    this.onChangeproducts_ngaynhaphang = this.onChangeproducts_ngaynhaphang.bind(this);
    this.onChangeproducts_retail = this.onChangeproducts_retail.bind(this);
    this.onChangeproducts_description = this.onChangeproducts_description.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateproducts_status = this.updateproducts_status.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        products_name: "",
        products_price: "",
        products_soluong: "",
        products_status: false,
        products_retail: false,
        products_sotap: "",
        products_nguonphim: "",
        products_chatluong: "",
        products_dienvien: "",
        products_ngaynhaphang: "",
        products_description: "",
        selectedFile: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.products_id);
  }

  onChangeproducts_name(e) {
    const products_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_name: products_name
        }
      };
    });
  }

  onChangeproducts_image(e) {
    const products_image = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        products_image: products_image
      }
    }));
  }


  onChangeproducts_price(e) {
    const products_price = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        products_price: products_price
      }
    }));
  }

  onChangeproducts_soluong(e) {
    const products_soluong = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_soluong: products_soluong
        }
      };
    });
  }

  onChangeproducts_sotap(e) {
    const products_sotap = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_sotap: products_sotap
        }
      };
    });
  }

  onChangeproducts_nguonphim(e) {
    const products_nguonphim = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_nguonphim: products_nguonphim
        }
      };
    });
  }

  onChangeproducts_chatluong(e) {
    const products_chatluong = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_chatluong: products_chatluong
        }
      };
    });
  }

  onChangeproducts_dienvien(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          [name]: value
        }
      };
    });
  }

  onChangeproducts_retail(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          [name]: value
        }
      };
    });
  }

  onChangeproducts_ngaynhaphang(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          [name]: value
        }
      };
    });
  }

  onChangeproducts_description(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          [name]: value
        }
      };
    });
  }

  onChangeProduct(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          [name]: value
        }
      };
    });
  }


  getProduct(products_id) {
    console.log('product id trg getProduct: ' + products_id);
    productDataService.get(products_id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateproducts_status(status) {
    var data = {
      products_id: this.state.currentProduct.id,
      products_name: this.state.currentProduct.products_name,
      products_price: this.state.currentProduct.products_price,
      products_soluong: this.state.currentProduct.products_soluong,
      products_retail: this.state.currentProduct.products_retail,
      products_sotap: this.state.currentProduct.products_sotap,
      products_nguonphim: this.state.currentProduct.products_nguonphim,
      products_chatluong: this.state.currentProduct.products_chatluong,
      products_dienvien: this.state.currentProduct.products_dienvien,
      products_ngaynhaphang: this.state.currentProduct.products_ngaynhaphang,
      products_status: status
    };

    productDataService.update(this.state.currentProduct.products_id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduct: {
            ...prevState.currentProduct,
            products_status: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  fileSelectedHandler = event => {
    const products_image = event.target.files[0].name
    console.log('file SMALL selected handler');
    this.setState({
        selectedFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          products_image: "../products/" + products_image
        }
      };
    });
  }
  
  
  //works great 6/26/2020
  updateProduct() {
    // khong biet EDIT o dau, o dau chi la id chu khong con la products_id nhu trong table
    console.log('product id trong update: ' + this.state.currentProduct.id);
    //console.log('current product trong update: ' + this.state.currentProduct);

    productDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        // Sequelize xong
        console.log(response.data);

        // Xu ly tiep phan upload file
        const fd = new FormData();

        // neu co chon file hinh de upload thi moi chay khuc upload nay
        if (this.state.selectedFile) {
            fd.append("upfile", this.state.selectedFile);
            console.log("ten file se up la " + this.state.selectedFile.name);
           
            // tat ca cac function tren backend deu bat dau la localhost:8080/api
            // con dieu do qui dinh o dau thi khong biet luon
            axios({
                url: "http://localhost:8080/api/upfile",
                method: "post",
                data: fd,
            }).then(res => {
                console.log('file upload result: ' + res.statusText);
            }).catch(e => {
              console.log(e);
            })
          }

        this.setState({
          message: "The product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });

      this.props.history.push("/products");
      // window.location="/";
  }

  //works great 6/26/2020
  deleteProduct() {  
    console.log('vo delete func   :  ' + this.state.currentProduct.id);  
    productDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div className="border col">
        <Link to="/">Back to Home page</Link>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product Update</h4>
            <form>
              <div className="form-group">
                <label htmlFor="products_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="products_name"
                  value={currentProduct.products_name}
                  onChange={this.onChangeproducts_name}
                />
                <img src={"/products/" + currentProduct.products_image} alt={currentProduct.products_image}></img>
              </div>
              <div className="form-group">
                <label htmlFor="products_price">Small image</label>
                <input
                  type="text"
                  className="form-control"
                  id="products_image"
                  value={currentProduct.products_image}
                  onChange={this.onChangeproducts_image}
                />
                <input className="s_image" type="file" onChange={this.fileSelectedHandler}></input>
              </div>
              <div className="form-group">
                <label htmlFor="products_price">Price</label>
                <input
                  type="text"
                  className="product-price"
                  id="products_price"
                  value={currentProduct.products_price}
                  onChange={this.onChangeproducts_price}
                />
                <label htmlFor="products_soluong">Quantity: </label>
                <input
                  type="text"
                  className="product-qty"
                  id="products_soluong"
                  value={currentProduct.products_soluong}
                  onChange={this.onChangeproducts_soluong}
                />
              
              </div>
              <div className="form-group">
                <label>Retail</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_price"
                  value={currentProduct.products_retail}
                  onChange={this.onChangeproducts_retail}
                />

                <label>Episode</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_sotap"
                  value={currentProduct.products_sotap}
                  onChange={this.onChangeproducts_sotap}
                />
              </div><div className="form-group">
                <label>Source </label>
                <input
                  type="text"
                  className="product-other"
                  id="products_nguonphim"
                  value={currentProduct.products_nguonphim}
                  onChange={this.onChangeproducts_nguonphim}
                />

                <label>Quality</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_chatluong"
                  value={currentProduct.products_chatluong}
                  onChange={this.onChangeproducts_chatluong}
                />
              </div>
              <div className="form-group">
                <label>Actors</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_dienvien"
                  name="products_dienvien"
                  value={currentProduct.products_dienvien}
                  onChange={this.onChangeproducts_dienvien}
                />
              </div><div className="form-group">
                <label>Release Date</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_ngaynhaphang"
                  value={currentProduct.products_ngaynhaphang}
                  onChange={this.onChangeproducts_ngaynhaphang}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProduct.products_status ? "Display" : "No Display"}
              </div>
            </form>

            {/* nut status update nay de hoc hoi cho vui chu hong co khac biet gi ro rang voi cac field khac */}
            {currentProduct.products_status ? (
              <button
                className="btn badge-primary mr-2"
                onClick={() => this.updateproducts_status(false)}
              >
                Hide This Product
              </button>
            ) : (
              <button
                className="btn btn-info mr-2"
                //button badge-primary mr-2
                onClick={() => this.updateproducts_status(true)}
              >
                Show This Product
              </button>
            )}

            <button
              className="btn btn-danger"
              //button badge-danger mr-2
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              // button badge-success
              onClick={this.updateProduct}
            >
              Update
            </button>
            <button onClick={this.props.history.goBack} type="button" className="btn btn-danger" data-dismiss="modal">Discard</button>
            <p>{this.state.message}</p>
          </div>
          

        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}

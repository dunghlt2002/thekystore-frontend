import React, { Component } from "react";
import productDataService from "../services/product.service";
import axios from "axios";
import { Link } from "react-router-dom";
// import MyEmail from './email.component';
// import { renderEmail } from 'react-html-email';


export default class AddProduct extends Component {
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
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);
    this.state = {
      API_URL: process.env.REACT_APP_API_URL,
      id: null,
      products_name: "Tan CGDLong 1",
      products_price: "30",
      products_soluong: "100",
      products_status: false,
      products_retail: false,
      products_sotap: "99",
      products_nguonphim: "Retail",
      products_chatluong: "Good",
      products_dienvien: "Tran Ngoc Ky, Ai nua day",
      products_ngaynhaphang: "",
      products_description: "Rat hay",
      selectedFile: "",
      // products_: "aaa",
      // products_: "aaa",
      submitted: false
    };
  }

  onChangeproducts_name(e) {
    this.setState({
      products_name: e.target.value
    });
  }

  onChangeproducts_image(e) {
    this.setState({
      products_image: e.target.value
    });
  }


  onChangeproducts_price(e) {
    this.setState({
      products_price: e.target.value
    });
  }

  onChangeproducts_soluong(e) {
    this.setState({
      products_soluong: e.target.value
    });
  }

  onChangeproducts_sotap(e) {
    this.setState({
      products_sotap : e.target.value
    });
  }

  onChangeproducts_nguonphim(e) {
    this.setState({
      products_nguonphim : e.target.value
    });
  }

  onChangeproducts_chatluong(e) {
    this.setState({
      products_chatluong : e.target.value
    });
  }

  onChangeproducts_dienvien(e) {
    this.setState({
      products_dienvien : e.target.value
    });
  }

  onChangeproducts_retail(e) {
    this.setState({
      products_retail : e.target.value
    });
  }

  onChangeproducts_ngaynhaphang(e) {
    this.setState({
      products_ngaynhaphang : e.target.value
    });
  }

  onChangeproducts_description(e) {
    this.setState({
      products_description : e.target.value
    });
  }

  goBackList() {
    this.props.history.push("/products");
  }

  fileSelectedHandler = event => {
    const products_image = event.target.files[0].name
    this.setState({
        selectedFile: event.target.files[0],
        products_image: "../products/" + products_image
    })
    console.log('file SMALL selected handler' + this.state.products_image);

  }

  saveProduct() {
    console.log('vo Product save');
    var data = {
      products_name: this.state.products_name,
      products_price: this.state.products_price,
      products_soluong: this.state.products_soluong,
      products_retail: this.state.products_retail,
      products_sotap: this.state.products_sotap,
      products_nguonphim: this.state.products_nguonphim,
      products_chatluong: this.state.products_chatluong,
      products_dienvien: this.state.products_dienvien,
      products_ngaynhaphang: this.state.products_ngaynhaphang,
    };

    productDataService.create(data)
      .then(response => {
        this.setState({
          products_id: response.data.products_id,
          products_name: response.data.products_name,
          products_price: response.data.products_price,
          products_soluong: response.data.products_soluong,
          products_retail: response.data.products_retail,
          products_sotap: response.data.products_sotap,
          products_nguonphim: response.data.products_nguonphim,
          products_chatluong: response.data.products_chatluong,
          products_dienvien: response.data.products_dienvien,
          products_ngaynhaphang: response.data.products_ngaynhaphang,
          submitted: true
        });
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
                // url: "http://localhost:8080/api/upfile",
                url: this.state.API_URL,
                method: "post",
                data: fd,
            }).then(res => {
                console.log('file upload result: ' + res.statusText);
            }).catch(e => {
              console.log(e);
            })
          }
        // ENd phan xu ly file upload

      })
      .catch(e => {
        console.log(e);
      });

  }

  newProduct() {
    this.setState({
      id: null,
      products_name: "Tan CGDLong 1",
      products_price: "30",
      products_soluong: "100",
      products_status: false,
      products_retail: false,
      products_sotap: "99",
      products_nguonphim: "Retail",
      products_chatluong: "Good",
      products_dienvien: "Tran Ngoc Ky, Ai nua day",
      products_ngaynhaphang: "",
      products_description: "Rat hay",
      // products_: "aaa",
      // products_: "aaa",
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-info">
            <h4>You submitted successfully!</h4>
            <button className="btn-block btn-primary" onClick={this.newProduct}>
              Add
            </button>
            <Link to="/products">Back to Product List</Link>
          </div>
        ) : (
          <div className="form-container-big">
            <li>
              <h2>Add New Product</h2>
            </li>

            {/* <form className="form-container"> */}
              <li className="form-group">
                <label htmlFor="products_name">Name</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_name"
                  value={this.state.products_name}
                  onChange={this.onChangeproducts_name}
                />
                {/* <img src={"/products/" + this.state.products_image} alt={this.state.products_image}></img> */}
              </li>
              <li className="form-group">
                <label htmlFor="products_price">Small image</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_image"
                  value={this.state.products_image}
                  onChange={this.onChangeproducts_image}
                />
                <input className="form-group" type="file" onChange={this.fileSelectedHandler}></input>
              </li>
              <div className="form-group">
                <label htmlFor="products_price">Price</label>
                <input
                  type="text"
                  className="product-price"
                  id="products_price"
                  value={this.state.products_price}
                  onChange={this.onChangeproducts_price}
                />
                <label htmlFor="products_soluong">Quantity: </label>
                <input
                  type="text"
                  className="product-other"
                  id="products_soluong"
                  value={this.state.products_soluong}
                  onChange={this.onChangeproducts_soluong}
                />
              </div>

              <div className="form-group">
                <label>Retail</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_retail"
                  value={this.state.products_retail}
                  onChange={this.onChangeproducts_retail}
                />

                <label>Episode</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_sotap"
                  value={this.state.products_sotap}
                  onChange={this.onChangeproducts_sotap}
                />
              </div>
              <div className="form-group">
                <label>Source </label>
                <input
                  type="text"
                  className="product-other"
                  id="products_nguonphim"
                  value={this.state.products_nguonphim}
                  onChange={this.onChangeproducts_nguonphim}
                />

                <label>Quality</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_chatluong"
                  value={this.state.products_chatluong}
                  onChange={this.onChangeproducts_chatluong}
                />
              </div>
              <li className="form-group">
                <label>Actors</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_dienvien"
                  name="products_dienvien"
                  value={this.state.products_dienvien}
                  onChange={this.onChangeproducts_dienvien}
                />
              </li>
              <div className="form-group">
                <label>Release Date</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_ngaynhaphang"
                  value={this.state.products_ngaynhaphang}
                  onChange={this.onChangeproducts_ngaynhaphang}
                />
              </div>

              <li className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {this.state.products_status ? "Display" : "No Display"}
              </li>
            {/* </form> */}



            <button onClick={this.saveProduct} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

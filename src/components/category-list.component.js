import React, { Component } from "react";
import categoryDataService from "../services/category.service";
import { Link } from "react-router-dom";

export default class categoriesList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchName = this.onChangesearchName.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  //works great 6/26/2020
  deleteCategory(cat_id) {  
    //console.log('vo delete func   :  ' + cat_id);  
    categoryDataService.delete(cat_id)
      .then(response => {
        console.log(response.data);
        // this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/categories";
  }

  onChangesearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveCategories() {
    categoryDataService.getAll()
      .then(response => {
        this.setState({
          // categories: response.data.slice(0,10)
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });
  }

  setActiveCategory(category, index) {
    this.setState({
      currentCategory: category,
      currentIndex: index
    });
  }

  searchName() {
    categoryDataService.findByKeyword(this.state.searchName)
      .then(response => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, categories, currentCategory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group">
            <input
              type="text"
              className="searchInput"
              placeholder="Search by category name"
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
          <h2>Category List</h2>

          <ul className="list-group">
            {categories &&
              categories.map((category, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCategory(category, index)}
                  key={index}
                >
                  {category.categories_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            // onClick={this.removeAllcategories}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-8">
          {currentCategory ? (
            <div>
              <h2>Category Information</h2>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                  {currentCategory.categories_name}
              </div>
              
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCategory.categories_status ? "Not Use" : "In Use"}
              </div>
              <div>
                <label>
                  <strong>Parent:</strong>
                </label>{" "}
                {currentCategory.parent_id}
              </div>

              {/* // o day lai dung ID chu khong phai la categories_id */}
              <Link
                to={"/categories/" + currentCategory.id}
                className="btn btn-success"
              >
                Edit this category
              </Link>
              <button
              className="btn btn-danger"
              //button badge-danger mr-2
              // <button type="reset" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteUser(id) }} className="btn btn-block btn-danger" >Delete</button>
              onClick={() => {this.deleteCategory(currentCategory.id)} }
            >
              Delete
            </button>
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

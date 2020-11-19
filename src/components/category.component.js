import React, { Component } from "react";
import categoryDataService from "../services/category.service";
import { Link } from "react-router-dom";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.onChangecategories_name = this.onChangecategories_name.bind(this);
    this.onChangeparent_id = this.onChangeparent_id.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updatecategories_status = this.updatecategories_status.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      mastercategories: [],
      currentCategory: {
        id: null,
        categories_name: "",
        categories_status: false,
        parent_id: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.categories_id);
    this.retrieveMasterCategories();
  }

  retrieveMasterCategories() {
    categoryDataService.getMaster()
      .then(response => {
        this.setState({
          mastercategories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangecategories_name(e) {
    const categories_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          categories_name: categories_name
        }
      };
    });
  }

  onChangeparent_id(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const parent_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          parent_id: parent_id
        }
      };
    });
  }

  onChangeProduct(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          [name]: value
        }
      };
    });
  }


  getCategory(categories_id) {
    console.log('category id trg getCategory: ' + categories_id);
    categoryDataService.get(categories_id)
      .then(response => {
        this.setState({
          currentCategory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatecategories_status(status) {
    var data = {
      categories_id: this.state.currentCategory.id,
      categories_name: this.state.currentCategory.categories_name,
      parent_id: this.state.currentCategory.parent_id,
      categories_status: status
    };

    categoryDataService.update(this.state.currentCategory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCategory: {
            ...prevState.currentCategory,
            categories_status: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //works great 6/26/2020
  updateCategory() {
    
    //console.log('CAT id trong update: ' + this.state.currentCategory.id);
    

    categoryDataService.update(
      this.state.currentCategory.id,
      this.state.currentCategory
    )
      .then(response => {
        // Sequelize xong
        console.log(response.data);

        this.setState({
          message: "The category was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/categories";
  }

  //works great 6/26/2020
  deleteCategory() {  
    console.log('vo delete func   :  ' + this.state.currentCategory.id);  
    categoryDataService.delete(this.state.currentCategory.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCategory, mastercategories } = this.state;

    return (
      <div className="col">
        <Link to="/categories">Previous Page</Link>
        {currentCategory ? (
          <div className="edit-form border">
            <h2>Category Update</h2>
            <form>
              <div className="form-group">
                <label htmlFor="categories_name">Category Name</label>
                <input
                  type="text"
                  className="product"
                  id="categories_name"
                  value={currentCategory.categories_name}
                  onChange={this.onChangecategories_name}
                />
              </div>
              
              <div className="form-group">
                <label>Parent ID</label>
                <input
                  type="text"
                  className="product"
                  value={currentCategory.parent_id}
                  onChange={this.onChangeparent_id}
                />
              </div>

           

              <div class="form-group">
                  Select parent category:
                  <select id="parent_id" name="parent_id" onChange={this.onChangeparent_id} >
                       {mastercategories.map((mastercategory) => 
                        <option  key={mastercategory.id}
                        selected={mastercategory.id === currentCategory.parent_id? true:false}
                        value={mastercategory.id}>{mastercategory.categories_name}
                         </option>
                       )}
                  </select>

              </div>



              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCategory.categories_status ? "Not Use" : "In Use"}
              </div>
            </form>

            {/* nut status update nay de hoc hoi cho vui chu hong co khac biet gi ro rang voi cac field khac */}
            {currentCategory.categories_status ? (
              <button
                className="btn badge-primary mr-2"
                onClick={() => this.updatecategories_status(false)}
              >
                Use this Category
              </button>
            ) : (
              <button
                className="btn btn-info mr-2"
                //button badge-primary mr-2
                onClick={() => this.updatecategories_status(true)}
              >
                Do NOT Use this Category
              </button>
            )}

            <button
              className="btn btn-danger"
              //button badge-danger mr-2
              onClick={this.deleteCategory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              // button badge-success
              onClick={this.updateCategory}
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

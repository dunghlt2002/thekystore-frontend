import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import { Link } from "react-router-dom";
import Pagination from 'pagination-component';
import '../App.css';
import { connect } from 'react-redux';
// import { PureComponent } from "react";

class customersList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchKeyword = this.onChangesearchKeyword.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);

    this.listEl = null;

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleSelectStart = this.handleSelectStart.bind(this);

    this.state = {
      isShiftDown: false,
      selectedItems: [],
      lastSelectedItem: null,
      checkedBoxes: [],
      postsPerPage:15,
      totalPages: 1,
      currentPage: 1,
      customers: [],
      currentCustomer: null,
      currentIndex: 0,  // phan tu dau tien trong list duoc selected
      searchKeyword: ''
    };
  }


  multiDelete() {
    console.log('test multi ');
    console.log('tst selected inside set state ' + JSON.stringify(this.state.selectedItems));
    
  }

  SelectAll() {
    var arr = []
    
    console.log('arr ' + arr);

    this.state.customers.map(item => {
      // this.allSelectItem(item.id)
      arr.push(item.id.toString())
    })
    console.log('duyet tung em ' + arr);
    this.setState({
      selectedItems: arr
    })

    console.log('aaaaa  ' + this.state.selectedItems);

  }

  unSelectAll() {
    this.setState({
      selectedItems: []
    }, function() {
      console.log('Unselect All ' + this.state.selectedItems);
    }
    );
  }

  onChangeCurrentPage(i) {
    // console.log('i la : ' + i);
    this.setState({
      currentPage: i+1
    }, this.retrieveCustomers((i+1))
    )
  this.unSelectAll();
    // console.log('trang thu chinh xac :  ' + this.state.currentPage + ' hay la i+1 ' + (i+1));
    
    
  }

  componentDidMount() {
    // this.retrieveCustomers(this.state.currentPage,this.state.searchKeyword);
    this.retrieveCustomers(1);
    document.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.listEl.addEventListener("selectstart", this.handleSelectStart, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("keydown", this.handleKeyDown);
    this.listEl.removeEventListener("selectstart", this.handleSelectStart);
  }

  allSelectItem(value) {
    // const { value } = e.target;
    console.log('value handle ' + value);
    const nextValue = this.getNextValue(value);
  
    this.setState({ 
      selectedItems: nextValue, 
      lastSelectedItem: value 
    });
    console.log('test ' + this.state.selectedItems);
  }

  handleSelectItem(e) {
    const { value } = e.target;
    console.log('value handle ' + e.target.value);
    const nextValue = this.getNextValue(value);
    console.log('next value   ' + e.target.value);
  
    this.setState({ 
      selectedItems: nextValue, 
      lastSelectedItem: value 
    }, function () {
      console.log('test ' + this.state.selectedItems);
    });
    console.log('test ' + this.state.selectedItems);
  }

  getNewSelectedItems(value) {
    const { lastSelectedItem, items } = this.state;
    const currentSelectedIndex = items.findIndex(item => item.id === value);
    const lastSelectedIndex = items.findIndex(
      item => item.id === lastSelectedItem
    );
  
    return items
      .slice(
        Math.min(lastSelectedIndex, currentSelectedIndex),
        Math.max(lastSelectedIndex, currentSelectedIndex) + 1
      )
      .map(item => item.id);
  }
  
  getNextValue(value) {
    const { isShiftDown, selectedItems } = this.state;
    const hasBeenSelected = !selectedItems.includes(value);
  
    if (isShiftDown) {
      const newSelectedItems = this.getNewSelectedItems(value);
      // de-dupe the array using a Set
      const selections = [...new Set([...selectedItems, ...newSelectedItems])];
  
      if (!hasBeenSelected) {
        return selections.filter(item => !newSelectedItems.includes(item));
      }
  
      return selections;
    }
  
    // if it's already in there, remove it, otherwise append it
    return selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value];
  }

  handleSelectStart(e) {
    if (this.state.isShiftDown) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    if (e.key === "Shift" && this.state.isShiftDown) {
      this.setState({ isShiftDown: false });
    }
  }
  
  handleKeyDown(e) {
    if (e.key === "Shift" && !this.state.isShiftDown) {
      this.setState({ isShiftDown: true });
    }
  }

  //works great 6/26/2020
  deleteCustomer(cat_id) {  
    //console.log('vo delete func   :  ' + cat_id);  
    customerDataService.delete(cat_id)
      .then(response => {
        console.log(response.data);
        // this.props.history.push('/customers')
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/customers";
  }

  onChangesearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  retrieveCustomers(callPage) {
    // console.log('trang ht ' + currentPage);
    // console.log('trang ht ' + searchKeyword);

    customerDataService.getAll(callPage,this.state.searchKeyword)
      .then(response => {
        this.setState({
          customers: response.data.data,
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
    this.retrieveCustomers(1);
    this.setState({
      currentCustomer: null,
      // selectedItems: [],
      // lastSelectedItem: null,
      currentIndex: -1
    }, function() {
        console.log('a' + this.state.selectedItems);
    }
    );
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index
    });
  }

  searchKeyword(e) {
    e.preventDefault();
    this.setState({
        // customers: [],
        // totalPages: 1,
        currentIndex: -1,
        currentCustomer: null
    })
    // customerDataService.findByKeyword(this.state.currentPage, this.state.searchKeyword)
    customerDataService.getAll(this.state.currentPage, this.state.searchKeyword)
      .then(response => {
        this.setState({
          customers: response.data.data,
          totalPages: response.data.pages
        });
        console.log(this.state.customers);
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectIndex(index) {
    var joined = this.state.selectedItems.concat(index);
    this.setState({
      selectedItems: joined
    }, function () {
      console.log('test selected ' + this.state.selectedItems);
    })
  }

  renderItems() {
    const { customers, selectedItems } = this.state;
    return customers.map(item => {
      const { id, customers_name } = item;
      // console.log('selected id '+id + '  ' + selectedItems.includes(id));
      return (
        <div >
          <li key={id} className={
                    "list-group-item " +
                    (id === this.state.currentIndex ? "active" : "")
                  } onClick={() => this.setActiveCustomer(item, id)}>
            <input className="checkbox-dd"
              onChange={this.handleSelectItem}
              type="checkbox"
              checked={selectedItems.includes(id.toString())}  //
              value={id}
              id={`item-${id}`}
              onClick={() => this.setActiveCustomer(item, id)}
            />
             {/* for={`item-${id}`} */}
            <label ><span>{"  "} </span> {customers_name}</label>
          </li>
        </div>
      );
    });
  }

  render() {
    // const { searchKeyword, customers, currentCustomer, currentIndex } = this.state;
    const { searchKeyword, currentCustomer } = this.state;
    // console.log('khach ' + customers.length);

    return (
      <div className="list row">
        <div className="col-md-12">
          <form type="submit" onSubmit={(event) => this.searchKeyword(event)}>
              <h2>Customer List</h2>
              <td className="input-group">
                  <input type="text" className="searchInputLong"
                    placeholder="Search by customer name" value={searchKeyword}
                    onChange={this.onChangesearchKeyword} />
                
                  <button className="btn btn-outline-secondary"
                    type="button" onClick={(event) => this.searchKeyword(event)}>
                    Search </button>
              </td>
              
              <td>
                <button className="btn btn-info"
                    type="button" onClick={(event) => this.SelectAll(event)}>
                    Select All</button>
                    <button className="btn btn-info"
                    type="button" onClick={(event) => this.unSelectAll(event)}>
                    UN Select All </button>
              </td>

              <td>
                <button className="btn btn-danger"
                    type="button" onClick={(event) => this.multiDelete(event)}>
                    Delete seleted item </button>
              </td>
          </form>
          
        </div>

        <div className="col-md-4">
          
          <ul ref={node => (this.listEl = node)}>{this.renderItems()}</ul>;



          

        </div>

        <div className="col-md-8">
          {currentCustomer ? (

            <div className="order-header">
              <h2>Customer Information</h2>
 
              <div className="order-info">
                  <label className="order-info-element"><strong>Name: </strong></label>
                  {" "}{currentCustomer.customers_name}
              
                  <label className="order-info-element"><strong>Status: </strong></label>
                  {" "}{currentCustomer.customers_status ? "Not Use" : "In Use"}
              </div>
              <div className="order-info">
                  <label className="order-info-element"><strong>Address: </strong></label>
                  {" "}{currentCustomer.customers_address}
                  {" "}{currentCustomer.customers_city}{" "}{currentCustomer.customers_state}
                  {" "}{currentCustomer.customers_zipcode}
                  {" "}{currentCustomer.customers_country}
              </div>
              <div className="order-info">
                  <label className="order-info-element"><strong>Email: </strong></label>
                  {" "}{currentCustomer.customers_email}
              </div>
              <div className="order-info">
                  <label className="order-info-element"><strong>Phone: </strong></label>
                  {" "}{currentCustomer.customers_phone}
              </div>
              <div className="order-info">
                  <label className="order-info-element"><strong>Username: </strong></label>
                  {" "}{currentCustomer.customers_username}
              </div>
              
              <div>
                  {/* // o day lai dung ID chu khong phai la customers_id */}
                  <Link to={"/customers/" + currentCustomer.id}
                    className="btn btn-block btn-success" > 
                    Edit this customer
                  </Link>


                  {/* Phan quyen so so */}
                  { this.props.currUser ? ( this.props.currUser.isadmin === 0 ?
                      <button className="btn btn-block btn-danger" 
                      //button badge-danger mr-2
                      type="reset" onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCustomer(currentCustomer.id) }} >
                        Delete
                      </button>
                  : null ) : null
                  }

                  
                  
              </div>
        </div>
        ) : (
          <div>
            <br />
            <p>Please click on a customer to see detail...</p>
          </div>
        )}
      </div>

      <div className="header col">
                <Pagination 
                      currentPage={this.state.currentPage-1}
                      pageCount={this.state.totalPages}
                      pageLinkClassName="page-link"
                      currentLinkClassName="current-link"
                      onPageClick={i => {
                        console.log(`Link to page ${i} was clicked.`);
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
  console.log('userSignin trong customer List ' + JSON.stringify(state.userSignin.userInfo));
  
  return {
      currUser: state.userSignin.userInfo
  }
}
export default connect(mapStateToProps, null)(customersList);

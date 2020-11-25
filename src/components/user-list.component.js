import React, { Component } from "react";
import userDataService from "../services/user.service";
import { Link } from "react-router-dom";
import Pagination from 'pagination-component';
import '../App.css';
import { connect } from 'react-redux';

class usersList extends Component {
  constructor(props) {
    super(props);
    this.onChangesearchKeyword = this.onChangesearchKeyword.bind(this);
    this.retrieveusers = this.retrieveusers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
    

    this.state = {
      postsPerPage:15,
      totalPages: 1,
      currentPage: 1,
      users: [],
      currentUser: null,
      currentIndex: -1,  // phan tu dau tien trong list duoc selected
      searchKeyword: ''
    };
  }


  onChangeCurrentPage(i) {
    console.log('i la : ' + i);
    this.setState({
      currentPage: i+1
    })

    console.log('trang thu chinh xac :  ' + this.state.currentPage + ' hay la i+1 ' + (i+1));
    this.retrieveusers((i+1));
    
  }

  componentDidMount() {
    this.retrieveusers(this.state.currentPage,this.state.searchKeyword);
  }

  //works great 6/26/2020
  deleteUser(id) {  
    //console.log('vo delete func   :  ' + cat_id);  
    userDataService.delete(id)
      .then(response => {
        console.log(response.data);
        // this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
      window.location="/users";
  }

  onChangesearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  retrieveusers(currentPage,searchKeyword) {
    console.log('trang ht ' + currentPage);
    console.log('trang ht ' + searchKeyword);

    userDataService.getAll(currentPage,this.state.searchKeyword)
      .then(response => {
        this.setState({
          users: response.data.data,
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
    this.retrieveusers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  searchKeyword(e) {
    e.preventDefault();
    this.setState({
        users: [],
        totalPages: 1,
        currentIndex: -1,
        currentUser: null
    })

    userDataService.getAll(this.state.currentPage, this.state.searchKeyword)
      .then(response => {
        this.setState({
          users: response.data.data,
          totalPages: response.data.pages
        });
        console.log(this.state.users);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchKeyword, users, currentUser, currentIndex } = this.state;
    // console.log('user la ' + users.length);
    return (
      <div className="list row">
        <div className="col-md-12">
          <form type="submit" onSubmit={(event) => this.searchKeyword(event)}>
              <div className="input-group">
                  <input type="text" className="searchInputLong"
                    placeholder="Search by user name" value={searchKeyword}
                    onChange={this.onChangesearchKeyword} />
                
                  <button className="btn btn-outline-secondary"
                    type="button" onClick={(event) => this.searchKeyword(event)}>
                    Search </button>
              </div>
          </form>
          
        </div>

        <div className="col-md-4">
          <h2>User List</h2>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.user}
                </li>
              ))}
          </ul>

        </div>

        <div className="col-md-8">
          {currentUser ? (

            <div className="order-header">
              <h2>User Information</h2>
 
              <div className="order-info">
                  <label className="order-info-element"><strong>User Name: </strong></label>
                  {" "}{currentUser.user}
              
                  <label className="order-info-element"><strong>Status: </strong></label>
                  {" "}{currentUser.isadmin ? "Regular" : "Admin"}
              </div>
              <div className="order-info">
                  <label className="order-info-element"><strong>Email: </strong></label>
                  {" "}{currentUser.email}
              </div>
              
              <div>
                  {/* // o day lai dung ID chu khong phai la users_id */}
                  <Link to={"/users/" + currentUser.id}
                    className="btn btn-block btn-success" > 
                    Edit this user
                  </Link>


                  {/* Phan quyen so so */}
                  { this.props.currUser ? ( this.props.currUser.isadmin === 0 ?
                      <button className="btn btn-block btn-danger" 
                      //button badge-danger mr-2
                      type="reset" onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser(currentUser.id) }} >
                        Delete
                      </button>
                  : null ) : null
                  }

                  
                  
              </div>
        </div>
        ) : (
          <div>
            <br />
            <p>Please click on a user to see detail...</p>
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
  console.log('userSignin trong user List ' + JSON.stringify(state.userSignin.userInfo));
  
  return {
      currUser: state.userSignin.userInfo
  }
}
export default connect(mapStateToProps, null)(usersList);

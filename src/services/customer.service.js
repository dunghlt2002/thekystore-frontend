import axios from 'axios';
import Cookie from 'js-cookie';
import http from "../http-common";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class customerDataService {
  getAll(currentPage,search_keyword) {
    const customerInfo = Cookie.getJSON('customerInfo') || null;
    const token = customerInfo.token;    
    console.log('token getAll customers ' + token) ;
    // console.log('get all customers here limit ' + currentPage) ;
    if (token) {
      // return http.get(`/customers/${currentPage}?search_keyword=${search_keyword}`);
      return axios.get(
        REACT_APP_API_URL + `customers/${currentPage}?search_keyword=${search_keyword}`,
        { headers: {'Authorization': `Bearer ${token}` }}
        );
    } else {
      console.log('fail token');
      
    }
  }

  // Ref only
  getAllUser(currentPage,search_keyword) {
    
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;    
    
    console.log('get all users here limit ' + currentPage) ;
    // bi eroor cross-origin
    // , { headers: authHeader() } 
    // return axios.get(API_URL + 'user', { headers: authHeader() });

    return axios.get(
      REACT_APP_API_URL + `users/${currentPage}?search_keyword=${search_keyword}`,
      { headers: {'Authorization': `Bearer ${token}` }}
      );
  }


  findByKeyword(search_keyword) {
    console.log('hi search keyword ' + search_keyword);
    return http.get(`/customers?search_keyword=${search_keyword}`);
  }

  // getMaster() {
  //   console.log('get all Master customers here FE');
  //   return http.get("/customersmaster");
  // }

  get(customers_id) {
    // return http.get(`/customer/${customers_id}`);
    // return axios.get(API_URL + `/user/${id}`);
    return axios.get(REACT_APP_API_URL + `/customer/${customers_id}`);
  }

  // dung de verify email khi muon check email trong DB
  getByemail(customers_email) {
    return http.get(`/customerbyemail/${customers_email}`);
  }
  // resetpasswordrequest  
  resetPasswordRequest(customers_email) {
    return http.get(`/resetpasswordrequest/${customers_email}`);
  }


  create(data) {
    return http.post("/customers", data);
  }

  update(customers_id, data) {
    console.log('customerin service:  ' + data);
    return http.put(`/customers/${customers_id}`, data);
  }

  delete(customers_id) {
    return http.delete(`/customers/${customers_id}`);
  }

  // deleteAll() {
  //   return http.delete(`/customers`);
  // }

  

  findBycustomers_name(customers_name) {
   
    return http.get(`/customers?customers_name=${customers_name}`);
  }
}

export default new customerDataService();
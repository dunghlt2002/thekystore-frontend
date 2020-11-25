import axios from 'axios';
import Cookie from 'js-cookie';
// import authHeader from './auth-header';
// import http from "../http-common";

// thay vi nhot trong http-common dem ra day cho de nhin va chinh header
const API_URL = 'http://localhost:8080/api/';

// const userInfo = Cookie.getJSON('userInfo') || null;
// if (userInfo) {
//   const token = userInfo.token;
// } else {
//   const token = "test"
// }

class userDataService {
  
  getAll(currentPage,search_keyword) {
    
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;    
    
    console.log('get all users here limit ' + currentPage) ;
    // bi eroor cross-origin
    // , { headers: authHeader() } 
    // return axios.get(API_URL + 'user', { headers: authHeader() });

    return axios.get(
      API_URL + `users/${currentPage}?search_keyword=${search_keyword}`,
      { headers: {'Authorization': `Bearer ${token}` }}
      );
    // return http.get(`/customers?search_keyword=${search_keyword}`);
    // return http.get(`/customers/${currentPage}`);
    // return http.get("/users");

    // headers: {
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json',
    //   'Authorization': `Bearer ${token}`,
    // }

  }

  get(id) {
    console.log('lay 1 user ' + id);
    return axios.get(API_URL + `/user/${id}`);
  }

  create(data) {
    return axios.post(API_URL + `/users`, data);
  }

  update(users_id, data) {
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;
    console.log('category in service:  ' + data);
    return axios.put(API_URL + `/users/${users_id}`, data,
    { headers: {'Authorization': `Bearer ${token}` }}
    );
  }
  
  delete(users_id) {
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;
    return axios.delete(API_URL + `/users/${users_id}`,
    { headers: {'Authorization': `Bearer ${token}` }}
    );
  }

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return axios.get(API_URL + `/users?search_keyword=${search_keyword}`);
  }

  findByusers_name(users_name) {
    return axios.get(API_URL + `/users?users_name=${users_name}`);
  }

  // Dung testing, chua xai duoc
  verify(users_id) {
    return axios.get(API_URL + `/userverify/${users_id}`);
  }
  // deleteAll() {
  //   return http.delete(`/users`);
  // }

}

export default new userDataService();
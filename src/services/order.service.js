import axios from 'axios';
import Cookie from 'js-cookie';
import http from "../http-common";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const customerInfo = Cookie.getJSON('customerInfo') || null;
// const token = customerInfo?customerInfo.token:null;
// console.log('token customers ' + token) ;

class orderDataService {
  getAll(status,token) {
    if (token) {
      console.log('get all orders here FE ' + token);
      // Khong verify token
      // return http.get(`/orders/${status}`);
      return axios.get(
        REACT_APP_API_URL + `orders/${status}`,
        { headers: {'Authorization': `Bearer ${token}` }}
        );
    } else {
      console.log('fail token in orders get ALL');
    }
  }

  findByKeyword(search_keyword, status) {
    console.log('hi search name ' + status);
    return http.get(`/orders/${status}?search_keyword=${search_keyword}`);
    // return http.get(`/orders?search_keyword=${search_keyword}`);
  }

  getAllByCustomer(customer_id,status,token) {
    console.log('get all orders by Customer  ' + customer_id);
    // return http.get(`/ordersbycustomer/${customer_id}-${status}`);
    if (token) {
      console.log('get all orders here FE ' + token);
      return axios.get(
        REACT_APP_API_URL + `ordersbycustomer/${customer_id}-${status}`,
        { headers: {'Authorization': `Bearer ${token}` }}
        );
    } else {
      console.log('fail token in orders get ALL');
    }
  }

  get(orders_id,token) {
    console.log('hihih in order service');
    if (token) {
      // Khong verify token
      // return http.get(`/order/${orders_id}`);
      return axios.get(
        REACT_APP_API_URL + `order/${orders_id}`,
        { headers: {'Authorization': `Bearer ${token}` }}
        );
    } else {
      console.log('fail token in orders get ALL');
    }
  }

  create(data, token) {
    // Khong verify token
    //  return http.post("/orders", data);
    console.log('hihih in CREATE order');
    if (token) {
      return axios.post(
        REACT_APP_API_URL + `/orders`, data,
        { headers: {'Authorization': `Bearer ${token}` }}
        );
    } else {
      console.log('fail token in orders get ALL');
    }
  }
  
  createdetail(data) {
    return http.post("/orderdetails", data);
 }

  update(orders_id, data) {
    console.log('data in service, update :  ' + data.orders_status);
    return http.put(`/orders/${orders_id}`, data);
  }

  delete(orders_id) {
    return http.delete(`/orders/${orders_id}`);
  }

  // deleteAll() {
  //   return http.delete(`/orders`);
  // }


  // rieng orders phuc tap nen tach rieng cai seach nay
  findOne(orders_id) {
    console.log('hi search order ID');
    return http.get(`/orders/${orders_id}`);
  }

}

export default new orderDataService();
import http from "../http-common";

class customerDataService {
  getAll(currentPage,search_keyword) {
    console.log('get all customers here limit ' + currentPage) ;
    return http.get(`/customers/${currentPage}?search_keyword=${search_keyword}`);
    // return http.get(`/customers?search_keyword=${search_keyword}`);
    // return http.get(`/customers/${currentPage}`);
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
    return http.get(`/customer/${customers_id}`);
  }

  getByemail(customers_email) {
    return http.get(`/customerbyemail/${customers_email}`);
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
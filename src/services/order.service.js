import http from "../http-common";

class orderDataService {
  getAll(status) {
    console.log('get all orders here FE ' + status);
    return http.get(`/orders/${status}`);
  }

  findByKeyword(search_keyword, status) {
    console.log('hi search name ' + status);
    return http.get(`/orders/${status}?search_keyword=${search_keyword}`);
    // return http.get(`/orders?search_keyword=${search_keyword}`);
  }

  getAllByCustomer(customer_id,status) {
    console.log('get all orders by Customer  ' + customer_id);
    return http.get(`/ordersbycustomer/${customer_id}-${status}`);
  }

  // getMaster() {
  //   console.log('get all Master orders here FE');
  //   return http.get("/ordersmaster");
  // }

  get(orders_id) {
    console.log('hihih in order service');
    return http.get(`/order/${orders_id}`);
  }

  create(data) {
     return http.post("/orders", data);
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
import http from "../http-common";

class orderDataService {
  getAll() {
    console.log('get all orders here FE');
    return http.get("/orders");
  }

  // getMaster() {
  //   console.log('get all Master orders here FE');
  //   return http.get("/ordersmaster");
  // }

  get(orders_id) {
    console.log('hihih in order service');
    return http.get(`/orders/${orders_id}`);
  }

  // create(data) {
  //   return http.post("/orders", data);
  // }

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

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return http.get(`/orders?search_keyword=${search_keyword}`);
  }

  // rieng orders phuc tap nen tach rieng cai seach nay
  findOne(orders_id) {
    console.log('hi search order ID');
    return http.get(`/orders/${orders_id}`);
  }

}

export default new orderDataService();
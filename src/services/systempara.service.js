import http from "../http-common";

class systemparaDataService {
  getAll() {
    console.log('get all SYSTEM PARA here');
    return http.get("/systempara");
  }

  get(id) {
    return http.get(`/systempara/${id}`);
  }

  create(data) {
    return http.post("/systempara", data);
  }

  update(id, data) {
    console.log('systempara in service:  ' + data);
    return http.put(`/systempara/${id}`, data);
  }

  findByKeyword(search_keyword) {
    console.log('hi search content  ');
    return http.get(`/systempara?search_keyword=${search_keyword}`);
  }

  // findBycategories_name(categories_name) {
  //   return http.get(`/categories?categories_name=${categories_name}`);
  // }

  // delete(categories_id) {
  //   return http.delete(`/systempara/${id}`);
  // }
  
  // deleteAll() {
  //   return http.delete(`/systempara`);
  // }


}

export default new systemparaDataService();
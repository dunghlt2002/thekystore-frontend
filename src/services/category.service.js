import http from "../http-common";

class categoryDataService {
  getAll() {
    console.log('get all categories here FE');
    return http.get("/categories");
  }

  getMaster() {
    console.log('get all Master categories here FE');
    return http.get("/categoriesmaster");
  }

  getNotMaster() {
    console.log('get all NOT Master categories here FE');
    return http.get("/categoriesnotmaster");
  }

  get(categories_id) {
    return http.get(`/categories/${categories_id}`);
  }

  create(data) {
    return http.post("/categories", data);
  }

  update(categories_id, data) {
    console.log('category in service:  ' + data);
    return http.put(`/categories/${categories_id}`, data);
  }

  delete(categories_id) {
    return http.delete(`/categories/${categories_id}`);
  }

  // deleteAll() {
  //   return http.delete(`/categories`);
  // }

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return http.get(`/categories?search_keyword=${search_keyword}`);
  }

  findBycategories_name(categories_name) {
   
    return http.get(`/categories?categories_name=${categories_name}`);
  }
}

export default new categoryDataService();
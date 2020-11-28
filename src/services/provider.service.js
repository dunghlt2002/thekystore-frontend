import http from "../http-common";

class providerDataService {
  getAll() {
    console.log('get all providers here FE');
    return http.get("/providers");
  }

  getMaster() {
    console.log('get all Master providers here FE');
    return http.get("/providersmaster");
  }

  getNotMaster() {
    console.log('get all NOT Master providers here FE');
    return http.get("/providersnotmaster");
  }

  get(providers_id) {
    return http.get(`/providers/${providers_id}`);
  }

  create(data) {
    return http.post("/providers", data);
  }

  update(providers_id, data) {
    console.log('provider in service:  ' + data);
    return http.put(`/providers/${providers_id}`, data);
  }

  delete(providers_id) {
    return http.delete(`/providers/${providers_id}`);
  }

  // deleteAll() {
  //   return http.delete(`/providers`);
  // }

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return http.get(`/providers?search_keyword=${search_keyword}`);
  }

  findByproviders_name(providers_name) {
   
    return http.get(`/providers?providers_name=${providers_name}`);
  }
}

export default new providerDataService();
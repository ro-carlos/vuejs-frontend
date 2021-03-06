import http from "../http-common";

class DomainService {
  getAll() {
    return http.get("/connections");
  }
  findByConnection(host) {
    return http.get(`/connections/${host}`);
  }

  getDomain(host) {
    return http.get(`/domain/${host}`);
  }
}

export default new DomainService();

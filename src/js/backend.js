export class Backend {
    constructor() {
      this.baseUrl = "";
    }
  
    setBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    getBaseUrl() {
      return this.baseUrl;
    }
  
    get(endpoint) {
      return fetch(this.baseUrl + endpoint).then(response => response.json());
    }
  
    post(endpoint, data = {}) {
      return fetch(this.baseUrl + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then(response => response.json());
    }
  }
  
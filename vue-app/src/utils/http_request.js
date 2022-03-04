import axios from "axios";

const VUE_APP_API_BASE_URL = "https://mhc-backend.herokuapp.com";

const http_request = {
  _token: null,
  _axios: null,
  getBaseUrl: function () {
    return VUE_APP_API_BASE_URL;
  },
  getHeaders: function () {
    return axios.defaults.headers.common;
  },
  setHeaders: function () {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Methods"] =
      "GET,PUT,POST,DELETE,PATCH";

    axios.defaults.headers.common["Authorization"] = `Bearer ${this._token}`;
  },
  init: function () {
    this.setHeaders();
    this._axios = axios.create({
      baseURL: VUE_APP_API_BASE_URL,
    });
  },
  setToken: function (token) {
    this._token = token;
    this.init();
  },
  removeToken: function () {
    this._token = null;
    this.setHeaders();
  },
  get: function (path, queryParams) {
    return this._axios.get(path, {
      params: queryParams,
    });
  },
  post: function (path, body, queryParams) {
    return this._axios.post(path, body, {
      params: queryParams,
    });
  },
  readError: function (error) {
    if (error.response != undefined) {
      const errors = error.response.data.error;

      if (errors instanceof Array) {
        return errors[0];
      } else if (errors instanceof Object) {
        const col = Object.keys(errors)[0];
        const message = Object.values(errors)[0];

        return `${col} ${message}`;
      }

      return errors;
    }

    return "An error occured. Please try again!";
  },
  put: function (path, body) {
    return this._axios.put(path, body);
  },
  delete: function (path) {
    return this._axios.delete(path);
  },
};

export default http_request;

import Axios from 'axios/dist/axios';
import apis from '../apis';
import * as utils from '../utils';
import wepyAxiosAdapter from 'wepy-plugin-axios/dist/adapter';

/**
 *
 * @param config
 * @returns {*}
 */
const getConfig = (config) => {
  const {method} = config;
  const opts = config.url;
  const {url, params} = opts;
  config.timeout = apis.timeout;
  console.log(config);
  config.headers = apis.headers;
  config.adapter = wepyAxiosAdapter(Axios);
  config.url = apis.baseUrl + url;
  if (method === 'get') {
    config.params = Object.assign(params, config.params);
    config.params = utils.stringify(config.params);
  }
  return config;
};

Axios.interceptors.request.use(
  (config) => {
    const CONFIG = getConfig(config);
    return CONFIG;
  },
  (error) => {
    return Promise.reject(error);
  });

Axios.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response.data);
      }, 1000);
    });
  },
  (error) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(error.response);
      }, 1000);
    });
  });

export default Axios;

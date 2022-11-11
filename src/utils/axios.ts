import { Config } from '../app/config';
import Axios, { AxiosRequestConfig } from 'axios';

export const axios = Axios.create({
  baseURL: Config.BASE_URL,
});

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = '';
  if (!config.headers) {
    config.headers = {};
  }
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.accept = 'application/json';
  return config;
}
axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

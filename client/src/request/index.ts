/*
 * @Author: 归宿
 * @Date: 2022-08-05 16:14:32
 * @Description: 
 */
import axios, { AxiosInstance } from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: '',
  method: 'GET'
});

request.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

request.interceptors.response.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
})

export default request;
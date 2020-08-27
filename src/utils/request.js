//把axios进行配置

import axios from "axios";

let server = axios.create({
  // baseURL 
  baseURL: "http://118.24.25.7:5000",
  timeout: 6000 //6秒后 就会 报超时的错

})


//拦截器 请求拦截器 响应拦截器 

// 权限校验 


server.interceptors.request.use(function (config) {

  let token = window.sessionStorage.getItem('token')
  // 在发送请求之前做些什么
  config.headers.Authorization = `Bearer ${token}`;

  console.log(config)

  return config;


}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})


server.interceptors.response.use(function (response) { //响应成功，
  // 如果返回 50001 代表没有权限访问 

  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);

})




export default server

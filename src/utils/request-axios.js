import axios from "axios";
import { message } from 'antd';
import { response } from "express";

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 60 * 5
})

service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    if (error.response.status === 401) {
      message.error({
        message: '账号信息已过期，请重新登录',
        duration: 3 * 1000,
        onClose: function() {
          window.location.href = window.location.origin
        }
      })
    } else {
      console.log(error.response.data.error.details)
      message({
        message: error.response.data.error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error.response)
  }
)
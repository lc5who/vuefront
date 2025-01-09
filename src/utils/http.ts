import axios from 'axios'
import type { Response } from '@/types/api'

const http = axios.create({
  baseURL: 'http://dev.tgfaka.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res = response.data as Response
    if (res.code === 0) {
      return res.data
    }
    // 非 0 状态码显示错误信息
    //ElMessage.error(res.msg || '请求失败')
    return Promise.reject(new Error(res.msg || '请求失败'))
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    //ElMessage.error(error.response?.data?.msg || error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default http

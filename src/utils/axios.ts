import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  // timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 可以在这里添加 token 或其他全局请求配置
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {}; // 确保 headers 存在
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    // 响应错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default instance;

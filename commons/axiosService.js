import axios from 'axios'

const axiosService = axios.create({
  // baseURL: 'http://192.168.1.6:4050/api',
  baseURL: 'http://185.180.206.128:4050/api',
})

axiosService.interceptors.request.use((config) => {
  // const token = getToken()

  // if(token) {
    // config.headers.Authorization = `Bearer ${token}`
  // }

  return config
})

axiosService.interceptors.response.use(response => {
  return response
}, error => {
  if(error?.response?.status === 401) {
    // logOut()
  }
  return Promise.reject(error)
})

export default axiosService
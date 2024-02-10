import axios from 'axios'

const axiosService = axios.create()

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
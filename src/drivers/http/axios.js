
/**
 * @param client instace of BaasClient
 */
export default client => {
  let axios = client.options.axios
  if (!axios && typeof window !== 'undefined' && window.axios) {
    axios = window.axios
  }
  const http = axios.create({
    baseURL: client.options.baseURL
  })
  http.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer ' + client.getToken()
    return config
  })
  http.interceptors.response.use(response => {
    return response.data
  }, error => {
    client.emit('response.error', error.response)
    return Promise.reject(error)
  })
  return http
}
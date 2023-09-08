import axios from 'axios'

const api = axios.create({
  baseURL: 'http://201.48.16.101:3333' //'http://192.168.1.89:3000'
})

export default api

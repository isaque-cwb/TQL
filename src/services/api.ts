import axios from 'axios'

const api = axios.create({
  baseURL: 'https://homologacao360.tequaly.com.br/MOB'
})

export default api

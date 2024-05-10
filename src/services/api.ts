import axios from 'axios'
import { destroyCookie, parseCookies } from 'nookies'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  },
})

api.interceptors.request.use(
  (config) => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem sucedida, retorna a resposta original
    return response
  },
  (error) => {
    // Se ocorrer um erro de autenticação (401 Unauthorized), redireciona para a página de login
    if (error.response.status === 401) {
      // api.defaults.headers.authorization = ''
      // destroyCookie(null, 'nextauth.token')
      // window.location.reload()
    }
    // Se ocorrer qualquer outro tipo de erro, retorna o erro original
    return Promise.reject(error)
  },
)

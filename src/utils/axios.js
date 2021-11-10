import axios from 'axios'

export const $axios = axios.create({
  baseURL: 'https://netease-cloud-music-api-tau-drab.vercel.app',
  timeout: 3000,
})
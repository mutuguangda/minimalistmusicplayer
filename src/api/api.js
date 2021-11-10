import { request } from "@/utils/axios"

export const getKey = () => request('get', '/login/qr/key')
export const getImg = (key) => request('get', `/login/qr/create?key=${key}&qrimg=""`)
export const login = (key) => request('get', `/login/qr/check?key=${key}`)
export const refresh = () => request('get', '/login/refresh')
export const getSongs = () => request('get', '/recommend/songs')
export const getFM = () => request('get', '/personal_fm')
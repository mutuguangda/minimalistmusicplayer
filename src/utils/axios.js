import axios from 'axios'

const $axios = axios.create({
  baseURL: 'https://netease-cloud-music-api-tau-drab.vercel.app',
  timeout: 3000,
  headers: {
    'cookie': 'MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_U=59ba227937b149437100734ce2b4602e758c6a957de15518a309fabc595a42e3519e07624a9f0053d78b6050a17a35e705925a4e6992f61dfe3f0151024f9e31; Max-Age=15552000; Expires=Mon, 9 May 2022 05:14:12 GMT; Path=/; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/api/feedback; HTTPOnly;__csrf=727da5c9db25a75d32a1643371226bf7; Max-Age=1296010; Expires=Thu, 25 Nov 2021 05:14:22 GMT; Path=/;;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/wapi/feedback; HTTPOnly;NMTID=00OrcmmIwvA78TKjkUym6BdhFZSqxcAAAF9CESX0w; Max-Age=315360000; Expires=Sat, 8 Nov 2031 05:14:12 GMT; Path=/;;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1585850972462; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1585850984548; Max-Age=2147483647; Expires=Mon, 28 Nov 2089 08:28:19 GMT; Path=/wapi/clientlog; HTTPOnly'
  }
})

export const request = (method, url ,data) => {
  return new Promise((resolve, reject) => {
    $axios({
      method,
      url,
      data,
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
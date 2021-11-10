import { $axios } from "@/utils/axios"

// 获取用户歌单
export const getUserPlaylist = (uid) => {
  return $axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

// 获取歌单详情
export const getPlaylistDetail = (id) => {
  return $axios.get('/playlist/detail', {
    params: {
      id 
    }
  })
}

// 获取歌曲详情
export const getMusicDetail = (ids) => {
  return $axios.get('/song/detail', {
    params: {
      ids
    }
  })
}

// 获取歌词
export const getlyric = (id) => {
  return $axios.get('/lyric', {
    params: {
      id
    }
  })
}

// 获取音乐地址
export const getMusicUrl = (id) => {
  return $axios.get('/song/url', {
    params: {
      id
    }
  })
}

// 搜索
export const search = (keywords, page = 0, limit = 30) => {
  return $axios.get('/search', {
    params: {
      offset: page * limit,
      limit: limit,
      keywords
    }
  })
}
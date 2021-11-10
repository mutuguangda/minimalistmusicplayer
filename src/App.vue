<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import { ref, reactive, onMounted } from 'vue'
import { getUserPlaylist, getPlaylistDetail, getMusicDetail, getMusicUrl, search } from './api/index.js'

onMounted(() => {
  getPlayList()
})

const isShowLAside = ref(false)
const isShowSearch = ref(false)
const dialogVisible = ref(false)
const input = ref(null)
const searchInput = ref(null)
const playList = reactive([])
const tmpList = reactive({})
const searchList = reactive([])
const song = reactive({})


// 搜索
function searchSong(page) {
  search(searchInput.value.value).then(res => {
    res.data.result.songs.forEach(item => {
      isShowSearch.value = true
      searchList.push(item)
    })
  })
}

// 获得歌单数据，并推送到 tmpList
function display(playItem) {
  getPlaylistDetail(playItem.id).then(res => {
    tmpList[playItem.id] = {
      'title': playItem.name,
      'songs': res.data.playlist.tracks
    }
  })
}

// 显示弹窗
function shwoDialog() {
  dialogVisible.value = true
}

// 弹窗确认，获取用户歌单
function confirm() {
  localStorage.setItem('uid', input.value.value)
  dialogVisible.value = false
  getPlayList()
}

// 获取用户歌单
function getPlayList() {
  let uid = localStorage.getItem('uid')
  if (uid != undefined) {
    getUserPlaylist(uid).then(res => {
      res.data.playlist.forEach(item => {
        playList.push(item)
      })
    })
  }
}

// 播放音乐
function play(id) {
  // 获得音乐专辑图片地址
  getMusicDetail(id).then(res => {
    song.imgUrl = res.data.songs[0].al.picUrl
  })
  getMusicUrl(id).then(res => {
    console.log(res.data.data[0].url);
    song.url = res.data.data[0].url
  })
}
</script>
  
<template>
  <div 
    class="content 
    overflow-hidden
    w-full
    flex">
    <!-- 弹窗 -->
    <div class="">
      <el-dialog 
        v-model="dialogVisible"     
        title="请输入网易云 UUID"
        width="25%"
        center="center">
        <div class="search
          flex justify-center
          border-r-0
          ">
          <input 
            ref="input"
            type="search"
            class="w-4/5
            border-2
            rounded-l-md
            border-pink-100
            hover:border-pink-200
            focus:border-pink-300
            focus:ring-0
            ">
          <button 
            type="search"
            class="
              -mx-0.5
              bg-pink-300
              border-pink-300
              rounded-r-md
              text-white
              tracking-widest	
              focus:ring-0
              focus:border-transparent"
            @click="confirm()">
            确认
          </button>
        </div>
      </el-dialog>
    </div>
    <!-- 左侧栏 -->
    <div class="aside 
      relative
      w-64
      shadow-md
      hidden
      lg:flex
      lg:flex-col
      transition-transform"
      :class="{ '-translate-x-full': isShowLAside }">
      <!-- 左侧栏头部 -->
      <div 
        class="aside-header 
        flex items-center justify-between
        border-b 
        px-8 py-8">
        <div class="avatar">
          <img src="/public/favicon.ico" alt=""
            class="w-16 h-16">
        </div>
        <div class="arrow relative">
          <button 
            class="absolute left-1/2 top-0 -translate-y-full -translate-x-1/2
            px-0.5
            tracking-tighter
            text-gray-500
            border-2
            border-transparent
            hover:text-white
            hover:bg-pink-200
            hover:border-dashed
            hover:border-pink-300"
            @click="shwoDialog()">LOGIN</button>
          <span class="text-3xl cursor-default">==></span>
        </div>
        <div class="mark">
          <span class="text-7xl text-pink-800 cursor-default">?</span>
        </div>
      </div>
      <!-- 左侧栏主体 -->
      <div class="aside-main flex-1 flex flex-col justify-between">
        <!-- 左侧栏主体-歌单 -->
        <div class="playlist">
          <el-scrollbar height='480px'>
            <div 
              class="
              playlist-item
              playlist-like
              scrollbar-demo-item
              flex
              p-4
              cursor-pointer"
              v-for="playItem in playList"
              @click="display(playItem)">
              <!-- 歌单头像 -->
              <div class="thumb relative">
                <img :src="playItem.coverImgUrl" alt="" 
                  class="w-12 h-12
                  rounded-md">
                <!-- <i class="
                  item-icon
                  iconfont icon-playcircle text-2xl
                  absolute left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2
                  text-white"></i> -->
              </div>
              <!-- 歌单描述 -->
              <div class="detail flex flex-col justify-between ml-2">
                <span class="block text-sm w-32 truncate">{{ playItem.name }}</span>
                <span class="block text-sm text-gray-500">{{ playItem.trackCount }} 首</span>
              </div>
              <!-- 歌单箭头 -->
              <div class="arrow-right 
                flex-1
                flex justify-end items-center">
                <i class="iconfont icon-arrowright text-3xl text-gray-500 font-extrabold"></i>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="settings text-center bg-pink-100">
          <button>
            <span class="text-gray-500 text-3xl tracking-widest">···</span>
          </button>
        </div>
      </div>
      <div class="absolute right-0 bottom-1/2 translate-x-full translate-y-1/2">
        <button 
          class="py-8 bg-pink-200 rounded-r-md"
          @click="isShowLAside = !isShowLAside">
          <i 
            class="iconfont icon-arrowleft text-white font-bold"
            :class="{ 'icon-arrowright': isShowLAside }"></i>
        </button>
      </div>
    </div>
    <!-- 主体 -->
    <div 
      class="main
      flex-1 
      flex flex-col justify-between
      pt-5 lg:px-5">
      <div class="search
        flex justify-center
        border-r-0
        ">
        <input 
          ref="searchInput"
          type="search"
          class="w-4/5
          border-2
          rounded-l-md
          border-pink-100
          hover:border-pink-200
          focus:border-pink-300
          focus:ring-0
          ">
        <button 
          type="search"
          class="
            -mx-0.5
            bg-pink-300
            border-pink-300
            rounded-r-md
            focus:ring-0
            focus:border-transparent"
          @click="searchSong()">
          <i class="iconfont icon-search text-xl"></i>
        </button>
      </div>
      <!-- display -->
      <div 
        class="nav 
        shadow-md rounded-md
        w-11/12
        flex-1 
        my-4 mx-auto">
        <el-scrollbar height="520px">
          <!-- 搜索结果 -->
          <div 
            class="nav-item relative">
            <div 
              class="header 
              sticky left-0 top-0
              bg-pink-50
              border
              flex justify-between items-center
              px-4 py-2">
              <div class="title relative">
                <a href=""><span class="relative text-xl z-10 font-bold">搜索结果</span></a>
                <div 
                  class="absolute bottom-0 left-0 -translate-y-1/2 z-0
                  bg-pink-300 w-full h-2"></div>
              </div>
              <button @click="isShowSearch = !isShowSearch">
                <i 
                  class="iconfont icon-eye-fill 
                  text-2xl text-gray-300
                  hover:text-gray-500 active:text-pink-300"></i>
              </button>
            </div>
            <div 
              class="content py-2"
              v-show="isShowSearch">
              <div class="header flex px-4">
                <span class="flex-1 font-bold">歌曲</span>
                <span class="font-bold w-32">歌手</span>
                <span class="font-bold w-64 ml-8">专辑</span>
              </div>
              <div 
                v-for="searchItem in searchList"
                class="content cursor-pointer"
                @click="play(searchItem.id)">
                <div class="content-item flex py-2 px-4 hover:bg-pink-200">
                  <span class="flex-1">{{ searchItem.name }}</span>
                  <span class="w-32 truncate">{{ searchItem.artists[0].name }}</span>
                  <span class="w-64 truncate ml-8">{{ searchItem.album.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- tmpList 点击左侧边栏的 playList 后存入 tmpList，支持删除 -->
          <div
            v-for="tmpItem in tmpList" 
            class="nav-item relative">
            <div 
              class="header 
              sticky left-0 top-0
              bg-pink-50
              border
              flex justify-between items-center
              px-4 py-2">
              <div class="title relative">
                <a :href="'#' + tmpItem.title"><span class="relative text-xl z-10 font-bold">{{ tmpItem.title }}</span></a>
                <div 
                  class="absolute bottom-0 left-0 -translate-y-1/2 z-0
                  bg-pink-300 w-full h-2"></div>
              </div>
              <button @click="tmpItem.isShow = !tmpItem.isShow">
                <i 
                  class="iconfont icon-eye-fill 
                  text-2xl text-gray-300
                  hover:text-gray-500 active:text-pink-300"></i>
              </button>
            </div>
            <div 
              v-show="tmpItem.isShow"
              class="content py-2">
              <div class="header flex px-4">
                <span class="flex-1 font-bold">歌曲</span>
                <span class="font-bold w-32">歌手</span>
                <span class="font-bold w-64 ml-8">专辑</span>
              </div>
              <div 
                v-for="song in tmpItem.songs"
                class="content">
                <div class="content-item flex py-2 px-4 cursor-pointer hover:bg-pink-200"
                  @click="play(song.id)">
                  <span class="flex-1">{{ song.name }}</span>
                  <span class="w-32 truncate">{{ song.ar[0].name }}</span>
                  <span class="w-64 truncate ml-8">{{ song.al.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <MusicPlayer :song="song" />
    </div>
  </div>
</template>

<style>
.playlist-item .item-icon {
  visibility: hidden;
}

.playlist-item:hover .item-icon {
  visibility: visible;
}

.playlist-item .arrow-right {
  visibility: hidden;
}

.playlist-item:hover .arrow-right {
  visibility: visible;
}

.el-dialog {
  background: rgba( 253, 242, 248 ) !important;
  box-shadow: 0 8px 32px 0 rgba( 249, 168, 212, 0.37 ) !important;
  backdrop-filter: blur( 4px ) !important;
  -webkit-backdrop-filter: blur( 4px ) !important;
  border-radius: 10px !important;
  border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
}
</style>
<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import { ref, reactive, computed } from 'vue'
import { getImg, getKey, login, refresh, getSongs, getFM } from './api/api.js'
import { request } from "@/utils/axios"
let key = ''
const qrImg = ref('')
const isShowLAside = ref(false)
const dialogVisible = ref(false)
const playList = reactive([
  {
    title: '我最喜欢的音乐',
    songs: [

    ],
  },
  {
    title: '每天起床第一曲',
    songs: [

    ],
  }
])
const tmpList = reactive([])
function display(playItem) {
  tmpList.push({
    isShow: true,
    ...playItem
  })
}

function showQr() {
  dialogVisible.value = true
  getKey().then(res => {
    key = res.data.unikey
    console.log(key);
    getImg(res.data.unikey).then(res => {
      qrImg.value = res.data.qrimg
    })
  })
}

function isLogin() {
  request('get', `/login/qr/check?key=${key}`).then(res => {
    localStorage.setItem('')
  })
}
</script>
  
<template>
  <div 
    class="content 
    overflow-hidden
    w-full
    flex">
    <!-- 二维码 -->
    <img src="" alt="">
    <div class="">
      <el-dialog 
        v-model="dialogVisible"     
        title="网易云扫码登录"
        width="20%"
        center="center">
        <img class="w-64 h-64" :src='qrImg' alt="二维码">
        <button class="mx-auto text-2xl font-bold"
          @click="isLogin()">点击确认扫码成功</button>
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
            @click="showQr()">LOGIN</button>
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
                <img src="/public/static/images/一个人在滨湖公园.jpg" alt="" 
                  class="w-12 h-12
                  rounded-md">
                <i class="
                  item-icon
                  iconfont icon-playcircle text-2xl
                  absolute left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2
                  text-white"></i>
              </div>
              <!-- 歌单描述 -->
              <div class="detail flex flex-col justify-between ml-2">
                <span class="block text-sm">{{ playItem.title }}</span>
                <span class="block text-sm text-gray-500">521 首</span>
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
            focus:border-transparent">
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
              <button @click="">
                <i 
                  class="iconfont icon-eye-fill 
                  text-2xl text-gray-300
                  hover:text-gray-500 active:text-pink-300"></i>
              </button>
            </div>
            <div 
              v-show="false"
              class="content py-2 px-4">
              <div class="header flex">
                <span class="flex-1 font-bold">歌曲</span>
                <span class="font-bold w-24">歌手</span>
                <span class="font-bold w-32">专辑</span>
              </div>
              <div 
                v-for="i in 64"
                class="content">
                <div class="content-item flex py-2">
                  <span class="flex-1">蜜雪冰城甜蜜蜜</span>
                  <span class="w-24">刘德花</span>
                  <span class="w-32">401专属小房间</span>
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
              class="content py-2 px-4">
              <div class="header flex">
                <span class="flex-1 font-bold">歌曲</span>
                <span class="font-bold w-24">歌手</span>
                <span class="font-bold w-32">专辑</span>
              </div>
              <div 
                v-for="i in 64"
                class="content">
                <div class="content-item flex py-2">
                  <span class="flex-1">蜜雪冰城甜蜜蜜</span>
                  <span class="w-24">刘德花</span>
                  <span class="w-32">401专属小房间</span>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <MusicPlayer />
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
</style>
<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import { ref, reactive, computed } from 'vue'
const isShowLAside = ref(false)
const isShowRAside = ref(false)
const playList = reactive([
  {
    title: '我最喜欢的音乐',
    isShow: false,
    songs: [

    ],
  },
  {
    title: '每天起床第一曲',
    isShow: false,
    songs: [

    ],
  }
])
</script>
  
<template>
  <div 
    class="content 
    overflow-hidden
    w-full
    flex">
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
            hover:border-pink-300">LOGIN</button>
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
            <!-- 歌单item -->
            <div 
              class="playlist-item
              playlist-like
              scrollbar-demo-item
              relative
              flex
              p-4
              cursor-pointer"
              v-for="playItem in playList"
              @click="playItem.isShow = !playItem.isShow">
              <!-- 歌单-图片 hover事件后显示icon（play） -->
              <div class="thumb relative">
                <img src="/public/static/images/你是我的猫.jpg" alt="" 
                  class="w-12 h-12
                  rounded-md">
                <i class="
                  item-icon
                  iconfont icon-playcircle text-2xl
                  absolute left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2
                  text-white"></i>
              </div>
              <!-- 歌单desc -->
              <div class="detail flex flex-col justify-between ml-2">
                <span class="block text-sm">{{ playItem.title }}</span>
                <span class="block text-sm text-gray-500">521 首</span>
              </div>
              <!-- hover显示icon（arrow-right） -->
              <div class="arrow-right 
                flex-1
                flex items-center justify-end">
                <i class="iconfont icon-arrowright text-xl font-extrabold"></i>
              </div>
              <!-- 点击后显示 -->
              <div class="detail
                w-0
                absolute top-0 right-0 translate-x-full z-10"
                v-show="playItem.isShow">
                <div class="detail-item">
                  <span>黑色毛衣</span>
                  <span>周杰伦</span>
                </div>
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
      <div 
        class="search
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
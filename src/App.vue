<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import './utils/vudio.js'

const currTab = ref(1)

onMounted(() => {
    var audioObj = document.querySelector('#audio');
    var canvasObj = document.querySelector('#canvas');
    var vudio = new Vudio(audioObj, canvasObj, {
        effect : 'circlewave', // waveform, circlewave, circlebar, lighting (4 visual effect)
        accuracy : 128, // number of freqBar, must be pow of 2.
        width : 256, // canvas width
        height : 100, // canvas height
        waveform : {
            maxHeight : 80, // max waveform bar height
            minHeight : 1, // min waveform bar height
            spacing: 1, // space between bars
            color : '#f00', // string | [string] color or waveform bars
            shadowBlur : 0, // blur of bars
            shadowColor : '#f00', 
            fadeSide : true, // fading tail
            horizontalAlign : 'center', // left/center/right, only effective in 'waveform'/'lighting'
            verticalAlign: 'middle' // top/middle/bottom, only effective in 'waveform'/'lighting'
        }
    });

    vudio.dance();
})


const isShowAside = ref(true)
const playList = reactive([
  {
    title: '我最喜欢的音乐',
    songs: [

    ],
  },
  {
    title: '我最喜欢的音乐',
    songs: [

    ],
  },
])
const tmpList = reactive([])
function display(playItem) {
  tmpList.push({
    isShow: true,
    ...playItem
  })
}
</script>
  
<template>
  <div 
    class="content 
    relative
    overflow-hidden
    w-full flex">
    <!-- canvas -->
    <div class="canvas-box absolute top-0 bottom-0 left-0 right-0 mx-auto">
      <canvas id="canvas"></canvas>
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
          class="w-2/5
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
      <div class="search-result flex-1 w-3/5 mx-auto ">

      </div>
      <MusicPlayer class="w-4/5 mx-auto"/>
    </div>
    <!-- 左侧栏 -->
    <div class="aside w-60 absolute left-0 top-0 pl-4 pt-2 transition-transform"
      :class="{ 'display': isShowAside }">
      <div class="wrapper relative"> 
        <div class="nav
          px-4 pt-4"
          v-show="currTab != 0">
          <button @click="currTab -= 1">
            <i class="iconfont icon-arrowleft font-bold text-gray-500 hover:text-gray-800"></i>
          </button>
        </div>
        <div class="playlist" v-show="currTab == 0">
          <el-scrollbar max-height="400px">
            <div 
              class="
              playlist-item
              playlist-like
              scrollbar-demo-item
              flex
              p-4
              cursor-pointer"
              v-for="playItem in playList"
              @click="currTab += 1">
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
                ml-4
                flex justify-end items-center">
                <i class="iconfont icon-arrowright text-xl text-gray-500 font-extrabold"></i>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="detail w-" v-show="currTab == 1">
          <div class="detail-header p-4 flex justify-between">
            <!-- 歌单头像 -->
            <div class="thumb relative">
              <img src="/public/static/images/一个人在滨湖公园.jpg" alt="" 
                class="w-12 h-12
                rounded-md">
            </div>
            <!-- 歌单描述 -->
            <div class="detail flex flex-col justify-between items-end ml-2">
              <span class="block text-sm font-bold">我喜欢的音乐</span>
              <span class="block text-sm text-gray-500">521 首</span>
            </div>
          </div>
          <el-scrollbar max-height="408px">
            <div class="detail-content">
              <div class="title flex px-4">
                <span class="flex-1 font-bold">歌曲</span>
                <span class="w-16 font-bold">歌手</span>
              </div>
              <div class="song flex py-1 px-4 cursor-pointer hover:bg-pink-100"
                v-for="i in 64">
                <span class="flex-1">黑色毛衣</span>
                <span class="w-16">周杰伦</span>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="hide w-full
          px-4 text-center border-t">
          <button class="hide-btn w-full"
            @click="isShowAside = !isShowAside">          
            <i class="iconfont icon-arrowup text-xl text-gray-300 font-extrabold"></i>
          </button>
        </div>
      </div>
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

.aside .wrapper,
.aside .content .item,
.search-result {
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 249, 168, 212, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}

.hide-btn:hover i {
  color: rgb(107, 114, 128);
}

.display {
  transform: translateY(-100%) translateY(1.75rem);
}

.canvas-box {
  z-index: 0;
}
</style>
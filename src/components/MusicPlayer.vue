<script setup>
  import { nextTick, onMounted, reactive, ref } from 'vue'

  onMounted(() => {
    audio.value.addEventListener('ended', nextSong)
    audio.value.addEventListener('timeupdate', updateProgress)
    progressContainer.value.addEventListener('click', setProgress)
  })
  const audio = ref(null)
  const progressContainer = ref(null)
  const progress = ref(null)
  const status = ref(false)
  const songs = reactive([
    '一个人在滨湖公园',
    '你是我的猫'])
  const songIdx = ref(0)
  const l = ref(0)
  function prevSong() {
    songIdx.value = songIdx.value > 0 ? --songIdx.value : songs.length - 1
    nextTick(() => {
      if (status.value) audio.value.play()
    })
  }

  function playSong() {
    status.value = !status.value
    if (audio.value.paused) audio.value.play()
    else audio.value.pause()
  }

  function nextSong() {
    songIdx.value = songIdx.value < songs.length - 1 ? ++songIdx.value : 0
    nextTick(() => {
      if (status.value) audio.value.play()
    })
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.value.style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.value.duration;
    audio.value.currentTime = (clickX / width) * duration;
  }
</script>

<template>
  <div class="player relative md:rounded-md py-6 px-8 bg-pink-100
    flex">
    <div class="player-lt player-thumb relative w-24 h-12 flex-none">
      <img class="player-thumb-img z-20 w-24 h-24 absolute left-0 bottom-0 
        rounded-full" 
        :class="{ 'animate-spin-slow': status }"
        :src="`/static/images/${songs[songIdx]}.jpg`" alt="">
      <div class="player-thumb-dot z-30 w-4 h-4 bg-white	absolute rounded-full bottom-full right-1/2
        transform-gpu translate-x-1/2 translate-y-1/2">
      </div>
    </div>
    <div class="player-gt relative flex-1">
      <div ref="progressContainer" class="player-progress-container absolute top-0 left-0 z-10
        w-full h-1 bg-white rounded-full
        cursor-pointer">
        <div ref="progress" class="player-progress relative h-1 w-0 bg-pink-300 rounded-r-full">
          <div class="player-progress-dot h-2 w-2 rounded-full bg-pink-300
            absolute bottom-full right-0 transform-gpu translate-y-3/4"></div>
        </div>
      </div>
      <div class="player-gt_bottom flex items-baseline">
        <div class="player-navigation h-12 text-center flex items-end">
          <button 
            @click="prevSong" 
            class="navigation-prev px-2"
          >
            <i class="iconfont icon-backward"></i>
          </button>
          <button 
            @click="playSong" 
            class="navigation-play px-4 text-xl"
          >
            <i class="iconfont text-xl" 
              :class="{ 'icon-pause': status, 'icon-play': !status }"></i>
          </button>
          <button 
            @click="nextSong" 
            class="navigation-next px-2"
          >
            <i class="iconfont icon-forward"></i>
          </button>
        </div>
        <div class="player-lyric relative text-2xl text-gray-500 
          flex-1 text-center h-8 w-0 px-8 flex flex-col truncate">
          <span :style="{ transform: `translateY(-${l * 2}rem)`}" class="transition-transform">一件黑色毛衣 两个人的回忆</span>
          <span :style="{ transform: `translateY(-${l * 2}rem)`}" class="transition-transform">一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆一件黑色毛衣 aaaaaaaaaaa两个人的回忆</span>
          <span :style="{ transform: `translateY(-${l * 2}rem)`}" class="transition-transform">一件黑色毛衣 bbbbbbbbbbb两个人的回忆</span>
        </div> 
        <!-- <button @click="l += 1">Test</button> -->
      </div>
    </div>
    <audio :src="`/static/audio/${songs[songIdx]}.mp3`" ref="audio" id="audio"></audio>
    <!-- <audio src="/static/audio/一个人在滨湖公园.mp3" autoplay></audio> -->
    <!-- <audio ref="audio" src="http://m8.music.126.net/20211012115922/14514f4b4e2bb24c4f39d4d4babb3eaf/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio> -->
  </div>
</template>

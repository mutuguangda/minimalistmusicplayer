<script setup>
  const props = defineProps({
    qrImg: String,
    statusCode: String,
    visible: Boolean
  })
</script>

<template>
  <div
    v-show="visible"
    class="absolute flex justify-center items-center z-40 min-w-full min-h-screen bg-black bg-opacity-10"
  >
    <div class="box relative text-center bg-white">
      <div class="box-header text-right px-1">
        <button @click="$emit('update:visible', false)">
          <i class="iconfont icon-cancel text-xs text-gray-300"></i>
        </button>
      </div>
      <div class="box-content p-8">
        <h2 class="text-xl text-red-500 font-w">网易云扫码登录</h2>
        <img :src="qrImg" alt="">
        <span class="text-gray-400 text-lg">{{ statusCode }}</span>
      </div>
    </div>
  </div>
</template>
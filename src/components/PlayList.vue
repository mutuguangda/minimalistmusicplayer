<script>
  import { reactive } from "vue"
  const songs = reactive([
    {
      title: '黑色毛衣',
      singer: '周杰伦'
    }
  ])
</script>

<template>
  <div class="playlist">
    <div class="playlist-item">
      <span></span>
      <span></span>
    </div>
  </div>
</template>

  
<script setup>
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/index.js'
import { onMounted, ref, watch ,onUpdated} from 'vue';
import MusicDetail from '@/components/item/MusicDetail.vue'
const { songs, playIndex, isbtnShow,lyric } = storeToRefs(useMusicStore())
const { changePlay,getLyric,updatedCurrentTime,updateDuration } = useMusicStore()
const audioRef = ref(null)
onMounted(() => {
 // console.log(audioRef) 
})
//播放方法
function playMusic() {
  if (audioRef.value.paused) {
    audioRef.value.play()
    changePlay(false)
    updateTime()
  } else {
    audioRef.value.pause()
    changePlay(true)
    clearInterval(timer)
  }
}
watch(playIndex, () => {
  audioRef.value.autoplay = true
  changePlay(false)
  updateTime()
})
watch(songs, () => {
  audioRef.value.autoplay = true
  changePlay(false)
  updateTime()
})
const detailShow = ref(false) //默认不展示弹出层
function changeDetailShow() {
  detailShow.value = !detailShow.value
}
//歌词滚动
function rangeTime(){
  updatedCurrentTime(audioRef.value.currentTime)
 // console.log(audioRef.value.currentTime)
}

let timer=null
function updateTime(){
  timer = setInterval(rangeTime,500)
}

//歌词
onMounted(() => {
  getLyric(songs.value[playIndex.value].id)
  //console.log(lyric)
})
onUpdated(() => {
  getLyric(songs.value[playIndex.value].id)
  loadDuration() // 进度条更新
})
function loadDuration(){
  updateDuration(audioRef.value.duration)
}
//改变音乐的当前时间
function updatedAudio(val){
  audioRef.value.currentTime=parseFloat(val) 
}

</script>
<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="changeDetailShow">
      <img :src="songs[playIndex].al.picUrl" alt="" />
      <div>
        <p>
          {{ songs[playIndex].name }} -
          <span v-for="item in songs[playIndex].ar" :key="item.id">
            {{ item.name }} &nbsp;
          </span>
        </p>
      </div>
    </div>
    <div class="footerRight">
      <i class="iconfont icon-play" @click="playMusic" v-if="isbtnShow"></i>
      <i class="iconfont icon-zanting" @click="playMusic" v-else></i>
      <i class="iconfont icon-24gf-playlistMusic2"></i>
    </div>
  </div>
  <audio ref="audioRef" :src="`https://music.163.com/song/media/outer/url?id=${songs[playIndex].id}.mp3`"></audio>
  <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
    <MusicDetail 
    :isbtnShow="isbtnShow" 
    :song="songs[playIndex]" 
    :playMusic="playMusic"
    :lrc="lyric.data.lrc"
    :updatedAudio='updatedAudio'
    :loadDuration="loadDuration"
    :audioRef='audioRef'
    :changeDetailShow="changeDetailShow" />
    
  </van-popup>
</template>

<style scoped lang="less">
.footerMusic {
  width: 100%;
  position: fixed;
  height: 1.4rem;
  bottom: 0;
  z-index: 1;
  border-top: 1px solid #999;
  background: #fff;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.4rem;
    }

    span {
      color: #999;
      font-size: 0.24rem;
    }

    p {
      width: 4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
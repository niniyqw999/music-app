<script setup>
import { ref,onMounted } from 'vue';
import { getMusicList } from '@/request/api/home.js'
const musicList = ref([])
onMounted(async () => {
  let res = await getMusicList()
  //console.log(res)
  musicList.value = res.data.result
  //console.log(musicList)
})
// 播放量格式调整
function countFormat(val) {
  if (val >= 100000000) {
    return (val / 100000000).toFixed(1) + '亿'
  } else {
    return (val / 100000).toFixed(1) + '万'
  }
}
</script>
<template>
    <div class="musicList">
      <div class="musicTob">
        <div class="find">发现好歌单</div>
        <div class="more">更多推荐</div>
      </div>
      <div class="musicContent">
        <van-swipe
          :loop="false"
          :show-indicators="false"
          :width="120"
          class="my-swipe"
        >
          <van-swipe-item v-for="obj in musicList" :key="obj.id">
            <router-link :to="{path:'/itemMusic',query:{id:obj.id}}">
              <img :src="obj.picUrl" :alt="obj.name" />
              <span class="playCount">
                <i class="iconfont icon-bofang4"></i>
                {{ countFormat(obj.playCount) }}
              </span>
              <span class="title">{{ obj.name }}</span>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </template>
  <style scoped lang="less">
  .musicList {
    width: 100%;
    height: 5rem;
    padding: 0.3rem 0;
    .musicTob {
      padding: 0 0.2rem;
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      .find {
        font-size: 0.4rem;
        font-weight: bold;
      }
      .more {
        border: 1px solid #ddd;
        text-align: center;
        line-height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
      }
    }
    .musicContent {
      width: 100%;
      height: 3.6rem;
      .my-swipe {
        height: 100%;
        position: relative;
        .van-swipe-item {
          padding: 0.1rem;
          img {
            width: 100%;
            height: 2.2rem;
            border-radius: 0.2rem;
          }
          .playCount {
            color: #fff;
            border-radius: 1rem;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 0.06rem 0.16rem;
            font-size: 0.08rem;
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            i {
              font-size: 0.08rem;
              color: #fff;
            }
          }
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  </style>
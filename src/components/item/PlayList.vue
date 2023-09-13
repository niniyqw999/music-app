<script setup>
import { useMusicStore } from '@/stores/index.js'
const { updatePlay } = useMusicStore()
const props=defineProps(['itemList','subscribedCount'])
//console.log(props)
</script>
<template>
    <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <i class="iconfont icon-play"></i>
        <p>
          播放全部 <span>(共{{ itemList.length }}首)</span>
        </p>
      </div>
      <div class="listRight">+ 收藏({{ subscribedCount }})</div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="item.id">
        <div class="itemLeft" @click="updatePlay(itemList,i)">
          <span class="leftspan">{{ i + 1 }}</span>
          <div>
            <!-- <van-text-ellipsis :content="item.name" /> -->
            <p class="itemName">{{ item.name }}</p>
            <span class="ar" v-for="(item1, i) in item.ar" :key="i">
              {{ item1.name }} &nbsp;
            </span>
          </div>
        </div>
        <div class="itemRight">
          <i class="iconfont icon-paishipin" v-show="item.mv != 0"></i>
          <i class="iconfont icon-zhedie"></i>
        </div>
      </div>
    </div>
  </div>
</template> 
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  //   height: 10rem;
  background: #fff;
  padding: 0 0.2rem;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
    .listLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 0.4rem;
      }
      p {
        font-weight: 900;
      }
      span {
        font-weight: 100;
        font-size: 0.24rem;
      }
    }
    .listRight {
      width: 2.4rem;
      background-color: rgb(255, 24, 0);
      border-radius: 0.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      color: #fff;
    }
  }
  .itemList {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      .itemLeft {
        width: 80%;
        height: 1rem;
        display: flex;
        align-items: center;
        // border: 1px red solid;
        .leftspan {
          padding-right: 0.3rem;
          padding-left: 0.1rem;
        }
        .itemName{
            // width: 100%;
            width: 5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            // border: 1px solid blue;
        }
        .ar {
          color: #999;
          font-size: 0.24rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .iconfont {
          font-size: 0.4rem;
          padding: 0 0.1rem;
          color: #666;
        }
      }
    }
  }
}
</style>

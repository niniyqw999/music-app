<script setup>
import { ref } from 'vue';
import { searchMusic } from '@/request/api/item.js'
import { useMusicStore } from '@/stores/index.js'
const {addMusic} = useMusicStore()
// 历史记录数组
const keywordList = ref(JSON.parse(localStorage.getItem('keywordList')) || []) 
// 搜索关键字
const keyword = ref([])
// 搜索的歌曲结果
const searchList=ref([])
async function addKeyword() {
  if (keyword.value != '') {
    keywordList.value.unshift(keyword.value)
    keywordList.value = [...new Set(keywordList.value)] //去重复
    localStorage.setItem('keywordList', JSON.stringify(keywordList.value))
    //搜索
    let res = await searchMusic(keyword.value)
    //console.log(res)
    searchList.value=res.data.result.songs
    //当历史记录数组大于10个开始删除，保证数组做大长度10
    if (keywordList.value.length > 10) {
      keywordList.value.pop()
    }
    keyword.value = ''
  }
} 
// 使用历史记录搜索
async function logsSearch(val){
  let res = await searchMusic(val)
  //console.log(res)
  searchList.value=res.data.result.songs
}
//删除
function delKeyword() {  
  localStorage.removeItem('keywordList')
  keywordList.value = []
}
</script>
<template>
    <div class="searchTop">
        <i class="iconfont icon-direction-left" @click="$router.go(-1)"></i>
        <input type="text" v-model="keyword" @keyup.enter="addKeyword" placeholder="周杰伦" />
    </div>
    <div class="searchHistory">
        <span class="history">历史</span>
        <span v-for="wd in keywordList" class="logs" @click="logsSearch(wd)">
            {{ wd }}
        </span>
        <i class="iconfont icon-ashbin" @click="delKeyword"></i>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="item.id">
        <div class="itemLeft" @click="addMusic(item)">
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
</template>
<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: 0.2rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 90%;
        padding: 0.1rem;
    }
}

.searchHistory {
    width: 100%;
    padding: 0.2rem;
    position: relative;

    .history {
        font-weight: 600;
    }

    .logs {
        padding: 0.1rem 0.2rem;
        background-color: rgb(225, 223, 223);
        border-radius: 0.4rem;
        margin: 0.1rem 0.2rem;
        display: inline-block;
    }

    .iconfont {
        font-size: 0.4rem;
        position: absolute;
        right: 0.2rem;
    }
}
.itemList {
    padding: .2rem;
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
</style>
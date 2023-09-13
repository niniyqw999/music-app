
<script setup>
import FooterView from './views/FooterView.vue';
import { useMusicStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
const { isFooterMusic } = storeToRefs(useMusicStore()) 
</script>
<template>
  <router-view />
  <div v-show="isFooterMusic">
    <FooterView />
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: '微软雅黑', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #333;
}

.icon {
  width: .5rem;
  height: .5rem;

}

.iconfont {
  font-size: .4rem;
}
</style>

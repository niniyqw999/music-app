<template>
    <ItemMusicTop :playlist="playlist" />
    <PlayList :itemList="itemList" :subscribedCount="playlist.subscribedCount" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getItemMusic,getPlayList } from '@/request/api/item.js'
import ItemMusicTop from '../components/item/ItemMusicTop.vue'
import PlayList from '../components/item/PlayList.vue'
const playlist = ref([])
const itemList = ref([])
onMounted(async () => {
    let id = useRoute().query.id
    //console.log(id)
    let res = await getItemMusic(id)
    //console.log(res.data.playlist)
    playlist.value = res.data.playlist
    sessionStorage.setItem('itemData',JSON.stringify(playlist))
    //获取歌曲数据
    let result=await getPlayList(id)
    //console.log(result)
    itemList.value=result.data.songs
})
</script>
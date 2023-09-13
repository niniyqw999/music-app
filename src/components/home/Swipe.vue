<script setup>
import { ref, onMounted } from 'vue';
//import axios from 'axios'
import { getBanner } from '@/request/api/home.js'
const images = ref([])
onMounted(async () => {
    // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
    //     console.log(res)
    //     images.value=res.data.banners
    // })
    let res = await getBanner()
    images.value = res.data.banners
})
</script>
<template>
    <div id="swipeTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<style lang="less">
#swipeTop {
    padding: 0 0.2rem;

    .van-swipe {
        width: 100%;
        height: 3rem;
        border-radius: 0.2rem;

        .van-swipe-item {

            img {
                width: 100%;
                height: 100%;
            }
        }

        .van-swipe__indicator--active {
            background-color: rgb(194, 12, 12);
        }

    }
}
</style>

<script setup>
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/index.js'
const { userInfo,token,isLogin } = storeToRefs(useMusicStore())
import { useRouter } from 'vue-router';
const router = useRouter()
function signOut(){
    isLogin.value=false
    token.value=null
    localStorage.removeItem('token')
    router.push('/login')
}
// console.log(userInfo.value)
</script>
<template>
    <div class="userInfo">
        <img :src="userInfo.avatarUrl" alt="" class="pic">
        <div class="name">用户名：{{ userInfo.nickname }}</div>
    </div> 
    <div>
         <a href="#" @click.prevent="signOut">退出登录</a>
    </div>
</template>
<style lang="less" scoped>
.userInfo {
    
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .pic {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
}
</style>
<script setup>
import { ref } from 'vue';
import {  getLogin,getUserDetail } from '@/request/api/home.js'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/index.js'
import { useRouter } from 'vue-router';
const { isLogin,token,userInfo } = storeToRefs(useMusicStore())
const email = ref('')
const password = ref('')
const router = useRouter()
async function login() {
let res = await getLogin(email.value,password.value)
//console.log(res)
//console.log(res.data.account.id)
if (res.data.code === 200) {
    isLogin.value = true
    token.value=res.data.token
    localStorage.setItem('token',res.data.token)
    //let user = await getUserDetail(res.data.account.id)  //5022399044
    let user = await getUserDetail(5022399044)
    console.log(user)
    userInfo.value=user.data.profile
    router.push('/userInfo')
} else {
    alert(res.data.msg)
    password.value = ''
}
}
</script>
<template>
    <div class="bg">
        <div class="login">
            <div class="loginInfo">欢迎登录</div>
            <div class="loginContent">
                <input type="text" name="phone" class="phone" v-model="email" placeholder="请输入邮箱">
                <input type="password" name="password" class="password" v-model="password" placeholder="请输入密码">
                <input type="submit" value="登录" @click.prevent="login">
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #c66233;
    padding-top: 2rem;
}

.login {
    width: 100%;
    padding: 0.2rem;
    text-align: center;

    .loginInfo {
        color: #fff;
        font-size: .72rem;
    }

    .loginContent {
        display: flex;
        flex-direction: column;
        padding: 1rem;

        input {
            padding: .1rem;
            margin-bottom: .6rem;
            border-radius: .1rem;
            border: none;
        }
    }
}
</style>
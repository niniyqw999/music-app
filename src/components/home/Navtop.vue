<template>
    <div class="tobNav">
        <div class="navleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhedie"></use>
            </svg>
        </div>
        <div class="content">
            <span @click="$router.push('/userInfo')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="navright" @click="$router.push('/searchview')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search"></use>
            </svg>
        </div>
    </div>
</template>
<style lang="less" scoped>
.tobNav {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: .36rem;

        .active {
            font-weight: bold;
        }
    }
}
</style>
  
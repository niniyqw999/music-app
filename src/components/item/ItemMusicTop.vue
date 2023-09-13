<script setup>

const props = defineProps(['playlist'])
if ((props.playlist.creator = '')) {
  props.playlist.creator = sessionStorage.getItem('itemData')
}
function countFormat(val) {
    if (val >= 100000000) {
        return (val / 100000000).toFixed(1) + '亿'
    } else {
        return (val / 100000).toFixed(1) + '万'
    }
}
</script>
<template>
    <div class="mosicTob">
        <div class="topicon">
            <img :src="playlist.coverImgUrl" alt="" class="img-bg" />
            <div class="left">
                <i class="iconfont icon-direction-left" @click="$router.go(-1)"></i>
                <span>歌单</span>
            </div>
            <div class="right">
                <i class="iconfont icon-search"></i>
                <i class="iconfont icon-zhedie"></i>
            </div>
        </div>

        <div class="content">
            <div class="pl">
                <img :src="playlist.coverImgUrl" alt="" class="coverImgUrl" />
                <span class="playCount">
                    <i class="iconfont icon-bofang4"></i>
                    {{ countFormat(playlist.playCount) }}
                </span>
            </div>
            <div class="pr">
                <h3>{{ playlist.name }}</h3>
                <p class="avatarUrl">
                    <img :src="playlist.creator.avatarUrl" alt="" />
                    <span></span>
                    {{ playlist.creator.nickname }}
                </p>
                <div class="desc">
                    <span class="description"> {{ playlist.description }}</span>
                    <i class="iconfont icon-gengduo1"></i>
                </div>
            </div>
        </div>
        <div class="itemFooter">
            <div class="item">
                <i class="iconfont icon-comment"></i>
                <span>{{ playlist.trackCount }}</span>
            </div>
            <div class="item">
                <i class="iconfont icon-share"></i>
                <span>{{ playlist.shareCount }}</span>
            </div>
            <div class="item">
                <i class="iconfont icon-direction-down-circle"></i>
                <span>下载</span>
            </div>
            <div class="item">
                <i class="iconfont icon-success"></i>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.topicon {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;

    .left,
    .right {
        display: flex;
        width: 25%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.4rem;
    }

    i {
        color: #fff;
        font-size: 0.48rem;
    }

    span {
        color: #fff;
        font-size: 0.4rem;
    }

    .img-bg {
        width: 100%;
        height: 8rem;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(30px) brightness(.8);
    }
}

.content {
    width: 100%;
    padding: 0.6rem 0.2rem 0.2rem;
    display: flex;
    justify-content: space-between;

    .pl {
        width: 35%;
        height: 3rem;
        position: relative;

        .coverImgUrl {
            width: 100%;
            border-radius: 0.2rem;
        }

        .playCount {
            color: #fff;
            border-radius: 1rem;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 0.06rem 0.16rem;
            font-size: 0.08rem;
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;

            i {
                font-size: 0.08rem;
                color: #fff;
            }
        }
    }

    .pr {
        width: 65%;
        padding: 0 0.2rem;

        h3 {
            color: #fff;
            font-size: 0.32rem;
        }

        .avatarUrl {
            height: 1rem;
            color: #fff;
            display: flex;
            align-items: center;

            img {
                width: 0.5rem;
                border-radius: 100%;
                margin-right: 10px;
            }
        }

        .desc {
            display: flex;
            align-items: center;

            .description {
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                font-size: 0.24rem;
                color: rgba(255, 255, 255, 0.8);
            }

            .iconfont {
                color: rgba(255, 255, 255, 0.8);
                font-size: .32rem;
            }
        }
    }
}

.itemFooter {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        i {
            color: #fff;
            font-size: 0.48rem;
        }

        span {
            color: #fff;
            font-size: 0.24rem;
            padding: .1rem;
        }
    }
}
</style>

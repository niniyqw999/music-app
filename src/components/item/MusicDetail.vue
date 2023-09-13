<script setup>
import { computed, watch, ref,onMounted, onUpdated } from 'vue';
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/stores/index.js'
const { currentTime, playIndex, songs, duration } = storeToRefs(useMusicStore())
const { updatePlayIndex,updateDuration } = useMusicStore()
const props = defineProps(['song', 'changeDetailShow', 'playMusic', 'isbtnShow', 'lrc','updatedAudio','updateDuration','audioRef'])
const MusicLyric = computed(() => {
    let arr
    if (props.lrc.lyric) {
        arr = props.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(1, 3)
            let sec = item.slice(4, 6)
            let mil = item.slice(7, 10)
            let lrc = item.slice(11, item.length)
            let time =
                parseInt(min) * 1000 * 60 + parseInt(sec) * 1000 + parseInt(mil) //歌词开始时间
            //console.log(min,sec,mil,lrc)
            return { min, sec, mil, lrc, time }
        })
        //歌曲时间结束
        arr.forEach((item, i) => {
            if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                item.next = 100000 //歌词结束时间
            } else {
                item.next = arr[i + 1].time //歌词结束时间
            }
        })
    }
    //console.log(arr)
    return arr
})

const LyricRef = ref(null) // 获取LyricRef
watch(currentTime, (newv) => {
    let p = document.querySelector('p.active')

    if (p) {
        if (p.offsetTop > 250) {
            LyricRef.value.scrollTop = p.offsetTop - 250
        }
    }
    if (newv == duration.value) {
        if (playIndex.value == songs.value.length - 1) {
            updatePlayIndex(0)
            
        } else {
            updatePlayIndex(playIndex.value + 1)   
        }
    }
})
function goPlay(num) {
    let index = playIndex.value + num
    if (index < 0) {
        index = songs.value.length - 1
    } else if (index == songs.value.length) {
        index = 0
    }
    updatePlayIndex(index)
    // console.log(songs.value)
}
onUpdated(()=>{
    //console.log(props.audioRef.duration)
    updateDuration(props.audioRef.duration)
})
//歌词与磁盘切换
const isShowLyric = ref(false)

</script>
<template>
    <div class="detail-bg">
        <img :src="song.al.picUrl" alt="" class="img-bg" />
        <div class="detailTop">
            <div class="detailTopLeft">
                <i class="iconfont icon-arrow-down" @click="changeDetailShow"></i>
            </div>
            <div class="ar">
                <p>{{ song.name }}</p>
                <span v-for="item in song.ar" :key="item.id">
                    {{ item.name }} &nbsp;
                </span>
            </div>
            <div class="detailTopLeft">
                <i class="iconfont icon-share"></i>
            </div>
        </div>
        <!-- 中间部分 -->
        <Transition name="fade" mode="out-in">
            <div class="detailContent" @click="isShowLyric = !isShowLyric" v-if="!isShowLyric">
                <img src="@/assets/needle.png" alt="" class="img-needle" :class="{ 'img-needle-active': !isbtnShow }" />
                <img src="@/assets/cd.png" alt="" class="img-cd" />
                <img :src="song.al.picUrl" alt="" class="img-al"
                    :class="{ 'img-al-running': !isbtnShow, 'img-al-paused': isbtnShow }" />
            </div>
            <div ref="LyricRef" class="musciLyric" @click="isShowLyric = !isShowLyric" v-else>
                <p v-for="item in MusicLyric"
                    :class="{ active: currentTime * 1000 >= item.time && currentTime * 1000 < item.next }">
                    {{ item.lrc }}
                </p>
            </div>
        </Transition>
        <!-- 中间部分结束 -->
        <div class="detailFooter">
            <div class="footerTop">
                <i class="iconfont icon-fabulous"></i>
                <i class="iconfont icon-direction-down-circle"></i>
                <i class="iconfont icon-cipianchangpian"></i>
                <i class="iconfont icon-comment"></i>
                <i class="iconfont icon-zhedie"></i>
            </div>
            <div class="footercontent">
                <input type="range" @input="updatedAudio(currentTime)" class="range" min="0" :max="duration" v-model="currentTime" step="0.05" />
            </div>
            <div class="footer">
                <i class="iconfont icon-refresh"></i>
                <i class="iconfont icon-arrow-left-circle" @click="goPlay(-1)"></i>
                <i class="iconfont icon-play" style="font-size: 1rem" @click="playMusic" v-if="isbtnShow"></i>
                <i class="iconfont icon-zanting" style="font-size: 1rem" @click="playMusic" v-else></i>
                <i class="iconfont icon-arrow-right-circle" @click="goPlay(1)"></i>
                <i class="iconfont icon-24gf-playlistMusic2"></i>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.detail-bg {
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -2;
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.4rem;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .iconfont {
        color: #fff;
    }

    .ar {
        text-align: center;

        p {
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 4rem;
            padding-top: 0.4rem;
        }

        span {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.24rem;
        }
    }
}

.img-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(50px) brightness(80%);
    z-index: -1;
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 0.4rem;

    .img-needle {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-20deg);
        transition: all 0.6s;
    }

    .img-needle-active {
        width: 2.4rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(5deg);
        transition: all 0.6s;
    }

    .img-cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    .img-al {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate-al 10s linear infinite;
    }

    .img-al-running {
        animation-play-state: running;
    }

    .img-al-paused {
        animation-play-state: paused;
    }

    @keyframes rotate-al {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.musciLyric {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    padding-top: 0.4rem;
    transition: .3s;

    p {
        color: rgb(214, 214, 214);
        margin-bottom: 0.4rem;
        text-align: center;
        transition: .3s;
    }

    .active {
        color: #fff;
        font-size: 0.48rem;
    }
}

.detailFooter {
    padding: 0.4rem;

    // border: 1px solid red;
    .footerTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfont {
            color: #fff;
        }
    }

    .footercontent {
        padding: 0.4rem 0;

        .range {
            width: 100%;
            height: 3px;
            background-color: #fff;
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfont {
            color: #fff;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

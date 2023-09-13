import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLyricById } from '@/request/api/item.js'
export const useMusicStore = defineStore('counter', () => {
  //默认播放歌曲
  const songs = ref([
    {
      al: {
        id: 34264,
        name: '天若有情 电影原声带',
        pic: 109951165036348540,
        picUrl:
          'https://p1.music.126.net/9rrtDpPL149y6Ec5A2EyzA==/109951165036348546.jpg',
        pic_str: '109951165036348546',
      },
      id: 347705,
      name: '天若有情',
      ar: [{ id: 30644200, name: '彭席彦' }],
    },
  ])
  // 点列表切换歌曲
  function updatePlay(val, index) {
    songs.value = val
    playIndex.value = index
  }


  const playIndex = ref(0) // 默认播放索引
  const isbtnShow = ref(true) // 播放icon状态,播放按钮显示
  // 改变播放按钮状态
  function changePlay(val) {
    isbtnShow.value = val
  }

  //获取歌词
  const lyric = ref({})
  async function getLyric(id) {
    let res = await getLyricById(id)
    // console.log(res)
    lyric.value = res
    // console.log(lyric.value)
  }

  //歌词滚动
  const currentTime = ref(0)  // 当前播放时间
  function updatedCurrentTime(val) {  // 更新当前时间
    //console.log(currentTime.value)
    currentTime.value = val
  }

  //更新索引，切换歌曲
  function updatePlayIndex(val) {
    playIndex.value = val
  }
  // 设置进度条
  const duration = ref(0)
  function updateDuration(val) {
    duration.value = val
  }

  // 点搜索列表切换歌曲
  function addMusic(val) {
    songs.value.push(val)
    console.log(songs.value)
    playIndex.value = songs.value.length - 1
  }
  // 默认没有登录
  const isLogin=ref(false)
  //底部组件显示
  const isFooterMusic=ref(true) 
  // 登录成功记录数据
  const token=ref('') 
  // 个人详情
  const userInfo=ref({})
  return {userInfo,token,isFooterMusic ,isLogin,addMusic, updateDuration, duration, updatePlayIndex, currentTime, updatedCurrentTime, songs, playIndex, isbtnShow, changePlay, updatePlay, getLyric, lyric }
})
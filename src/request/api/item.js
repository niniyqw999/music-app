import service from '..'
// 获取歌单详情
export  function getItemMusic(id){
    return service({
        method: 'get',
        // url: '/playlist/detail?id='+id
        url: `/playlist/detail?id=${id}`
    })
}
//获取歌单歌曲
export  function getPlayList(id){
    return service({
        method: 'get',
        url: `/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}
//获取歌词
export  function getLyricById(id){  
    return service({
        method: 'get',
        url: `/lyric?id=${id}`
    })
}
export  function searchMusic(key){  //搜索歌曲
    return service({
        method: 'get',
        url: `/cloudsearch?keywords=${key}`
    })
}
import service from '..'

//获取banner数据
export  function getBanner(){
    return service({
        method: 'get',
        url: '/banner?type=2'
    })
}

// 获取推荐歌单数据
export  function getMusicList(){
    return service({
        method: 'get',
        url: '/personalized?limit=10'
    })
}

//邮箱登录
export  function getLogin(email,password){  
    return service({
        method: 'post',
        url: `/login?email=${email}&password=${password}`
    })
}
//个人中心
export  function getUserDetail(id){
    return service({
        method: 'post',
        url: `/user/detail?uid=${id}`
    })
}
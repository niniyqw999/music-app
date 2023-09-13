<template>
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>每日推荐</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianshijibofang"></use>
        </svg>
        <span>私人FM</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-paihangbang"></use>
        </svg>
        <span>排行榜</span>
      </div>
    </div>
  </template>
  <style scoped lang="less">
  .iconList {
    width: 100%;
    height: 1.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: .3rem;
    // border: 1px solid red;
    .iconItem {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon{
          width: .8rem;
          height: .8rem;
      }
    }
  }
  </style>
  
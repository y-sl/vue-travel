<template>
  <transition name="slide">
    <div class="detail" v-show="showFlag">
      <div class="baner">
        <img class="banner-img" :src="bannerImg" width="100%">
        <i class="iconfont back" @click="back">&#xe624;</i>
        <div class="title">{{sightName}}</div>
      </div>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) of list"
          :key="index"
        >
        <div class="item-title border-bottom">
          <span class="item-title-icon"></span>
          {{item.title}}
        </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        showFlag: false,
        sightName: '',
        bannerImg: '',
        gallaryImgs: [],
        list: []
      }
    },
    created() {
      axios.get('https://easy-mock.com/mock/5b3eba9c04502462c6feb598/ysl/detail').then(res => {
        if (res.data.ret) {
          this.sightName = res.data.data.sightName;
          this.bannerImg = res.data.data.bannerImg;
          this.gallaryImgs = res.data.data.gallaryImgs;
          this.list = res.data.data.categoryList;
          console.log(this.sightName);
        }
      })
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      back() {
        this.showFlag = false;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail
    position fixed
    top 0
    left 0
    bottom 0
    z-index 1000
    width 100%
    height 812px
    background-color #fff
    transform: translate3d(0, 0, 0)
    overflow hidden
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.2s linear
    &.slide-enter, &.slide-leave-active
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top 10px
      left 10px
      color #fff
      font-size 0.7rem
    .title
      position absolute
      top 3.7rem
      left 0.2rem
      font-size .35rem
      color #fff
    .content
      .item-title-icon
        position: relative
        left: .06rem
        top: .06rem
        display: inline-block
        width: .36rem
        height: .36rem
        background: url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -.45rem no-repeat
        margin-right: .1rem
        background-size: .4rem 3rem
      .item-title
        line-height: .8rem
        font-size: .32rem
        padding: 0 .2rem
      .item-chilren
        padding: 0 .2rem
</style>
<template>
  <div class="home" ref="home">
    <div class="home-content">
      <home-header></home-header>
      <home-swiper :list="swiperList"></home-swiper>
      <home-icons :list="iconList"></home-icons>
      <home-recommend :list="recommendList"></home-recommend>
      <home-weekend :list="weekendList"></home-weekend>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import HomeHeader from 'components/HomeHeader'
  import HomeSwiper from 'components/HomeSwiper'
  import HomeIcons from 'components/HomeIcons'
  import HomeRecommend from 'components/HomeRecommend'
  import HomeWeekend from 'components/HomeWeekend.vue'
  import axios from 'axios'
  export default {
    name: 'home',
    components: {
      HomeHeader,
      HomeSwiper,
      HomeIcons,
      HomeRecommend,
      HomeWeekend
    },
    data () {
      return {
        swiperList: [],
        iconList: [],
        recommendList: [],
        weekendList: []
      }
    },
    mounted() {
      this.getHomeInfo()
      this.$nextTick(() => {
        this.homeScroll = new BScroll(this.$refs.home, {
          click: true
        })
      })
    },
    methods: {
      getHomeInfo () {
        axios.get('https://easy-mock.com/mock/5b3eba9c04502462c6feb598/ysl/qunaer')
          .then(this.getHomeInfoSucc)
      },
      getHomeInfoSucc (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.swiperList = data.swiperList
          console.log(this.swiperList)
          this.iconList = data.iconList
          this.recommendList = data.recommendList
          this.weekendList = data.weekendList
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home
    height 812px
</style>

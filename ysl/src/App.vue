<template>
  <div id="app">
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
  </div>
</template>

<script>
  import HomeHeader from 'components/HomeHeader'
  import HomeSwiper from 'components/HomeSwiper'
  import HomeIcons from 'components/HomeIcons'
  import HomeRecommend from 'components/HomeRecommend'
  import axios from 'axios'
  export default {
    name: 'App',
    components: {
      HomeHeader,
      HomeSwiper,
      HomeIcons,
      HomeRecommend
    },
    data () {
      return {
        swiperList: [],
        iconList: [],
        recommendList: [],
        weekendList: []
      }
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
    },
    mounted() {
      this.getHomeInfo()
    },
  }
</script>

<style>

</style>

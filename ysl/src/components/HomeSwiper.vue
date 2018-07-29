<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img :src="item.url" width="100%">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true
        },
        swiperList: [
          {
            id: '001',
            url: 'https://img1.qunarzz.com/qs/1807/e0/e349cd7cdbd92602.jpg'
          },
          {
            id: '002',
            url: 'https://img1.qunarzz.com/qs/1807/db/e8ccd94f91ec9702.jpg'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .wrapper >>> .swiper-pagination-bullet-active
    background-color #fff
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 54%
    background-color #ccc
</style>
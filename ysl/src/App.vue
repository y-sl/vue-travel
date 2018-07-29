<template>
  <div id="app">
    <home-header></home-header>
    <home-swiper></home-swiper>
  </div>
</template>

<script>
  import HomeHeader from 'components/HomeHeader'
  import HomeSwiper from 'components/HomeSwiper'
  export default {
    name: 'App',
    components: {
      HomeHeader,
      HomeSwiper
    }
  }
</script>

<style>

</style>

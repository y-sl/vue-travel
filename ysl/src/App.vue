<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus">
  #app
    position flex
    top 0
    bottom 0
    width 100%
    height 100%
    overflow hidden
</style>

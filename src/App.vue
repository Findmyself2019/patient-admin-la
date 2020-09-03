<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#nprogress .bar
  background #15ff20 !important
*
  margin 0
  padding 0
html,body
  width 100%
  height 100%
  overflow-y:auto;
  #app
    width 100%
    height 100%
    overflow-y auto
body
  height: 100%;
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  text-rendering: optimizeLegibility
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif
  .el-pagination
    padding 20px 5px
</style>

<template>
  <div class="card-box">
    <div class="header">
      {{ title }}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardTemplate",
  props:{
    title:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index'
  .card-box
    width 100%
    height 100%
    border 1px solid #eee
    background #fff
    .header
      height 60px
      background #fafafa
      line-height 60px
      text-align left
      box()
      padding 0 20px
      font-weight bold
    .content
      height calc(100% - 80px)
      padding 15px
</style>

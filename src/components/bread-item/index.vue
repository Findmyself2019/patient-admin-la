<template>
  <div>
    <span class="circle"></span>
    <span class="text">
      <slot></slot>
    </span>
    <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
  </div>
</template>

<script>
export default {
  name: "breadItem"
};
</script>

<style lang="stylus" scoped>
.circle
  width 10px
  height 10px
  display inline-block
  border-radius 50%
  background #5693ff
  margin-right 10px
.text
  color #a9a9a9
</style>

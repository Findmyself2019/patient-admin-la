<template>
  <div class="box"></div>
</template>

<script>
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
export default {
  name: "Overview",
  components: {},
  created() {},
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.box
  display flex
  flex-direction column
  .menu-list
    height 400px
  .report-list
    flex 1
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    .menu-list
      flex-basis 49%
      height 400px
      margin-top 20px
    .Copyright
      height 80px
      line-height 80px
      display flex
      justify-content center
      color #b2b2b2
</style>

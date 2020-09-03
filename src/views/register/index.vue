<template>
  <div class="container">
    <header>
      <div class="top">
        <div class="top_left">
          <img
            src="@/assets/img/logo1.png"
            class="logo"
          />
          <div class="title">
            <h1>山东省精神卫生资源监管</h1>
            <h5>STROKE PREVENTION PROJECT,NATIONAL HEALTH COMMISSION</h5>
          </div>
        </div>
        <div class="top_right">
          <router-link to="/login">
            返回首页
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <div class="footer_txt">
        <div class="footer_txt_left">
          <p style="color:#333">
            主管单位：山东省精神卫生中心
          </p>
          <p style="color:#333">
            技术支持：山东众阳健康
          </p>
        </div>
        <div class="footer_txt_right">
          <p style="color:#333">
            运营维护：山东众阳健康
          </p>
          <p style="color:#333">
            大数据中心
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Register"
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container>>>
    position relative
    overflow-y auto
    height 100%
    background #f7f7f7
    header
      width: 100%
      height: 110px
      background-color: #fff
      position: fixed
      top: 0
      z-index: 100
      border-bottom: 1px solid #ccc
      .top
        display flex
        height 100px
        justify-content space-between
        width 70%
        margin 0 auto
        .top_left
          display flex
          align-items center
          .title
            padding-left: 1%
            color: #0070c0;
            white-space: nowrap
        .top_right
          height 100px
          line-height 100px
    main
      margin-top 120px
    footer
      width: 100%;
      margin-top: 30px;
      height: 75px;
      background-color: #fff;
      border-top: 1px solid #ccc
      /*position fixed*/
      /*bottom 0*/
      .footer_txt
        width: 960px;
        margin: 0 auto;
        padding-top: 10px;
        overflow hidden
        .footer_txt_left
          float: left;
          text-align: left;
        .footer_txt_right
          float: right
          text-align: right

</style>

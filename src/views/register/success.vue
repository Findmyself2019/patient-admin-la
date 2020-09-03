<template>
  <div class="container">
    <div class="rebinding-box">
      <div class="box-timeline">
        <ul>
          <li class="text">
            <span class="step1_jianbinaLine">1</span><span>填写信息登记表</span>
          </li>
          <li class="text">
            <span class="step1_shallowLine">2</span><span class="step_2">单位资质认证</span>
          </li>
          <li class="text">
            <span class="step_1">3</span><span class="step_2">完成注册</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="row" style="width:100%;border-bottom: 1px solid #ccc;overflow: hidden">
        <div style="width:50%;float:left">
          <h2>完成注册</h2>
        </div>
        <div style="width:49%;height:56px;float:right;text-align:right">
          <h4 style="margin-top:25px">
            已有账号？<a href="/home/login" style="text-decoration:none;color: #0070c0 !important;">立即登陆</a>
          </h4>
        </div>
      </div>
      <div style="text-align: center">
        <span style="color: #0070c0;display: inline-block;margin: 10px 0;font-size: 150px">
          <i class="el-icon-circle-check"></i>
        </span>
      </div>
      <div style="text-align: center;margin-bottom: 30px">
        <span style="font-size: 24px;color: #0867c0">您已成功提交单位注册申请</span>
      </div>
      <div class="row-item">
        <div style="margin-left:20%">
          <p style="padding: 5px">
            <span class="circle"></span>1、请等待数据中心审核(审核时间一般为1-2个工作日)
          </p>
        </div>
      </div>
      <div class="row-item">
        <div style="margin-left:20%">
          <p style="padding: 5px">
            <span class="circle"></span>2、审核结果以短信通知，审核通过后，会生成单位管理员账号，在登录页面激活账号后可登录
          </p>
        </div>
      </div>
      <div class="row-item">
        <div style="margin-left:20%">
          <p style="padding: 5px">
            <span class="circle"></span>3、如果审核未通过，修改后重新提交。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .rebinding-box
    width: 960px;
    margin: 0px auto 0 auto
    background-color: #fff
    border: 1px solid #DCDCDC
    box-sizing border-box
    padding 15px
    .box-timeline
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      ul
        width: 100%
        list-style: none
        margin-top: 1%
        .text
          width: 33.333%;
          float: left;
          text-align: center;
          span:nth-child(1)
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #0070c0;
            line-height: 40px;
            color: #fff;
            font-size: 24px;
            margin-left: 40%;
            position: relative;
          span:nth-child(2)
            text-align: center;
            color: #0070c0;
            font-size: 18px;
            padding-top: 10px;
            display: block;
            margin-right: 10px;
  @media only screen and (max-width: 1980px)
    .rebinding-box .box-timeline .step1_jianbinaLine:after
      content: "";
      position: absolute;
      height: 5px;
      width: 125px;
      top: 20px;
      left: 70px;
      background: #0070c0
  @media only screen and (max-width: 1980px)
    .rebinding-box .box-timeline .step1_shallowLine:after
      content: "";
      position: absolute;
      height: 5px;
      width: 125px;
      top: 20px;
      left: 70px;
      background:  #0070c0
  .main
    width: 960px
    background:#fff
    margin 10px auto 0 auto
    border: 1px solid #DCDCDC;
    padding 20px 30px
    box-sizing border-box
    box-shadow 0 0 5px #ccc
    h2
      color #333
    a
      font-size: 14px;
      color: #5190ba !important;
      text-decoration none
    .circle
      width 10px
      height 10px
      border-radius 50%
      display inline-block
      background #0070c0
      margin-right 10px
    .row-item
      p
        font-size 12px

</style>

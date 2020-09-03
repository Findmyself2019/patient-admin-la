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
          <h2>单位资质认证</h2>
        </div>
        <div style="width:49%;height:56px;float:right;text-align:right">
          <h4 style="margin-top:25px">
            已有账号？<a href="/home/login" style="text-decoration:none;color: #0070c0 !important;">立即登陆</a>
          </h4>
        </div>
      </div>
      <div style="text-align: center">
        <span style="padding: 10px 60px;background: #0070c0;display: inline-block;color: #fff;margin: 10px 0">
          请完成以下步骤,认证单位资质
        </span>
      </div>
      <div class="row-item">
        <div style="flex: 8">
          <h4 style="padding: 5px">
            <span class="circle"></span>第一步
          </h4>
          <p style="padding: 5px">
            打印《单位注册信息登记表》
          </p>
          <p class="annotation" style="padding: 5px">
            注:如果单位注册信息登记表填写有误,可先修改在打印
          </p>
        </div>
        <div style="display: flex;margin: auto;flex: 2">
          <el-button>
            点击打印登记表
          </el-button>
        </div>
      </div>
      <div class="row-item">
        <div style="flex: 8">
          <h4 style="padding: 5px">
            <span class="circle"></span>第二步
          </h4>
          <p style="padding: 5px">
            将打印的《单位注册信息登记表》加盖单位公章并拍照
          </p>
          <p class="annotation" style="padding: 5px">
          </p>
        </div>
        <div style="display: flex;margin: auto;flex: 2">
        </div>
      </div>
      <div class="row-item">
        <div style="flex: 8">
          <h4 style="padding: 5px">
            <span class="circle"></span>第三步
          </h4>
          <p style="padding: 5px">
            将事业单位法人证书拍照(部队医院、暂无统一社会信用代码的医院不需要)
          </p>
          <p class="annotation" style="padding: 5px">
            注:如果没有事业单位法人证书,可上传营业执照或医疗机构执业许可证
          </p>
        </div>
        <div style="display: flex;margin: auto;flex: 2">
        </div>
      </div>
      <div class="row-item">
        <div style="flex: 8">
          <h4 style="padding: 5px">
            <span class="circle"></span>第四步
          </h4>
          <p style="padding: 5px">
            上传《单位注册信息登记表》盖章图片及事业单位法人证书图片
          </p>
          <p class="annotation" style="padding:5px">
          </p>
        </div>
        <div style="display: flex;margin: auto;flex: 2">
          <el-button @click="upload">
            上传图片
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="680px"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <div class="dialog-box">
        <div class="left">
          <p>《单位注册信息登记表》盖章图片</p>
          <div class="img-box"></div>
          <p class="sample">
            示例图
          </p>
          <div
            class="img-box"
            @drop="drop"
            @dragenter="dragenter"
            @dragover="dragover"
            ref="imgBox"
            width="100%"
          >
            <div v-show="!showImg" class="addBox">
              <p>
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  @click="emitInputChange('l')"
                  style="display:inline-block "
                ></i>
              </p>
              <p class="tip" @click="emitInputChange('l')">
                点击或拖拽图片
              </p>
            </div>

            <img
              src=""
              alt=""
              ref="leftImg"
            />
            <input
              type="file"
              name="file"
              ref="leftInput"
              class="el-upload__input"
              @change="emitFile('leftImg','left')"
            />
          </div>
        </div>
        <div class="right">
          <p>事业单位法人证书图片</p>
          <div
            class="img-box"
          ></div>
          <p class="sample">
            示例图
          </p>
          <div
            class="img-box"
            @drop="drop1"
            @dragenter="dragenter"
            @dragover="dragover"
            ref="imgBox"
          >
            <div v-show="!showRightImg" class="addBox">
              <p>
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  @click="emitInputChange('r')"
                ></i>
              </p>
              <p class="tip" @click="emitInputChange('r')">
                点击或拖拽图片
              </p>
            </div>
            <input
              type="file"
              ref="rightInput"
              class="el-upload__input"
              @change="emitFile('rightImg','right')"
            />
            <img
              src=""
              alt=""
              ref="rightImg"
              width="100%"
            />
          </div>
        </div>
      </div>


      <div style="text-align: center;margin-top: 40px">
        <el-button type="primary" @click="uploadFile">
          上传证照
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/index"
import {mapState} from 'vuex'
export default {
  name: "Qualification",
  data(){
    return{
      showDialog:false,
      title:'单位资质上传',
      leftImgUrl:'',
      rightImgUrl:'',
      showImg:false,
      showRightImg:false,
      sign:false
    }
  },
  computed:{
    ...mapState(['registerOrgId'])
  },
  watch:{
    showDialog(val){
      if(val){
        this.leftImgUrl = ''
        this.rightImgUrl = ''
        this.showRightImg = false
        this.showImg = false
        this.$refs.leftImg.src = ''
        this.$refs.rightImg.src = ''
      }
    }
  },
  methods: {
    upload() {
      this.showDialog = true
    },
    emitFile(img,direction){//点击触发的事件

      const file = direction === 'left'?this.$refs.leftInput.files[0]:this.$refs.rightInput.files[0]
      let reader = new FileReader()
      const that = this
      reader.onload = function(){
        that.$refs[img].src = this.result
        direction === 'left'?that.showImg = true:that.showRightImg = true
        direction === 'left'?that.leftImgUrl = file :that.rightImgUrl = file
      }
      reader.readAsDataURL(file)
    },//加号模仿触发点击input事件
    emitInputChange(direction){
      direction==='l'?this.$refs.leftInput.click():this.$refs.rightInput.click()
    },
    // uploadFiles(e) {
    //   const reader = new FileReader()
    //   const files = e.target.files
    //   const url = reader.readAsDataURL(files)
    // },
    dragenter(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    dragover(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    drop(e) {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length) {
        var file = files[0]
        var reader = new FileReader()
        const that = this
        reader.onload = function () {
          // that.$refs.imgBox.removeChild('img')
          // img.width = '100%'
          that.$refs.leftImg.src = this.result
          that.leftImgUrl = file
          that.showImg = true
        }
        reader.readAsDataURL(file)
      }

      else {
        alert("无法获取信息，您拖入的不是图片文件")
      }

    },
    drop1(e) {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length) {
        var file = files[0]
        var reader = new FileReader()
        const that = this
        reader.onload = function () {
          // that.$refs.imgBox.removeChild('img')
          // img.width = '100%'
          that.$refs.rightImg.src = this.result
          that.rightImgUrl = file
          that.showRightImg = true
        }
        // const url = URL.createObjectURL(file)
        // document.getElementById('img').src = url
        reader.readAsDataURL(file)
      }

      else {
        alert("无法获取信息，您拖入的不是图片文件")
      }

    },
    submit(){
      if(!this.sign) return this.$message.error('请上传图片在提交!')
      this.$router.push('/register/success')

    },
    uploadFile(){
      let form = new FormData()
      form.append('multipartFile1',this.leftImgUrl)
      form.append('multipartFile2',this.rightImgUrl)
      form.append('orgId',this.registerOrgId)
      api.register.uploadFile(form).then(res=>{
        if(res.code === 200){
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
          this.sign = true
          this.showDialog = false
          this.leftImgUrl = ''
          this.rightImgUrl = ''
          this.showRightImg = false
          this.showImg = false
        }
      })
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container>>>
  .el-dialog__header
    background #50a6e4
  .el-dialog__title
    color #fff
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
      background: linear-gradient(to right, #0070c0, #a2c2e1);
  @media only screen and (max-width: 1980px)
    .rebinding-box .box-timeline .step_1:before
      content: "";
      position: absolute;
      height: 5px;
      width: 125px;
      top: 20px;
      left: 70px;
      background-color: #a2c2e1;
  .step_1 {
    background-color: #a2c2e1 !important;
  }
  .step_2 {
    color: #a2c2e1 !important;
  }
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
    .row-item
      border 1px solid #ccc
      display flex
      box-sizing border-box
      padding 10px 30px
      justify-content space-between
      margin-bottom 10px
      .el-button
        padding 10px 10px
        box-shadow 0 0 5px #0097c0
        color #0070c0
      .circle
        width 10px
        height 10px
        border-radius 50%
        display inline-block
        background #0070c0
        margin-right 10px
      .annotation
        color #fa892d
  .dialog-box
    display flex
    box-sizing border-box
    .sample
      margin-top 20px
    p
      &:hover
        color #2ea5d6
    .left
      flex 1
      border-right 1px solid #ddd
      display flex
      flex-direction column
      align-items center
      .img-box
        margin-top 15px
        border 1px solid #cccccc
        width 160px
        height 160px
        overflow hidden
        &:hover
          border 1px dotted #41baee
        .addBox
           width 100%
           height 100%
           display flex
           justify-content center
           align-items center
           flex-direction column
        .avatar-uploader-icon
          font-size 36px
    .right
      flex 1
      display flex
      flex-direction column
      align-items center
      .img-box
        margin-top 15px
        border 1px solid #cccccc
        width 160px
        height 160px
        &:hover
          border 2px dotted #41baee
        .addBox
          width 100%
          height 100%
          display flex
          justify-content center
          align-items center
          flex-direction column
        .avatar-uploader-icon
          font-size 36px
</style>

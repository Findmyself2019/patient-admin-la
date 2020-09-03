<template>
  <div class="container">
    <div class="manage-title">
      <h4>证照详情</h4>
      <el-form :inline="true">
        <el-form-item label="证照类型">
          <el-select
            v-model="form.certificateTypeCode"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="持证主体"
          v-if="labelName === '人员名称'"
        >
          <el-select
            v-model="treeLabel"
            @change="change"
          >
            <el-option
              v-for="item in personData"
              :key="item.identityDocumentNumber"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="持证主体"
          v-else
          prop="certificateHolderCode"
        >
          <treeselect
            v-model="form.certificateHolderCode"
            :options="holderOptions"
            :disable-branch-nodes="false"
            :show-count="true"
            placeholder="请选择机构"
            @select="select"
            value="lll"
          />
        </el-form-item>
        <el-button type="primary" @click="search">
          搜索
        </el-button>
      </el-form>
    </div>
    <div class="manage-main">
      <h4 style="display: flex;justify-content: space-between">
        <span>基本信息</span>
      </h4>
      <div class="normal">
        <div style="flex: 6;display: flex">
          <div class="left-col">
            <p
              class="textFront"
              v-for="(item1,index1) in leftColArr"
              :key="index1+123"
            >
              {{ item1 }}
            </p>
          </div>
          <div class="right-col">
            <p>
              <span>{{ infoData.certificateName?infoData.certificateName:'-' }}</span>
              <!--                <span v-else>-->
              <!--                  <el-form-item prop="certificateName">-->
              <!--                    <el-input v-model="infoData.certificateName" />-->
              <!--                  </el-form-item>-->
              <!--                </span>-->
            </p>
            <p>
              <span>{{ infoData.certificateNumber?infoData.certificateNumber:'-' }}</span>
              <!--                <span v-else>-->
              <!--                  <el-input v-model="infoData.certificateNumber" />-->
              <!--                </span>-->
            </p>
          </div>
        </div>
        <div style="flex: 4;display: flex">
          <div class="left-col" style="flex:4; text-align: right">
            <p
              class="textFront"
              v-for="(item2,index2) in rightColArr"
              :key="index2+213"
            >
              {{ item2 }}
            </p>
          </div>
          <div class="right-col" style="flex:6; text-align: left">
            <p>
              <span>{{ infoData.certificateHolderName?infoData.certificateHolderName:'-' }}</span>
              <!--                <span v-else>-->
              <!--                  <el-input v-model="infoData.certificateHolderName" />-->
              <!--                </span>-->
            </p>
            <p>
              <span>{{ infoData.certificateTypeCode?typeMatter(infoData.certificateTypeCode):'-' }}</span>
              <!--                <span v-else>-->
              <!--                  <el-select v-model="infoData.certificateTypeCode">-->
              <!--                    <el-option-->
              <!--                      v-for="item in typeOptions"-->
              <!--                      :key="item.dictValue"-->
              <!--                      :label="item.dictLabel"-->
              <!--                      :value="item.dictValue"-->
              <!--                    />-->
              <!--                  </el-select>-->
              <!--                </span>-->
            </p>
          </div>
        </div>
      </div>
      <h4>
        <span>详细信息</span>
      </h4>
      <el-form
        :inline="true"
        :model="infoData"
        ref="detailData"
      >
        <div class="detail1">
          <div style="flex: 6;display: flex">
            <div class="left-col">
              <p
                class="textFront"
                v-for="(item1,index1) in leftColArr1"
                :key="index1+123"
              >
                {{ item1 }}
              </p>
            </div>
            <div class="right-col">
              <!-- 证照标识 -->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateSign ?infoData.certificateSign:'-' }}</span>
                <el-input v-else v-model="infoData.certificateSign" />
              </p>
              <!-- 证照颁发机构全称 certificateIssuingAuthorityName-->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateIssuingAuthorityName ?infoData.certificateIssuingAuthorityName:'-' }}</span>
                <el-input v-else v-model="infoData.certificateIssuingAuthorityName" />
              </p>
              <!--证照颁发机构统一社会信用代码 certificateIssuingAuthorityCode -->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateIssuingAuthorityCode ?infoData.certificateIssuingAuthorityCode :'-' }}</span>
                <el-input v-else v-model="infoData.certificateIssuingAuthorityCode" />
              </p>
            </div>
          </div>
          <div style="flex: 4;display: flex">
            <div class="left-col" style="flex:4; text-align: right">
              <p
                class="textFront"
                v-for="(item2,index2) in rightColArr1"
                :key="index2+213"
              >
                {{ item2 }}
              </p>
            </div>
            <div class="right-col" style="flex:6; text-align: left">
              <!-- 证照颁发日期 -->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateIssuedDate?infoData.certificateIssuedDate:'-' }}</span>
                <el-date-picker
                  v-model="infoData.certificateIssuedDate"
                  v-else
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                />
              </p>
              <!-- 证照有效期起始日期 -->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateEffectiveDate?infoData.certificateEffectiveDate:'-' }}</span>
                <el-date-picker
                  v-model="infoData.certificateEffectiveDate"
                  v-else
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                />
              </p>
              <!-- 证件有效期截止日期 -->
              <p>
                <span v-if="!isEdit">{{ infoData.certificateExpiringDate?infoData.certificateExpiringDate:'-' }}</span>
                <el-date-picker
                  v-model="infoData.certificateExpiringDate"
                  v-else
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                />
              </p>
            </div>
          </div>
        </div>
        <div style="text-align: left">
          <h4 style="margin-top:40px">
            证照信息
          </h4>
          <img
            :src="path"
            class="licImg"
            v-if="path.split(',')[1]!=='null'"
            width="18%"
            @click="expandImage('lic')"
          />
          <div v-else class="empty">
            <img src="@/assets/img/empty.png" alt="" />
          </div>
          <el-upload
            v-show="isEdit"
            class="upload-demo"
            :multiple="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="getFile"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">
              点击上传
            </el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <el-form-item style="margin-top: 60px">
          <el-button
            @click="isEdit = true"
            :disabled="disable"
            v-is-counties="4"
          >
            修改
          </el-button>
          <el-button
            type="primary"
            @click="saveData"
            :disabled="disable"
            v-is-counties="4"
          >
            保存
          </el-button>
          <el-button @click="isEdit = false" v-is-counties="4">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-img">
      <el-dialog
        :visible.sync="showSreenFull"
        width="650px"
        :modal-append-to-body="false"
        id="lll"
      >
        <div id="dialog_large_image">
          <img
            src=""
            alt=""
            width="100%"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import {mapState} from 'vuex'
import mixin from '@/util/mixins'
export default {
  name: "LicDetail",
  data(){
    return{
      isEdit:false,
      value:'',
      form:{

      },
      typeOptions:[],
      option:[],
      labelName:'机构名称',
      disable:false,
      treeLabel:'',
      holderOptions:[],
      statusOptions:[],
      personData:[],
      infoData:{
        certificateName:'',
        certificateTypeCode:'',
        certificateNumber:'',
        certificateHolderName:'',
        certificateSign:'',
        certificateIssuingAuthorityName:'',
        certificateIssuingAuthorityCode:'',
        certificateIssuedDate:'',
        certificateEffectiveDate:'',
        certificateExpiringDate:'',
        id:null
      },
      leftColArr:['证照名称','证照编号'],
      rightColArr:['持证主体','证照类型'],
      leftColArr1:['证照标识','证照颁发机构全称','证照颁发机构统一社会信用代码'],
      rightColArr1:['证照颁发日期','证照有效期起始日期','证件有效期截止日期'],
      fileUrl:'',
      rules:{
        certificateName:[
          {
            required:true,message:'请输入证照名称',trigger:'blur'
          }
        ]
      }
    }
  },
  mixins:[mixin],
  components:{
    Treeselect
  },
  computed:{
    ...mapState(['path','licData','clickName']),
  },
  methods:{
    select(node){
      this.treeLabel = node.label
    },
    saveData(){
      var formData = new FormData()
      formData.append('certificateName', this.infoData.certificateName)
      formData.append('certificateTypeCode', this.infoData.certificateTypeCode)
      formData.append('certificateNumber', this.infoData.certificateNumber)
      formData.append('certificateSign', this.infoData.certificateSign)
      formData.append('certificateIssuingAuthorityName', this.infoData.certificateIssuingAuthorityName)
      formData.append('certificateIssuingAuthorityCode', this.infoData.certificateIssuingAuthorityCode)
      formData.append('certificateIssuedDate', this.infoData.certificateIssuedDate)
      formData.append('certificateHolderCode', this.infoData.certificateHolderCode)
      formData.append('certificateEffectiveDate', this.infoData.certificateEffectiveDate)
      formData.append('certificateExpiringDate', this.infoData.certificateExpiringDate)
      this.infoData.id?formData.append('id', this.infoData.id):''
      formData.append('multipartFile', this.fileUrl)
      // formData.append('certificateHolderName', this.addcerForm.certificateHolderName)
      api.certificate.editCertificate(formData).then(res=>{
        if (res.code === 200){
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.isEdit = false
        }
      })
    },
    async getType(){
      const {data} = await api.dictData.getDicts('certificate_type')
      this.typeOptions = data
    },
    getFile(file) {
      this.fileUrl = file.raw
      let reader = new FileReader()
      const that = this
      reader.onload = function(){
        that.$store.dispatch('setpath',`${this.result}`)
      }
      reader.readAsDataURL(this.fileUrl)
    },
    change(data){
      this.treeLabel = data.name
      this.form.certificateHolderCode = data.identityDocumentNumber
    },
    async treeSelect(){
      const {data} = await api.dept.treeselect()
      const data1 =[...data]
      data1.map(item =>{
        item.id = item['organizationCode']
      })
      this.holderOptions = data1
    },
    async search(){
      this.isEdit = false
      const data = await api.certificate.getByHolderCode(this.form.certificateHolderCode)
      this.$store.dispatch('setpath',`data:image/jepg;base64,${data.cerStr}`)
      if(!data.cerInfo){
        for(let key in this.infoData){
          this.infoData[key] = null
        }
      }else{
        this.infoData = data.cerInfo
      }
    },
    typeMatter(code){
      let status = ''
      this.typeOptions.forEach(item=>{
        if(code === item.dictValue){
          status = item.dictLabel
        }
      })
      return status
    },
    async getInfoByOrgId(){
      const {rows} = await api.person.getPersonList()
      this.personData = rows
    },
  },
  async activated(){
    this.isEdit = false
    if (this.clickName === '证照详情'){
      const data = await api.certificate.getSelfDetail()
      !data.cerStr ?data.cerStr = null:''
      this.$store.dispatch('setpath',`data:image/jepg;base64,${data.cerStr}`)
      this.$store.dispatch('editClickName','')//清除当前clickName值
      if(!data.cerInfo){
        for(let key in this.infoData){
          this.infoData[key] = null
        }
      }else{
        this.infoData = data.cerInfo
      }
    }
    this.getInfoByOrgId()//获取当前机构下所有机构
    this.getType()
    this.treeSelect()
  },
  watch:{
    'licData':{
      handler(val){
        if(!val){
          this.disable = true
          let newArr = {}
          for(let key in this.infoData){
            newArr[key] = ''
          }
          this.infoData = newArr
          this.$message({
            showClose: true,
            message: '您还没有上传证照，请先上传证照',
            type: 'error'
          })
        }else{
          this.disable = false
          this.infoData = val
        }
      },
      immediate:true
    },
    'form.certificateTypeCode'(val){
      const arr = this.typeOptions.filter(item=>{
        return item.dictValue === val
      })
      if(arr[0].dictLabel === '营业执照'){
        this.labelName = '机构名称'
      }else{
        this.labelName = '人员名称'
      }
    },
    labelName(){
      this.treeLabel = ''
      this.form.certificateHolderCode = null
      this.$nextTick(()=>{
        if(document.getElementsByClassName('vue-treeselect__single-value')[0])return
        document.getElementsByClassName('vue-treeselect__single-value')[0].innerHTML = ''
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index.styl'
  .container
    width 100%
    height 100%
    box()
    .manage-title >>>
      height 150px
      margin-bottom 20px
      background #fff
      padding 20px
      text-align left
      .vue-treeselect
        width 170px
      h4
        margin-bottom 20px
        text-align left
      box()
      .el-tag
        height 28px
      .el-select
        width 87%
        margin-right 20px
      .el-button--primary
        width 10%
    .manage-main>>>
      height calc(100% - 170px)
      overflow-y: auto
      h4
        text-align left
        margin-top 20px
        i
          margin 0 10px
      box()
      padding 20px
      background #fff
      .el-tabs
        height 100%
        .el-tabs__nav
          margin-left 20px
          box()
        .el-tabs__content
          height calc(100% - 60px)
        .el-tabs__item
          height 55px
          line-height 55px
          font-size 16px
          font-family '微软雅黑'
        .el-tabs__active-bar
          background-color #0079fe !important
    .content
      width 100%
      height calc(100% - 110px)
    .normal,.detail1>>>
      display flex
      .left-col
        flex 3
        text-align right
      .right-col
        flex 7
        text-align left
      box()
      padding 0 140px
      p
        margin-top 30px
        font-size 15px
        height: 20px
      .textFront
        font-weight bold
        margin-right 30px
      /deep/.el-input__inner
        width 200px
        height 33px
  .empty
    height 200px
    display flex
    align-items center
    img
      margin-left 10%
  .upload-demo
    margin 20px 0 30px 10%
  .licImg
    margin-left: 100px
    margin-top: 20px
    cursor url("../../../assets/img/fangdajing.png"),pointer
</style>

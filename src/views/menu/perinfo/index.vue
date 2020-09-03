<template>
  <div class="container">
    <div class="manage-title">
      <h4>人员详情</h4>
      <el-select
        v-model="value"
        filterable
        placeholder="请选择人员姓名"
      >
        <el-option
          v-for="item in options"
          :key="item.name+'123'"
          :label="item.name"
          :value="item.identityDocumentNumber"
        />
      </el-select>
      <el-button
        type="primary"
        @click="search"
      >
        搜索
      </el-button>
    </div>
    <div class="manage-main">
      <h4 style="display: flex;justify-content: space-between">
        <span>基本信息</span>
        <span class="viewing" @click="findLicDetail(infoData.identityDocumentNumber)">查看证照详情 >>></span>
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
              <span>{{ infoData&&infoData.name?infoData.name:'-' }}</span>
            </p>
            <p>
              <span>{{ infoData&&infoData.orgOrganizationBase?infoData.orgOrganizationBase.organizationName:'-' }}</span>
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
              <span>{{ infoData&&infoData.identityDocumentNumber?infoData.identityDocumentNumber:'-' }}</span>
            </p>
          </div>
        </div>
      </div>
      <h4>
        <span>详细信息</span>
        <i
          class="el-icon-edit"
          @click="edit"
          v-is-counties="4"
        ></i>
        <i
          class="el-icon-wallet"
          @click="saveData"
          v-is-counties="4"
        ></i>
        <i
          class="el-icon-document-delete"
          @click="cancel"
          v-is-counties="4"
        ></i>
      </h4>
      <el-form
        :inline="true"
        :model="detailData"
        ref="detailData"
        :rules="rules"
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
              <!-- 性别 -->
              <p>
                <span v-if="!isEdit&&infoData&&!infoData.gender">-</span>
                <span v-else-if="!isEdit&&infoData&&infoData.gender==='1'">男</span>
                <span v-else-if="!isEdit&&infoData&&infoData.gender==='2'">女</span>
                <span v-else>
                  <el-form-item prop="gender">
                    <el-select
                      v-model="detailData.gender"
                    >
                      <el-option
                        v-for="item in genderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!-- 地址(市) -->
              <p>
                <span v-if="!isEdit">{{ infoData&&infoData.addressCity ?infoData.addressCity :'-' }}</span>
                <span v-else>
                  <el-form-item prop="addressCity">
                    <el-select
                      v-model="detailData.addressCity"
                    >
                      <el-option
                        v-for="item in addressCityList"
                        :key="item.addressCityName"
                        :label="item.addressCityName"
                        :value="item.addressCityName"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!--地址(县) -->
              <p>
                <span v-if="!isEdit">{{ infoData&&infoData.addressCounty ?infoData.addressCounty :'-' }}</span>
                <span v-else>
                  <el-form-item prop="addressCounty">
                    <el-select
                      v-model="detailData.addressCounty"
                    >
                      <el-option
                        v-for="item in filterList"
                        :key="item.addressCountyName"
                        :label="item.addressCountyName"
                        :value="item.addressCountyName"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!-- 详细地址 -->
              <p>
                <span v-if="!isEdit">{{ infoData&&infoData.addressDetail ?infoData.addressDetail:'-' }}</span>
                <span v-else>
                  <el-form-item prop="addressDetail">
                    <el-input v-model="detailData.addressDetail" />
                  </el-form-item>
                </span>
              </p>

              <!-- 个人资质 -->
              <p>
                <span v-if="!isEdit&&infoData&&!infoData.employeeQualification">-</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeQualification==='1'">一级心理咨询师</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeQualification==='2'">二级心理咨询师</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeQualification==='3'">三级心理咨询师</span>
                <span v-else>
                  <el-form-item prop="employeeQualification">
                    <el-select
                      v-model="detailData.employeeQualification"
                    >
                      <el-option
                        v-for="item in qualificationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </span>
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
              <!-- 手机 -->
              <p>
                <span v-if="!isEdit">{{ infoData&&infoData.telephone?infoData.telephone:'-' }}</span>
                <span v-else>
                  <el-form-item prop="telephone">
                    <el-input v-model="detailData.telephone" />
                  </el-form-item>
                </span>
              </p>
              <!-- 学历性质 -->
              <p>
                <span v-if="!isEdit&&infoData&&!infoData.educationNatrue">-</span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationNatrue==='1'">全日制</span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationNatrue==='2'">函授</span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationNatrue==='3'">成人教育</span>
                <span v-else>
                  <el-form-item prop="educationNatrue">
                    <el-select
                      v-model="detailData.educationNatrue"
                    >
                      <el-option
                        v-for="item in natureOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!-- <p>
                <span v-if="!isEdit">{{ infoData&&infoData.addressVillage?infoData.addressVillage:'-' }}</span>
                <span v-else><el-input v-model="detailData.addressVillage" /></span>
              </p> -->
              <!-- 学历层次 -->
              <p>
                <span v-if="!isEdit&&infoData&&!infoData.educationLevel">
                  -
                </span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationLevel==='1'">
                  中专
                </span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationLevel==='2'">
                  大专
                </span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationLevel==='3'">
                  本科
                </span>
                <span v-else-if="!isEdit&&infoData&&infoData.educationLevel==='4'">
                  研究生
                </span>
                <span v-else>
                  <el-form-item prop="educationLevel">
                    <el-select
                      v-model="detailData.educationLevel"
                    >
                      <el-option
                        v-for="item in eduOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!-- 人员类型编码 -->
              <p>
                <span v-if="!isEdit&&infoData&&!infoData.employeeTypeCode">-</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeTypeCode==='1'">医生</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeTypeCode==='2'">护士</span>
                <span v-else-if="!isEdit&&infoData&&infoData.employeeTypeCode==='3'">技师</span>
                <span v-else>
                  <el-form-item prop="employeeTypeCode">
                    <el-select
                      v-model="detailData.employeeTypeCode"
                    >
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.employeeTypeCode"
                        :label="item.employeeTypeName"
                        :value="item.employeeTypeCode"
                      />
                    </el-select>
                  </el-form-item>
                </span>
              </p>
              <!-- 岗位 -->
              <p>
                <span v-if="!isEdit">{{ infoData&&infoData.post?infoData.post:'-' }}</span>
                <span v-else>
                  <el-form-item prop="post">
                    <el-input v-model="detailData.post" />
                  </el-form-item>
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import api from '@/api/index'
import mixin from '@/util/mixins'
// import Bus from '@/util/eventbus'
export default {
  name: "Perinfo",
  data(){
    return{
      options:[],
      value:'',
      isEdit:false,
      identityId:'',
      infoData:{
        name:'',
        employeeTypeCode:'',
        educationLevel:'',
        linktel:'',
        addressCounty:'',
        educationNatrue:'',
        addressInfo:'',
        addressHouseNumber:'',
        addressTownship:'',
        addressVillage:'',
        addressCity:'',
        gender:'',
        addressDetail:'',
        employeeQualification:'',
        post:'',
        telephone:''
      },
      rules:{
        telephone:[
          {required: true, message: '手机号码不能为空', trigger: "blur"},
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      },
      leftColArr:['姓名','机构名称'],
      rightColArr:['身份证号码'],
      leftColArr1:['性别','地址(市)','地址(县)','详细地址','个人资质'],
      rightColArr1:['手机号码','学历性质','学历层次','人员类型编码','岗位'],
      detailData:{

      },
      filterList:[],
      genderOptions:[
        {label:'男',value:'1'},
        {label:'女',value:'2'},
      ],
      eduOptions:[
        {label:'中专',value:'1'},
        {label:'大专',value:'2'},
        {label:'本科',value:'3'},
        {label:'研究生',value:'4'}
      ],
      qualificationOptions:[
        {label:'一级心理咨询师',value:'1'},
        {label:'二级心理咨询师',value:'2'},
        {label:'三级心理咨询师',value:'3'},
      ],
      natureOptions:[
        {label:'全日制',value:'1'},
        {label:'函授',value:'2'},
        {label:'成人教育',value:'3'},
      ],
      addressCityList:[],
      typeOptions:[],
      addressCountyList:[],

    }
  },
  mixins:[mixin],
  async created() {
    const {rows} = await api.person.getPersonList()
    this.options = rows
    this.value = rows[0].identityDocumentNumber
    this.identityId = rows[0].identityDocumentNumber
    if(this.clickName === '人员详情'){
      api.person.getDetail(rows[0].identityDocumentNumber).then(res=>{
        this.infoData = res.data
        this.detailData = this.infoData
      })
      this.$store.dispatch('editClickName','')
    }
  },
  activated(){

  },
  watch:{
    'detailData.addressCity':{
      handler(val){
        if (this.isEdit){
          const arr = this.addressCityList.filter(item=>{
            return item.addressCityName === val
          })
          const {addressCityCode} = arr[0]
          const arr1 = this.addressCountyList.filter(item1 =>{
            return item1.addressCityCode === addressCityCode
          })
          this.filterList = arr1
          this.detailData.addressCounty = ''
        }
      },
      immediate:true
    },
    'personDetail':{
      handler(val){
        this.infoData = val
        this.detailData = this.infoData
      },
      immediate:true
    }
  },
  computed:{
    ...mapState(['personDetail','clickName'])
  },
  methods:{
    search(){
      this.identityId = this.value
      api.person.getDetail(this.value).then(res=>{
        this.infoData = res.data
        this.detailData = this.infoData
      })
    },
    async edit(){
      this.isEdit = true
      //获取县市地址
      this.getCity()
      const {rows}= await api.person.getType()
      this.typeOptions = rows
    },
    cancel(){
      this.isEdit = false
    },
    async getCity(){
      const {addressCityList,addressCountyList} = await api.city.getCityList()
      this.addressCityList = addressCityList
      this.addressCountyList = addressCountyList
      this.filterCountry()
    },
    filterCountry(){
      const arr = this.addressCityList.filter(item=>{
        return item.addressCityName === this.infoData.addressCity
      })
      const {addressCityCode} = arr[0]
      const arr1 = this.addressCountyList.filter(item1 =>{
        return item1.addressCityCode === addressCityCode
      })
      this.filterList = arr1
    },
    saveData(){
      api.person.editPersonInfo(this.detailData).then(res=>{
        if(res.code === 200){
          this.isEdit = false
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
        }
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
      h4
        margin-bottom 20px
        text-align left
      box()
      .el-tag
        height 28px
      .el-select
        width 17%
        margin-right 20px
      .el-button--primary
        width 10%
    .manage-main>>>
      height calc(100% - 150px)
      .viewing
        font-size: 14px
        &:hover
          color #2ea5d6
          text-decoration underline
          cursor pointer
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
        flex 2
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
      .el-input__inner
        width 180px
        height 33px
      .el-form-item__error
        left 101%
        top 25%
        width 150px
</style>

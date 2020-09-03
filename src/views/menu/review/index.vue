<template>
  <div class="container">
    <div class="search-box">
      <div class="demo-input">
        机构名称：
        <el-input
          placeholder="请输入信息"
          v-model="input2"
        />
      </div>
      <div class="demo-input">
        机构类型：
        <el-input
          placeholder="请输入信息"
          v-model="input3"
        />
      </div>
      <div class="demo-input">
        所属区域：
        <el-input
          placeholder="请输入信息"
          v-model="input4"
        />
      </div>
      <span>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="reset"
        >
          重置
        </el-button>
      </span>
    </div>
    <div class="table-box">
      <table-template :table-data="tableData" :loading="loading">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="机构名称"
          width="200"
          prop="organizationName"
          align="center"
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.organizationName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationSecondName"
          label="第二名称"
          width="160"
          align="center"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="organizationCode"
          label="机构统一社会信用代码"
          width="160"
          align="center"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          label="机构状态"
          width="120"
          align="center"
          :formatter="formatStatus"
        />
        <el-table-column
          prop="address"
          label="详细地址"
          width="120"
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="cityName"
          label="所属区域"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="address"
          label="详细地址"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="adminName"
          label="管理员"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="adminMobilePhone"
          label="管理员联系电话"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <!--        <el-table-column-->
        <!--          prop="createtime"-->
        <!--          label="创建时间"-->
        <!--          show-overflow-tooltip-->
        <!--          :formatter="formatEmpty"-->
        <!--        />-->
        <el-table-column
          label="操作"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="Approve(scope.row.organizationId)"
              v-if="scope.row.organizationStatus !== '1'"
              v-is-approve="scope.row.organizationStatus"
            >
              审批
            </el-button>
            <el-button
              type="text"
              size="small"
            >
              查看日志
            </el-button>
            <el-button
              type="text"
              size="small"
            >
              更多
            </el-button>
          </template>
        </el-table-column>
      </table-template>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="850px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        label-width="160px"
        :inline="true"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="机构名称" prop="organizationName">
          <el-input v-model="form.organizationName" />
        </el-form-item>
        <el-form-item label="社会统一信用代码" prop="organizationCode">
          <el-input v-model="form.organizationCode" />
        </el-form-item>
        <el-form-item label="行政区划代码" prop="administrativeDivisionCode">
          <el-input v-model="form.administrativeDivisionCode" />
        </el-form-item>
        <el-form-item label="机构状态" prop="organizationStatus">
          <el-input v-model="form.organizationStatus" />
        </el-form-item>
        <el-form-item label="机构类别代码">
          <el-input v-model="form.organizationTypeCode" />
        </el-form-item>
        <el-form-item label="机构别名">
          <el-input v-model="form.organizationSecondName" />
        </el-form-item>
        <el-form-item label="	经济类型代码">
          <el-input v-model="form.publicPrivateNatureCode" />
        </el-form-item>
        <el-form-item label="隶属关系代码">
          <el-input v-model="form.membershipCode" />
        </el-form-item>
        <el-form-item style="width: 100%;text-align: center;">
          <el-button type="primary" @click="newSubmit('form')">
            确 定
          </el-button>
          <el-button @click="newCancel">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="title"
      :visible.sync="showApproveDialog"
      width="1050px"
      :modal-append-to-body="false"
    >
      <div class="approveBox">
        <div style="width: 100%">
          <h3 style="text-align: left">
            机构信息:
          </h3>
          <div class="detail">
            <div style="flex: 4;display: flex">
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
                <p>
                  <span>{{ OrgOrganizationVerifyVO.organizationName?OrgOrganizationVerifyVO.organizationName:'-' }}</span>
                </p>
                <!-- 地址(市) -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.organizationSecondName ?OrgOrganizationVerifyVO.organizationSecondName :'-' }}</span>
                </p>
                <!--地址(县) -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.acountyName ?OrgOrganizationVerifyVO.acountyName :'-' }}</span>
                </p>
                <!-- 详细地址 -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.phone ?OrgOrganizationVerifyVO.phone:'-' }}</span>
                </p>
              </div>
            </div>
            <div style="flex: 6;display: flex">
              <div class="left-col">
                <p
                  class="textFront"
                  v-for="(item2,index2) in rightColArr1"
                  :key="index2+213"
                >
                  {{ item2 }}
                </p>
              </div>
              <div class="right-col">
                <!-- 手机 -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.organizationCode?OrgOrganizationVerifyVO.organizationCode:'-' }}</span>
                </p>
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.cityName?OrgOrganizationVerifyVO.cityName:'-' }}</span>
                </p>
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.address?OrgOrganizationVerifyVO.address:'-' }}</span>
                </p>
                <!-- 岗位 -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&formatStatus(OrgOrganizationVerifyVO) }}</span>
                </p>
              </div>
            </div>
          </div>
          <h3 style="text-align: left">
            管理员信息:
          </h3>
          <div class="detail">
            <div style="flex: 4;display: flex">
              <div class="left-col">
                <p
                  class="textFront"
                  v-for="(item1,index1) in leftColAdmin1"
                  :key="index1+123"
                >
                  {{ item1 }}
                </p>
              </div>
              <div class="right-col">
                <p>
                  <span>{{ OrgOrganizationVerifyVO.adminName?OrgOrganizationVerifyVO.adminName:'-' }}</span>
                </p>
                <!-- 地址(市) -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.adminSex ?sexMatter(OrgOrganizationVerifyVO.adminSex) :'-' }}</span>
                </p>
                <!--地址(县) -->
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.adminMailbox ?OrgOrganizationVerifyVO.adminMailbox :'-' }}</span>
                </p>
              </div>
            </div>
            <div style="flex: 6;display: flex">
              <div class="left-col">
                <p
                  class="textFront"
                  v-for="(item2,index2) in rightColAdmin1"
                  :key="index2+213"
                >
                  {{ item2 }}
                </p>
              </div>
              <div class="right-col">
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.adminIdentityCard?OrgOrganizationVerifyVO.adminIdentityCard:'-' }}</span>
                </p>
                <p>
                  <span>{{ OrgOrganizationVerifyVO&&OrgOrganizationVerifyVO.adminMobilePhone?OrgOrganizationVerifyVO.adminMobilePhone:'-' }}</span>
                </p>
              </div>
            </div>
          </div>
          <div style="display:flex">
            <div style="display:flex;flex-direction: column;flex: 5;width: 0">
              <h3 style="margin-bottom: 30px">
                证照信息:
              </h3>
              <div class="img-box" @click="expandImage('cerinfo')">
                <img
                  :src="cerInfoStr"
                  alt=""
                  ref="certificate"
                />
              </div>
              <p><span>证照照片</span></p>
            </div>
            <div style="display:flex;flex-direction: column;flex: 5;width: 0">
              <h3 style="margin-bottom: 30px;">
                注册表信息:
              </h3>
              <div class="img-box" @click="expandImage('register')">
                <img
                  :src="registerInfoStr"
                  alt=""
                  ref="register"
                />
              </div>
              <p><span>注册表照片</span></p>
            </div>
          </div>
        </div>
        <h3>
          <span style="margin-right: 30px">审批结果:</span>
          <el-radio v-model="result" label="1">
            驳回
          </el-radio>
          <el-radio v-model="result" label="2">
            通过
          </el-radio>
        </h3>
        <div style="text-align: left">
          <h3 style="text-align: left;margin: 20px 0;">
            备注:<span style="font-size: 14px;font-weight: normal">(若是驳回请填写驳回原因,若是通过无需填写)</span>
          </h3>
          <el-input type="textarea" v-model="reson" />
        </div>
        <div class="button-box">
          <el-button type="primary" @click="submit">
            保存
          </el-button>
        </div>
      </div>
    </el-dialog>
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import api from '@/api/index'
import TableTemplate from '@/components/table-template/index'
// import Bus from "@/util/eventbus"
import mixin from '@/util/mixins'
export default {
  name: "Review",
  data(){
    return{
      tableData:[],
      approveData:[],
      approveForm:{},
      total:0,
      searchForm: {
        pageNum: 1,
        pageSize: 10,
      },
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      result:'',
      showDialog: false,
      showApproveDialog:false,
      statusOptions:[],
      userOptions:[],
      form:{},
      reson:'',
      infoData:[],
      leftColArr1:['机构名称:','第二名称:','县(区):','联系电话:'],
      rightColArr1:['统一社会信用代码:','市(地址):','详细地址:','机构状态:'],
      leftColAdmin1:['管理员姓名:','管理员性别:','管理员邮箱:'],
      rightColAdmin1:['管理员身份证号:','管理员手机号:'],
      title:'新增机构',
      loading:false,
      OrgOrganizationVerifyVO:{},
      cerInfoStr:'',
      registerInfoStr:'',
      // 表单校验
      rules: {
        organizationName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        organizationCode: [
          { required: true, message: "社会统一信用代码不能为空", trigger: "blur" },
          {pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: "请输入正确的格式", trigger: "blur"}
        ],
        administrativeDivisionCode: [
          { required: true, message: "行政区划代码不能为空", trigger: "blur" }
        ],
        organizationStatus:[
          {required:true,message: "机构状态不能为空", trigger: "blur"}
        ]
      }
    }
  },
  mixins:[mixin],
  components:{
    TableTemplate
  },
  async created(){
    this.getDic()
    this.getList()
    this.getUserSex()
  },
  methods:{
    getDic(){
      api.dicData.getDicts('organization_status').then(response => {
        this.statusOptions = response.data
      })
    },
    getUserSex(){
      api.dicData.getDicts('sys_user_sex').then(response => {
        this.userOptions = response.data
      })
    },
    async getList(){
      const {rows,total}  = await api.organizationReview.getReviewList(this.searchForm)
      this.tableData = rows
      this.loading = false
      this.total = total
    },
    reset:function(){
      this.input1=''
      this.input2=''
      this.input3=''
      this.input4=''
    },
    // async organizationCode(Code,organizationId){
    //   const {code,data} = await api.org.getInfoByCode(Code+'')
    //   if(code === 200){
    //     Bus.$emit('changeCom','info')
    //     this.$store.dispatch('setIsOrganization',true)
    //     this.$store.dispatch('setOtherOrgInfo',data)
    //     this.$store.dispatch('user/setOrganizationId',organizationId)
    //     const headerDom = document.getElementsByClassName('header')[0]
    //     headerDom.querySelectorAll('li.el-menu-item').forEach(item => item.classList.add('off-active'))
    //     headerDom.querySelectorAll('li.el-menu-item').forEach(item1 => item1.classList.remove('active'))
    //     Bus.$emit('changeActiveTab','info')
    //     Bus.$emit('pushToTab','info','机构详情')
    //     Bus.$emit('showSideBar','机构详情')
    //   }
    // },
    newInsert(){
      this.showDialog =!this.showDialog
      api.city.getCityList()
    },
    newSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.org.addSubmit(this.form).then(async(res)=>{
            if(res.code === 200){
              this.showDialog =!this.showDialog
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              const {rows}  = await api.org.reqOrgList()
              this.tableData = rows
              this.loading = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    newCancel(){
      this.showDialog =!this.showDialog
    },
    search(){

    },
    submit(){
      if(!this.result){
        this.$message({
          showClose: true,
          message: '请对审批结果进行操作',
          type: 'error'
        })
      }
      else if(this.result === '1' && !this.reson){
        this.$message({
          showClose: true,
          message: '驳回原因不能为空',
          type: 'error'
        })
      }else if(this.result === '2'){
        api.organizationReview.pass(this.OrgOrganizationVerifyVO).then(async res=>{
          if(res.code === 200) {
            this.$message({
              showClose: true,
              message: '审批成功',
              type: 'success'
            })
            this.showApproveDialog = false
            this.getDic()
            const {rows}  = await api.organizationReview.getReviewList()
            this.tableData = rows
            this.loading = false
          }
        })
      }else if (this.result === '1' && this.reson){
        const obj = {
          organizationId:this.organizationId,
          reason:this.reson,
          adminMailbox:this.OrgOrganizationVerifyVO.adminMailbox,
          organizationName:this.OrgOrganizationVerifyVO.organizationName
        }
        api.organizationReview.rejection(obj).then(async res=>{
          if(res.code === 200){
            this.showApproveDialog = false
            this.getDic()
            const {rows}  = await api.organizationReview.getReviewList()
            this.tableData = rows
            this.loading = false
            this.$message({
              showClose: true,
              message: '审批成功',
              type: 'success'
            })
          }
        })
      }

    },
    Approve(organizationId){
      this.showApproveDialog =!this.showApproveDialog
      this.title = '机构审核'
      this.organizationId = organizationId
      api.organizationReview.adminReview(organizationId).then(res=>{
        const {OrgOrganizationVerifyVO,cerInfoStr,registerInfoStr} = res
        this.OrgOrganizationVerifyVO = OrgOrganizationVerifyVO
        this.cerInfoStr = `data:image/jpeg;base64,${cerInfoStr}`
        this.registerInfoStr = `data:image/jpeg;base64,${registerInfoStr}`
      })
    },
    formatEmpty(row, column, cellValue){
      if(cellValue){
        return cellValue
      }else{
        return '- -'
      }

    },
    formatStatus(row){
      let status = ''
      this.statusOptions.forEach(item=>{
        if(row.organizationStatus === item.dictValue){
          status = item.dictLabel
        }
      })
      return status
    },
    sexMatter(sex){
      let status = ''
      this.userOptions.forEach(item=>{
        if(sex === item.dictValue){
          status = item.dictLabel
        }
      })
      return status
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index.styl'
  .container >>>
    display flex
    flex-direction column
    width 100%
    min-height 100%
    img
      /*cursor crosshair*/
      cursor url('../../../assets/img/fangdajing.png'), pointer
      margin 0 auto
    .search-box
      height 120px
      width 100%
      background #fff
      border 1px solid #eee
      margin-bottom 20px
      display flex
      padding 15px 35px
      box()
      font-size 14px
      align-content space-around
      flex-wrap wrap
      .el-input
        width 60%
        .el-input__inner
          height 35px
      .demo-input
        display flex
        align-items: center
    .table-box
      flex 1
      height 100%
      display flex
      flex-direction column
      background #fff
      .el-table__row
        cursor pointer
      .edit-box
        height 60px
        text-align left
        box()
        padding 15px
    .dialog-img
      .el-dialog__header
        background #fff!important
    .el-dialog
      .el-dialog__header
        background #409EFF
        text-align left
      .el-dialog__title
        color #fff
      .el-dialog__close
        color #fff
      .el-dialog__body
        box()
        padding 0 40px 20px
        width 100%
        h3
          margin-top 20px
          text-align left
        .detail
          width 100%
          display flex
          .left-col
            flex 4
            text-align right
          .right-col
            flex 6
            text-align left
          box()
          padding 0
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
          .el-form--inline
            width 120px!important
        .img-box
          width 60%
          height 220px
          overflow: hidden
          margin: 0 0 20px 40px
          border 1px solid #ccc
          line-height 360px
        p
          margin-top 10px
        .button-box
          text-align center
          margin-top 20px
        .el-textarea
          width 75%
          margin-left 50px
          .el-textarea__inner
            height 100px
</style>


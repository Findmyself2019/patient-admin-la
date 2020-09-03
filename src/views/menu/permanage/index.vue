<template>
  <div
    class="container"
    ref="container"
  >
    <div class="search-box">
      <div class="demo-input">
        姓名：
        <el-input
          placeholder="请输入姓名"
          v-model="searchForm.name"
        />
      </div>
      <div class="demo-input">
        学历层次：
        <el-select
          placeholder="请选择学历层次"
          v-model="searchForm.educationLevel"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="demo-input">
        个人资质：
        <el-select
          placeholder="请选择个人资质"
          v-model="searchForm.employeeQualification"
        >
          <el-option
            v-for="item in qualificationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="demo-input">
        机构名称：
        <treeselect
          v-model="searchForm.organizationId"
          :options="deptOptions"
          :disable-branch-nodes="false"
          :show-count="false"
          placeholder="请选择机构"
        />
      </div>
      <span style="margin-left: 40px">
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
          @click="reset"
          size="mini"
        >
          重置
        </el-button>
      </span>
    </div>
    <div class="table-box">
      <div class="edit-box">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="newInsert"
          v-is-counties="4"
        >
          新增
        </el-button>
        <el-button
          icon="el-icon-download"
          @click="handleImport"
          v-is-counties="4"
        >
          导入
        </el-button>
        <el-button
          icon="el-icon-upload2"
          @click="handleExport"
        >
          导出
        </el-button>
        <el-button icon="el-icon-plus" v-is-counties="4">
          批量编辑
        </el-button>
      </div>
      <table-template
        :table-data="tableData"
        :loading="loading"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="姓名"
          align="center"
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.name"
              @click="organizationCode(scope.row.identityDocumentNumber,'人员详情','perinfo')"
            >{{ scope.row.name }}</span>
            <span v-else>- -</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="employeeQualification"
          label="个人资质"
          align="center"
          show-overflow-tooltip
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.employeeQualification === '1'">一级心理咨询师</span>
            <span v-if="scope.row.employeeQualification === '2'">二级心理咨询师</span>
            <span v-if="scope.row.employeeQualification === '3'">三级心理咨询师</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="post"
          label="岗位"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="educationLevel"
          label="学历层次"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.educationLevel==='1'">中专</span>
            <span v-else-if="scope.row.educationLevel==='2'">大专</span>
            <span v-else-if="scope.row.educationLevel==='3'">本科</span>
            <span v-else>研究生</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号码"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="orgOrganizationBase.organizationName"
          label="机构名称"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="createtime"
          label="操作"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-is-counties="4"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="addCerModel(scope.row.id)"
              v-is-counties="4"
            >
              添加证照
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
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="身份证号码"
          prop="identityDocumentNumber"
        >
          <el-input v-model="form.identityDocumentNumber" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="telephone"
        >
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item
          label="年龄"
          prop="age"
        >
          <el-input v-model="form.age" />
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
        >
          <el-select v-model="form.gender">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="form.educationLevel">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学历性质">
          <el-select v-model="form.educationNatrue">
            <el-option
              v-for="item in natureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型编码">
          <el-select v-model="form.employeeTypeCode">
            <el-option
              v-for="item in typeOptions"
              :key="item.employeeTypeCode"
              :label="item.employeeTypeName"
              :value="item.employeeTypeCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人资质">
          <el-select v-model="form.employeeQualification">
            <el-option
              v-for="item in qualificationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="岗位"
          prop="post"
        >
          <el-input v-model="form.post" />
        </el-form-item>
        <el-form-item label="地址(市)">
          <el-select v-model="form.addressCity">
            <el-option
              v-for="item in addressCityList"
              :key="item.addressCityName"
              :label="item.addressCityName"
              :value="item.addressCityName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="	地址(县)">
          <el-select v-model="form.addressCounty">
            <el-option
              v-for="item in filterList"
              :key="item.addressCountyName"
              :label="item.addressCountyName"
              :value="item.addressCountyName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="form.addressDetail"
            placeholder="输入街道、门牌号等信息"
          />
        </el-form-item>

        <el-form-item style="width: 100%;text-align: center;">
          <el-button
            type="primary"
            @click="newSubmit('form')"
          >
            确 定
          </el-button>
          <el-button @click="newCancel">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    添加个人证照的模态框-->
    <div class="dialog-box">
      <el-dialog
        :title="addcerTitle"
        :visible.sync="showAddCerModel"
        width="880px"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addcerForm"
          label-width="160px"
          :inline="true"
          :rules="rule1"
          ref="addcerForm"
        >
          <el-form-item label="证照类型">
            <el-input
              v-model="certificateTypeName"
              :disabled="true"
            />
          </el-form-item>
          <el-input
            v-model="addcerForm.certificateTypeCode"
            v-if="false"
          />
          <el-form-item label="持证主体">
            <el-input
              v-model="addcerForm.certificateHolderName"
              :disabled="true"
            />
          </el-form-item>
          <el-input
            v-model="addcerForm.certificateHolderCode"
            v-if="false"
          />
          <el-form-item
            label="证照名称"
            prop="certificateName"
          >
            <el-input v-model="addcerForm.certificateName" />
          </el-form-item>
          <el-form-item
            label="证照编号"
            prop="certificateNumber"
          >
            <el-input v-model="addcerForm.certificateNumber" />
          </el-form-item>
          <el-form-item label="证照标识">
            <el-input v-model="addcerForm.certificateSign" />
          </el-form-item>
          <el-form-item label="证照颁发日期">
            <el-date-picker
              v-model="addcerForm.certificateIssuedDate"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-form-item label="证照颁发机构全称">
            <el-input v-model="addcerForm.certificateIssuingAuthorityName" />
          </el-form-item>
          <el-form-item label="证照颁发机构统一社会信用代码">
            <el-input v-model="addcerForm.certificateIssuingAuthorityCode" />
          </el-form-item>
          <el-form-item label="证照有效期起始日期">
            <el-date-picker
              v-model="addcerForm.certificateEffectiveDate"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="证照有效期截止日期">
            <el-date-picker
              v-model="addcerForm.certificateExpiringDate"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="上传的证照文件"
                prop="image"
              >
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  class="upload-demo"
                  :on-change="getFile"
                  :limit="3"
                  :auto-upload="false"
                >
                  <el-button
                    size="small"
                    type="primary"
                    class="file-btn"
                  >
                    点击上传
                  </el-button>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                  >
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="width: 100%;text-align: center;">
            <el-button
              type="primary"
              @click="addCer('addcerForm')"
            >
              确 定
            </el-button>
            <el-button @click="addCancel">
              取 消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      @pagination="getList"
    />
    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div
          class="el-upload__tip"
          slot="tip"
        >
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link
            type="info"
            style="font-size:12px"
            @click="importTemplate"
          >
            下载模板
          </el-link>
        </div>
        <div
          class="el-upload__tip"
          style="color:red"
          slot="tip"
        >
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitFileForm"
        >
          确 定
        </el-button>
        <el-button @click="upload.open = false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableTemplate from '@/components/table-template/index'
import api from '@/api/index'
import mixin from '@/util/mixins'
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import { getToken } from "@/util/user-token"
import BaseUrl from '@/api/config'
export default {
  name: "Permanage",
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      // 机构树选项
      deptOptions: [],
      options: [
        { label: '中专', value: '1' },
        { label: '大专', value: '2' },
        { label: '本科', value: '3' },
        { label: '研究生', value: '4' }
      ],
      natureOptions: [
        { label: '全日制', value: '1' },
        { label: '函授', value: '2' },
        { label: '成人教育', value: '3' },
      ],
      pageNum: 1,
      pageSize: 10,
      typeOptions: [],
      genderOptions: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      qualificationOptions: [
        { label: '一级心理咨询师', value: '1' },
        { label: '二级心理咨询师', value: '2' },
        { label: '三级心理咨询师', value: '3' },
      ],
      addressCityList: [],
      addressCountyList: [],
      filterList: [],
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        gender: '',
        educationLevel: '',
        telephone: '',
        employeeQualification: '',
        organizationId: null
      },
      showDialog: false,
      form: {
        organizationId: this.$store.state.user.organizationId,
        addressCity: ''
      },
      loading: true,
      total: 0,
      // 证照导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: BaseUrl + "/employee/info/importData"
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: "blur" }
        ],
        telephone: [
          { required: true, message: '手机号码不能为空', trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        identityDocumentNumber: [
          { required: true, message: '身份证号不能为空', trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请输入正确的身份证号码",
            trigger: "blur"
          }
        ]
      },
      //添加证照的验证
      rule1: {

        certificateName: [
          { required: true, message: '证照名称不能为空', trigger: "blur" }
        ],
        certificateNumber: [
          { required: true, message: '证照编码不能为空', trigger: "blur" },
        ]
      },
      title: '',
      addcerTitle: '添加证照',
      //添加证照的表单
      addcerForm: {},
      //控制添加证照的模态框
      showAddCerModel: false,
      certificateTypeName: '',
    }
  },
  activated() {
    this.getList()
    this.getTreeselect()
  },
  watch: {
    'form.addressCity'(val) {
      const arr = this.addressCityList.filter(item => {
        return item.addressCityName === val
      })
      const { addressCityCode } = arr[0]
      console.log(addressCityCode)
      const arr1 = this.addressCountyList.filter(item1 => {
        return item1.addressCityCode === addressCityCode
      })

      this.filterList = arr1
    }
  },
  components: {
    TableTemplate, Treeselect
  },
  methods: {
    async getList() {
      const { rows, total } = await api.person.getPersonList(this.searchForm)
      this.tableData = rows
      this.loading = false
      this.total = total
    },
    //机构树
    getTreeselect() {
      api.dept.treeselect().then(response => {
        this.deptOptions = response.data
      })
    },
    // 重置
    reset: function () {
      this.searchForm.name = ''
      this.searchForm.educationLevel = ''
      this.searchForm.employeeQualification = ''
      this.searchForm.organizationId = null
      this.search()
    },
    formatEmpty(row, column, cellValue) {
      if (cellValue) {
        return cellValue
      } else {
        return '- -'
      }

    },
    addCancel() {
      this.addcerForm = {}
      this.showAddCerModel = false

    },
    async newInsert() {
      this.showDialog = true
      this.title = '新增人员'
      //获取县市地址
      this.getCity()
      const { rows } = await api.person.getType()
      this.typeOptions = rows
    },
    async getCity() {
      const { addressCityList, addressCountyList } = await api.city.getCityList()
      this.addressCityList = addressCityList
      this.addressCountyList = addressCountyList
    },
    search() {
      this.searchForm.page = 1
      this.getList()
      this.getTreeselect()
    },
    newSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.person.addPerson(this.form).then((res) => {
            if (res.code === 200) {
              this.showDialog = !this.showDialog
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    newCancel() {
      this.showDialog = !this.showDialog
    },
    getFile(file) {
      this.fileUrl = file.raw
    },
    addCer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.certificate.isUploadCer(this.addcerForm.certificateHolderCode).then(res => {
            if (res.data > 0) {
              this.addcerForm = {}
              this.$message({
                showClose: true,
                message: '该证照已上传过,请勿重复上传',
                type: 'danger'
              })
              this.showAddCerModel = false
            } else {
              var formData = new FormData()
              formData.append('certificateName', this.addcerForm.certificateName)
              formData.append('certificateNumber', this.addcerForm.certificateNumber)
              formData.append('certificateSign', this.addcerForm.certificateSign)
              formData.append('certificateIssuingAuthorityName', this.addcerForm.certificateIssuingAuthorityName)
              formData.append('certificateIssuingAuthorityCode', this.addcerForm.certificateIssuingAuthorityCode)
              formData.append('certificateTypeCode', this.addcerForm.certificateTypeCode)
              formData.append('certificateIssuedDate', this.addcerForm.certificateIssuedDate)
              formData.append('certificateHolderCode', this.addcerForm.certificateHolderCode)
              formData.append('certificateEffectiveDate', this.addcerForm.certificateEffectiveDate)
              formData.append('certificateExpiringDate', this.addcerForm.certificateExpiringDate)
              formData.append('multipartFile', this.fileUrl)
              formData.append('certificateHolderName', this.addcerForm.certificateHolderName)
              api.certificate.addCertificate(formData).then((res) => {
                if (res.code === 200) {
                  this.showAddCerModel = false
                  this.addcerForm = {}
                  this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                  })
                  this.getList()
                }
              })
            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //  显示添加个人证照的模态框
    addCerModel(id) {
      api.person.getPersonById(id).then((res) => {
        this.showAddCerModel = true
        console.log(res)
        if (res.code === 200) {
          this.certificateTypeName = res.key
          this.addcerForm.certificateHolderName = res.empEmployeeInfo.name
          this.addcerForm.certificateHolderCode = res.empEmployeeInfo.identityDocumentNumber
          this.addcerForm.certificateTypeCode = "11100000717823004M004"
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有从业人员数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return api.person.exportEmp(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "证照导入"
      this.upload.open = true
    },
    /** 下载模板操作 */
    importTemplate() {
      api.person.importTemplate().then(res => {
        this.download(res.msg)
      })
    },
    // 文件上传中处理
    handleFileUploadProgress() {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/stylus/index.styl';

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;

  .search-box>>> {
    height: 120px;
    width: 100%;
    background: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;
    display: flex;
    padding: 15px 35px;
    box();
    font-size: 14px;
    align-content: space-around;
    flex-wrap: wrap;

    .vue-treeselect {
      width: 150px;
    }

    .el-input {
      width: 60%;

      .el-input__inner {
        height: 35px;
      }
    }

    .demo-input {
      display: flex;
      align-items: center;
    }
  }

  .table-box>>> {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;

    .el-table__row {
      cursor: pointer;
    }

    tr {
      td:nth-child(2) {
        cursor: pointer;

        &:hover {
          color: #0098ff;
          text-decoration: underline;
        }
      }
    }

    .edit-box {
      height: 60px;
      text-align: left;
      box();
      padding: 15px;
    }
  }
}
</style>

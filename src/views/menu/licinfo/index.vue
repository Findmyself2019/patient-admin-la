<template>
  <div class="container">
    <div class="search-box">
      <div class="demo-input">
        证照名称：
        <el-input
          placeholder="请输入证照名称"
          v-model="searchForm.certificateName"
        />
      </div>
      <div class="demo-input">
        持证主体：
        <el-input
          placeholder="请输入持证主体信息"
          v-model="searchForm.certificateHolderName"
        />
      </div>
      <div class="demo-input">
        证照有效期起始日期：
        <el-date-picker
          v-model="searchForm.certificateEffectiveDate"
          type="date"
          placeholder="请选择证照有效起始日期"
        />
      </div>
      <div class="demo-input">
        证照有效期截止日期：
        <el-date-picker
          v-model="searchForm.certificateExpiringDate"
          type="date"
          placeholder="请选择证照有效期截止日期"
        />
      </div>
      <span>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="resetQuery"
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
        <el-button icon="el-icon-upload2"
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
          label="证照名称"
          width="200"
          prop="certificateName"
          align="center"
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span @click="organizationCode(scope.row.id,'证照详情','licdetail')">{{ scope.row.certificateName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="certificateNumber"
          label="证照编号"
          width="160"
          align="center"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateSign"
          label="证照标识"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateHolderName"
          label="持证主体"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateTypeCode"
          label="证照类型名称"
          show-overflow-tooltip
          align="center"
          :formatter="cerMatter"
        />
        <el-table-column
          prop="certificateIssuingAuthorityName"
          label="	证照颁发机构全称"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          label="证照颁发机构统一社会信用代码"
          width="120"
          align="center"
          prop="certificateIssuingAuthorityCode"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateIssuedDate"
          label="证照颁发日期"
          width="120"
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateHolderName"
          label="持证主体"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateEffectiveDate"
          label="证照有效期起始日期"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="certificateExpiringDate"
          label="证照有效期截止日期"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="createtime"
          label="操作"
          width="150px"
        >
          <template>
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
              v-is-counties="4"
            >
              移除
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
      <pagination
        :background="true"
        v-show="total>0"
        :total="total"
        :page.sync="searchForm.pageNum"
        :limit.sync="searchForm.pageSize"
        @pagination="getList"
      />
      <div class="dialog-box">
        <el-dialog
          :title="title"
          :visible.sync="showDialog"
          width="880px"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
        >
          <el-form
            :model="form"
            label-width="160px"
            :inline="true"
            :rules="rules"
            ref="form"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="证照类型"
                  prop="certificateTypeCode"
                >
                  <el-select v-model="form.certificateTypeCode">
                    <el-option
                      v-for="item in typeOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
                    v-if="holderOptions.length>0"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              label="证照名称"
              prop="certificateName"
            >
              <el-input v-model="form.certificateName" />
            </el-form-item>
            <el-form-item
              label="证照编号"
              prop="certificateNumber"
            >
              <el-input
                v-model="form.certificateNumber"
                prop="certificateNumber"
              />
            </el-form-item>
            <el-form-item label="证照标识">
              <el-input v-model="form.certificateSign" />
            </el-form-item>
            <el-form-item label="证照颁发日期">
              <el-date-picker
                v-model="form.certificateIssuedDate"
                type="date"
                placeholder="请选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证照颁发机构全称">
                  <el-input v-model="form.certificateIssuingAuthorityName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证照颁发机构统一社会信用代码">
                  <el-input v-model="form.certificateIssuingAuthorityCode" />
                </el-form-item>
              </el-col>
            </el-row>

            <!--<el-form-item label="持证主体代码类型">-->
            <!--<el-input v-model="form.certificateHolderTypeName" />-->
            <!--</el-form-item>-->
            <el-form-item label="证照有效期起始日期">
              <el-date-picker
                v-model="form.certificateEffectiveDate"
                type="date"
                placeholder="请选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="证照有效期截止日期">
              <el-date-picker
                v-model="form.certificateExpiringDate"
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
                    :before-upload="success"
                    :on-change="getFile"
                    multiple
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
      </div>
    </div>

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
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import { getToken } from "@/util/user-token"
import api from "@/api"
import BaseUrl from '@/api/config'
// import Bus from '@/util/eventbus'
import mixin from '@/util/mixins'
export default {
  name: "LicInfo",
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      title: '',
      total: 0,
      typeOptions: [],
      holderOptions: [],
      searchForm: {
        certificateName: '',
        certificateNumber: '',
        certificateSign: '',
        certificateIssuingAuthorityName: '',
        certificateIssuingAuthorityCode: '',
        certificateIssuedDate: '',
        certificateHolderName: '',
        certificateEffectiveDate: '',
        certificateExpiringDate: '',
        pageNum: 1,
        pageSize: 10,
      },
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
        url: BaseUrl + "/certificate/info/importData"
      },
      rules: {
        certificateTypeCode: [
          { required: true, message: '证照类型不能为空', trigger: "blur" }
        ],
        certificateName: [
          { required: true, message: '证照名称不能为空', trigger: "blur" }
        ],
        certificateNumber: [
          { required: true, message: '证照编码不能为空', trigger: "blur" },
        ],
        certificateHolderCode: [
          { required: true, message: '持证主体不能为空', trigger: "blur" },
        ]
      },
      showDialog: false,
      natureOptions: [],
      form: {
        certificateNumber: '',
        certificateSign: '',
        certificateIssuingAuthorityName: '',
        certificateIssuingAuthorityCode: '',
        certificateTypeCode: '',
        certificateIssuedDate: '',
        certificateHolderName: '',
        certificateHolderCode: null,
        certificateHolderTypeName: '',
        certificateHolderTypeCode: '',
        certificateEffectiveDate: '',
        certificateExpiringDate: ''
      },
      loading: true,
      personData: [],
      labelName: '机构名称',
      fileUrl: '',
      treeLabel: ''
    }
  },
  created() {
    this.getList()
    this.getDic()
  },
  watch: {
    'form.certificateTypeCode'(val) {
      const arr = this.typeOptions.filter(item => {
        return item.dictValue === val
      })
      if (arr[0].dictLabel === '营业执照') {
        this.labelName = '机构名称'
      } else {
        this.labelName = '人员名称'
      }
    },
    labelName() {
      this.treeLabel = ''
      this.$nextTick(() => {
        document.getElementsByClassName('vue-treeselect__single-value')[0].innerHTML = ''
      })
    }
  },
  components: {
    TableTemplate,
    Treeselect
  },
  methods: {
    async getList() {
      const { rows, total } = await api.certificate.getInfoList(this.searchForm)
      this.tableData = rows
      this.loading = false
      this.total = total
    },
    //搜索
    resetQuery() {
      this.searchForm.page = 1
      this.getList()
    },
    // 重置
    reset: function () {
      this.searchForm.certificateName = ''
      this.searchForm.certificateHolderName = ''
      this.searchForm.certificateEffectiveDate = ''
      this.searchForm.certificateExpiringDate = ''
      this.resetQuery()
    },
    getDic() {
      api.dicData.getDicts('certificate_type').then(response => {
        this.natureOptions = response.data
      })
    },
    formatEmpty(row, column, cellValue) {
      if (cellValue) {
        return cellValue
      } else {
        return '- -'
      }

    },
    cerMatter(row) {
      let status = ''
      this.natureOptions.forEach(item => {
        if (row.certificateTypeCode === item.dictValue) {
          status = item.dictLabel
        }
      })
      return status
    },
    select(node) {
      this.treeLabel = node.label
    },
    change(data) {
      this.treeLabel = data.name
      this.form.certificateHolderCode = data.identityDocumentNumber
    },
    getFile(file) {
      this.fileUrl = file.raw
    },

    success() {

    },
    async getType() {
      const { data } = await api.dictData.getDicts('certificate_type')
      this.typeOptions = data
    },
    async getInfoByOrgId() {
      const { data } = await api.certificate.getInfoByOrgId()
      this.personData = data
    },
    async treeSelect() {
      const { data } = await api.dept.treeselect()
      const data1 = [...data]
      data1.map(item => {
        item.id = item['organizationCode']
      })
      this.holderOptions = data1
    },
    async newInsert() {
      this.showDialog = true
      this.getType()
      this.getInfoByOrgId()
      this.treeSelect()
      // const {rows} = await api.certificate.getInfoList(this.searchForm)
      // this.tableData = rows
      // this.loading = false
    },
    newSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.certificate.isUploadCer(this.form.certificateHolderCode).then(res => {
            if (res.data > 0) {
              this.$message({
                showClose: true,
                message: '该主体已上传证照,请勿重复上传',
                type: 'danger'
              })
            } else {
              var formData = new FormData()
              formData.append('certificateName', this.form.certificateName)
              formData.append('certificateNumber', this.form.certificateNumber)
              formData.append('certificateSign', this.form.certificateSign)
              formData.append('certificateIssuingAuthorityName', this.form.certificateIssuingAuthorityName)
              formData.append('certificateIssuingAuthorityCode', this.form.certificateIssuingAuthorityCode)
              formData.append('certificateTypeCode', this.form.certificateTypeCode)
              formData.append('certificateIssuedDate', this.form.certificateIssuedDate)
              formData.append('certificateHolderName', this.treeLabel)
              formData.append('certificateHolderCode', this.form.certificateHolderCode)
              formData.append('certificateHolderTypeName', this.form.certificateHolderTypeName)
              formData.append('certificateHolderTypeCode', this.form.certificateHolderTypeCode)
              formData.append('certificateEffectiveDate', this.form.certificateEffectiveDate)
              formData.append('certificateExpiringDate', this.form.certificateExpiringDate)
              formData.append('multipartFile', this.fileUrl)
              api.certificate.addCertificate(formData).then((res) => {
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
      document.getElementsByClassName('v-modal')[0].style.display = 'none'
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有证照数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return api.certificate.exportCer(queryParams)
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
      api.certificate.importTemplate().then(res => {
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
    height: 150px;
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

  .dialog-box>>> {
    .el-form-item__content {
      width: 250px !important;
    }
  }
}
</style>

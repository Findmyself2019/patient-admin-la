<template>
  <div class="container" ref="container">
    <div class="search-box">
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
      <div class="demo-input">
        机构类型：
        <el-input
          placeholder="请选择机构类型"
          v-model="searchForm.organizationTypeName"
        />
      </div>
      <div class="demo-input">
        机构状态：
        <el-select v-model="searchForm.organizationStatus">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <div class="edit-box">
        <el-button type="primary" icon="el-icon-plus" @click="newInsert">
          新增
        </el-button>
        <el-button icon="el-icon-download" @click="handleImport">
          导入
        </el-button>
        <el-button icon="el-icon-upload2" @click="handleExport">
          导出
        </el-button>
        <el-button icon="el-icon-plus">
          批量编辑
        </el-button>
      </div>
      <table-template :table-data="tableData" :loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column
          label="机构名称"
          width="200"
          prop="organizationName"
          align="center"
          :formatter="formatEmpty"
        >
          <template slot-scope="scope">
            <span
              @click="
                organizationCode(
                  scope.row.organizationCode,
                  scope.row.organizationId
                )
              "
              >{{ scope.row.organizationName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationCode"
          label="机构统一社会信用代码"
          width="160"
          align="center"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="organizationTypeName"
          label="机构类型"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column label="机构状态" width="120" align="center">
          <template slot-scope="scope">
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '1'
              "
            >
              已审核
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '0'
              "
            >
              未审核
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '2'
              "
            >
              未激活
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '3'
              "
            >
              驳回
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '4'
              "
            >
              正常
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '6'
              "
            >
              锁定
            </span>
            <span
              type="text"
              size="small"
              v-if="
                scope.row.organizationStatus &&
                  scope.row.organizationStatus.code === '6'
              "
            >
              停用
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="publicPrivateNatureCode"
          label="经济类型"
          width="120"
          align="center"
          :formatter="formatEconomic"
        />
        <el-table-column
          prop="parentDivisionName"
          label="所属区域"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="addressInfo"
          label="详细地址"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="linkman"
          label="机构联系人"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="linktel"
          label="机构联系电话"
          show-overflow-tooltip
          align="center"
          :formatter="formatEmpty"
        />
        <el-table-column
          prop="createtime"
          label="创建时间"
          show-overflow-tooltip
          :formatter="formatEmpty"
        />
        <el-table-column prop="createtime" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-is-active="[scope.row.organizationId]"
            >
              编辑
            </el-button>
            <el-button type="text" size="small">
              移除
            </el-button>
            <el-button type="text" size="small">
              更多
            </el-button>
          </template>
        </el-table-column>
      </table-template>
    </div>
    <div class="dialog-box">
      <el-dialog
        :title="title"
        :visible.sync="showDialog"
        width="850px"
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
          <el-form-item label="机构名称" prop="organizationName">
            <el-input v-model="form.organizationName" />
          </el-form-item>
          <el-form-item label="社会统一信用代码" prop="organizationCode">
            <el-input v-model="form.organizationCode" />
          </el-form-item>
          <div
            style="color:#fa892d;font-weight: inherit;margin: -15px 0 5px 180px;font-size: 13px; text-align: right;padding-right: 35px;"
          >
            注：统一社会信用代码查询网址：<a
              href="https://www.cods.org.cn/"
              target="_blank"
              >https://www.cods.org.cn/</a
            >
          </div>
          <el-form-item label="行政区划代码" prop="cityCode">
            <el-cascader
              v-model="form.cityCode"
              :options="cityOptions"
              placeholder="请选择行政区划"
              v-if="$store.state.user.cityCode !== 4"
            />
            <el-input
              v-model="form.cityCode"
              :disabled="true"
              v-if="$store.state.user.cityCode === 4"
            />
          </el-form-item>
          <el-form-item label="机构状态" prop="organizationStatus">
            <el-select v-model="form.organizationStatus">
              <el-option
                v-for="item in insertOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <el-input v-model="form.organizationStatus" /> -->
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构类别代码">
                <treeselect
                  v-model="form.organizationTypeCode"
                  :options="holderOptions"
                  :disable-branch-nodes="false"
                  :show-count="true"
                  placeholder="请选择机构类别代码"
                  @select="select"
                  value="lll"
                  :normalizer="normalizer"
                >
                  <div slot="value-label" slot-scope="{ node }">
                    {{ node.label }}
                  </div>
                </treeselect>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构别名">
                <el-input v-model="form.organizationSecondName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="机构经济类型">
            <el-select
              v-model="form.publicPrivateNatureCode"
              placeholder="请选择机构经济类型"
            >
              <el-option
                v-for="item in economicOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
    </div>
    <pagination
      v-show="total > 0"
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
        <div class="el-upload__tip" slot="tip">
          <el-checkbox
            v-model="upload.updateSupport"
          />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">
            下载模板
          </el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">
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
import api from "@/api/index";
import TableTemplate from "@/components/table-template/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Bus from "@/util/eventbus";
import mixin from "@/util/mixins";
import { getToken } from "@/util/user-token";
import BaseUrl from "@/api/config";
// import item from "@/components/navigation-item/item"
export default {
  name: "Manage",
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      valueConsistsOf: "LEAF_PRIORITY",
      total: 0,
      showDialog: false,
      // 机构树选项
      deptOptions: [],
      cityOptions: [],
      form: {
        cityCode: []
      },
      insertOptions: [
        { label: "已审核", value: "1" },
        { label: "未激活", value: "2" },
        { label: "正常", value: "4" },
        { label: "锁定", value: "5" },
        { label: "停用", value: "6" }
      ],
      holderOptions: [],
      addressCityList: [],
      addressCountyList: [],
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        organizationStatus: "",
        organizationTypeCode: "",
        organizationName: "",
        organizationTypeName: "",
        organizationId: null
      },
      title: "新增机构",
      loading: false,
      options: [
        { label: "未审核", value: "UNREVIEWED" },
        { label: "已审核", value: "REVIEWED" },
        { label: "未激活", value: "UNACTIVATED" },
        { label: "驳回", value: "REJECTED" },
        { label: "正常", value: "NORMAL" },
        { label: "锁定", value: "LOCKED" },
        { label: "停用", value: "DISABLE" }
      ],

      //添加表单中机构经济类型
      economicOptions: [
        {
          value: "1",
          label: "公立"
        },
        {
          value: "2",
          label: "私营"
        }
      ],
      //table中的机构经济类型
      economicOption: [],
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
        url: BaseUrl + "/organization/manage/importData"
      },

      // 表单校验
      rules: {
        organizationName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        organizationCode: [
          {
            required: true,
            message: "社会统一信用代码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g,
            message: "请输入正确的格式",
            trigger: "blur"
          }
        ],
        cityCode: [
          { required: true, message: "行政区划代码不能为空", trigger: "blur" }
        ],
        organizationStatus: [
          { required: true, message: "机构状态不能为空", trigger: "blur" }
        ]
      }
    };
  },
  // activated() {
  //   this.getList()
  // },
  components: {
    TableTemplate,
    Treeselect
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.getDicts("organization_economic_type").then(response => {
      this.economicOption = response.data;
    });
  },

  methods: {
    async getList() {
      const { rows, total } = await api.org.reqOrgList(this.searchForm);
      this.tableData = rows;
      this.loading = false;
      this.total = total;
    },
    search() {
      this.searchForm.page = 1;
      this.getList();
    },
    //机构树
    getTreeselect() {
      api.dept.treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    //重置
    reset: function() {
      this.searchForm.organizationId = null;
      this.searchForm.organizationTypeName = "";
      this.searchForm.organizationStatus = "";
      this.search();
    },
    async organizationCode(Code, organizationId) {
      this.addLoading();
      const { code, data } = await api.org.getInfoByCode(Code + "");
      if (code === 200) {
        this.loadingPage.close();
        Bus.$emit("changeCom", "info");
        this.$store.dispatch("setIsOrganization", true);
        this.$store.dispatch("setOtherOrgInfo", data);
        this.$store.dispatch("user/setOrganizationId", organizationId);
        const headerDom = document.getElementsByClassName("header")[0];
        headerDom
          .querySelectorAll("li.el-menu-item")
          .forEach(item => item.classList.add("off-active"));
        headerDom
          .querySelectorAll("li.el-menu-item")
          .forEach(item1 => item1.classList.remove("active"));
        Bus.$emit("changeActiveTab", "info");
        Bus.$emit("pushToTab", "info", "机构详情");
        Bus.$emit("showSideBar", "机构详情");
      }
    },
    async newInsert() {
      this.showDialog = !this.showDialog;
      Promise.race([this.getTypeCodeList(), this.getCityList()]).then(() => {
        this.form.cityCode = this.$store.state.user.addressCountyName;
      });
    },
    newSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$store.state.user.cityCode === 4) {
            this.form.administrativeDivisionCode = this.$store.state.user.administrativeDivisionCode;
          } else {
            this.form.administrativeDivisionCode = this.form.cityCode[1];
          }
          api.org.addSubmit(this.form).then(async res => {
            if (res.code === 200) {
              this.showDialog = !this.showDialog;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              const { rows } = await api.org.reqOrgList();
              this.tableData = rows;
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getTypeCodeList() {
      const { data } = await api.org.getTypeList();
      const arr = this.handleTree(
        data,
        "organizationTypeCode",
        "organizationBigTypeCode",
        "",
        "0"
      );
      this.holderOptions = arr;
    },
    normalizer(node) {
      //Vue-treeSelect 自定义标签
      return {
        id: node.organizationTypeCode, // 键名转换，方法默认是label和children进行树状渲染
        label: node.organizationTypeName
      };
    },
    newCancel() {
      this.showDialog = !this.showDialog;
    },
    async getCityList() {
      const {
        addressCityList,
        addressCountyList
      } = await api.city.getCityList();
      const newCountryList = [];
      addressCountyList.forEach(item => {
        const obj = {};
        obj.label = item.addressCountyName;
        obj.value = item.addressCountyCode;
        obj.parentId = item.addressCityCode;
        newCountryList.push(obj);
      });
      const newCityList = [];
      addressCityList.forEach(item => {
        const obj = {};
        obj.label = item.addressCityName;
        obj.value = item.addressCityCode;
        obj.id = item.addressCityCode;
        newCityList.push(obj);
      });
      newCityList.forEach(item => {
        const childArr = newCountryList.filter(child => {
          return child.parentId === item.id;
        });
        childArr.length > 0 ? (item.children = childArr) : "";
      });
      this.cityOptions = newCityList;
    },
    select() {},
    formatEmpty(row, column, cellValue) {
      if (cellValue) {
        return cellValue;
      } else {
        return "- -";
      }
    },
    formatEconomic(row) {
      return this.selectDictLabel(
        this.economicOption,
        row.publicPrivateNatureCode
      );
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有机构数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return api.dept.exportOrg(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "证照导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      api.dept.importTemplate().then(res => {
        this.download(res.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress() {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
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
      width: 200px;
      margin-right: 40px;
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

  .dialog-box>>> {
    .el-form-item__content {
      width: 220px !important;
    }
  }
}
</style>

<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item label="部门名称">
        <el-input
          v-model="queryParams.organizationName"
          placeholder="请输入部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="queryParams.organizationStatus"
          placeholder="部门状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="deptList"
      row-key="organizationId"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="organizationName"
        label="机构名称"
        width="300"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:organization:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:organization:add']"
          >
            新增
          </el-button>
          <el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:organization:remove']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import api from '@/api/index'
export default {
  name:'Dept',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      total:0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        organizationName: undefined,
        organizationStatus: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "上级部门不能为空", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts("organization_status").then(response => {
      this.statusOptions = response.data
    })
  },
  methods:{
    /** 查询部门列表 */
    getList() {
      this.loading = true
      api.dept.listDept(this.queryParams).then(response => {
        this.deptList = this.handleTree(response.data, "organizationId",'parentOrganizationId')
        this.loading = false
        // this.total = response.total
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    // 字典状态字典翻译
    statusFormat(row) {
      return this.selectDictLabel(this.statusOptions, row.organizationStatus)
    },
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index.styl'
  .container>>>
    background #fff
    width 100%
    min-height 100%
    box()
    padding 20px
    .el-form
      text-align left
</style>

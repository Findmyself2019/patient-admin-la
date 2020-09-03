<template>
  <div class="container">
    <el-form :inline="true">
      <el-form-item label="菜单名称">
        <el-input
          v-model="queryParams.menuName"
          placeholder="请输入菜单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="queryParams.status"
          placeholder="菜单状态"
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
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:menu:add']"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="menuList"
      row-key="menuId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="menuName"
        label="菜单名称"
        :show-overflow-tooltip="true"
        width="160"
      />
      <el-table-column
        prop="icon"
        label="图标"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <i :icon-class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="60"
      />
      <el-table-column
        prop="perms"
        label="权限标识"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="component"
        label="组件路径"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="80"
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
            v-hasPermi="['system:menu:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
          >
            新增
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/index"
// import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
// import IconSelect from "@/components/icon-select"
export default {
  name: "Menu",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts("sys_show_hide").then(response => {
      this.visibleOptions = response.data
    })
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data
    })
  },
  components:{
    // Treeselect,
    // IconSelect
  },
  methods:{
    /** 查询菜单列表 */
    getList() {
      this.loading = true
      api.menu.listMenu(this.queryParams).then(response => {
        this.menuList = this.handleTree(response.data, "menuId")
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    handleAdd(){

    },
    // 菜单状态字典翻译
    statusFormat(row) {
      if (row.menuType == "F") {
        return ""
      }
      return this.selectDictLabel(this.statusOptions, row.status)
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index.styl'
  .container>>>
    display flex
    flex-direction column
    width 100%
    min-height 100%
    background #ffffff
    box()
    padding 20px
    .el-form
      text-align left
    .el-table
      overflow auto
</style>

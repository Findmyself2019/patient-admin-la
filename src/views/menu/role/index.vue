<template>
  <div class="role-box">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
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
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number
            v-model="form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >
              {{ dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button @click="cancel">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:role:remove']"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >
          导出
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="openDataScope"
      width="500px"
      append-to-body
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="form.roleKey" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="form.dataScope">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限" v-show="form.dataScope == 2">
          <el-tree
            :data="deptOptions"
            show-checkbox
            default-expand-all
            ref="dept"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">
          确 定
        </el-button>
        <el-button @click="cancelDataScope">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <table-template :table-data="roleList">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="角色编号"
        prop="roleId"
        width="120"
      />
      <el-table-column
        prop="roleName"
        label="角色名称"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column
        prop="roleKey"
        label="权限字符"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column
        prop="roleSort"
        label="显示顺序"
        width="120"
      />
      <el-table-column
        label="状态"
        width="120"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        width="180"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
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
            v-hasPermi="['system:role:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
            v-hasPermi="['system:role:edit']"
          >
            数据权限
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </table-template>
  </div>
</template>

<script>
import TableTemplate from '@/components/table-template/index'
import api from '@/api/index'
export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    }
  },
  components:{
    TableTemplate
  },
  created(){
    this.getList()
    //状态信息
    api.dicData.getDicts("sys_normal_disable").then(response=>{
      this.statusOptions = response.data
    })
  },
  methods:{
    handleQuery(){
      this.loading = true
      let search = this.queryParams
      search.beginTime = ""
      search.endTime = ""
      if (this.dateRange) {
        search.beginTime = this.dateRange[0]
        search.endTime = this.dateRange[1]
      }
      api.user.roleList(search).then(
        response => {
          this.roleList = response.rows
          this.total = response.total
          this.loading = false
        }
      )
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      api.menu.treeselect().then(response => {
        this.menuOptions = response.data
      })
    },
    getList(){
      //角色列表
      api.user.roleList(this.queryParams).then((response)=>{
        this.roleList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    resetQuery(){

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return api.role.delRole(roleIds)
      }).then(() => {
        this.getList()
        this.msgSuccess("删除成功")
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有角色数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return api.role.exportRole(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const roleId = row.roleId || this.ids
      const roleMenu = this.getRoleMenuTreeselect(roleId)
      api.role.getRole(roleId).then(response => {
        this.form = response.data
        this.open = true
        this.$nextTick(() => {
          roleMenu.then(res => {
            this.$refs.menu.setCheckedKeys(res.checkedKeys)
          })
        })
        this.title = "修改角色"
      })
    },
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.roleId != undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys()
        const formData ={
          roleId:this.form.roleId,
          roleName:this.form.roleName,
          organizationIds:this.form.deptIds,
          dataScope:this.form.dataScope
        }
        api.role.submitDataScope(formData).then(response => {
          if (response.code === 200) {
            this.openDataScope = false
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.getList()
          }
        })
      }
    },
    //新增
    handleAdd(){
      this.open = true
      this.getMenuTreeselect()
      this.title = '新增角色'
    },
    //新增提交
    submitForm(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys()
            api.role.updateRole(this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.open = false
                this.getList()
              }
            })
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys()
            api.role.addRole(this.form).then(response => {
              if (response.code === 200) {
                this.message.success("新增成功")
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    cancel(){
      this.open = false
    },
    //更改状态
    handleStatusChange(row){
      let text = row.status === "0" ? "启用" : "停用"
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return api.role.changeRoleStatus(row.roleId, row.status)
      }).then(() => {
        // this.$message(text + "成功")
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0"
      })
    },
    //数据权限
    async handleDataScope(row){
      this.reset()
      const data = await api.role.dataScope(row.roleId)
      this.form.roleName = row.roleName
      this.form.roleKey = row.roleKey
      this.form.dataScope = row.dataScope
      this.form.roleId = row.roleId
      this.$nextTick(() => {
        this.$refs.dept.setCheckedKeys(data.checkedKeys)
      })
      this.openDataScope = true
      this.title = "分配数据权限"
      this.deptOptions = data.orgs
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false
      this.reset()
    },
    /** 查询部门树结构 */
    getDeptTreeselect() {
      api.dept.treeselect().then(response => {
        this.deptOptions = response.data
      })
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys()
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getHalfCheckedKeys()
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      return api.menu.roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus
        return response
      })
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      return api.dept.roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.depts
        return response
      })
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([])
      }
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: undefined,
        dataScope:''
      }
      this.resetForm("form")
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/stylus/index.styl'
  .role-box
    box()
    width 100%
    height 100%
    background #fff
    text-align left
    padding 10px 20px
</style>

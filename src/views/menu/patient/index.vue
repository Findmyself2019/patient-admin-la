<template>
  <div class="container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['system:user:import']"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <table-template
      :table-data="menuList"
      :loading="loading"
      @editSingle="editSingle"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        prop="patientName"
        label="患者姓名"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="idNumber"
        label="身份证号"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="sexFormat"
      ></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="职业编码" align="center" prop="occupationCode">
      </el-table-column>
      <el-table-column
        label="出生地址(市)"
        align="center"
        prop="birthAddressCityCode"
      >
      </el-table-column>
      <el-table-column
        label="出生地址(县)"
        align="center"
        prop="birthAddressCountyCode"
      >
      </el-table-column>
      <el-table-column
        label="详细地址"
        align="center"
        prop="birthAddressDetail"
      >
      </el-table-column>
      <el-table-column
        label="文化程度"
        align="center"
        prop="educationLevel"
        :formatter="educationFormat"
      >
      </el-table-column>
      <el-table-column label="名族" align="center" prop="nation">
      </el-table-column>
      <el-table-column
        label="婚姻状况"
        align="center"
        prop="maritalStatus"
        :formatter="maritalFormat"
      />
      <el-table-column
        label="宗教信仰"
        align="center"
        prop="religiousBeliefCode"
      />
      <el-table-column
        label="健康状况"
        align="center"
        prop="health"
        :formatter="healthFormat"
      />
      <el-table-column label="月收入" align="center" prop="income" />
      <el-table-column
        label="紧急联系人"
        align="center"
        prop="emergencyContactName"
      />
      <el-table-column
        label="紧急联系人电话"
        align="center"
        prop="emergencyContactPhone"
      />
      <el-table-column label="单位" align="center" prop="company" />
      <el-table-column
        label="医生姓名"
        align="center"
        prop="consultDoctorName"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:menu:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </table-template>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="850px"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名" prop="patientName">
              <el-input
                v-model="form.patientName"
                placeholder="请输入患者姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="form.sex"
                placeholder="请选择性别"
                clearable
                size="small"
              >
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                placeholder="请输入年龄"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康状况" prop="health">
              <el-select v-model="form.health" placeholder="请选择健康状况">
                <el-option
                  v-for="dict in healthOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急联系人">
              <el-input
                v-model="form.emergencyContactName"
                placeholder="请输入紧急联系人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急联系人电话">
              <el-input
                v-model="form.emergencyContactPhone"
                placeholder="请输入紧急联系人电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出生地址(市):" prop="birthAddressCityCode">
              <el-select
                v-model="form.birthAddressCityCode"
                placeholder="请选择行政区划"
              >
                <el-option
                  v-for="item in addressCityList"
                  :key="item.addressCityName"
                  :label="item.addressCityName"
                  :value="item.addressCityCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="县(区):" prop="cityCode">
              <el-select
                v-model="form.birthAddressCountyCode"
                placeholder="请选择县(区)"
              >
                <el-option
                  v-for="item in filterList"
                  :key="item.addressCountyName"
                  :label="item.addressCountyName"
                  :value="item.addressCountyCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="现住地址(市):" prop="currentAddressCityCode">
              <el-select
                v-model="form.currentAddressCityCode"
                placeholder="请选择现住地址"
              >
                <el-option
                  v-for="item in addressCityList"
                  :key="item.addressCityName"
                  :label="item.addressCityName"
                  :value="item.addressCityCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="现住地址县(区):"
              prop="currentAddressCountyCode"
            >
              <el-select
                v-model="form.currentAddressCountyCode"
                placeholder="请选择县(区)"
              >
                <el-option
                  v-for="item in currentFilterList"
                  :key="item.addressCountyName"
                  :label="item.addressCountyName"
                  :value="item.addressCountyCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文化程度">
              <el-select
                v-model="form.educationLevel"
                placeholder="请选择文化程度"
              >
                <el-option
                  v-for="dict in educationOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚姻状况">
              <el-select
                v-model="form.maritalStatus"
                multiple
                placeholder="请选择婚姻状况"
              >
                <el-option
                  v-for="dict in maritalOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文化程度">
              <el-input v-model="form.nation" placeholder="请选择民族" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宗教信仰">
              <el-select
                v-model="form.religiousBeliefCode"
                placeholder="请选择宗教信仰"
              >
                <el-option
                  v-for="dict in religionLisOptions"
                  :key="dict.religionCode"
                  :label="dict.religionName"
                  :value="dict.religionCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="月收入">
              <el-input
                v-model="form.income"
                placeholder="请输入月收入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称">
              <el-input
                v-model="form.company"
                placeholder="请输入单位名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align:center!important"
      >
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/index";
import TableTemplate from "@/components/table-template/index";
import mixin from "@/util/mixins";
export default {
  name: "Patient",
  mixins: [mixin],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      sexOptions: [],
      educationOptions: [],
      maritalOptions: [],
      healthOptions: [],
      currentFilterList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      open: false,
      filterList: [],
      religionLisOptions: [],
      title: "",
      form: {},
      rules: {},
      addressCityList: [],
      addressCountyList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  components: {
    TableTemplate
  },
  created() {
    Promise.all([
      this.getList(),
      this.getSexoptions(),
      this.getEducation(),
      this.getmaritaloptions(),
      this.getHealthOptions(),
      this.getCity(),
      this.religionLis()
    ]);
  },
  watch: {
    "form.birthAddressCityCode": {
      handler(val) {
        const arr1 = this.addressCountyList.filter(item1 => {
          return item1.addressCityCode === val;
        });
        this.filterList = arr1;
        this.form.administrativeDivisionCode = "";
      }
    },
    "form.currentAddressCityCode": {
      handler(val) {
        const arr1 = this.addressCountyList.filter(item1 => {
          return item1.addressCityCode === val;
        });
        this.currentFilterList = arr1;
        this.form.administrativeDivisionCode = "";
      }
    }
  },
  methods: {
    getList() {
      api.patient.patientList(this.queryParams).then(res => {
        if (res.code === 200) {
          this.loading = false;
          this.menuList = res.rows;
        }
      });
    },
    editSingle(bool) {
      this.single = bool;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加患者";
    },
    async getSexoptions() {
      const res = await api.dicData.getDicts("sys_user_sex");
      this.sexOptions = res.data;
    },
    async getmaritaloptions() {
      const res = await api.dicData.getDicts("marital_status");
      this.maritalOptions = res.data;
    },
    async getHealthOptions() {
      const res = await api.dicData.getDicts("health_status");
      this.healthOptions = res.data;
    },
    async getEducation() {
      const res = await api.dicData.getDicts("education_level");
      this.educationOptions = res.data;
    },
    async religionLis() {
      const res = await api.patient.religionLis();
      this.religionLisOptions = res.data;
    },
    async getCity() {
      const {
        addressCityList,
        addressCountyList
      } = await api.city.getCityList();
      this.addressCityList = addressCityList;
      this.addressCountyList = addressCountyList;
      // this.filterCountry()
    },
    filterCountry() {
      const arr = this.addressCityList.filter(item => {
        return item.addressCityName === this.infoData.addressCity;
      });
      const { addressCityCode } = arr[0];
      const arr1 = this.addressCountyList.filter(item1 => {
        return item1.addressCityCode === addressCityCode;
      });
      this.filterList = arr1;
    },
    sexFormat(row) {
      const arr = this.sexOptions.filter(item => {
        return row.sex === item.dictValue;
      });
      return arr[0].dictLabel;
    },
    educationFormat(row) {
      if (row.educationLevel) {
        const arr = this.educationOptions.filter(item => {
          return row.educationLevel === item.dictValue;
        });
        return arr[0].dictLabel;
      } else {
        return "--";
      }
    },
    maritalFormat(row) {
      if (row.educationLevel) {
        const arr = this.maritalOptions.filter(item => {
          return row.maritalStatus === item.dictValue;
        });
        return arr[0].dictLabel;
      } else {
        return "--";
      }
    },
    healthFormat(row) {
      if (row.health) {
        const arr = this.healthOptions.filter(item => {
          return row.health === item.dictValue;
        });
        return arr[0].dictLabel;
      } else {
        return "--";
      }
    },
    submitForm() {
      api.patient.addPatient(this.form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/stylus/index"
  .container>>>
    box()
    padding 20px
    background #fff
    .el-form-item__label
      width 120px!important
    .el-input
      width 160px
    .el-select
      width 160px
</style>

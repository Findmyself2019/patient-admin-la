<template>
  <div class="container">
    <div class="manage-title">
      <div class="header">
        <span class="hos-name" v-if="infoData && infoData.organizationName">
          {{ infoData.organizationName ? infoData.organizationName : "" }}
        </span>
        <span
          v-for="(item, index) in tagArr"
          :key="index"
          style="margin-left: 10px"
        >
          <el-tag :type="item.name === '正常' ? 'success' : 'danger'">{{
            item.name
          }}</el-tag>
        </span>
      </div>
      <div class="mid">
        <span style="margin-top: auto;margin-bottom: auto;font-size: 15px;">
          <span class="detail">
            <span class="textFront">联系人: </span>
            <span>{{
              infoData && infoData.linkman ? infoData.linkman : "-"
            }}</span>
          </span>
          <span class="detail">
            <span class="textFront">机构联系人电话:</span>
            <span>{{
              infoData && infoData.linktel ? infoData.linktel : "-"
            }}</span>
          </span>
          <span class="detail">
            <span class="textFront">创建时间:</span>
            <span>{{
              infoData && infoData.createTime ? infoData.createTime : ""
            }}</span>
          </span>
        </span>
        <img src="@/assets/img/hospital.png" alt="" width="12%" />
      </div>
    </div>
    <div class="manage-main">
      <el-tabs v-model="activeName">
        <template v-for="(item, index) in headerArr">
          <el-tab-pane :key="index" :label="item.name" :name="item.name">
            <div v-if="item.name === '概况信息'">
              <h4 style="display: flex;justify-content: space-between">
                <span>基本信息</span>
                <span
                  class="viewing"
                  @click="findLicDetail(infoData.organizationCode)"
                  >查看证照详情 >>></span
                >
              </h4>
              <div class="normal">
                <div style="flex: 6;display: flex">
                  <div class="left-col">
                    <p
                      class="textFront"
                      v-for="(item1, index1) in leftColArr"
                      :key="index1 + 123"
                    >
                      {{ item1 }}
                    </p>
                  </div>
                  <div class="right-col">
                    <p>
                      <span>{{
                        infoData && infoData.organizationName
                          ? infoData.organizationName
                          : ""
                      }}</span>
                    </p>
                    <p>
                      <span>{{
                        infoData && infoData.organizationType
                          ? infoData.organizationType
                          : ""
                      }}</span>
                    </p>
                  </div>
                </div>
                <div style="flex: 4;display: flex">
                  <div class="left-col" style="flex:4; text-align: right">
                    <p
                      class="textFront"
                      v-for="(item2, index2) in rightColArr"
                      :key="index2 + 213"
                    >
                      {{ item2 }}
                    </p>
                  </div>
                  <div class="right-col" style="flex:6; text-align: left">
                    <p>
                      <span>{{
                        infoData && infoData.organizationCode
                          ? infoData.organizationCode
                          : "-"
                      }}</span>
                    </p>
                    <p>
                      <span>{{
                        infoData && infoData.publicPrivateNature
                          ? natureMatter(infoData.publicPrivateNature)
                          : "-"
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <h4>
                <span>详细信息</span>
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
                        v-for="(item1, index1) in leftColArr1"
                        :key="index1 + 123"
                      >
                        {{ item1 }}
                      </p>
                    </div>
                    <div class="right-col">
                      <!-- 法定代表人 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.lawPerson
                            ? infoData.lawPerson
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="lawPerson">
                            <el-input v-model="detailData.lawPerson" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 固定电话 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.phoneNumber
                            ? infoData.phoneNumber
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="phoneNumber">
                            <el-input v-model="detailData.phoneNumber" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 地址（县） -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.countyName
                            ? infoData.countyName
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="addressCounty">
                            <el-select v-model="detailData.addressCounty">
                              <el-option
                                v-for="item3 in filterList"
                                :key="item3.addressCountyCode"
                                :label="item3.addressCountyName"
                                :value="item3.addressCountyCode"
                              />
                            </el-select>
                          </el-form-item>
                        </span>
                      </p>
                      <!--联系人姓名  -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.linkman ? infoData.linkman : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="linkman">
                            <el-input v-model="detailData.linkman" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 电子邮箱 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.faxNumber
                            ? infoData.faxNumber
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="faxNumber">
                            <el-input v-model="detailData.faxNumber" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 业务范围 -->
                      <p v-if="!isEdit">
                        <span>{{
                          infoData && infoData.businessScope
                            ? infoData.businessScope
                            : "-"
                        }}</span>
                      </p>
                      <el-input
                        type="textarea"
                        v-else
                        width="150px"
                        placeholder="请输入业务范围信息，最多可输入255个字符"
                        rows="6"
                        maxlength="254"
                        @onchange="this.value = this.value.substring(0, 254)"
                        @onkeydown="this.value = this.value.substring(0, 254)"
                        @onkeyup="this.value = this.value.substring(0, 254)"
                        v-model="detailData.businessScope"
                      />
                    </div>
                  </div>
                  <div style="flex: 4;display: flex">
                    <div class="left-col" style="flex:4; text-align: right">
                      <p
                        class="textFront"
                        v-for="(item2, index2) in rightColArr1"
                        :key="index2 + 213"
                      >
                        {{ item2 }}
                      </p>
                    </div>
                    <div class="right-col" style="flex:6; text-align: left">
                      <!-- 登记管理机关 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.registrationAuthority
                            ? infoData.registrationAuthority
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="registrationAuthority">
                            <el-input
                              v-model="detailData.registrationAuthority"
                            />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 地址（市） -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.cityName
                            ? infoData.cityName
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="addressCity">
                            <el-select v-model="detailData.addressCity">
                              <el-option
                                v-for="item6 in addressCityList"
                                :key="item6.addressCityCode"
                                :label="item6.addressCityName"
                                :value="item6.addressCityCode"
                              />
                            </el-select>
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 详细地址 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.addressInfo
                            ? infoData.addressInfo
                            : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="addressInfo">
                            <el-input v-model="detailData.addressInfo" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 机构联系人电话 -->
                      <p>
                        <span v-if="!isEdit">{{
                          infoData && infoData.linktel ? infoData.linktel : "-"
                        }}</span>
                        <span v-else>
                          <el-form-item prop="linktel">
                            <el-input v-model="detailData.linktel" />
                          </el-form-item>
                        </span>
                      </p>
                      <!-- 简介 -->
                      <p v-if="!isEdit">
                        <span>{{
                          infoData && infoData.introduction
                            ? infoData.introduction
                            : "-"
                        }}</span>
                      </p>
                      <el-input
                        type="textarea"
                        v-else
                        width="150px"
                        placeholder="请输入简介信息，最多可输入255个字符"
                        rows="7"
                        maxlength="254"
                        onchange="this.value=this.value.substring(0, 254)"
                        onkeydown="this.value=this.value.substring(0, 254)"
                        onkeyup="this.value=this.value.substring(0, 254)"
                        v-model="detailData.introduction"
                      />
                    </div>
                  </div>
                </div>
                <div
                  style="margin-top: 75px"
                  v-show="cityCode !== 4 && !isOrganization"
                >
                  <el-form-item style="width: 100%;text-align: center;">
                    <el-button @click="edit">
                      修改
                    </el-button>
                    <el-button type="primary" @click="saveData('detailData')">
                      保存
                    </el-button>
                    <el-button @click="cancel">
                      取消
                    </el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div v-else-if="item.name === '机构人员'">
              <table-template :table-data="tableData" :loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column
                  label="姓名"
                  align="center"
                  :formatter="formatEmpty"
                >
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.name"
                      @click="
                        organizationCode(scope.row.identityDocumentNumber)
                      "
                      >{{ scope.row.name }}</span
                    >
                    <span v-else>- -</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="gender"
                  label="性别"
                  align="center"
                  show-overflow-tooltip
                  :formatter="formatEmpty"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.gender === '1'">男</span>
                    <span v-if="scope.row.gender === '2'">女</span>
                    <span v-if="scope.row.gender === '0'">未知性别</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="age"
                  label="年龄"
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
                    <span v-if="scope.row.educationLevel === '1'">中专</span>
                    <span v-else-if="scope.row.educationLevel === '2'"
                      >大专</span
                    >
                    <span v-else-if="scope.row.educationLevel === '3'"
                      >本科</span
                    >
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
                  <template>
                    <el-button type="text" size="small">
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
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="searchForm.pageNum"
                :limit.sync="searchForm.pageSize"
                @pagination="getList"
              />
            </div>
            <div v-else>
              <table-template :table-data="tableLogData" :loading="logLoading">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  label="日志编号"
                  align="center"
                  prop="operId"
                />
                <el-table-column label="系统模块" align="center" prop="title" />
                <el-table-column
                  label="操作类型"
                  align="center"
                  prop="businessType"
                  :formatter="typeFormat"
                />
                <el-table-column
                  label="请求方式"
                  align="center"
                  prop="requestMethod"
                />
                <el-table-column
                  label="操作人员"
                  align="center"
                  prop="operName"
                />
                <el-table-column
                  label="主机"
                  align="center"
                  prop="operIp"
                  width="130"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  label="操作地点"
                  align="center"
                  prop="operLocation"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  label="操作状态"
                  align="center"
                  prop="status"
                  :formatter="statusFormat"
                />
                <el-table-column
                  label="操作日期"
                  align="center"
                  prop="operTime"
                  width="180"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.operTime">{{
                      parseTime(scope.row.operTime)
                    }}</span>
                    <span v-else>--</span>
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
                      icon="el-icon-view"
                      @click="handleView(scope.row, scope.index)"
                      v-hasPermi="['monitor:operlog:query']"
                    >
                      详细
                    </el-button>
                  </template>
                </el-table-column>
              </table-template>
              <pagination
                v-show="logTotal > 0"
                :total="logTotal"
                :page.sync="searchForm.pageNum"
                :limit.sync="searchForm.pageSize"
                @pagination="getLog"
              />
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
      <el-dialog
        title="操作日志详细"
        :visible.sync="open"
        width="700px"
        append-to-body
      >
        <el-form ref="form" :model="form" label-width="100px" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作模块：">
                {{ form.title }} / {{ typeFormat(form) }}
              </el-form-item>
              <el-form-item label="登录信息：">
                {{ form.operName }} / {{ form.operIp }} /
                {{ form.operLocation }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请求地址：">
                {{ form.operUrl }}
              </el-form-item>
              <el-form-item label="请求方式：">
                {{ form.requestMethod }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="操作方法：">
                {{ form.method }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="请求参数：">
                {{ form.operParam }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="返回参数：">
                {{ form.jsonResult }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作状态：">
                <div v-if="form.status === 0">
                  正常
                </div>
                <div v-else-if="form.status === 1">
                  失败
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作时间：">
                {{ parseTime(form.operTime) }}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="异常信息：" v-if="form.status === 1">
                {{ form.errorMsg }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="open = false">
            关 闭
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { mapState } from "vuex";
import TableTemplate from "@/components/table-template/index";
import mixin from "@/util/mixins";
import Bus from "@/util/eventbus";
export default {
  name: "Info",
  data() {
    return {
      activeName: "概况信息",
      isEdit: false,
      logLoading: true,
      loading: true,
      open: false,
      logTotal: 0,
      addressCityList: [],
      addressCountyList: [],
      natureOptions: [],
      form: {},
      tableLogData: [],
      detailData: {
        organizationCode: "",
        area: "",
        lawPerson: "",
        linkman: "",
        fixedTelephone: "",
        businessScope: "",
        introduction: "",
        addressInfo: "",
        registrationAuthority: "",
        linktel: "",
        faxNumber: "",
        countyName: "",
        cityName: "",
        addressCity: "",
        addressCounty: ""
      },
      total: 0,
      logparams: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      filterList: [],
      headerArr: [
        {
          name: "概况信息"
        },
        {
          name: "机构人员"
        },
        {
          name: "操作日志"
        }
      ],
      tagArr: [
        {
          name: "正常"
        },
        {
          name: "事业单位"
        }
      ],
      infoData: {},
      leftColArr: ["机构名称:", "机构类型:"],
      leftColArr1: [
        "法定代表人:",
        "固定电话:",
        "地址（县）",
        "联系人姓名:",
        "电子邮箱",
        "业务范围:"
      ],
      rightColArr: ["统一社会信用代码:", "机构性质:"],
      rightColArr1: [
        "登记管理机关:",
        "地址（市）",
        "详细地址:",
        "机构联系人电话:",
        "简介:"
      ],
      rules: {
        linktel: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        faxNumber: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mixins: [mixin],
  components: {
    TableTemplate
  },
  async created() {
    //点其他进入
    this.getDicts("sys_oper_type").then(response => {
      this.typeOptions = response.data;
    });
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDic();
    if (this.$store.state.isOrganization) {
      this.infoData = this.$store.state.otherOrgInfo;
      this.infoData ? (this.detailData = this.infoData) : "";
      const { data, total } = await api.person.getSelfPerson(
        this.organizationId
      );
      this.total = total;
      this.tableData = data;
      this.loading = false;
      const obj = {};
      obj.orgId = this.organizationId;
      (obj.pageNum = this.logparams.pageNum),
        (obj.pageSize = this.logparams.pageSize),
        this.getLog(obj);
    } else {
      //一开始进来
      Promise.race([this.getOrgInfo(), this.getList(), this.getLog()]);
    }
  },
  computed: {
    ...mapState(["isOrganization", "otherOrgInfo", "personDetail"]),
    ...mapState("user", ["organizationId", "cityCode"])
  },
  watch: {
    isOrganization(val) {
      if (!val) {
        //本机构的详情 isOrganization为false 证明此时点击导航进来的
        api.org.reqOrgInfo().then(response => {
          this.infoData = response.data;
          this.detailData = this.infoData;
        });
      } else {
        //isOrganization为true 由其他页面跳转过来的
        this.infoData = this.otherOrgInfo;
        this.detailData;
      }
    },
    async organizationId(val) {
      const { data } = await api.person.getSelfPerson(val);
      this.tableData = data;
      this.loading = false;
    },
    "detailData.addressCity": {
      handler(val) {
        if (this.isEdit) {
          const arr1 = this.addressCountyList.filter(item1 => {
            return item1.addressCityCode === val;
          });
          this.filterList = arr1;
          this.detailData.addressCounty = "";
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSelect() {},
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    getDic() {
      api.dicData.getDicts("organization_economic_type").then(response => {
        this.natureOptions = response.data;
      });
    },
    getLog() {
      const obj = {};
      obj.orgId = this.organizationId;
      (obj.pageNum = this.searchForm.pageNum),
        (obj.pageSize = this.searchForm.pageSize),
        api.org.getOperLogList(obj).then(res => {
          this.tableLogData = res.rows;
          this.logLoading = false;
          this.logTotal = res.total;
        });
    },
    getOrgInfo() {
      api.org.reqOrgInfo().then(response => {
        this.infoData = response.data;
        this.infoData ? (this.detailData = this.infoData) : "";
        this.loading = false;
      });
    },
    async getList() {
      const { data } = await api.certificate.getInfoByOrgId(this.searchForm);
      this.tableData = data;
      this.loading = false;
      this.total = data.length;
    },
    async getCity() {
      const {
        addressCityList,
        addressCountyList
      } = await api.city.getCityList();
      this.addressCityList = addressCityList;
      this.addressCountyList = addressCountyList;
      this.filterCountry();
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
    async organizationCode(id) {
      const { code, data } = await api.person.getDetail(id);
      if (code === 200) {
        Bus.$emit("changeCom", "perinfo");
        this.$store.dispatch("setIsOrganization", true);
        this.$store.dispatch("setPersonDetail", data);
        const headerDom = document.getElementsByClassName("header")[0];
        headerDom
          .querySelectorAll("li.el-menu-item")
          .forEach(item => item.classList.add("off-active"));
        headerDom
          .querySelectorAll("li.el-menu-item")
          .forEach(item1 => item1.classList.remove("active"));
        Bus.$emit("changeActiveTab", "perinfo");
        Bus.$emit("pushToTab", "perinfo", "人员详情");
        Bus.$emit("showSideBar", "人员详情");
      }
    },
    // 操作日志状态字典翻译
    statusFormat(row) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 操作日志类型字典翻译
    typeFormat(row) {
      return this.selectDictLabel(this.typeOptions, row.businessType);
    },
    formatEmpty(row, column, cellValue) {
      if (cellValue) {
        return cellValue;
      } else {
        return "- -";
      }
    },
    edit() {
      this.isEdit = true;
      this.getCity();
    },
    cancel() {
      this.isEdit = false;
    },
    natureMatter(code) {
      let status = "";
      this.natureOptions.forEach(item => {
        if (code === item.dictValue) {
          status = item.dictLabel;
        }
      });
      return status;
    },
    saveData(formName) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          api.org.editQrgList(this.detailData).then(res => {
            if (res.code === 200) {
              this.isEdit = false;
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              //this.getList()
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/stylus/index.styl'
.container
  width 100%
  height 100%
  box()
  .manage-title
    height 170px
    margin-bottom 20px
    background #fff
    padding 20px
    display flex
    flex-direction column
    justify-content space-around
    box()
    .el-tag
      height 28px
    .header
      flex 1
      text-align left
      .hos-name
        font-weight bold
        font-size 20px
    .mid
      flex 2
      text-align left
      display flex
      width 100%
      justify-content space-between
      .detail
        margin-right 20px
      .textFront
        color #a4a4a4
    .footer
      flex 1
      text-align left
      .el-button
        line-height 0.5
  .manage-main>>>
    box()
    height calc(100% - 190px)
    background #fff
    .viewing
      font-size: 14px
      &:hover
        color #2ea5d6
        text-decoration underline
        cursor pointer
    .el-tabs
      height 100%
      overflow hidden
      .el-tabs__nav
        margin-left 20px
        box()
      .el-tabs__content
        height calc(100% - 70px)
        overflow-y auto
      .el-tabs__item
        height 55px
        line-height 55px
        font-size 16px
        font-family '微软雅黑'
      .el-tabs__active-bar
        background-color #0079fe !important
    .el-form-item__error
      top 20%
      left 105%
      width 100px
    .table-box
      tr
        td:nth-child(2)
          cursor pointer
          &:hover
            color #0098ff
            text-decoration underline
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
        textarea
          margin-top 20px
        .el-textarea
          width 250px
      box()
      padding 0 140px
      p
        margin-top 15px
        font-size 15px
        height: 30px
      .textFront
        font-weight bold
        margin-right 30px
      .el-input__inner
        width 180px
        height 33px
    h4
      text-align left
      padding 10px 40px
      i
        margin 0 10px
</style>

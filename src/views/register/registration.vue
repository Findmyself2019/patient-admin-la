<template>
  <div class="box">
    <div class="rebinding-box">
      <div class="box-timeline">
        <ul>
          <li class="text">
            <span class="step1_jianbinaLine">1</span><span>填写信息登记表</span>
          </li>
          <li class="text">
            <span class="step1_shallowLine step_1">2</span
            ><span class="step_2">单位资质认证</span>
          </li>
          <li class="text">
            <span class="step_1">3</span><span class="step_2">完成注册</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="account-container">
      <div
        class="row"
        style="width:100%;border-bottom: 1px solid #ccc;overflow: hidden"
      >
        <div style="width:50%;float:left">
          <h2>填写《单位注册信息登记表》</h2>
        </div>
        <div style="width:49%;height:56px;float:right;text-align:right">
          <h4 style="margin-top:25px">
            已有账号？<a
              href="/home/login"
              style="text-decoration:none;color: #0070c0 !important;"
              >立即登陆</a
            >
          </h4>
        </div>
      </div>
      <el-form width="100%" :rules="rules" ref="form" :model="form">
        <div style="margin: 20px 0;color: #2ea5d6">
          单位信息
        </div>
        <el-form-item label="行政区划:" prop="administrativeDivisionCode">
          <el-select v-model="form.cityCode" placeholder="请选择行政区划">
            <el-option
              v-for="item in addressCityList"
              :key="item.addressCityName"
              :label="item.addressCityName"
              :value="item.addressCityCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="县(区):" prop="cityCode">
          <el-select
            v-model="form.administrativeDivisionCode"
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
        <el-form-item label="单位名称:" prop="organizationName">
          <el-input
            placeholder="请填写单位名称"
            v-model="form.organizationName"
            ref="organizationName"
          />
        </el-form-item>
        <el-form-item label="第二名称:" prop="organizationSecondName">
          <el-input
            placeholder="请填写第二机构名称"
            v-model="form.organizationSecondName"
          />
        </el-form-item>
        <el-form-item label="统一社会信用代码:" prop="organizationCode">
          <el-input
            placeholder="部队医院填000000000，暂无统一社会信用代码的医院填111111111"
            v-model="form.organizationCode"
          />
        </el-form-item>
        <div
          style="color:#fa892d;font-weight: inherit;margin: -15px 0 5px 180px;font-size: 13px"
        >
          注：统一社会信用代码查询网址：<a
            href="https://www.cods.org.cn/"
            target="_blank"
            >https://www.cods.org.cn/</a
          >
        </div>
        <el-form-item label="联系电话:" prop="phone">
          <el-input placeholder="请填写电话" v-model="form.phone" />
        </el-form-item>
        <el-form-item label="详细地址:" prop="address">
          <el-input placeholder="请填写详细地址" v-model="form.address" />
        </el-form-item>
        <div style="margin: 20px 0;color: #2ea5d6">
          单位管理员信息
        </div>
        <el-form-item label="真实姓名:" prop="adminName">
          <el-input placeholder="请填写真实姓名" v-model="form.adminName" />
        </el-form-item>
        <el-form-item label="身份证号:" prop="adminIdentityCard">
          <el-input
            placeholder="请填写身份证号"
            v-model="form.adminIdentityCard"
          />
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio label="0" v-model="form.adminSex">
            男
          </el-radio>
          <el-radio label="1" v-model="form.adminSex">
            女
          </el-radio>
        </el-form-item>
        <el-form-item label="手机号码:" prop="adminMobilePhone">
          <el-input
            placeholder="请填写手机号码"
            v-model="form.adminMobilePhone"
          />
        </el-form-item>
        <el-form-item label="电子邮箱:" prop="adminMailbox">
          <el-input placeholder="请填写电子邮箱" v-model="form.adminMailbox" />
        </el-form-item>
        <el-form-item label="验证码:" prop="verifyCode">
          <el-input placeholder="请填写验证码" v-model="form.verifyCode" />
          <el-button type="primary" @click="sendMes" :disabled="!canClick">
            {{ content }}
          </el-button>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="submit('form')">
            注册
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "Registration",
  data() {
    return {
      form: {
        administrativeDivisionCode: ""
      },
      radio: "",
      content: "发送验证码",
      totalTime: 300,
      addressCityList: [],
      addressCountyList: [],
      isEdit: true,
      filterList: [],
      canClick: true, //添加canClick
      rules: {
        organizationName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
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
        administrativeDivisionCode: [
          { required: true, message: "县市不能为空", trigger: "blur" }
        ],
        adminName: [
          { required: true, message: "管理员姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        adminMailbox: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        adminIdentityCard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ],
        verifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCity();
  },
  watch: {
    "form.cityCode": {
      handler(val) {
        const arr1 = this.addressCountyList.filter(item1 => {
          return item1.addressCityCode === val;
        });
        this.filterList = arr1;
        this.form.administrativeDivisionCode = "";
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.register.registerOrg(this.form).then(res => {
            if (res.code === 200) {
              this.$store.dispatch("getRegisterId", res.data);
              this.$router.push("/register/qualification");
            }
          });
        }
      });
    },
    sendMes() {
      const query = {
        email: this.form.adminMailbox,
        OrgName: this.form.organizationName
      };
      const filter = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!this.form.organizationName) {
        this.$message({
          showClose: true,
          message: "单位名称不能为空",
          type: "warn"
        });
      } else if (!this.form.adminMailbox) {
        this.$message({
          showClose: true,
          message: "邮箱不能为空",
          type: "warn"
        });
      } else if (
        this.form.organizationName &&
        this.form.adminMailbox &&
        filter.test(this.form.adminMailbox)
      ) {
        api.register.sendEmail(query).then(res => {
          if (res.code === 200) {
            this.$message({
              showClose: true,
              message: "发送成功",
              type: "success"
            });
            if (!this.canClick) return; //改动的是这两行代码
            this.canClick = false;
            this.content = this.totalTime + "s后重新发送";
            let clock = window.setInterval(() => {
              this.totalTime--;
              this.content = this.totalTime + "s后重新发送";
              if (this.totalTime < 0) {
                window.clearInterval(clock);
                this.content = "重新发送验证码";
                this.totalTime = 300;
                this.canClick = true; //这里重新开启
              }
            }, 1000);
          } else {
            this.$message({
              showClose: true,
              message: "请填写必填项",
              type: "danger"
            });
          }
        });
      }
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
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.box>>> {
  .rebinding-box {
    width: 960px;
    margin: 0px auto 0 auto;
    background-color: #fff;
    border: 1px solid #DCDCDC;
    box-sizing: border-box;
    padding: 15px;

    .box-timeline {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;

      ul {
        width: 100%;
        list-style: none;
        margin-top: 1%;

        .text {
          width: 33.333%;
          float: left;
          text-align: center;

          span:nth-child(1) {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #0070c0;
            line-height: 40px;
            color: #fff;
            font-size: 24px;
            margin-left: 40%;
            position: relative;
          }

          span:nth-child(2) {
            text-align: center;
            color: #0070c0;
            font-size: 18px;
            padding-top: 10px;
            display: block;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .account-container {
    width: 960px;
    background: #fff;
    margin: 10px auto 0 auto;
    border: 1px solid #DCDCDC;
    padding: 20px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 5px #ccc;

    h2 {
      color: #333;
    }

    a {
      font-size: 14px;
      color: #5190ba !important;
      text-decoration: none;
    }
  }

  .el-form-item:nth-child(7) {
    margin-bottom: 0px;
  }

  .el-form-item:nth-child(16) {
    width: 70%;

    .el-input {
      width: 40%;
    }

    .el-button {
      padding: 10px;
      margin-left: 20px;
    }
  }

  .el-form-item__label {
    font-size: 16px !important;
    padding-right: 50px;
    width: 140px;
  }

  .el-select {
    width: 70%;

    .el-input {
      width: 100%;
    }
  }

  .el-input {
    width: 70%;
  }

  @media only screen and (max-width: 1980px) {
    .rebinding-box .box-timeline .step1_jianbinaLine:after {
      content: '';
      position: absolute;
      height: 5px;
      width: 125px;
      top: 20px;
      left: 70px;
      background: linear-gradient(to right, #0070c0, #a2c2e1);
    }
  }

  @media only screen and (max-width: 1980px) {
    .rebinding-box .box-timeline .step1_shallowLine:before {
      content: '';
      position: absolute;
      height: 5px;
      width: 125px;
      top: 20px;
      left: 70px;
      background-color: #a2c2e1;
    }
  }

  .step_1 {
    background-color: #a2c2e1 !important;
  }

  .step_2 {
    color: #a2c2e1 !important;
  }
}
</style>

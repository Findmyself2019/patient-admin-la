<template>
  <div class="login-container">
    <div class="log-box">
      <div class="leftBg">
        <img src="@/assets/img/login-logo.png" alt="" width="30%" />
        <h2>山 东 省 精 神 卫 生 资 源 监 管</h2>
        <div class="subtitle">
          Social psychological Service Platform
        </div>
      </div>
      <div class="right">
        <div class="text">
          用户登录/USER LOGIN
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon
                slot="prefix"
                icon-class="user"
                class="el-input__icon input-icon"
              />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip
            v-model="capsTooltip"
            content="大写键盘已开启"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon
                  slot="prefix"
                  icon-class="password"
                  class="el-input__icon input-icon"
                />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon
                slot="prefix"
                icon-class="validCode"
                class="el-input__icon input-icon"
              />
            </span>
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 67%"
              @keyup.enter.native="handleLogin"
            />

            <img :src="codeUrl" @click="getCode" alt="验证码" width="35%" />
          </el-form-item>
          <el-checkbox
            v-model="loginForm.rememberMe"
            style="margin:0px 0px 25px 0px;"
          >
            记住密码
          </el-checkbox>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import SocialSign from '@/components/SocialSignin'
import { getCaptchaImage } from "@/api/user.js";
export default {
  name: "Login",
  components: {},
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能低于六位"));
      } else {
        callback();
      }
    };
    return {
      codeUrl: "",
      title: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    //获取验证码
    getCode() {
      getCaptchaImage().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="stylus">


/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #bdbdbd;
      height: 47px;
      caret-color: #000;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}

.zhuce_tip {
  text-align: center
  color: #e53e3f
  margin: 15px 0px
}
.herf_box.newDanwei {
  float: left;
  background-color: #fff;
}
.gongyong {
  width: 120px;
  height: 120px;
  border: 1px solid #dedfe0;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gongyong:hover{
  background #0070c0
}
.gongyong:hover .p_txt{
  color: #fff;
}
.zhuce_box{
  display flex
  justify-content: space-evenly
}
.el-dialog{
}
.p_txt {
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}
.newDanwei .img {
  width: 32px;
  height: 37px;
  background: url('../../assets/img/zhucexindanwei.png') no-repeat;
  margin-left: 26px;
  margin-top: 10px;
}
.zhuceJiLu .img{
  width: 32px;
  height: 37px;
  background: url('../../assets/img/zhucejilu.png') no-repeat;
  margin-left: 26px;
  margin-top: 10px;
}
</style>

<style lang="stylus" scoped>
  @import '~@/stylus/index.styl'
.login-container >>>
  min-height: 100%;
  width: 100%;
  background-image url('../../assets/img/log-bg.jpg')
  background-size cover
  overflow: hidden;
  position relative
  .el-dialog__header
    background #0070c0
  .el-checkbox
    margin-left 52px!important
  .el-button
    width 75%!important
    margin-left 50%
    transform translateX(-50%)
  .el-form-item
    width 75%
    margin-left 50%
    transform translateX(-50%)
  .el-form-item__content
    display flex
    line-height 35px
    .login-code
      flex 1
      width 0
      height 0
  .log-box
    position: absolute
    width: 840px
    max-width: 100%
    height 450px
    margin auto
    top 0
    left 0
    right 0
    bottom 0
    overflow: hidden
    display flex
    .leftBg
      flex 5
      background #0079fe
      display flex
      flex-direction column
      box-sizing border-box
      padding-top 10%
      align-items center
      h2
        color #fff
        margin 40px 0 10px
        font-size: 23px
      .subtitle
        color #ffffff
        font-size 18px
        font-weight bold
    .right
      flex 5
      box-sizing border-box
      padding 50px 20px
      background #fff
      .text
        color #959595
        font-weight bold
        margin 0 0 20px 50px
  .login-form
  .tips {
    font-size: 14px;
    color: #fff;
    background #fff
    height 100%
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  .regis
    color #606266
    margin-left 50px
    &:hover
      color #0098ff
      text-decoration underline
</style>

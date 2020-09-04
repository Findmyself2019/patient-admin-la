<template>
  <el-container class="home-box">
    <el-aside :class="classObj">
      <Aside @showTab="showTab" :breadArr.sync="breadArr" />
    </el-aside>
    <el-container class="main-box">
      <el-header height="45px">
        <Header />
      </el-header>
      <div style="display:flex;align-items:center;margin-left:60px">
        <bread-item v-for="(item, index) in breadArr" :key="index">{{
          item
        }}</bread-item>
      </div>
      <h3>{{ clickName }}</h3>
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <keep-alive exclude="User,Role,Menu">
            <component
              :is="currentCom"
              @closeLoading="closeTabLoading"
              @openLoading="openTabLoading"
            />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
import BreadItem from "@/components/bread-item/index";
import Aside from "@/components/aside/index";
import Header from "@/components/header/index";
import Bus from "@/util/eventbus";
export default {
  name: "Home",
  data() {
    return {
      currentCom: null,
      varible: "",
      loading: null,
      tabLoading: false,
      tabArray: [{ name: "overview", title: "机构信息总览" }],
      breadArr: []
    };
  },
  components: {
    Header,
    Aside,
    BreadItem
  },
  computed: {
    ...mapState(["sideBar", "clickName"]),
    classObj() {
      return {
        hideSidebar: this.sideBar,
        openSidebar: !this.sideBar
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === 'mobile'
      };
    }
  },
  async created() {
    //专用于机构详情页面
    Bus.$on("changeCom", async com => {
      this.currentCom = (await import(`@/views/menu/${com}/index.vue`)).default;
    });
    Bus.$on("pushToTab", (name, title) => {
      if (this.tabArray.findIndex(item => item.title === title) > -1) {
        return false;
      }
      this.tabArray.push({ name, title });
    });
    this.currentCom = (await import("@/views/menu/overview/index.vue")).default;
  },
  methods: {
    jumpLoading() {
      this.openFullScreen();
    },
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    closeLoading() {
      this.loading.close();
    },
    closeTabLoading() {
      this.tabLoading = true;
    },
    openTabLoading() {
      this.tabLoading = false;
    },
    async showTab(name, title) {
      const tabName = name.toLowerCase();
      this.currentCom = (
        await import(`@/views/menu/${tabName}/index.vue`)
      ).default;
      if (this.tabArray.findIndex(item => item.title === title) > -1) {
        return false;
      }
      this.tabArray.push({ name, title });
    },
    async closeAndShowTab(name) {
      this.currentCom = (
        await import(`@/views/menu/${name}/index.vue`)
      ).default;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/stylus/index.styl'
.el-container>>>
  width 100%
  height 100%
  background #F7F9FB
.home-box
  width 100%
  height 100%
  display flex
.main-box
  flex 1
  background #e9eef3
  .text:last-child
    color #5693ff
.el-header
  text-align center
  line-height 65px
  width 100%
  padding 0 60px
h3
  margin 20px 0 10px 60px
.el-aside
  height 100%
  width 200px !important
  transition width .3s ease-in-out
  &.hideSidebar
    width 50px !important
  &.openSidebar
    width 200px !important
  box()
  overflow-y auto
  overflow-x hidden
  scroll-style()
.el-main
  background-color #E9EEF3
  color #333
  text-align center
  padding 20px 60px
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active
  transition: all .5s
.fade-transform-enter
  opacity: 0;
  transform: translateX(-30px)
.fade-transform-leave-to
  opacity: 0;
  transform: translateX(30px)
body > .el-container
  flex-direction column
</style>

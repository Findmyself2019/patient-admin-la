<template>
  <div class="header" ref="header">
    <!-- <div class="collapse-btn">
      <i v-if="!collapse" class="el-icon-s-fold" @click="isCollapse"></i>
      <i v-else class="el-icon-s-unfold" @click="isCollapse"></i>
    </div> -->
    <div class="logo"></div>
    <div class="right">
      <div class="header-user">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            placement="bottom"
            :content="message ? `${message}条未读消息` : `消息中心`"
          >
            <i class="el-icon-bell"></i>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="avatar" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown
          class="user-name"
          trigger="click"
          @command="handleCommand"
          placement="top-end"
        >
          <span class="el-dropdown-link" style="cursor:pointer">
            {{ name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a
              href="https://github.com/lin-xin/vue-manage-system"
              target="_blank"
            >
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/util/eventbus.js";
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      message: 2,
      collapse: false,
      activeName: "overview",
      num: 0,
      leftDistant: 0,
      currentTitle: "",
      divWidth: 0
    };
  },
  props: {
    tabArray: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(["clickName"]),
    ...mapState("user", ["name", "avatar"])
  },
  watch: {},
  methods: {
    handleCommand(command) {
      if (command === "loginout") {
        this.$confirm("确定注销并退出系统吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$emit("jumpLoading");
          this.$store.dispatch("user/logout").then(() => {
            location.href = "/login";
            this.$emit("closeLoading");
          });
        });
      }
    },
    showCloseIcon(title) {
      this.currentTitle = title;
    },
    hiddenCloseIcon() {
      this.currentTitle = "";
    },
    isCollapse() {
      this.collapse = !this.collapse;
      this.$store.dispatch("toggleSideBar");
    },
    close(name) {
      if (name === "overview") return;
      const index = this.tabArray.findIndex(item => {
        return item.name === name;
      });

      if (Number(index) === this.tabArray.length - 1) {
        const name = this.tabArray[index - 1].name;
        const title = this.tabArray[index - 1].title;
        this.activeName = name;
        this.$emit("closeAndShowTab", name);
        //左边侧边栏相应的激活
        Bus.$emit("showSideBar", title);
      } else {
        const name = this.tabArray[index + 1].name;
        const title = this.tabArray[index + 1].title;
        this.activeName = name;
        this.$emit("closeAndShowTab", name);
        //左边侧边栏相应的激活
        Bus.$emit("showSideBar", title);
      }
      const arr = this.tabArray.filter(item => {
        return item.name !== name;
      });
      this.$emit("update:tabArray", arr);
    },
    showTab(item, index) {
      const headerDom = document.getElementsByClassName("header")[0]; //此时新添加的dom已经有了
      const divWidth = headerDom.getElementsByClassName("logo")[0].clientWidth;
      headerDom
        .querySelectorAll("li.el-menu-item")
        .forEach(item1 => item1.classList.remove("active"));
      headerDom
        .querySelectorAll("li.el-menu-item")
        .forEach(item1 => item1.classList.add("off-active"));
      headerDom
        .querySelectorAll("li.el-menu-item")
        [index].classList.add("active");
      headerDom
        .querySelectorAll("li.el-menu-item")
        .forEach(item1 => (item1.style.borderBottomColor = "transparent"));
      this.$emit("showTab", item.name.toLowerCase(), item.title);
      //左边侧边栏相应的激活
      Bus.$emit("showSideBar", item.title);
      //标签页有遮挡的情况 点击可以完全显示出来
      const currentLength = headerDom.querySelectorAll("li.el-menu-item")[index]
        .offsetLeft;
      const currentDom = headerDom.querySelectorAll("li.el-menu-item")[index];
      if (
        headerDom.querySelectorAll("li.el-menu-item")[index].offsetLeft <
        this.leftDistant
      ) {
        headerDom.getElementsByClassName("el-menu-demo")[0].style.left =
          -currentLength + "px";
      } else if (divWidth - currentDom.offsetLeft < currentDom.clientWidth) {
        const distant = currentDom.offsetLeft - divWidth;
        headerDom.getElementsByClassName("el-menu-demo")[0].style.left =
          -(distant + currentDom.clientWidth) + "px";
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header>>>
  width 100%
  height 45px
  display flex
  text-align left
  .el-dropdown-menu
    top 33px !important
  li.el-menu-item
    height 45px
    line-height 45px
    position relative
    i
      position absolute
      top 3px
      right -8px
      font-size 14px
    &.off-active
      border-bottom-color transparent !important
  li.el-menu-item
    &.active
      border-bottom 2px #0079fe solid!important
  .collapse-btn
    width 50px
    color #000
  .right
    /*width 190px*/
    .header-user
      width 100%
      height 100%
      display flex
      justify-content space-around
      align-items center
      .el-dropdown
        color #a9a9a9
      .btn-bell
        .el-icon-bell
          font-size 20px
          color #a9a9a9
      .user-avator
        padding: 0 23px
        img
          display: block
          width: 35px
          height: 35px
          border-radius: 50%
  .logo
    flex 1
    font-size 22px
    overflow hidden
    position relative
    .el-menu-demo
      height 64px
      font-family '微软雅黑'
      width 10000px
      position absolute
      display flex
      line-height 64px
</style>

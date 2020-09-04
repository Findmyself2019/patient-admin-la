<template>
  <div class="container">
    <!--侧边栏logo部分-->
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="" width="30px" />
      <span>山东省精卫资源监管</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#828282"
      active-text-color="#5693ff"
      :collapse="sideBar"
      :collapse-transition="false"
      @open="handleOpen"
    >
      <navigation-item
        v-for="menu in menuData"
        :key="menu.path"
        :item="menu"
        v-on="$listeners"
        v-bind="$attrs"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationItem from "@/components/navigation-item/index";
import { getMenuList } from "@/api/user";
import Bus from "@/util/eventbus";
export default {
  name: "Aside",
  components: {
    NavigationItem
  },
  data() {
    return {
      menuData: [],
      currentTitle: "机构信息总览"
    };
  },
  computed: {
    ...mapState(["sideBar"])
  },
  async created() {
    Bus.$on("showSideBar", title => {
      this.currentTitle = title;
      const aside = document.getElementsByClassName("el-aside")[0];
      const liArr = aside.getElementsByClassName("el-menu-item");
      const arr = Array.prototype.slice.call(liArr);
      arr.forEach(item => {
        item.classList.remove("is-active");
        if (item.innerText === title) {
          item.classList.add("is-active");
        }
        return item.innerText === title;
      });
    });
    const data = await getMenuList();
    this.menuData = data.data;
  },
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        //关闭打开菜单激活状态依然存在
        const aside = document.getElementsByClassName("el-aside")[0];
        const liArr = aside.getElementsByClassName("el-menu-item");
        const arr = Array.prototype.slice.call(liArr);
        arr.forEach(item => {
          item.classList.remove("is-active");
          if (item.innerText === this.currentTitle) {
            item.classList.add("is-active");
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/stylus/index.styl'
.container
  height 100%
  width 200px
  .logo
    width 200px
    height 60px
    display flex
    align-items center
    background-color #fff
    box()
    padding 0 15px
    span
      font-size 16px
      color #fff
      margin-left 20px
  .el-menu
    height calc(100% - 60px)
    width 100%
</style>

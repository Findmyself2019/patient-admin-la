<template>
  <div class="box" v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-menu-item
        :index="item.name"
        @click.native="test(item.name, item.meta.title)"
      >
        {{ item.meta.title }}
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.name">
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <template v-for="child in item.children">
        <navigation-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.name"
          v-on="$listeners"
          v-bind="$attrs"
        />
        <el-menu-item
          v-else
          :key="child.name"
          :index="child.name"
          @click.native="test(child.name, child.meta.title)"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import Item from "./item";
import Bus from "@/util/eventbus.js";
import { getMenuList } from "@/api/user";
export default {
  name: "NavigationItem",
  data() {
    return {
      title: "",
      menuData: [],
      arr: []
    };
  },
  components: {
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  async created() {
    const data = await getMenuList();
    this.menuData = data.data;
  },
  watch: {},
  methods: {
    test(name, title) {
      this.$store.dispatch("setIsOrganization", false);
      const headerDom = document.getElementsByClassName("header")[0];
      headerDom
        .querySelectorAll("li.el-menu-item")
        .forEach(item => item.classList.add("off-active"));
      headerDom
        .querySelectorAll("li.el-menu-item")
        .forEach(item1 => item1.classList.remove("active"));
      this.$emit("showTab", name.toLowerCase(), title);
      Bus.$emit("changeActiveTab", name.toLowerCase());
      Bus.$emit("showSideBar", title);
      //标签页宽度过长进行移动
      this.title = title;
      this.$store.dispatch("editClickName", title);
      this.arr = [];
      this.getBread(title, this.menuData, "");
      Bus.$emit("conPosition", title);
    },
    getBread(title, menuArr, dataSon) {
      menuArr.forEach(item => {
        console.log(111);
        if (item.children) {
          const dataSon = item;
          this.getBread(title, item.children, dataSon);
        } else {
          if (item.meta.title === title) {
            this.arr.push(dataSon.meta.title);
            this.arr.push(title);
            return false;
          }
        }
      });
      console.log(this.arr);
      this.$emit("update:breadArr", this.arr);
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.box>>>
  .el-submenu__title
    &:hover
      color #5693ff !important
      background #fff !important
  .el-menu-item
    &:hover
      color #5693ff !important
      background #fff !important
  ul .el-submenu__title
    background #fff !important
  ul .el-menu-item
    background #fff !important
  .el-menu-item
    &.is-active
      background #fff !important
</style>

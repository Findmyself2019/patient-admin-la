<template>
  <div class="table-box">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TableTemplate",
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.$emit("editSingle", this.single);
      this.multiple = !selection.length;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.table-box>>>
  flex 1
  padding 10px
  background #fff
  .el-table
    height 100%
    th
      background #f5f5f5 !important
</style>

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
  data(){
    return{

    }
  },
  props:{
    tableData:{
      type:Array,
      default:()=>[]
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  watch:{

  },
  methods:{
    handleSelectionChange(){

    }
  }
}
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

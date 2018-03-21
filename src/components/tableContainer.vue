<!--
<table-container :paging="true" @on-load="handleTableLoad" ref="searchList" :filter="filter">
  <table></table>
</table-container>
-->
<template>
<div class="search-list-wrp">
  <div v-if="query" class="table-tool">
      <slot name="query"></slot>
  </div>

  <div v-loading="loading" element-loading-text="拼命加载中">
    <slot></slot>
  </div>

  <el-pagination v-if="paging"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="filter.pageNumber"
      :page-sizes="[10, 15, 20, 30, 40, 50]"
      :page-size="filter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
</div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    query: {
      type: Boolean,
      default: false
    },
    paging: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      listData: this.data,
      loading: false,
      total: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.$nextTick(() => {
        this.load()
      })
    },
    handlePageChange (val) {
      this.filter.pageNumber = val
      this.$nextTick(() => {
        this.load()
      })
    },
    load () {
      this.loading = true

      this.$emit('on-load', this.filter)
    },
    paged (total) {
      this.loading = false
      if (total) this.total = total
    }
  }
}
</script>

<style lang="scss">
.search-list-wrp{
  margin: 10px 0;
  padding-bottom: 40px;

  .el-pagination{
    display: inline-block;
    float: right;
    margin-top: 10px;

    span,button,.el-input__inner,li,input{
      font-size: 12px;
    }
  }

  .el-table{
    font-size: 12px;

    .el-button{
      position: relative;
    }

    .el-button+.el-button{
      &:before{
        content: '';
        display: block;
        width: 1px;
        height: 10px;
        background: #999;
        position: absolute;
        left: -5px;
        top: 11px;
      }
    }
  }
}
</style>

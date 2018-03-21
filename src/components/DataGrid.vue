<template>
  <div>
    <div class="query-search" v-if="search && !form">
      <slot name="search"></slot>

      <el-button type="primary" style="width: 60px;" @click="handleSearch">搜索</el-button>
    </div>
    <div class="query-search" v-if="form">
      <el-form :inline="true" class="demo-form-inline" label-position="right" :label-width="labelWidth">
        <slot name="form"></slot>
        <el-form-item>
          <el-button type="primary"  @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-bar">
      <slot name="tool"></slot>
    </div>
    <div class="table-wrp">
      <div v-loading="loading" element-loading-text="拼命加载中">
        <slot></slot>
      </div>

      <div style="margin-top: 20px; height: 30px;"  v-if="paging || batch">
        <div v-if="batch" style="display: inline-block;height: 30px;font-size: 12px;line-height: 30px;padding-left: 10px;">
          <el-checkbox v-model="checked" style="margin-right: 20px;">全选</el-checkbox>
          <slot name="batch"></slot>
        </div>

        <el-pagination v-if="paging"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="filter.pageNumber"
            :page-sizes="[10, 15, 20, 30, 40, 50]"
            :page-size="filter.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: () => {
        return {
          pageNo: 1,
          pageSize: 10
        }
      }
    },
    paging: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    batch: {
      type: Boolean,
      default: false
    },
    form: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '60px'
    }
  },
  data () {
    return {
      loading: false,
      total: 0,
      checked: false
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
      this.filter.pageNo = val
      this.$nextTick(() => {
        this.load()
      })
    },
    load () {
      this.checked = false
      this.loading = true
      console.log(this.filter)
      this.$emit('on-load', this.filter)
    },
    paged (total) {
      this.loading = false
      if (total) {
        this.total = total
      } else {
        this.total = 0
      }
    },
    handleSearch () {
      this.load()
    }
  },
  watch: {
    checked (val) {
      if (val) {
        this.$emit('batch-checked')
      } else {
        this.$emit('batch-unchecked')
      }
    }
  }
}
</script>

<style lang="scss">
.table-wrp{
  .el-table{
    font-size: 12px;

    .el-table__header-wrapper{
      div,th{
        background: #f5f5f5;
      }
    }
  }

  .el-pagination {
    float: right;

    span input{
      font-size: 12px;
    }
  }

  .cell{
    padding: 0;
  }
  
}
.tool-bar{
    margin-bottom: 10px;
}

.query-search{
  background: #f5f5f5;
  padding: 10px 20px;
  margin-bottom: 10px;

  .el-form-item__label{
    font-size: 12px;
  }

  .el-form-item{
    margin-right: 20px;
    margin-bottom: 10px;

    .el-input{
      width: 152px;
    }
  }

  .search-item{
    display: inline-block;
    // vertical-align: middle;
    font-size: 12px;
    margin-right: 20px;
    margin-bottom: 10px;

    label{
      padding-right: 12px;
    }

    .el-input{
      width: 152px;
    }
  }
}
</style>

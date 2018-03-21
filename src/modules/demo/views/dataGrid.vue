<template>
  <page title="数据表格" :menus="menus">
    <data-grid
      :filter="filter"
      :paging="true"
      :form="true"
      :batch="true"
      @on-load="handleLoad"
      ref="dataGrid"
    >
      <template slot="form">
        <el-form-item label="测试">
          <el-input v-model="filter.form1"></el-input>
        </el-form-item>
      </template>

      <el-table
        :data="dataList"
        border
      >
        <el-table-column prop="name" label="测试"></el-table-column>
        <el-table-column prop="name" label="测试"></el-table-column>
        <el-table-column prop="name" label="测试"></el-table-column>
        <el-table-column prop="name" label="测试"></el-table-column>
        <el-table-column prop="name" label="测试"></el-table-column>
        <el-table-column prop="name" label="测试"></el-table-column>
      </el-table>
    </data-grid>
  </page>
</template>

<script>
  import Page from 'components/Page'
  import DataGrid from 'components/DataGrid'
  import {getMenu} from './menus'

  export default {
    components: {
      Page, DataGrid
    },
    data () {
      return {
        filter: {
          form1: ''
        },
        dataList: [],
        menus: getMenu('datagrid')
      }
    },
    mounted () {
      console.log(this.$refs)
      this.$refs.dataGrid.load()
    },
    methods: {
      handleLoad (form) {
        console.log('load', form)
        setTimeout(() => {
          this.dataList = Array.apply(null, Array(10)).map(item => { return {name: '测试'} })
          this.$refs.dataGrid.paged(this.dataList.length * 10)
        }, 2000)
      }
    }
  }
</script>

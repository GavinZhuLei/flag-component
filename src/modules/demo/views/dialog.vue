<template>
  <page title="弹框" :menus="menus">

    <el-button @click="defaultVisible = true">打开默认框</el-button>
    <el-button @click="customVisible = true">打开自定义操作框</el-button>

    <custom-dialog
      :visible="defaultVisible"
      title="默认弹框"
      :width="400"
      @on-close="defaultVisible = false"
      @on-submit="handleSubmit"
      ref="defaultDialog"
    >
      <div>这是默认的信息</div>
    </custom-dialog>

    <custom-dialog
      :visible="customVisible"
      title="自定义操作"
      ref="customDialog"
      @on-close="customVisible = false"
      loading-text="自定义加载文字"
    >
      <div>自定义操作</div>

      <template slot="action">
        <el-button @click="handleCustom">自定义操作</el-button>
      </template>
    </custom-dialog>
  </page>
</template>

<script>
  import Page from 'components/Page'
  import {getMenu} from './menus'
  import CustomDialog from 'components/Dialog'

  export default {
    components: {
      Page, CustomDialog
    },
    data () {
      return {
        menus: getMenu('dialog'),
        defaultVisible: false,
        customVisible: false
      }
    },
    methods: {
      handleSubmit () {
        setTimeout(() => {
          this.$refs.defaultDialog.close()
        }, 2000)
      },
      handleCustom () {
        this.$refs.customDialog.submit()

        setTimeout(() => {
          this.$refs.customDialog.end()
        }, 2000)
      }
    }
  }
</script>

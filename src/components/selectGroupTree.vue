<template>
  <span>
    <custom-dialog
      :visible="addVisible"
      title="单位名称和角色选择"
      @on-close="addVisible = false"
      @on-submit="selval"
      class="add-edit"
      ref="addEdit">
      <tree-group ref="tgroups" :gdata="gdata" :selectNode="selectNode" @handleSubmit="handleSubmit"></tree-group>
    </custom-dialog>
  </span>
</template>

<script>
// import api from 'api/pc'
import CustomDialog from './dialog'
import TreeGroup from './treeGroup'

export default {
  components: {
    CustomDialog,
    TreeGroup
  },
  data () {
    return {
      addVisible: false,
      groupData: [],
      selectNode: []
    }
  },
  props: {
    ruleId: {
      type: String,
      default: ''
    },
    gdata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    open () {
      this.startDate = ''
      this.endDate = ''
      this.addVisible = true
      // this.$nextTick(() => {
      //   this.$refs.tgroups.clear()
      // })
    },
    close () {
      this.addVisible = false
    },
    // handleSubmit () {
    //   let data = this.$refs.tgroups.getData()
    //   console.log(data, this.startDate, this.endDate)
    //   if (!this.startDate || !this.endDate) {
    //     this.$refs.addEdit.end()
    //     this.$message.warning('请选择请假日期')
    //     return
    //   }
    //   if (data.selects.length > 0) {
    //     addLeaveRecord(data.selects.map(item => {
    //       return {
    //         endDate: this.endDate,
    //         startDate: this.startDate,
    //         createById: item.userId,
    //         createByName: item.userName
    //       }
    //     })).then(data => {
    //       this.$message.success('保存成功')
    //       this.$refs.addEdit.close()
    //       this.$emit('on-success')
    //     }, msg => {
    //       this.$alert(msg, '错误提示', {type: 'error'})
    //       this.$refs.addEdit.end()
    //     })
    //   } else {
    //     this.$refs.addEdit.end()
    //     this.$message.warning('请选择人员')
    //   }
    // }
    handleSubmit (selectNode) {
      this.$emit('on-success', selectNode)
      this.$refs.addEdit.close()
    },
    selval () {
      this.$refs.tgroups.getCheckedKeys()
    }
  }
}
</script>

<style lang="scss">
.add-edit{
  // position: relative;
  .el-dialog__body{
    position: relative;
  }
  .el-dialog{
    width: 400px !important;
  }
}
</style>

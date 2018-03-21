<template>
  <div class="file-upload-container" :style="{width: width + 'px'}">
    <el-upload
      :action="action"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :with-credentials="true"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        <slot name="tip"></slot>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      default: 400
    },
    value: {
      type: Array,
      default: () => []
    },
    action: {
      type: String
    }
  },
  data () {
    return {
      fileList: this.value.map(item => {
        return {
          name: item.name,
          url: item.url,
          status: 'finished'
        }
      })
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log('remove', file, fileList)
      let index = this.fileList.findIndex(item => item.uid === file.uid)

      if (index >= 0) {
        this.fileList.splice(index, 1)
      }
    },
    handleChange (file, fileList) {
      console.log('change', file, fileList)
    },
    handleSuccess (res, file, fileList) {
      console.log('success', res, file, fileList)

      this.fileList.push({
        name: file.name,
        status: file.status,
        url: res.data.path
      })
    }
  },
  watch: {
    fileList (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.file-upload-container{

  input[type="file"]{
    display: none;
  }

  display: inline-block;
  .el-upload__tip{
    line-height: 20px;
  }
  .el-upload-list__item .el-progress{
    top: 15px;
  }
}
</style>

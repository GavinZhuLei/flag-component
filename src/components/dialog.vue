<template>
<span class="custom-dialog-container">
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    ref="elDialog"
    :id="id"
    >

    <!-- <div v-if="loading" class="form-mask" :element-loading-text="loadingText" v-loading="loading"></div> -->

    <span v-if="show">
      <slot></slot>
    </span>

    <span slot="footer" class="dialog-footer" v-loading="loading"  :element-loading-text="loadingText">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >保存</el-button>
      </slot>
    </span>
  </el-dialog>
</span>  
</template>

<script>
export default {
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 600
    },
    form: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    show () {
      if (this.form) {
        return this.showForm
      } else {
        return true
      }
    }
  },
  data () {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false
    }
  },
  methods: {
    close () {
      this.dialogVisible = false
    },
    submit () {
      this.loading = true

      this.$emit('on-submit')
    },
    end () {
      this.loading = false
    }
  },
  mounted () {
    console.log(this.$refs.elDialog)

    let body = document.querySelector('#' + this.id + ' .el-dialog')

    if (body) {
      body.style.width = this.width + 'px'
    }

    console.log('body', body)
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.loading = false
        this.$emit('on-close')
        setTimeout(() => {
          this.showForm = false
        }, 300)
      } else {
        this.showForm = true
      }
    },
    visible (val) {
      this.dialogVisible = val
    }
  }
}
</script>

<style lang="scss">
.custom-dialog-container{
  .el-dialog__header{
      background: #eff2f3;
      height: 41px;
      line-height: 41px;
      text-align: center;
      padding: 0;
      border-bottom: 1px solid #e5e5e5;

      .el-dialog__title{
        font-size: 18px;
        font-weight: normal;
      }

      .el-dialog__headerbtn{
        font-size: 18px;
        margin: -7px 0 0 0;
      }
  }
  .el-dialog__footer{
    margin: 0 20px;
    border-top: 1px dashed #ccc;
    padding: 15px 0 16px;
    text-align: center;
    position: relative;

    .dialog-footer{
      display: block;

      .circular{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }

      .el-loading-text{
        display: inline-block;
        vertical-align: middle;
      }

      .el-loading-spinner{
        margin-top: -12px;
      }
    }

    button{
      width: 120px;
    }
  }
  .el-dialog__body{
    *{
      font-size: 12px
    }
  }

  .form-mask{
    position: absolute !important;
    left: 0;
    right: 0;
    top: 41px;
    bottom: 0px;
    z-index: 900;
    .el-loading-mask{
      background-color: rgba(255, 255, 255, .6);
    }
  }
}

</style>

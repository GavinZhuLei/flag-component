<template>
<span class="custom-upload" :class="{'is-up': showUp}">
  <el-upload :disabled="disabled" ref="uploadInput"
    :action="action"
    list-type="picture-card"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    :on-change="handleChange"
    :on-progress="handleProgress"
    :file-list="fileList"
    :accept="accept"
    :headers="headers"
    :with-credentials="true"
    :auto-upload="false"
    :on-error="handleError"
    >
    <i class="el-icon-plus"></i>
  </el-upload>
</span>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 1024
    },
    pixelSize: {
      type: Boolean,
      default: false
    },
    slice: {
      type: Object,
      default: () => {
        return {
          h: 512,
          w: 512
        }
      }
    },
    accept: {
      type: String,
      default: ''
    },
    action: String,
    crop: {
      type: Boolean,
      default: false
    },
    cropWidth: {
      type: Number,
      default: 200
    },
    cropHeight: {
      type: Number,
      default: 200
    },
    disabled: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      imgData: [],
      uploading: false,
      openCrop: false,
      cropImgUrl: '',
      cropper: null,
      cropImgElement: null,
      canvas: null,
      ctx: null,
      uploadUids: []
    };
  },
  computed: {
    fileList () {
      return [...this.imgData]
    },
    existFile () {
      return false
    },
    headers () {
      return {}
    },
    showUp () {
      return this.uploadUids.length < this.length
    }
  },
  created () {
    // if (this.imgData.url) {
    //   this.showUp = false
    // }

    this.imgData = [...this.value]
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file)
      let uid = file.uid
      let index = -1
      for (let i = 0; i < this.imgData.length; i++) {
        if (this.imgData[i].uid && this.imgData[i].uid === uid) {
          index = i
        }
      }
      if (index > -1) {
        this.imgData.splice(index, 1)
        this.uploadUids.splice(index, 1)
      }
      /*
      if (file.response) {
        let url = file.response.data.path

        let index = -1

        for (let i = 0; i < this.imgData.length; i++) {
          if (this.imgData[i].url && this.imgData[i].url === url) {
            index = i
          }
        }

      }
      */
      this.$emit('on-check')
    },
    handlePictureCardPreview (file) {
      this.$emit('on-preview', file.url)
    },
    handleSuccess (res, file, fileList) {
      console.log('-========================================-')
      console.log(res)
      if (this.imgData.length < this.length) {
        this.imgData.push({url: res.data ? res.data.path : ''})
      }
      // this.imgData.push({url: res.data.path})
      this.$emit('on-check')
      this.$emit('on-success', res)
    },
    handleBeforeUpload (file) {
      console.log('0000000000')
      console.log(file)
      // return false

      // this.$refs.uploadInput.handleProgress()
    },
    handleError (e, file, fileList) {
      console.log(e.message)
      this.$alert('图片上传失败', '错误提示', {type: 'error'})
    },
    handleChange (file, fileList) {
      console.log('change')
      console.log(file.name, file.status, file.uid)
      if (file.status === 'ready' && this.uploadUids.indexOf(file.uid) < 0 && this.uploadUids.length < this.length) {
        this.uploadUids.push(file.uid)
        return this._validateFile(file.raw)
      }
    },
    handleProgress (event, rawFile, fileList) {
    },
    _validateFile (file) {
      if (this.accept && this.accept.indexOf(file.type) === -1) {
        this.$alert(`图片格式不正确，请上传 ${this.accept} 格式`, '提示', {type: 'warning'})
        this.$refs.uploadInput.clearFiles()
        return false
      }

      if (file && file.size <= this.limit * 1024) {
        if (this.pixelSize) {
          var reader = new window.FileReader()
          var thisImage = new window.Image()
          reader.onload = () => {
            var url = reader.result
            thisImage.onload = () => {
              var height = thisImage.naturalHeight
              var width = thisImage.naturalWidth

              if (height === this.slice.h && width === this.slice.w) {
                this.$refs.uploadInput.submit()
              } else {
                this.$alert(`请上传尺寸为${this.slice.w}*${this.slice.h}的图片`, '提示', {type: 'warning'})
                this.$refs.uploadInput.clearFiles()
              }
            }
            thisImage.src = url
          }
          reader.readAsDataURL(file)
        } else {
          this.$refs.uploadInput.submit()
        }
      } else {
        this.$alert(`图片最大为${this.limit / 1024}M`, '提示', {type: 'warning'})
        this.$refs.uploadInput.clearFiles()
      }
    }
  },
  watch: {
    imgData: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    },
    value (val) {
      this.imgData = val
    }
  }
}
</script>

<style lang="scss">
$height: 400px;

.custom-upload{
  input[type="file"]{
    display: none;
  }

  .el-dialog__wrapper{
    overflow: unset !important;
  }

  .el-upload--picture-card{
    width: 96px;
    height: 96px;
    line-height: 96px;
    margin: 0 8px 8px 0;
    display: none;
    border-color: rgb(217, 194, 191);
    background: #fff;
  }

  .el-upload-list--picture-card .el-upload-list__item{
    border-color: rgb(217, 194, 191);
  }

  .el-progress-circle{
    width: 90px !important;
    height: 90px !important;
  }

  .el-upload-list--picture-card .el-progress{
    width: 90px !important;
    height: 90px !important;
  }

  .el-form-item__content{
    line-height: 0 !important;
  }

  &>div:nth-child(1){
    margin: 0;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    height: 104px;
    min-width: 104px;
  }

  ul>li{
    width: 96px !important;
    height: 96px !important;
  }

  &.is-up{
    .el-upload{
      display: inline-block;
    }
  }

}

.crop-container {
  position: fixed;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  background-color: #ffffff;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, .7);
  text-align: center;
  border-radius: 4px;
  z-index: 9999;

  .crop-img-container {
    max-width: 640px;
    max-height: 360px;
    width: 640px;
    height: 360px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .crop-canvas-container {
    position: absolute;
    left: -120px;
    top: 0;
    border: 1px dashed #fff;
    margin: 0;
    padding: 0;
    line-height: 0;
  }

  .crop-btn-close{
    position: absolute;
    right: -45px;
    top: 0;
    font-size: 20px;
    color: #fff;
    background: gray;
    padding: 10px;
    border-radius: 50%;
  }

  .crop-btn-save{
    position: absolute;
    right: -45px;
    top: 60px;
    font-size: 20px;
    color: #fff;
    background: gray;
    padding: 10px 5px;
    border-radius: 50%;
    width: 40px;
  }
}
</style>

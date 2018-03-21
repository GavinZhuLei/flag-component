<template>
<span class="custom-upload" :class="{'is-up': showUp && !existFile}">
  <el-upload :disabled="disabled" ref="uploadInput"
    :action="action"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    :on-change="handleChange"
    :on-progress="handleProgress"
    :accept="accept"
    :file-list="fileList"
    :headers="headers"
    :with-credentials="true"
    :auto-upload="false"
    :on-error="handleError"
    >
    <i class="el-icon-plus"></i>
  </el-upload>

  <div class="crop-container" v-if="openCrop">
    <div class="crop-img-container">
      <img :src="cropImgUrl" alt="Picture">
    </div>

    <div class="crop-canvas-container" :style="{'left': -cropWidth-10+'px'}">
      <canvas></canvas>
    </div>

    <el-button class="crop-btn-close" type="text" icon="close" @click="closeCrop"></el-button>
    <el-button class="crop-btn-save" type="text" icon="check" @click="saveCrop"></el-button>
  </div>
</span>
</template>

<script>
import Cropper from 'cropperjs'
import util from 'common/js/util'
// import co from 'co'
// import OSS from 'ali-oss'
// import { mapState } from 'vuex'
export default {
  props: {
    value: String,
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
      default: 'image/*'
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
    token: {
      type: String,
      default: window.localStorage.getItem('token') || util.cookie.get('token')
    }
  },
  data () {
    return {
      showUp: true,
      imgData: {url: this.value},
      uploading: false,
      image: new window.Image(),
      openCrop: false,
      cropImgUrl: '',
      cropper: null,
      cropImgElement: null,
      canvas: null,
      ctx: null,
      client: {}
    };
  },
  computed: {
    fileList () {
      if (this.imgData.url) {
        return [
          this.imgData
        ]
      } else {
        return []
      }
    },
    existFile () {
      return this.fileList.length > 0
    },
    headers () {
      if (this.token) {
        return {
          'X-token': this.token
        }
      }

      return {}
    }
    // ...mapState({
    //   OSS: state => state.OSS
    // })
  },
  created () {
    // require('styles/client/upload.scss')
    if (this.imgData.url) {
      this.showUp = false
    }
  },
  mounted () {
    // this.client = new OSS({
    //   region: this.OSS.region,
    //   // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    //   accessKeyId: this.OSS.readInfo.accessKeyId,
    //   accessKeySecret: this.OSS.readInfo.accessKeySecret,
    //   bucket: this.OSS.bucket
    // });
  },
  methods: {
    handleRemove (file, fileList) {
      this.imgData.url = ''
      this.$emit('on-check')
      this._setShowUp()
    },
    handlePictureCardPreview (file) {
      this.$emit('on-preview', file.url)
    },
    handleSuccess (res, file, fileList) {
      this.$set(this.imgData, 'url', res.data.rootPath + res.data.relativePath)
      // this.imgData.url = res.data.rootPath + res.data.relativePath
      this.$emit('on-check')
      this.$emit('on-success', res)
    },
    handleBeforeUpload (file) {
      console.log('######')
      console.log(file)
      // return false

      // this.$refs.uploadInput.handleProgress()
    },
    handleError (e, file, fileList) {
      console.log(e.message)
      this.$alert('图片上传失败', '错误提示', {type: 'error'})
      this._setShowUp()
    },
    handleChange (file, fileList) {
      this.showUp = false

      console.log(file)
      if (file.status === 'ready') {
        if (this.crop) {
          require('cropperjs/dist/cropper.css')
          return this._crop(file.raw)
        } else {
          return this._validateFile(file.raw)
        }
      }
    },
    handleProgress (event, rawFile, fileList) {
    },
    _setShowUp (time = 490) {
      setTimeout(() => {
        this.showUp = true
      }, time)
    },
    _validateFile (file) {
      if (this.accept && this.accept.indexOf(file.type) === -1) {
        this.$alert(`图片格式不正确，请上传 ${this.accept} 格式`, '提示', {type: 'warning'})
        this.handleRemove()
        this.$refs.uploadInput.clearFiles()
        return false
      }

      if (file && file.size <= this.limit * 1024) {
        if (this.pixelSize) {
          var reader = new window.FileReader()
          reader.onload = () => {
            var url = reader.result
            this.image.onload = () => {
              var height = this.image.naturalHeight
              var width = this.image.naturalWidth

              if (height === this.slice.h && width === this.slice.w) {
                this.$refs.uploadInput.submit()
              } else {
                this.$alert(`请上传尺寸为${this.slice.w}*${this.slice.h}的图片`, '提示', {type: 'warning'})
                this.handleRemove()
                this.$refs.uploadInput.clearFiles()
              }
            }
            this.imgSrc = url
            this.image.src = url
          }
          reader.readAsDataURL(file)
        } else {
          this.$refs.uploadInput.submit()
        }
      } else {
        this.$alert(`图片最大为${this.limit / 1024}M`, '提示', {type: 'warning'})
        this.handleRemove()
        this.$refs.uploadInput.clearFiles()
      }
    },
    _crop (file) {
      this.openCrop = true

      this.$nextTick(() => {
        return new Promise((resolve, reject) => {
          const reader = new window.FileReader()
          this.canvas = document.querySelector('.crop-container canvas')
          if (this.canvas) {
            this.canvas.width = this.cropWidth
            this.canvas.height = this.cropHeight
            this.ctx = this.canvas.getContext('2d')
            reader.onload = () => {
              const url = reader.result
              this.cropImgUrl = url
              this.image.src = url

              this.image.onload = () => {
                this.cropImgElement = document.querySelector('.crop-img-container img');
                this.cropper = new Cropper(this.cropImgElement, {
                  dragMode: 'move',
                  aspectRatio: 1,
                  autoCropArea: this.cropWidth / 640,
                  restore: false,
                  guides: false,
                  center: false,
                  highlight: false,
                  cropBoxMovable: false,
                  cropBoxResizable: false,
                  minCropBoxWidth: this.cropWidth,
                  minCropBoxHeight: this.cropHeight,
                  toggleDragModeOnDblclick: false,
                  crop: (e) => {
                    if (this.cropper) {
                      let canvasData = this.cropper.getCanvasData()
                      let cropData = this.cropper.getCropBoxData()

                      this.ctx.clearRect(0, 0, this.cropWidth, this.cropHeight)

                      this.ctx.drawImage(
                        this.cropImgElement,
                        0, 0, canvasData.naturalWidth, canvasData.naturalHeight, canvasData.left - cropData.left, canvasData.top - cropData.top, canvasData.width, canvasData.height
                      )
                    }
                  }
                })
              }
            }
            reader.readAsDataURL(file)
          }
        })
      })
    },
    closeCrop () {
      this.$refs.uploadInput.handleRemove()

      setTimeout(() => {
        this.openCrop = false
        this.image = new window.Image()
        this.cropImgUrl = ''
        this.cropper = null
        this.cropImgElement = null
        this.canvas = null
        this.ctx = null
      }, 200)
    },
    ossUpload () {
      // let imgdt = this.canvas.toDataURL()
      // let bytes = window.atob(imgdt.split(',')[1])
      // let ab = new window.ArrayBuffer(bytes.length)
      // let ia = new window.Uint8Array(ab)

      // for (let i = 0; i < bytes.length; i++) {
      //   ia[i] = bytes.charCodeAt(i)
      // }
      // let blob = new window.Blob([ab], {type: 'image/png'})
      // let bfile = new window.File([blob], 'blob.png')
      // let client = new OSS({
      //   region: this.OSS.region,
      //   // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
      //   accessKeyId: this.OSS.readInfo.accessKeyId,
      //   accessKeySecret: this.OSS.readInfo.accessKeySecret,
      //   bucket: this.OSS.bucket
      // });

      // co(function* () {
      //   // use 'chunked encoding'
      //   // var stream = fs.createReadStream('local-file');
      //   // var result = yield client.putStream('object-key', stream);
      //   // console.log(result);
      //   // don't use 'chunked encoding'
      //   var stream = fs.createReadStream(bfile);
      //   var size = fs.statSync(bfile).size;
      //   var result = yield client.putStream(
      //     'object-key', stream, {contentLength: size});
      //   console.log(result);
      // }).catch(function (err) {
      //   console.log(err);
      // });

      // co(function* () {
      //   var result = yield client.put(bfile, 'local-file');
      //   console.log(result);
      // }).catch(function (err) {
      //   console.log(err);
      // });
    },
    saveCrop () {
      console.log(this.$refs.uploadInput)
      // this.$refs.uploadInput.uploadFiles = []
      // this.imgData = {status: 'ready', url: this.canvas.toDataURL()}
      var imgdt = this.canvas.toDataURL()
      let bytes = window.atob(imgdt.split(',')[1])
      let ab = new window.ArrayBuffer(bytes.length)
      let ia = new window.Uint8Array(ab)

      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }

      let blob = new window.Blob([ab], {type: 'image/png'})

      let bfile = new window.File([blob], 'blob.png')

      this.$refs.uploadInput.clearFiles()
      this.$refs.uploadInput.handleStart(bfile)

      this.openCrop = false
      this.image = new window.Image()
      this.cropImgUrl = ''
      this.cropper = null
      this.cropImgElement = null
      this.canvas = null
      this.ctx = null

      setTimeout(() => {
        this._validateFile(bfile)
      }, 200)
    }
  },
  watch: {
    imgData: {
      deep: true,
      handler (val) {
        this.$emit('input', val.url)
      }
    },
    value (val) {
      this.imgData = {url: val}
    }
  }
}
</script>

<style lang="scss">

</style>

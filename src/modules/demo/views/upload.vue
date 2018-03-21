<template>
  <page title="图片上传" :menus="menus">
    <upload
      v-model="fileList"
      action="https://jsonplaceholder.typicode.com/posts/"
    ></upload>
  </page>
</template>

<script>
  import Page from 'components/Page'
  import {getMenu} from './menus'
  import Upload from 'components/ImgUpload'

  export default {
    components: {
      Page, Upload
    },
    data () {
      return {
        menus: getMenu('upload'),
        fileList: []
      }
    }
  }
</script>

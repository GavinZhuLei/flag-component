<template>
  <page title="文件上传" :menus="menus">
    <file-upload v-model="fileList" action="https://jsonplaceholder.typicode.com/posts/"></file-upload>
  </page>
</template>

<script>
  import Page from 'components/Page'
  import {getMenu} from './menus'
  import FileUpload from 'components/FileUpload'

  export default {
    components: {
      Page, FileUpload
    },
    data () {
      return {
        menus: getMenu('fileupload'),
        fileList: []
      }
    }
  }
</script>

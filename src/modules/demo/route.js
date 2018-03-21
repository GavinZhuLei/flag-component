import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './views/Index.vue'
import DataGrid from './views/dataGrid.vue'
import Dialog from './views/dialog.vue'
import Upload from './views/upload.vue'
import FileUpload from './views/fileUpload.vue'
import ImagePreview from './views/imagePreview.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/datagrid',
      meta: {title: '首页'}
    },
    {
      path: '/datagrid',
      component: DataGrid,
      name: 'datagrid',
      meta: {title: '数据表格'}
    },
    {
      path: '/dialog',
      component: Dialog,
      name: 'dialog',
      meta: {title: '弹框'}
    },
    {
      path: '/upload',
      component: Upload,
      name: 'upload',
      meta: {title: '图片上传'}
    },
    {
      path: '/fileupload',
      component: FileUpload,
      name: 'fileupload',
      meta: {title: '文件上传'}
    },
    {
      path: '/imagepreview',
      component: ImagePreview,
      name: 'imagepreview',
      meta: {title: '图片预览'}
    }
  ]
})

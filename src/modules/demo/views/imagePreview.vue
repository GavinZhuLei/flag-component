<template>
  <page title="图片预览" :menus="menus">
    <image-preview
      :imgs="['http://img.hb.aicdn.com/816a47bd943e4d3db58ae0ef7c4a3ed985b493336d07a-0dW9Vu_fw236',
        'http://img.hb.aicdn.com/5d823b31eb39089938bfc2636723b6acd2a123c71a7ee-QJeBfZ_fw236',
        'http://img.hb.aicdn.com/9d6f441cecc3dda4eb874f2b368cd3b615597d3224307-adlABF_fw236',
        'http://img.hb.aicdn.com/c54d1ce84fd40f07c9921ee57221e220ed1f1d6961d5-aDIEfg_fw236']"
    ></image-preview>
  </page>
</template>

<script>
  import Page from 'components/Page'
  import {getMenu} from './menus'
  import ImagePreview from 'components/ImagePreview'

  export default {
    components: {
      Page, ImagePreview
    },
    data () {
      return {
        menus: getMenu('imagepreview')
      }
    }
  }
</script>

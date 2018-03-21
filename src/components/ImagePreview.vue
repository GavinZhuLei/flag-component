<template>
  <div class="image-preview-wrp">
    <ul :id="id" ref="imgs">
      <li v-for="img in imgs" :key="img"><img :src="img"></li>
    </ul>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
require('viewerjs/dist/viewer.css')

export default {
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      viewer: null,
      id: 'image_preview_' + new Date().getTime()
    }
  },
  computed: {
    getId () {
      return this.id
    }
  },
  mounted () {
    this.view()
  },
  methods: {
    view () {
      let imgDom = window.document.querySelectorAll('#' + this.id + ' img')
      console.log('dom', imgDom)
      imgDom.forEach((item, index) => {
        console.log(item)
        item.onload = () => {
          console.log('img load end', index)
          this.viewer = null
          this.viewer = new Viewer(document.getElementById(this.id))
        }
      })
    }
  }
}
</script>

<style lang="scss">
.image-preview-wrp{
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    width: 90px;
    height: 90px;
    background: #ebebeb;
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 12px;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    cursor: zoom-in;

    img {
      vertical-align: middle;
      text-align: center;
      height: 100%;
    }
  }
}
</style>

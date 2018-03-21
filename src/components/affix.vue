<template>
  <div :style="styleOut">
    <div :class="[fixed ? 'fi-affix' : '']" :style="styleInner">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      styles: {
        type: Object,
        required: false
      },
      offsetTop: {
        type: String,
        default: '0',
        required: false
      },
      offsetBottom: {
        type: String,
        default: '0',
        required: false
      },
      target: {
        type: Object,
        default: function () {
          return { dom: window.document.body }
        },
        required: false
      }
    },
    data () {
      return {
        fixed: false,
        styleOut: '',
        styleInner: '',
        domWidth: '',
        domHeight: '',
        domoffsetTop: '',
        domoffsetLeft: ''
      }
    },
    created: function () {

    },
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        let _this = this
        _this.domoffsetTop = _this.$el.offsetTop
        _this.domoffsetLeft = _this.$el.offsetLeft
        _this.domTopFn()
        _this.domLeftFn()
        _this.target.dom.onscroll = function () {
          _this.scrollFn()
        }
      },
      scrollFn: function () {
        let top = this.target.dom.scrollTop
        let isfixed = top > this.domoffsetTop
        this.fixed = isfixed
        // console.log(this.styles)
        if (this.fixed && isfixed) {
          this.domWidth = this.$el.offsetWidth
          this.domHeight = this.$el.offsetHeight
          this.styleOut = {width: this.domWidth + 'px', height: this.domHeight + 'px'}
          this.styleInner = Object.assign({position: 'fixed', top: this.offsetTop + 'px', left: this.domoffsetLeft + 'px', width: this.domWidth + 'px'}, this.styles)
          isfixed = true
        } else {
          this.styleOut = ''
          this.styleInner = ''
          isfixed = false
        }
      },
      domTopFn: function (dom) {
        let _el = dom || this.$el
        let domoffsetPTop = _el.offsetParent.offsetTop
        if (domoffsetPTop) {
          this.domoffsetTop += domoffsetPTop
          this.domTopFn(_el.offsetParent)
        }
      },
      domLeftFn: function (dom) {
        let _el = dom || this.$el
        let domoffsetPLeft = _el.offsetParent.offsetLeft
        if (domoffsetPLeft) {
          this.domoffsetLeft += domoffsetPLeft
          this.domLeftFn(_el.offsetParent)
        }
      }
    }
  }
</script>
<style lang="scss">
</style>

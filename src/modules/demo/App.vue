<template>
  <div id="app" class="page-container">
    <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear>
      <router-view class="animated" v-flaginfo-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>

<script>
import 'common/js/directive'
export default {
  data () {
    return {}
  },
  created: function () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss">
  @import '~styles/main';

  html, body{
    min-height: 100%;
    background: #f7f7f7;
  }
  body{
    height: 100%;
  }
  .page-container {
      width: 100%;
      background: #f7f7f7;
      height: 100%;
  }
</style>

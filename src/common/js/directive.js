import Vue from 'vue'

// const ROUTERTITLE = document.title
Vue.directive('flaginfo-title', {
  bind: function (el, obj) {
    // let title = ROUTERTITLE
    // document.title = title.replace('{title}', (obj.value ? obj.value : ''))
    document.title = obj.value
    // 准备工作
    // 例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update: function (el, obj) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次
  },
  unbind: function (el, obj) {
    // 清理工作
    // 例如，删除bind()添加的事件监听器
  }
})

Vue.directive('wx-title', {
  bind: function (el, obj) {
    document.title = obj.value
    // document.title = obj.value ? obj.value : ''
  }
})

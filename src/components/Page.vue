<template>
  <div class="page-content-container">
    <div class="content-crumbs">
      <span>您当前的位置：</span>
      <template v-for="(crumb, index) in crumbsData">
        <span class="crumb-item" :key="index">{{crumb}}</span>
      </template>
    </div>
    <div class="content-wrp">
      <div class="content-menu">
        <ul>
          <li v-for="(item, index) in menus" :key="index" :class="{active: item.active}">
            
            <a href="javascript:;" @click="handleRoute(item.path, item.params)">{{item.name}}</a>
            
            <template v-if="item.children">
              <ul>
                <li class="sub-li" v-for="(item2, index) in item.children" :key="index" :class="{active: item2.active}">
                  <a href="javascript:;" @click="handleRoute(item2.path)">{{item2.name}}</a>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
      <div class="content-main">
        <div class="page-title">{{title}}</div>
        <div class="content-main-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      crumbs: []
    }
  },
  computed: {
    crumbsData () {
      return this.crumbs.reverse()
    }
  },
  created () {
    this.crumbs = []
    this.findObject(this.menus)
  },
  methods: {
    findObject (data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        this.crumbs.splice(0, 0, data[i].name)
        if (data[i].active) {
          return
        } else if (data[i].children) {
          this.findObject(data[i].children)
        } else {
          this.crumbs.splice(0, 1)
        }
      }
    },
    handleRoute (path, params) {
      if (path) {
        this.$router.push({name: path, params})
      }
    }
  },
  watch: {
    menus (val) {
      this.crumbs = []
      this.findObject(val)
    }
  }
}
</script>

<style lang="scss">
@import '~styles/base/vars.scss';
.page-content-container{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  width: 1200px;
  margin: 0 auto 20px;
  background: #fff;

  .content-crumbs{
    font-size: 12px;
    line-height: 30px;
    padding-top: 15px;
    background: #f7f7f7;

    .crumb-item{

      & + .crumb-item{
        &:before{
          content: '>>';
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
  }

  .content-wrp{
    border: 1px solid #dcdcdc;
    display: flex;

    .content-menu{
      width: 140px;
      border-right: 1px solid #dcdcdc;
      padding-top: 15px;
      padding-bottom: 20px;

      ul, li{
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      li {
        line-height: 42px;
        font-size: 14px;
        font-weight: normal;
        position: relative;

        &.active{
          &:before{
            background: #ec4740;
          }
          &>a{
            color: #ec4740;
          }
          
        }

        &:before{
          content: " ";
          position: absolute;
          top: 4px;
          left: 0;
          width: 3px;
          height: 34px;
          background: #fff;
        }
      }

      a{
        display: block;
        position: relative;
        text-decoration: none;
        margin-left: 25px;
      }

      .sub-li a{
        padding-left: 15px;

        &:after{
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          position: absolute;
          top: 20px;
          left: 3px;
          background: #DCDCDC;
        }
      }
    }

    .content-main{
      flex: 1;
      width: 1058px;
    }

    .page-title{
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      background: #f5f5f5;
      padding-left: 15px;
      border-bottom: 1px solid #dcdcdc;
    }

    .content-main-body{
      padding: 20px;
    }
  }

  .el-loading-mask{
    z-index: 99 !important;
  }
}
</style>

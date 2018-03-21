<template>
  <div class="gtmain">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      class="input-with-search"
      prefix-icon="el-icon-search">
      <el-button slot="append" type="primary" class="primaryBtn">搜索</el-button>
    </el-input>

    <el-tree
      class="gtcore-filter-tree"
      :data="groupData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="gdIdArr"
      :default-checked-keys="gdIdArr"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="gtcore">
    </el-tree>
  </div>
</template>

<script>
// import api from 'api/pc'
import { mapState } from 'vuex'

export default {
  props: {
    selectNode: {
      type: Array,
      default: () => {
        return []
      }
    },
    gdata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    let gdIdArr = []
    for (let gdId of this.gdata) {
      gdIdArr.push(gdId.id)
    }
    return {
      filterText: '',
      gdIdArr: gdIdArr,
      // groupData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      // groupData: [],
      // groupIds: 0
    };
  },
  created () {
    // this.handleGroupLoad(this.groupIds)
  },
  computed: {
    ...mapState({
      groupData: (state) => {
        return state.groupData || []
      }
    })
  },
  methods: {
    getCheckedKeys () {
      this.$emit('handleSubmit', this.$refs.gtcore.getCheckedNodes())
    },
    resetChecked () {
      this.$refs.gtcore.setCheckedKeys([]);
    },
    // handleGroupLoad (groupIds) {
    //   api.getAllchildrenGroups({
    //     groupId: groupIds
    //   }).then(data => {
    //     this.groupData = data
    //   }, msg => {
    //     this.groupData = []
    //     this.$message.error(msg)
    //   })
    // },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText (val) {
      this.$refs.gtcore.filter(val);
    },
    gdIdArr (val) {
      if (!val.length) this.resetChecked();
    }
  }
}
</script>
<style lang="scss" scoped>
.gtmain{
  background-color: #FAFBFD;
  border: 1px #EEE9E5 solid;
  border-radius: 3px;
  padding: 20px;
  .gtcore-filter-tree{
    margin-top: 20px;
  }
}

</style>
<style lang="scss">
button.el-button.primaryBtn.el-button--primary {
  color: #fff;
  background-color: #ec4741;
  border-color: #ec4741;
  height: 30px;
  border: 0;
  line-height: 30px;
  padding: 0 24px;
  border-radius: 2px;
}
.input-with-search {
  .el-input__icon{
    line-height: 34px;
    color: #555;
    font-weight: bold;
  }
}
</style>

<template lang="html">
  <div class="people-select">
    <el-dialog
      title="下一步处理人"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="select-btn">
        <el-radio-group v-model="selectItem">
          <el-radio :label="item.userName" :value="item.userId" v-for="(item, index) in peopleList" :key="index"></el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="select">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      dialogVisible: false,
      peopleList: [],
      selectItem: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {
    init(data) {
      this.dialogVisible = true
      this.peopleList = data
      this.selectItem = this.peopleList[0].userName
    },
    select() {
      if (this.selectItem === '') {
        this.$message.warning('请选择下一步处理人！')
        return ''
      }
      this.peopleList.forEach((el, i) => {
        if (el.userName === this.selectItem) {
          this.$emit('peopleSelect', {userId: el.userId, userName: el.userName})
        }
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

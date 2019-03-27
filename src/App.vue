<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  // 防止页面切换同一个组件时并不会触发vue的created或者mounted钩子
  // router-view 需要绑定 key
//   computed: {
//       key () {
//           return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
//       }
//   }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import '~@/assets/css/animate'
.el-table--mini td
  padding: 0 !important
.el-table .cell
  text-overflow: ellipsis !important
  overflow: hidden !important
  white-space: nowrap !important
.el-dialog__wrapper
  .el-icon-close
    &:before
      content: '\E607'
      font-size: 20px
    &:hover
      -webkit-animation:rotate .5s linear
      animation:rotate .5s linear
      -webkit-animation-fill-mode:forwards
      animation-fill-mode:forwards
</style>

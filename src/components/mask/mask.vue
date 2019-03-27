<template lang="html">
  <div class="mask" :style="getStyle" @click="hideMask">
    <img width="24" height="24" src="./loading.gif" alt="" v-show="showLoading">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    background: {
      type: String,
      default: ''
    },
    zIndex: {
      type: String,
      default: '10'
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getStyle () {
      return `z-index: ${this.zIndex};background: ${this.background}`
    }
  },
  methods: {
    hideMask () {
      this.$emit('hideMask')
    }
  }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
.mask
  width: 100%
  height: 100%
  z-index: 10
  position: absolute
  top: 0
  left: 0
  background: rgba(0,0,0,0.2)
  img
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>

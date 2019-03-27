<template>
<div>
  <el-dialog :title="dialogStatus" :visible.sync="pageVisible" :close-on-click-modal="false" fullscreen>
    <!-- <iframe frameborder="0" scrolling="no" :src="`imgUrl`" width="100%" style="border:0;height: 80vh"></iframe> -->
    <!-- <div class="img" v-html="imgUrl"></div> -->
    <img :src="imgUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      imgUrl: '',
      pageVisible: false,
      dialogStatus: '图片预览',
    };
  },
  methods: {
    init(imgUrl) {
      this.pageVisible = true
      this.imgUrl = imgUrl
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.img
  width: 100%;
  height: 100%;
</style>

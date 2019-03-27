<template>
  <div class="main">
      <div class="loading wave">404</div>
      <div class="not-found wave">Page Not Found</div>
      <p class="not-found-desc wave">抱歉！您访问的页面失联啦 ...</p>
      <div style="text-align:center;">
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" style="margin-left: 30px;" @click="$router.push({ name: 'home' })">进入首页</el-button>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  background: lightseagreen
    url("https://static.pexels.com/photos/5412/water-blue-ocean.jpg") no-repeat
    center center;
  background-size: cover;
  animation: fadein 4s;
  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);
  width: 100%;
  height: 100vh;
  display: inline-block;
  position: relative;
}
.loading {
  text-transform: uppercase;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 100pt;
  text-align: center;
  height: 120px;
  line-height: 110px;
  vertical-align: bottom;
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
  display: block;
}

@keyframes wave-animation {
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 200px bottom;
  }
}

@keyframes loading-animation {
  0% {
    background-size: 200px 0px;
  }
  100% {
    background-size: 200px 200px;
  }
}

.wave {
  background-image: url(~@/assets/img/404.jpg);
  -moz-background-clip: text;
  -o-background-clip: text;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 0px rgba(155, 255, 255, 0.06);
  animation: wave-animation 3s infinite linear,
    loading-animation 4s infinite linear alternate;
  background-size: 200px 100px;
  background-repeat: repeat-x;
  opacity: 1;
}

.not-found {
  text-align: center;
  font-size: 55px;
  margin-top: 350px;
  font-family: Arial;
  animation: wave-animation 2.5s infinite linear,
    loading-animation 10s infinite linear alternate;
}

.not-found-desc {
  text-align: center;
  font-size: 55px;
  margin-top: 50px;
  font-family: Arial;
  animation: wave-animation 2.5s infinite linear,
    loading-animation 10s infinite linear alternate;
}
</style>


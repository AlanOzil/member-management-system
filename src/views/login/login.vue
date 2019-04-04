<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h1 class="brand-info__text">会员管理系统</h1>
          <p class="brand-info__intro">
            <b>愿景：</b> 让全球设备接入数字世界
          </p>
          <p class="brand-info__intro">
            <b>使命：</b> 让连接更可靠,让设备更智能,让服务更真诚
          </p>
          <p class="brand-info__intro">
            <b>价值观：</b> 以客户为中心,以质量为基石,以人才为根本
          </p>
          <p class="brand-info__intro" style="margin-left: 20px;">（诚信正直 开放创新 简单可靠 艰苦奋斗 卓越共赢）</p>
        </div>
        <div class="login-main">
          <h3 class="login-title">登陆</h3>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
          >
            <el-form-item prop="keyword">
              <el-input v-model="dataForm.keyword" placeholder="手机号或邮箱登录"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="captcha">
                        <el-row :gutter="20">
                            <el-col :span="14">
                                <el-input v-model="dataForm.captcha" placeholder="验证码"></el-input>
                            </el-col>
                            <el-col :span="10" class="login-captcha">
                                <img :src="captchaPath" @click="getCaptcha()" alt="">
                            </el-col>
                        </el-row>
            </el-form-item>-->
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "@/api";
  import md5 from "js-md5";
  import { getUUID } from "@/utils";

  export default {
    data() {
      return {
        dataForm: {
          keyword: "",
          password: "",
          uuid: "",
          captcha: ""
        },
        dataRule: {
          keyword: [
            {
              required: true,
              message: "手机号或邮箱不能为空",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            }
          ],
          captcha: [
            {
              required: true,
              message: "验证码不能为空",
              trigger: "blur"
            }
          ]
        },
        captchaPath: ""
      };
    },
    created() {
      this.getCaptcha();
    },
    methods: {
      // 登录，提交表单
      dataFormSubmit() {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            var password = md5(this.dataForm.password);
            var params = {
              keyword: this.dataForm.keyword,
              password: password
              // uuid: this.dataForm.uuid,
              // captcha: this.dataForm.captcha
            };
            API.common.login(params).then(({ data }) => {
              if (data && data.code === 0) {
                this.$cookie.set("token", data.data.token, { expires: "10h" });
                this.$router.replace("/base/config/dictionary");
              } else {
                // this.getCaptcha();
                this.$message.error(data.message);
              }
            });
            // this.$router.replace("/base/config/dictionary");
          }
        });
      },
      // 获取验证码
      getCaptcha() {
        // 获取随机数
        this.dataForm.uuid = getUUID();
        // this.dataForm.uuid = Math.floor(Math.random() * 1000000);
        this.captchaPath = API.common.captcha(this.dataForm.uuid);
      }
    }
  };
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, 0.6);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url("~@/assets/img/login_bg.jpg");
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      height: 100%;
      //   box-sizing:border-box;
      padding: 30px 500px 30px 30px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .brand-info {
      //   margin: 220px 100px 0 90px;
      margin-top: 220px;
      color: #fff;
    }
    .brand-info__text {
      margin: 0 0 22px;
      font-size: 48px;
      font-weight: 400;
      //   text-transform: uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: 0.6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      box-sizing: border-box;
      min-height: 100%;
      height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 24px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }
</style>

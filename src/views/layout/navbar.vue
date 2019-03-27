<template>
  <nav class="site-navbar" :class="navbarClasses">
      <div class="site-navbar__header">
          <h1 class="site-navbar__brand" @click="$router.push({ name: 'home'})">
              <a class="site-navbar__brand-lg" href="javascript:;">鲁邦通供应链系统</a>
              <a class="site-navbar__brand-mini" href="javascript:;"></a>
          </h1>
      </div>
      <div class="site-navbar__body clearfix">
          <el-menu class="site-navbar__menu" mode="horizontal">
              <el-menu-item class="site-navbar__switch" index="0" @click="switchSidebarCollapseHandle()">
                <!-- <icon-svg name='zhedie'></icon-svg> -->
                <!-- <icon-svg class="iconfont" iconClass='mingxi'></icon-svg> -->
                <i class="iconfont icon-zhankai"></i>
              </el-menu-item>
          </el-menu>

          <el-menu :default-active="activeIndex" class="site-navbar__menu" mode="horizontal" active-text-color="#ffd04b">
              <template>
                <el-menu-item
                v-for="item in $store.state.allMenuList"
                :key="item.menuId"
                :index="item.menuId"
                @click="navItemHandler(item.url)">
                  <!-- <i :class="item.icon" style="margin-right: 5px"></i> -->
                  <i class="iconfont" :class="item.icon ? `icon-${item.icon}` : 'icon-jichuziliao'"></i>
                  <span style="margin: 0; font-size: 15px; line-height: 50px">{{item.name}}</span>
                </el-menu-item>
              </template>
          </el-menu>

          <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
                <!-- <el-menu-item class="site-navbar__lang" index="0">
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="fa fa-language"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
                        <el-dropdown-item command="en-US">英文</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-menu-item> -->

              <el-menu-item class="site-navbar__avatar" index="1">
                  <el-dropdown trigger="click" placement="bottom" :hide-on-click="false">
                    <span class="el-dropdown-link">
                      <!-- <img src="~@/assets/img/avatar.png" :alt="$store.state.user.name"> -->
                      <i class="fa fa-user-circle" style="font-size: 24px; vertical-align: middle;"></i>
                      {{ $store.state.user.name }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item> -->
                      <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
              </el-menu-item>
          </el-menu>
      </div>

      <!-- 弹窗，修改密码 -->
      <update-password v-if="updatePasswordVisible" ref="updatePassWord"></update-password>
  </nav>
</template>

<script>
import UpdatePassword from "./update-password";
import API from "@/api";
import { mapMutations } from "vuex";
import { getRouteNameByUrl } from "@/utils";
import isEmpty from "lodash/isEmpty";

export default {
  data() {
    return {
      updatePasswordVisible: false
    };
  },
  props: {
    activeIndex: String
  },
  components: {
    UpdatePassword
  },
  computed: {
    navbarClasses() {
      let type = this.$store.state.navbarLayoutType;
      return [
        !/\S/.test(type) || type === "dafault" ? "" : `site-navbar--${type}`
      ];
    }
  },
  methods: {
    // 切换侧边栏，水平折叠收起状态
    switchSidebarCollapseHandle() {
      this.SWITCH_SIDEBAR_COLLAPSE({
        collapse: !this.$store.state.sidebarCollapse
      });
    },
    // 修改密码
    updatePasswordHandle() {
      this.updatePasswordVisible = true;
      this.$nextTick(() => {
        this.$refs.updatePassWord.init();
      });
    },
    // 退出登录
    logoutHandle() {
      this.$confirm(`确定进行[退出]操作？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.location.href = `/logout`
        // API.common.logout().then(({ data }) => {
        //   if (data && date.code === 0) {
        //     this.DELETE_CONTENT_TABS([]);
        //     this.$cookie.delete("token");
        //     this.$router.replace({ name: "login" });
        //   }
        // });
      });
    },
    // 顶部导航点击事件
    navItemHandler (url) {
      this.$emit('navItemHandler', url);
    },
    // 语言切换
    handleCommand(command) {
      this.$confirm("确定切换语言吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.lang = command;
          this.$i18n.locale = this.lang; //关键语句
        })
        .catch(() => {
          this.$message({
            type: "info"
          });
        });
    },
    ...mapMutations([
      "SWITCH_SIDEBAR_COLLAPSE",
      "UPDATE_MENU_NAV_LIST",
      "DELETE_CONTENT_TABS"
    ])
  }
};
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  //   color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

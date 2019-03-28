<template>
  <div class="site-wrapper" :class="siteWarpperClasses" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <navbar :activeIndex='activeIndex' @navItemHandler='navItemHandler'></navbar>
      <sidebar :menuNavActive='menuNavActive'></sidebar>
      <div class="site-content__wrapper" :style="siteContentWarpperStyles">
        <main class="site-content" :class="{'site-content--tabs': routeIsTab}">
          <el-card v-if="!routeIsTab" :body-style="contentViewStyles">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-card>

          <content-tabs v-else class="content-tabs"></content-tabs>
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import ContentTabs from "./content-tabs";
import API from "@/api";
import { mapMutations } from "vuex";
import isEmpty from "lodash/isEmpty";
import { getRouteNameByUrl } from "@/utils";

export default {
  name: "layout",
  data() {
    return {
      loading: true,
      activeIndex: '',
      menuNavActive: ''
    };
  },
  components: {
    Navbar,
    Sidebar,
    ContentTabs
  },
  computed: {
    siteWarpperClasses() {
      return [{ "site-sidebar--collapse": this.$store.state.sidebarCollapse }];
    },
    siteContentWarpperStyles() {
      return [{ minHeight: this.$store.state.documentClientHeight + "px" }];
    },
    routeIsTab() {
      return this.$route.meta && this.$route.meta.isTab;
    },
    contentViewStyles() {
      var height = this.$store.state.documentClientHeight;
      height -= 50; // site-topbar
      height -= 15; // site-content padding-top
      height -= 15; // site-content padding-bottom
      height -= 2; // el-card border-top border-bottom
      height += "px";

      return [{ minHeight: height }];
    }
  },
  watch: {
    $route: "routeHandle"
  },
  created() {
    this.getUserInfo();
    this.loading = false;
    this.getNavList()
      .then ( () => {
        this.navRouteHandle(this.$route);
        this.routeHandle(this.$route);
      })
  },
  mounted() {
    this.resetDocumentClientHeight();
    window.onresize = () => {
      this.resetDocumentClientHeight();
    };
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.UPDATE_DOCUMENT_CLIENT_HEIGHT({
        height: document.documentElement["clientHeight"]
      });
    },
    // 获取当前管理员信息
    getUserInfo() {
      API.user.loginUser().then(({ data }) => {
        console.log(data)
        if (data.success) {
          console.log(data);
          // this.loading = false;
          // this.DELETE_CONTENT_TABS([]);
          this.UPDATE_USER_ID({ id: data.data.userId });
          this.UPDATE_USER_NAME({ name: data.data.ext.name });
          //this.$cookie.set('token', data.data.ext.token, {expires: `${data.expire || 0}s`});
          this.$cookie.set('token', data.data.ext.token);
        }
      });
    },
    // 获取顶部菜单导航
    getNavList() {
      return API.menu.nav().then(({ data }) => {
        if (data && data.success) {
          let menuData = data.data.filter(item => item.code === 'chain')[0].menusInfo[0].menuInfo;
          this.ALL_MENU_LIST(menuData)
        } else if (typeof(data) === 'string') {
          this.$router.push('/login')
        }
        else {
          this.ALL_MENU_LIST([]);
        }
      }).catch( (error) => {
        let message = error.message
        let code = error.code
        if (!code && message.indexOf('Network') > -1) {
          // window.location.href =
          // `/ssoclient/login`
          this.$router.push('/login')
        }
        this.$message.error('菜单获取失败，请重新登录！')
      });
    },
    // 顶部导航路由操作
    navRouteHandle (route) {
      let path = /[a-zA-Z]+/.exec(route.path + '')
      let menuData = this.$store.state.allMenuList.filter (item => item.url == ('/' + path))[0];
      this.activeIndex = menuData.menuId;
      this.getMenuNavList(menuData.url);
    },
    // 顶部导航点击事件
    navItemHandler (url) {
      var routeName = url + ''
      if (/\S/.test(routeName)) {
        this.$router.push(routeName)
        this.getMenuNavList(url)
      }
    },
    // 获取左侧菜单数据
    getMenuNavList (url) {
      let menuData = this.$store.state.allMenuList.filter( item => item.url == url)[0].menuInfo;
      this.UPDATE_MENU_NAV_LIST(menuData)
    },
    // 左侧菜单路由操作
    routeHandle(route) {
      if (route.meta && route.meta.isTab) {
        var tab = this.$store.state.contentTabs.filter(
          item => item.name === route.name
        )[0];
        // tab不存在
        if (isEmpty(tab)) {
          var menuNav = this.getMenuNavByRouteName(
            route.name,
            this.$store.state.menuNavList
          );
          if (!isEmpty(menuNav)) {
            tab = {
              id: menuNav.menuId,
              name: route.name,
              title: menuNav.name,
              type: "module",
              url: menuNav.url
            };
            this.ADD_CONTENT_TAB(tab);
          } else {
            return console.error("未能找到可用tab标签页！");
          }
        }
        this.menuNavActive = tab.id + "";
        this.UPDATE_CONTENT_TABS_ACTIVE_NAME({ name: route.name });
      }
    },
    // 获取菜单导航，根据路由名称
    getMenuNavByRouteName(name, menuNavList) {
      var temp = [];
      for (var i = 0; i < menuNavList.length; i++) {
        if (menuNavList[i].menuInfo && menuNavList[i].menuInfo.length >= 1) {
          temp = temp.concat(menuNavList[i].menuInfo);
        } else if (getRouteNameByUrl(menuNavList[i].url) === name) {
          return menuNavList[i];
        }
      }
      return temp.length >= 1 ? this.getMenuNavByRouteName(name, temp) : [];
    },
    ...mapMutations([
      "UPDATE_DOCUMENT_CLIENT_HEIGHT",
      "DELETE_CONTENT_TABS",
      "UPDATE_USER_ID",
      "UPDATE_USER_NAME",
      "UPDATE_MENU_NAV_LIST",
      "ADD_CONTENT_TAB",
      "UPDATE_CONTENT_TABS_ACTIVE_NAME",
      "ALL_MENU_LIST"
    ])
  }
};
</script>

<style lang="scss" scoped>
.content-tabs {
    .el-tabs__header {
      position: fixed;
      top: 50px;
      left: 230px;
      right: 0;
      z-index: 930;
      padding: 0 15px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
      background-color: #fff;
    }
    .el-tabs__nav-wrap {
      margin-bottom: 0;
      &:after {
        display: none;
      }
    }
    .el-tabs__content {
      padding: 0 15px 15px;
    }
  }
</style>

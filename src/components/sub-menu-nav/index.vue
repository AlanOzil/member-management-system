<template>
  <el-submenu
    v-if="menuNav.menuInfo && menuNav.menuInfo.length >= 1"
    :data-idx="menuNav.menuId + ''"
    :index="menuNav.menuId + ''">
    <template slot="title">
      <!-- <i :class="['site-sidebar__menu-icon', menuNav.icon ? menuNav.icon : 'fa fa-circle-o']"></i> -->
      <i class="iconfont" :class="menuNav.icon ? `icon-${menuNav.icon}` : 'icon-jichuziliao'"></i>
      <span>{{ generateTitle(menuNav.name) }}</span>
    </template>
    <sub-menu-nav
      v-for="item in menuNav.menuInfo"
      :key="item.menuId"
      :menu-nav="item">
    </sub-menu-nav>
  </el-submenu>
  <el-menu-item
    v-else
    :index="menuNav.menuId + ''"
    :data-idx="menuNav.menuId + ''"
    @click="gotoRouteHandle(menuNav)">
    <!-- <i :class="['site-sidebar__menu-icon', menuNav.icon ? menuNav.icon : 'fa fa-circle-o']"></i> -->
    <!-- <icon-svg icon-class="check-circle"/> -->
    <i class="iconfont" :class="menuNav.icon ? `icon-${menuNav.icon}` : 'icon-space'"></i>
    <span>{{ generateTitle(menuNav.name) }}</span>
  </el-menu-item>
</template>

<script>
  // import SubMenuNav from '../sub-menu-nav'
  // import '@/iconfont/svg/check-circle.svg'
  import { getRouteNameByUrl } from '@/utils'
  import { generateTitle } from '@/utils/i18n'
  export default {
    name: 'sub-menu-nav',
    props: {
      menuNav: Object,
      required: true
    },
    // components: {
    //   SubMenuNav
    // },
    methods: {
      // 跳转到菜单导航对应路由
      gotoRouteHandle (obj) {
        var routeName = obj.url + ''
        if (/\S/.test(routeName)) {
          // this.$router.push({ name: routeName })
          this.$router.push({path: routeName, params: {
            menuId: obj.menuId
          }})
        }
      },
      generateTitle
    }
  }
</script>
<style rel="stylesheet/styuls" scoped lang="stylus">
.icon-space
  &:after
    content: '1'
    display: inline
    color: transparent
</style>
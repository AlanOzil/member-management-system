<template>
  <aside class="site-sidebar" :class="sidebarClasses">
      <div class="site-sidebar__inner">
          <el-menu :default-active="menuNavActive" :collapse="$store.state.sidebarCollapse" :collapseTransition="false" class="site-sidebar__menu">
              <!-- <el-menu-item index="1-1" @click="$router.push({ name: 'home'})">
                  <i class="site-sidebar__menu-icon fa fa-home"></i>
                  
                  <span slot="title">{{$t('m.home')}}</span>
              </el-menu-item> -->
              <sub-menu-nav v-for="menuNav in $store.state.menuNavList" :key="menuNav.menuId" :menu-nav="menuNav"></sub-menu-nav>
          </el-menu>
      </div>
  </aside>
</template>

<script>
import SubMenuNav from "@/components/sub-menu-nav";

export default {
  data() {
    return {
      
    }
  },
  props: {
    menuNavActive: String
  },
  components: {
    SubMenuNav
  },
  computed: {
    sidebarClasses() {
      let skin = this.$store.state.sidebarLayoutSkin;
      return [
        !/\S/.test(skin) || skin === "light" ? "" : `site-sidebar--${skin}`
      ];
    }
  }
};
</script>

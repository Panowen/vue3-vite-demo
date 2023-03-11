<template>
  <div id="Sidebar" class="reset-menu-style">
    <Logo :collapse="!sidebar.opened" />
    <el-scrollbar class="menu-column">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#2b2f3a"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!sidebar.opened"
        :default-active="activeMenu"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in allRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import { useBasicStore } from '@/store/basic';
import { storeToRefs } from 'pinia/dist/pinia';
import { useRoute } from 'vue-router';
const { allRoutes, sidebar } = storeToRefs(useBasicStore());

const routeInstance = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = routeInstance;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
<style lang="scss">
.el-menu-vertical {
  width: var(--side-bar-width);
}
.menu-column {
  background: var(--sidebar-logo-background);
}
.reset-menu-style {
  border-right: 1px solid var(--side-bar-border-right-color);
}
</style>

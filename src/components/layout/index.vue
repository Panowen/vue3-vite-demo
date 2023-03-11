<template>
  <div :class="classObj" class="layout-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <TagsView />
      <AppMain />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import Sidebar from './sidebar/index.vue';
import AppMain from './app-main/index.vue';
import Navbar from './app-main/Navbar.vue';
import TagsView from './app-main/TagsView.vue';
import { useBasicStore } from '@/store/basic';
const { sidebar } = useBasicStore();
const classObj = computed(() => {
  return {
    closeSidebar: !sidebar.opened,
  };
});
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  transition: margin-left var(--sideBar-switch-duration);
  margin-left: var(--side-bar-width);
  position: relative;
}
.sidebar-container {
  transition: width var(--sideBar-switch-duration);
  width: var(--side-bar-width) !important;
  background-color: var(--el-menu-bg-color);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: 0.5px solid var(--side-bar-border-right-color);
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>

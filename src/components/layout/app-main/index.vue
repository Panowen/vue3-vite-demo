<template>
  <div class="app-main show-tag-view">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBasicStore } from '@/store/basic';
import { storeToRefs } from 'pinia/dist/pinia';
const { cachedViews } = storeToRefs(useBasicStore());
const route = useRoute();
const key = computed(() => route.path);

let cacheGroup = [];
const basicStore = useBasicStore();
watch(
  () => route.name,
  () => {
    //缓存组处理
    if (cacheGroup.length) {
      if (!cacheGroup.includes(route.name)) {
        cacheGroup.forEach((item) => {
          basicStore.delCachedView(item);
        });
      }
    }
    if (route.meta?.cacheGroup) {
      cacheGroup = route.meta?.cacheGroup || [];
      cacheGroup.forEach((fItem) => {
        basicStore.addCachedView(fItem);
      });
    }
    if (route.name) {
      if (route.meta?.cachePage) {
        basicStore.addCachedView(route.name);
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.app-main {
  padding: 10px;
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
  background-color: var(--app-main-background);
}
.show-tag-view {
  height: calc(100vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)}) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

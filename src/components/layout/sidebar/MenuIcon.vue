<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[meta.elSvgIcon]" />
  </el-icon>
</template>

<script setup>
import * as ElSvg from '@element-plus/icons-vue';
defineProps({
  meta: { type: Object, default: null },
});
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  right: 3px;
  font-size: var(--sidebar-el-icon-size);
  text-align: left !important;
}
</style>

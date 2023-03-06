<template>
  <div style="padding: 0 12px" @click="toggleClick">
    <el-icon v-if="isActive" class="el-svg-icon">
      <component :is="Fold" />
    </el-icon>
    <el-icon v-else class="el-svg-icon">
      <component :is="Expand" />
    </el-icon>
  </div>
</template>

<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggleClick'])
//切换左侧栏关闭和隐藏
const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style scoped lang="scss">
.hamburger-style {
  color: #fff;
  width: 20px;
  height: var(--hamburger-height);
  cursor: pointer;
}

.hamburger-style.is-active {
  transform: rotate(180deg);
}
</style>

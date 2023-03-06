<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade">
      <img class="sidebar-logo" src="@/assets/indexLogo.png" alt="logo" />
    </transition>
  </div>
</template>

<script setup>
defineProps({
  //是否折叠
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss">
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: var(--sidebar-logo-background);
  padding-left: 14px;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo {
    fill: currentColor;
    color: var(--sidebar-logo-color);
    width: var(--sidebar-logo-width);
    height: var(--sidebar-logo-height);
    vertical-align: middle;
    margin-right: 12px;
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>

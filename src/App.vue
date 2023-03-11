<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useBasicStore } from '@/store/basic';

onMounted(() => {
  const basicStore = useBasicStore();
  basicStore.setRoutes();
});
</script>

<style scoped></style>

<template>
  <div @click="click">2</div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const click = () => {
  router.push({
    path: '/nested/menu2/m/2',
  });
};
</script>

<style lang="scss" scoped></style>

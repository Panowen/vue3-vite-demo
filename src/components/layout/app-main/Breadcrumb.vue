<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1" class="no-redirect">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { compile } from 'path-to-regexp';
const levelList = ref();
const route = useRoute();
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta?.title);
  levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
};

//页面跳转处理
//compile函数将返回一个用于将参数转换为有效路径的函数：
//const  toPath =  compile ( "/user/:id" ,  {  encode : encodeURIComponent  } ) ;
//toPath ( {  id : 123  } ) ; //=> "/user/123"
const pathCompile = (path) => {
  const { params } = route;
  const toPath = compile(path);
  return toPath(params);
};
const router = useRouter();
const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  if (path) router.push(pathCompile(path));
};
watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: var(--breadcrumb-no-redirect);
    cursor: text;
  }
}
</style>

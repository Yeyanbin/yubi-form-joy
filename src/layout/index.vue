<template>
  <n-space vertical size="large">
    <n-layout has-sider sider-placement="right" style="height: 100vh;">
      <n-layout-content>
        <router-view></router-view>
      </n-layout-content>
      <n-layout-sider
        v-if="!isSingle"
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="180"
        :native-scrollbar="false"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :on-update:value="handleUpdateValue"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router';
import { routes } from '../router';
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const router = useRouter();
const route = useRoute();

const isSingle = computed(() => {
  console.log('currentRoute', router.currentRoute.value)
  return router.currentRoute.value.meta?.isSingle || false;
});

const menuOptions = (routes as Array<RouteRecordRaw>).map((route) => {
  const menuItem = {};
  if(route.children) {
    const parentPath = route.path;
    Object.assign(menuItem, 
      { children: route.children.map(
        child => ({ 
          label: child.meta?.title || child.name || child.path,
          key: `${parentPath}/${child.path}`,
          ...(child.meta?.icon && { icon: child.meta.icon })
        })) 
      });
  }
  Object.assign(menuItem, 
    {
      label: route.meta?.title || route.name || route.path,
      key: route.path,
      ...(route.meta?.icon && { icon: route.meta.icon })
    });
  return menuItem;
});

const handleUpdateValue = (key, menuOption) => {
  console.log(key, menuOption);
  router.push(key);
}
</script>

<style scoped>

</style>

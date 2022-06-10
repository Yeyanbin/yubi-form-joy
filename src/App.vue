<script setup lang="ts">
import Layout from "./layout/index.vue";
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)
</script>

<template>
    <!-- 调整 naive-ui 的字重配置 -->
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }" :hljs="hljs">
    <Layout></Layout>
  </n-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

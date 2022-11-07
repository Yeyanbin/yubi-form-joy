

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox size="small" label="小" />
    <n-checkbox size="medium" label="中" />
    <n-checkbox size="large" label="大" />
    <n-button size="small" @click="disabled = !disabled">
      禁用
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
const disabled = ref(false)

</script>

<style lang="scss" scoped>
.schema-item-warp {
  border: 1px solid rgb(239, 239, 245);
  padding: 5px 10px;
}

.opr-content-list-wrap {
  border: 1px solid rgb(239, 239, 245);
  padding: 10px 10px;
  width: auto;
}

.schema-opr-wrap {
  display: flex;
}

.opr-state-wrap {
  display: flex;
}
</style>
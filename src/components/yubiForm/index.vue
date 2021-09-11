<template>
  <div>
    <n-form
      v-bind="formConfig"
      :model="formValue"
      :rules="props.rules"
      ref="formRef"
      inline>

    </n-form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { formConfig } from './config';

const props = defineProps({
  rules: Array,
  content: Array,
  state: Object,
})

const formValue = ref({});
</script>

<style scoped>

</style>

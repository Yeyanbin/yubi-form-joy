<template>
  <n-form
    v-bind="formConfig"
    :model="formValue"
    :rules="props.rules"
    ref="formRef"
    inline>
    <n-form-item style="min-width: 150px;" v-for="item of formItemList" v-bind="item">
      <component v-bind="item" :is="item.component" v-model:value="formValue[item.path]">
        {{ item.inner }}
      </component>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">

import { computed, DebuggerEvent, onMounted, ref, watch } from 'vue';
import { getDefaultFormValue, handleContent } from './common';
import { formConfig } from './config';
import useExpressionCompute from './hooks/useExpressionCompute';

const props = defineProps({
  rules: Object,
  content: Array,
  state: Object,
  customComponents: Object,
})

const emit = defineEmits(['change', 'update'])
const formValue = ref(getDefaultFormValue(props.content, props.state));

const formItemList = computed(() => {
  console.log('handleContent')
  // const _formValue = formValue;
  return handleContent(props.content, useExpressionCompute(props.state, formValue.value))
}, {
  onTrack: (event: DebuggerEvent) => {
    console.log('track', event);
  },
  onTrigger: (event: DebuggerEvent) => {
    console.log('trigger', event);
  }
});

/**
 * 未测试
 */
watch(formItemList, (value) => {
  console.log('formItemListUpdate', value);
  emit('change', {
    formValue: formValue.value,
    formItemList: value,
  });
});

watch(formValue.value, (value) => {
  console.log('formValueUpdate', value);
  emit('update', {
    formValue: value,
    formItemList: formItemList.value,
  })
})


onMounted(() => {
  console.log('formItemList', formItemList.value);
});

</script>

<style scoped>

</style>

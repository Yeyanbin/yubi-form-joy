<template>
  <n-form
    v-bind="{
      ...formConfig,
      ...props.config,
    }"
    :model="formValue"
    :rules="props.rules"
    ref="formRef"
    inline>
    <n-grid :cols="10">
      <n-grid-item span="2" v-bind="item.layout" v-for="item of formContent" style="padding: 5px 10px;">
        <n-form-item v-bind="item" :prop="item.path">
          <component v-bind="item" :is="props.customComponents[item.component] ?? item.component" v-model:value="formValue[item.path]" :updateValue="(v) => updateValue(item.path, v)">
            {{ item.inner }}
            <template v-for="child of item.childList">
              <component :is="child.component" v-bind="child">
                {{ child.inner }}
              </component>
            </template>
          </component>
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">

import { computed, DebuggerEvent, onMounted, ref, watch } from 'vue';
import { getDefaultFormValue } from '../../libs/schemaHooks/utils';

import { formConfig } from './config';
import useFormContent from '../../libs/schemaHooks/useFormContent';
import useExpressionCompute from '../../libs/schemaHooks/useExpressionCompute';

import { FormRules } from 'naive-ui';

interface IProps {
  rules?: FormRules,
  content: ISchemaItem[],
  state?: Object,
  customComponents?: Object,
  config?: Object,
}

const props = withDefaults(defineProps<IProps>(), {
  rules: () => ({}),
  state: () => ({}),
  customComponents: () => ({}),
  config: () => ({}),
});

const emit = defineEmits(['change', 'update'])
const formValue = ref(getDefaultFormValue(props.content, props.state));

watch(props, () => {
  console.log('watch')
  formValue.value = getDefaultFormValue(props.content, props.state);
});

const updateValue = (path, v) => {
  const data = formValue.value;
  data[path] = v;
  formValue.value = data;
};

const formContent = computed(() => {
  console.log('handleContent, changeFormItemList')
  const newExpressComputeValue = useExpressionCompute(props.state, formValue.value)
  return useFormContent(props.content, newExpressComputeValue);
}, {
  onTrack: (event: DebuggerEvent) => {
    // console.log('track', event);
  },
  onTrigger: (event: DebuggerEvent) => {
    // console.log('trigger', event);
  }
});

/**
 * formContent更新，给外部组件提供change钩子
 */
watch(formContent, (value) => {
  console.log('formContentUpdate', value);
  // formValue.value = 
  emit('change', {
    formValue: formValue.value,
    formContent: value,
  });
});

/**
 * 表单值更新，提供update钩子
 */
watch(formValue.value, (value) => {
  console.log('formValueUpdate', value);

  const newFormContentValue = useFormContent(props.content, useExpressionCompute(props.state, value));
  console.log('form content', newFormContentValue);
  // formContent.value = handleContent(props.content, useExpressionCompute(props.state, value));
  emit('update', 
    value,
  )
})


onMounted(() => {
  console.log('formContent', formContent.value);
  emit('update', formValue.value);
});

</script>

<style scoped>

</style>

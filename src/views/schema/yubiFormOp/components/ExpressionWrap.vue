

<!--  -->
<template>
  <n-radio-group v-model:value="state" name="radiogroup">
    <n-space>
      <n-radio :value="ValueStateMap.NORMAL_VALUE">
        值
      </n-radio>
      <n-radio :value="ValueStateMap.EXPRESSION">
        表达式
      </n-radio>
    </n-space>
  </n-radio-group>
  <template v-if="state === ValueStateMap.EXPRESSION">
    <n-card>
        <YubiForm :config="oprConfig" :content="expressionEditContent" @update="onUpdateValue"></YubiForm>
    </n-card>
  </template>
  <template v-else>
    <component :is="innerComponent" v-bind="innerAttr" v-model:value="componentValue" @update:value="onUpdateValue"></component>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { expressionEditContent } from '../config';
import YubiForm from '../../../../components/yubiForm/index.vue';

const oprConfig = {
  labelPlacement: "left",
  labelWidth: '80px',
};

interface Props {
  innerComponent: Object,
  innerAttr: Object,
  value: any,
}

const { innerComponent, innerAttr, value } = withDefaults(defineProps<Props>(), {
  value: ''
});

const componentValue = ref(value);


const emit = defineEmits(['updateValue', 'update:value'])

const ValueStateMap = {
  EXPRESSION: 1,
  NORMAL_VALUE: 2,
}
const state = ref(typeof value === 'object' ? ValueStateMap.EXPRESSION : ValueStateMap.NORMAL_VALUE);

const onUpdateValue = (v) => {
  emit('updateValue', v);
}

</script>

<style scoped>

</style>

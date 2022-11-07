<template>
  <div style="height: 80px; padding: 5px 20px;">
    <n-alert v-if="isDraging" title="提示" type="info">
      <template #icon>
        <n-icon>
          <ios-airplane />
        </n-icon>
      </template>
      按Esc结束拖拽
    </n-alert>
  </div>
  <div style="display: flex">
    <div>
      <n-card title="按钮" class="drag-components-container">
        <component is="n-button" :[componentDataKey]="JSON.stringify({
          componentName: 'n-button',
          innerHTML: 'Default',
        })" id="componentButton">Default</component>
        <component is="n-button" :[componentDataKey]="JSON.stringify({
          componentName: 'n-button',
          otherAttrs: { type: 'primary', },
          innerHTML: 'Primary',
        })" id="componentButton" type="primary">Primary</component>
        <component is="n-button" :[componentDataKey]="JSON.stringify({
          componentName: 'n-button',
          otherAttrs: {
            type: 'info',
          }, 
          innerHTML: 'Info',
        })" id="componentButton" type="info">Info</component>
        <component is="n-button" :[componentDataKey]="JSON.stringify({
          componentName: 'n-button',
          otherAttrs: { type: 'warning', },
          innerHTML: 'Warning',
        })" id="componentButton" type="warning">Warning</component>
        <component is="n-button" :[componentDataKey]="JSON.stringify({
          componentName: 'n-button',
          otherAttrs: {
            type: 'error',
          }, 
          innerHTML: 'Error',
        })" id="componentButton" type="error">Error</component>
      </n-card>
      <n-card title="开关" class="drag-components-container">
        <n-switch id="dragSwitch" :[componentDataKey]="JSON.stringify({
          componentName: 'n-switch',
          otherAttrs: {
            round: false,
          },
        })" :round="false">
        </n-switch>
        <n-switch id="dragSwitch" :[componentDataKey]="JSON.stringify({
          componentName: 'n-switch',
          otherAttrs: {
          }
        })">
        </n-switch>
      </n-card>
    </div>
    <div>
      <NCard title="吸附测试" style="margin-left: 20px;height: 500px;width: 800px;" class="canvas">
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
        <dragBlockVue @dragIn="dragIn"></dragBlockVue>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import dragBlockVue from './dragBlock.vue';
import { IosAirplane } from '@vicons/ionicons4'
import { NCard } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { useDrag, getComponentDataKey } from '../../libs/yubiDrag/index';

const test = 'unchecked';

const componentDataKey = getComponentDataKey();
const isDraging = ref(false);
let drag;

onMounted(() => {
  const switchList = document.querySelectorAll('#dragSwitch') as any;
  const buttonList = document.querySelectorAll('#componentButton') as any;
  // console.log('componentButtonRef', componentButtonRef, componentButtonRef.value)
  drag = useDrag([...buttonList, ...switchList], {
    onMoveStart: () => {
      isDraging.value = true;
    },
    onMoveEnd: (data) => {
      console.log('on move end', data);
      isDraging.value = false;
    }
  });
})

const dragIn = (init) => {
  init(drag.stop());
};
</script>

<style scoped>
.text-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.drag-components-container {
  width: 500px;
  margin: 5px 10px;
}

.drag-components-container * {
  margin: 5px 10px;
}

.canvas * {
  margin: 5px;
}
</style>

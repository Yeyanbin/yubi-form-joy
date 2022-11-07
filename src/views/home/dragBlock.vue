
<template>
  <div>
    <template v-if="!!componentData">
      <component :is="componentData.componentName" v-bind="componentData.otherAttrs">
        {{ componentData.innerHTML }}
      </component>
    </template>
    <template v-else>
      <div class="drag-container" @click="dragClick">
        <p>可拖拽区域</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const componentData = ref();
const emit = defineEmits(['dragIn'])

const dragClick = () => {
  const init = (data) => {
    console.log(data)
    componentData.value = data;
  };
  console.log('dragClick')
  emit('dragIn', init);
};



</script>

<style scoped>
.drag-container {
  background-color: #dbdbdb;
  border: 0.5px solid #7a7a7a;
  border-radius: 5px;
  max-width: 200px;
  max-height: 50px;
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

p {
  user-select: none;
}

</style>

<template>
  <div class="operation-container">
    <div>
      <n-input       
        v-model:value="originText"
        type="textarea"
        :maxlength="300"
        placeholder="基本的 Textarea"></n-input>
    </div>
    <div>
      <n-button type="tertiary" @click="run">生成动画</n-button>
    </div>

  </div>
  <div class="text-container">
    <!-- {{content}} -->
    <template v-for="line of content">
      <div>
        <template v-for="text of line.words">
          {{text}}
        </template>
        <span class="letter-container" v-if="line.inputs.length > 0">
          <template v-for="letter of line.inputs">
            {{letter}}
          </template>
        </span>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import textLoading, { ITextLine } from '../../libs/textLoading';

const originText = ref(
`世人万千种，
浮云莫去求，
斯人若彩虹，
遇上方知有。`);

const content = ref<ITextLine[]>([]);

const run = () => {
  content.value = [];
  console.log('生成动画：', originText);
  textLoading(originText.value,
    {
      update: (texts: ITextLine[]) => {
        content.value = [...texts];
        console.log('update', content.value)
      }
    }
  )
};


watch(content, (val) => {
  console.log('content change', val);
})

</script>

<style scoped>

.text-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.operation-container {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-align: left;
}

.letter-container {
  background-color: #e7e7e7;
  font-size: 12px;
  border-radius: 5px;
  padding: 1px;
}
</style>

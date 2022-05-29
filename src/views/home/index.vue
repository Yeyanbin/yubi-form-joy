<template>
  <h2>this is home page!</h2>
  <n-button>test</n-button>
  <n-switch>
    <template #checked>自然赠予你，树冠 微风 肩头的暴雨</template>
    <template #unchecked>片刻后生成，平衡 忠诚 不息的身体</template>
  </n-switch>
  <div class="text-container">
    <!-- {{content}} -->
    <template v-for="line of content">
      <div>
        <template v-for="text of line">
          {{text}}
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import textLoading from '../../libs/textLoading';

const originText = 
// `我好不容易心动一次,
// 你却让我输的那么彻底。 
// 焯焯焯焯焯焯！！！`

// `我喜欢你，
// 怕别人窥探，
// 怕别人得知。`

`世人万千种，
浮云莫去求，
斯人若彩虹，
遇上方知有。`

const content = ref<string[][]>([]);

textLoading(originText,
  {
    update: (texts) => {
      // content.value = [...texts];
      console.log('update', content.value)
    }
  }
)

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
</style>

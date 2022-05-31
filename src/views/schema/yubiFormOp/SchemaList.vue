
<template>
  <n-scrollbar style="width: 600px;height: 80vh;">
    <n-card title="表单内容项">
      <n-collapse>
        <template v-for="item, index of schemaList">
          <n-collapse-item :name="index" class="schema-item-wrap">
            <template #header>
              <template v-for="param in ['component', 'label', 'path']">
                <n-text v-if="typeof item[param] !== 'object' && item[param] !== undefined">
                  {{`${item[param]}-`}}
                </n-text>
              </template>
            </template>
            <template #header-extra>
              <n-button-group size="small">
                <n-button type="primary" round @click.stop="() => activate(item, index)">
                  修改
                </n-button>
                <n-button type="error">
                  删除
                </n-button>
                <n-button type="default">
                  复制
                </n-button>
              </n-button-group>
            </template>

            <n-code :code="`{\n${transContentArray(item).join('')}}`" language="json" />
          </n-collapse-item>
        </template>

      </n-collapse>
    </n-card>
  </n-scrollbar>
  <n-drawer v-model:show="active" placement="right" width="calc(100vw - 600px)">
    <n-drawer-content>
      {{modifyIndex}}
      {{modifyData}}
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { schemaContent } from './config';

const active = ref(false)
const activate = (item: ISchemaItem, index: number) => {
  active.value = true;
  modifyData.value = item;
  modifyIndex.value = index;
};
const modifyData = ref<ISchemaItem>();
const modifyIndex = ref<number>();
const schemaList = ref<ISchemaItem[]>(schemaContent);

const testObj = {
  component: "NInput",
  label: {
    expression: "{type}",
    type: "string"
  },
  type: "textarea",
  layout: {
    span: {
      value: "5",
      type: "number"
    }
  },
  path: "remark",
  test: "testValue",
  number: 1,
  testArray: [
    {
      label: "Drive My Car",
      value: "song1"
    },
    {
      label: "Norwegian Wood",
      value: "song2"
    },
    {
      label: "You Won't See",
      value: "song3",
      disabled: true
    },
    {
      label: "Nowhere Man",
      value: "song4"
    },
    {
      label: "Think For Yourself",
      value: "song5"
    }
  ]
}


const DEFAULT_TAB = '  ';
const getTabString = (time = 1) => {
  return DEFAULT_TAB.repeat(time);
}

const transContentArray = (object, deep = 1): any[] => {
  console.log('transContentArray', object, deep)
  const contentArray = [];
  const keys = Object.keys(object);
  const keysLength = keys.length;
  keys.forEach((key, index) => {
    console.log(key, index)
    if (typeof object[key] === 'object') {
      // array
      if (Array.isArray(object[key])) {
        contentArray.push(`${getTabString(deep)}"${key}": [\n`);
        const valueLength = object[key].length;
        object[key].forEach((item, arrIndex) => {
          contentArray.push(`${getTabString(deep + 1)}{\n${transContentArray(item, deep + 2).join('')}${getTabString(deep + 1)}${arrIndex !== valueLength - 1 ? '},\n' : '}'}`);
        });
        contentArray.push(`\n${getTabString(deep)}]${index !== keysLength - 1 ? ',' : ''}\n`);
      } else {
        // object
        contentArray.push(`${getTabString(deep)}"${key}": {\n${transContentArray(object[key], deep + 1).join('')}${getTabString(deep)}}${index !== keysLength - 1 ? ',' : ''}\n`);
      }
    } else {
      contentArray.push(`${getTabString(deep)}"${key}": ${typeof object[key] === 'string' ? `"${object[key]}"` : object[key]}${index !== keysLength - 1 ? ',' : ''}\n`)
    }
  });

  return contentArray;
}


// const testContent = `{\n${transContentArray(testObj).join('')}}`

// const testContent = `
// {
//   "component": "NInput",\n  label: {
//     "expression": "{type}",
//     "type": "string"
//   },
//   "type": "textarea",
//   "layout": {
//     "span": {
//       value: "5",
//       "type": "number"
//     }
//   },
//   "path": "remark"
// }`;


ref();

</script>

<style lang="scss" scoped>
.schema-item-warp {
  border: 1px solid rgb(239, 239, 245);
  padding: 5px 10px;
}
</style>
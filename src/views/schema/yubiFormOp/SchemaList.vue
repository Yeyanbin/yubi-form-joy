
<template>
  <div class="schema-opr-wrap">  
    <n-card title="表单项编辑" :contentStyle="'padding: 0'" header-style="height: 50px">
      <n-scrollbar style="height: 70vh;">
        <n-collapse class="opr-content-list-wrap">
          <template v-for="item, index of schemaList">
            <n-collapse-item :name="index" class="schema-item-wrap">
              <template #header>
                <n-text>
                  {{['component', 'label', 'path'].filter((key) => typeof item[key] === 'string').map((key) => item[key]).join('-')}}
                </n-text>
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
      </n-scrollbar>
      <n-card title="表单初始状态编辑" :contentStyle="'padding: 0 10px'" header-style="height: 50px">
        <div class="opr-state-wrap">
          <div>
            <n-button @click="updateOprState">
              保存
            </n-button>
          </div>
          <n-input style="height: calc(30vh - 110px)" type="textarea" v-model:value="oprPreviewStateModify"></n-input>
        </div>
      </n-card>
    </n-card>
    <n-card title="表单预览">
      <YubiForm :config="oprConfig" :content="schemaList" :state="oprPreviewState">
      </YubiForm>
    </n-card>
  </div>

  <n-drawer v-model:show="active" placement="right" width="calc(100vw - 600px)">
    <n-drawer-content>
      <YubiForm :config="oprConfig" :customComponents="customComponents" :content="itemEditContent" @update="updateFormValue" :state="oprFormState"></YubiForm>
      <div>
        {{oprFormValue}}
      </div>
      <NCard title="预览">
        <template #header-extra>
          <NButton @click="preview">更新预览</NButton>
          <NButton type="primary" @click="save">保存</NButton>
        </template>
        <YubiForm v-if="previewShowState" :config="oprConfig" :content="previewContent"></YubiForm>
      </NCard>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { itemEditContent, schemaContent } from './config';
import YubiForm from '../../../components/yubiForm/index.vue';
import ExpressionWrap from './components/ExpressionWrap.vue';

const active = ref(false);
const modifyData = ref<ISchemaItem>();
const modifyIndex = ref<number>();
const schemaList = ref<ISchemaItem[]>(schemaContent);

const defaultState = `{
  "type": "操作备注",
  "remark": "备注test",
  "song": "song1",
  "gender": 1
}`;
const oprPreviewStateModify = ref(defaultState);
const oprPreviewState = ref(JSON.parse(defaultState));

const customComponents = {
  ExpressionWrap,
};

const updateOprState = () => {
  try {
    oprPreviewState.value = JSON.parse(oprPreviewStateModify.value);
  } catch(err) {
    console.error('json不合法')
  }
}

const activate = (item: ISchemaItem, index: number) => {
  console.log('activate', item);
  active.value = true;
  modifyData.value = item;
  modifyIndex.value = index;

  const transFormState = {
    layoutSpan: item.layout?.span ?? 5,
    layoutOffset: item.layout?.offset ?? 0,
  };

  oprFormState.value = {
    ...item,
    ...transFormState
  };
  updateFormValue(oprFormState.value);
  preview();
};


const oprConfig = {
  // labelPlacement: "left",
  labelWidth: '80px',
};
const oprFormState = ref();
const oprFormValue = ref();
const updateFormValue = (value) => {
  oprFormValue.value = value;
}

const previewShowState = ref(false);
const previewContent = ref();
const preview = () => {
  previewShowState.value = true;
  previewContent.value = [getOprFormData()];
};

const save = () => {
  const originSchemaList = schemaList.value;
  originSchemaList[modifyIndex.value] = getOprFormData();

  schemaList.value = originSchemaList;
};

const getOprFormData = () => {
  const data = {
    ...oprFormValue.value,
    layout: {
      span: oprFormValue.value.layoutSpan,
      offset: oprFormValue.value.layoutOffset,
    }
  };
  delete data.layoutSpan;
  delete data.layoutOffset;

  Object.keys(data).forEach(key => {
    if (data[key] === '') {
      delete data[key];
    }
  })

  console.log('getOprFormData', data);
  return data;
};


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
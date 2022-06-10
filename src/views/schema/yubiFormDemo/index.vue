<template>
  <div class="wrap">
    <div style="text-align: left; width: 800px;">
      <n-button type="primary" @click="updateYubiForm"> 更新表单 </n-button>
      <n-input class="form-content-schema" type="textarea" v-model:value="formContentText"></n-input>
      <n-input class="form-state-schema" type="textarea" v-model:value="formStateText"></n-input>
    </div>

    <div style="width: 1000px;">
      <yubi-form v-bind="{
        customComponents,
      }"
        :content="content"
        :state="formState"
        @update="updateFormValue"
      >
      </yubi-form>
      <div>
        {{formValue}}
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
// import { onMounted } from "vue";
import { ref, watch } from "vue";
import yubiForm from "../../../components/yubiForm/index.vue";
// import useJsonEditor from "./hooks/useJsonEditor";
import test from "./test.vue";

const customComponents = {
  test,
};
const defaultState = `{
  "type": "操作备注",
  "remark": "备注test",
  "song": "song1",
  "gender": 1
}`;

const defaultFormContent = 
`[
  {
    "component": "test"
  },
  {
    "component": "div",
    "inner": "这是一个div"
  },
  {
    "component": "h1",
    "inner": "这是一个标题",
    "layout": {
      "span": {
        "value": "10",
        "type": "number"
      }
    }
  },
  {
    "component": "NInput",
    "label": {
      "expression": "{type}",
      "type": "string"
    },
    "type": "textarea",
    "layout": {
      "span": {
        "value": "5",
        "type": "number"
      }
    },
    "path": "remark"
  },
  {
    "component": "NSelect",
    "label": "选择歌曲",
    "path": "song",
    "layout": {
      "span": {
        "value": "3",
        "type": "number"
      }
    },
    "options": [
      {
        "label": "Everybody's Got Something to Hide Except Me and My Monkey",
        "value": "song0",
        "disabled": true
      },
      {
        "label": "Drive My Car",
        "value": "song1"
      },
      {
        "label": "Norwegian Wood",
        "value": "song2"
      },
      {
        "label": "You Won't See",
        "value": "song3",
        "disabled": true
      },
      {
        "label": "Nowhere Man",
        "value": "song4"
      },
      {
        "label": "Think For Yourself",
        "value": "song5"
      }
    ]
  },
  {
    "component": "NSelect",
    "label": "性别",
    "path": "gender",
    "layout": {
      "span": {
        "value": "2",
        "type": "number"
      }
    },
    "options": [
      {
        "label": "女",
        "value": 0
      },
      {
        "label": "男",
        "value": 1
      }
    ]
  },
  {
    "show": {
      "type": "boolean",
      "expression": "{gender} = 1"
    },
    "component": "NInput",
    "label": "薪资多少",
    "path": "income"
  }
]`

// const defaultFormContent = JSON.stringify(_defaultFormContent)


console.log("JSON.parse(defaultFormContent)", JSON.parse(defaultFormContent), JSON.parse(defaultState))

const content = ref(JSON.parse(defaultFormContent));
const formState = ref(JSON.parse(defaultState));
const formStateText = ref(defaultState);
const formContentText = ref(defaultFormContent);

const formValue = ref();

const updateYubiForm = () => {
  try {
    content.value = JSON.parse(formContentText.value);
    formState.value = JSON.parse(formStateText.value);
  } catch(err) {
    console.error('json不合法')
  }
}

const updateFormValue = (value) => {
  formValue.value = value;
}
// onMounted(() => {
//   useJsonEditor("jsoneditor", {
//     content,
//     state
//   });
// });

// watch(formContent, (value) => {
//   console.log("watch, formContent", value)

// });



</script>

<style scoped>
.wrap {
  display: flex;
  padding: 10px 20px;
}

.form-content-schema {
  height: 600px;
}

.form-state-schema {
  height: 300px;
}
</style>

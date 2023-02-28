<template>
  <div class="page-login">
    <div class="page-login-form">
      <yubi-form
        :content="content"
        :state="formState"
        @update="updateFormValue"
      >
      </yubi-form>
    </div>
    <div class="page-login-footer">
      <n-button type="primary" @click="submit">登陆</n-button>
      <n-button>忘记密码</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import yubiForm from "../../components/yubiForm/index.vue";
import { bus } from "wujie";

const content: ISchemaItem[] = [
  {
    component: 'n-input',
    path: 'username',
    label: '账号',
    placeholder: '请输入账号名或邮箱号'
  },
  {
    component: 'n-input',
    label: '密码',
    path: 'password',
    placeholder: '请输入密码',
    'show-password-on': 'click',
    type: 'password',
  },
];

const formState = ref({});
const formValue = ref();
const pageData: Ref<any> = ref({});

const updateFormValue = (value) => {
  formValue.value = value;
}

onMounted(() => {
  pageData.value = window.$wujie?.props || {
    appName: 'login-1',
    data: {},
    methods: {
      submit: (username, password) => {
        console.log('登陆 用户：', username, '，密码', password);
      }
    }
  };
  console.log('微应用数据', pageData.value);
})

const submit = () => {
  const { username, password } = formValue.value;
  pageData.value.methods.submit(username, password);
};
</script>

<style lang="scss" scoped>
.page-login {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-form {
    width: 300px;
    margin: 50px 0 30px;
  }

  &-footer .n-button{
    width: 100px;
    margin: 0 10px;
  }
}
</style>

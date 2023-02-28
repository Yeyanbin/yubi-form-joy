import { createApp } from 'vue'
import App from './App.vue'
import { naiveUIInstance } from './naiveComponentsConfig';

import yubiDrag from 'yubidrag/index';
import router from './router';

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import { createRouter, createWebHistory } from 'vue-router';

// const app = createApp(App)
// app.use(naiveUIInstance);
// app.use(yubiDrag, {
//   test: '测试options'
// });
// app.use(router);
// app.mount('#app');

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App);
    instance.use(router);
    instance.use(yubiDrag, {
      test: '测试options'
    });
    instance.use(naiveUIInstance);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
} else {

  const app = createApp(App);
  app.use(naiveUIInstance);
  app.use(yubiDrag, {
    test: '测试options'
  });
  app.use(router)
  app.mount("#app");
}

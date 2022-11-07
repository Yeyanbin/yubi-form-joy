import { createApp } from 'vue'
import App from './App.vue'
import { naiveUIInstance } from './naiveComponentsConfig';

import yubiDrag from 'yubidrag/index';
import router from './router';

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(naiveUIInstance);
app.use(yubiDrag, {
  test: '测试options'
});
app.use(router);
app.mount('#app');

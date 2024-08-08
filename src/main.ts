import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from 'element-plus/es/locale/lang/zh-cn'

// 导入 icon
import * as ElIconList from '@element-plus/icons-vue'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small", locale });
// 注册icon
for (const name in ElIconList) {
  app.component("ElIcon"+name, ElIconList[name])
}

import MagicUI from './views/components/main'
app.use(MagicUI)

app.mount("#app");

document.title = import.meta.env.VITE_TITLE + " - " + import.meta.env.VITE_VERSION
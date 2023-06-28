/*
 * @Author: chizhigao户名 2279648073@qq.com邮箱
 * @Date: 2023-06-19 11:34:59
 * @LastEditors: chizhigao户名 2279648073@qq.com邮箱
 * @LastEditTime: 2023-06-19 13:36:30
 * @FilePath: \vue2-example-template-main\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 加载插件
// import components from './components'
// Vue.use(components)




import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

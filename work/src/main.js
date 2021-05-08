import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import instance from './http'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5'


Vue.prototype.$md5 = md5;
Vue.use(ElementUI)
   //全局注册，使用方法为:this.$axios
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


axios.interceptors.request.use(
  config => {
    if(store.getters.getToken == ''||store.getters.getToken == null){
      return config
    }else{
      axios.defaults.headers['token'] = store.getters.getToken
      return config
    }
  },
  error => {
    return Promise.error(error);
  })


 axios.interceptors.response.use(function (response) {
  if(response.data.msg=='userWrong'||response.data.msg=='statusWrong'){
    alert('用户账号或密码错误');
    location.reload();
  }
  return response;
}, function (error) {
  if(window.location.pathname.substring(1,7)=='manage'&&error.response.data.msg=='authorityWrong'){
    alert('您不是管理员');
    history.go(-1);
  }
  alert(window.location.pathname.substring(1,5))
  if(window.location.pathname.substring(1,5)=='shop'&&error.response.data.msg=='authorityWrong'){
    alert('token过期请重新登录');
    location.replace("/admin")
  }
  return Promise.reject(error);
});
//Vue.prototype.$axios = instance
router.beforeEach((to, from, next) => {
  sessionStorage.setItem('store', JSON.stringify(store.state));
  next();
}
)



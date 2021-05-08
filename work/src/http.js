import axios from 'axios'

var instance = axios.create({timeout: 1000 * 12});
const token = '';
//axios.defaults.headers['token'] = store.getters.getToken;
instance.interceptors.request.use(
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


instance.interceptors.response.use(function (response) {
  if(response.data.msg=='userWrong'||response.data.msg=='statusWrong'){
    alert('用户登录状态错误或者用户权限不足');
  }
  return response;
}, function (error) {
  if(window.location.pathname.substring(1,7)=='manage'&&error.response.data.msg=='authorityWrong'){
    alert('您不是管理员');
    history.go(-1);
  }
  return Promise.reject(error);
});

export default instance;

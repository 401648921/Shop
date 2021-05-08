import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:sessionStorage.getItem("token"),
    usInfo:JSON.parse(sessionStorage.getItem("usInfo")),
    userId:''
  },
  mutations: {
    SET_TOKEN:(state, token)=>{
      state.token = token;
      sessionStorage.setItem("token",token);
    },
    SET_USERINFO:(state, usInfo)=>{
      state.usInfo = JSON.stringify(usInfo);
      sessionStorage.setItem("usInfo",JSON.stringify(usInfo));
    },
    REMOVE_INFO:(state)=>{
      state.token = "";
      state.usInfo = {};
      sessionStorage.setItem("token","");
      sessionStorage.setItem("usInfo",JSON.stringify(""));
    },
    setUserId:(state,data)=>{
      state.userId = data;
      sessionStorage.setItem('userId', JSON.stringify(data))
    }
  },
  getters:{
    getUser: state =>{
      return state.usInfo;
    },
    getToken:state =>{
      return state.token;
    },
    getUserId:state =>{
      return state.userId;
    }
  },
  actions: {

  },
  modules: {

  }
})


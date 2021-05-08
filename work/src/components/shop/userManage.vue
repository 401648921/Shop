<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="tran-page">
        <span >首页</span>
        <span>账户设置</span>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
    </div>
    <div class="goods-content">
      <span class="goods-nav">
        <span class="first-to">全部功能</span>
        <span class="second-tos">
          <span class="second-to"><router-link tag="span" :to="{ path: '/shop/purcharCar'}" push>我的购物车</router-link></span>
          <span class="second-to">已买到的宝贝</span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/foot'}" push>我的足迹</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/myshop'}" push>我的售品</router-link></span>
          <span class="second-to"><router-link tag="span" :to="{ path: '/shop/addressManage'}" push>我的收货地址</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/personInformation'}" push>个人信息</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/userSetting'}" push>反馈信息</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/manage/managePage'}" push>后台管理</router-link></span>
        </span>
      </span>
    </div>
    <div class="user-card">
      <div class="user-infor-box">
        <span class="user-title">当前账号:</span>
        <span class="img-box">
          <img :src="user.photo" alt="">
        </span>
        <span class="user-name" v-text="user.username">昵称昵称昵称</span>
      </div>

      <div class="manage-function">
        <div class="manage-button manage-one"><span @click="logout">退出登录</span></div>
        <div class="manage-button manage-two"><router-link tag="span" :to="{ path: '/admin/resetUser'}" push>修改密码</router-link></div>
        <div class="manage-button manage-three"><router-link tag="span" :to="{ path: '/shop/personInformation'}" push>修改个人信息</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  data(){
    return{
      user:{}
    }
  },
  mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/user',
          params: {
            id:this.$store.getters.getUserId
          }
        }).then(resp=>{

          this.user = resp.data.data.user;
        }).catch(function(error){
          alert(error.url);
        })
    },
  methods: {
    logout:function(){
      this.$store.commit('setUserId', '');
      this.$store.commit('REMOVE_INFO');
      this.$router.push({
        path:'/admin/sign',
      })
    }

  }
}
</script>

<style scoped="scoped">
.manage-three{
  position: relative;
  left:-282px;
}
.manage-two{
  position: relative;
  left:-300px;
}
.manage-one{
  position: relative;
  left:-300px;
}
.manage-button{
  position: relative;
  top:20px;
  margin-bottom: 15px;
  font-size: 18px;
}
.manage-function{
  width:730px;
  position: relative;
  left:15px;
  border-top:1px solid #c3c3c3;
}
.user-infor-box{
  height:200px;
}
.user-name{
  display: inline-block;
  width:150px;
  position: relative;
  left:-385px;
  top:80px;
  text-align: left;
}
.img-box img{
  width:90px;
  height:90px;
}
.img-box{
  display: inline-block;
  width:90px;
  height:90px;
  background: #a6a4a4;
  position: relative;
  left:-300px;
  top:60px;
}
.user-title{
  position: relative;
  left:-310px;
  top:-40px;
  font-size: 20px;
}
.user-card{
  position: relative;
  width:800px;
  height:400px;
  left:360px;
  top:180px;
  border:2px solid #c3c3c3;
}
.goods-content{
  position: fixed;
}
.second-tip{
  left:15px;
}
.second-to{
  position: relative;
  display: block;
  margin-bottom: 10px;
}
.second-tos{
  position: relative;
  display: block;
}
.first-to{
  position: relative;
  display: block;
  font-size: 20px;
  margin-bottom: 20px;
}
.goods-nav{
  position: absolute;
  width:100px;
  left:50px;
  top:160px;
}
.input-icon{
  position: relative;
  font-size:20px;
  top:4px;
}
.search-box{
  display: inline-block;
  position: absolute;
  width:330px;
  height:30px;
  border: 2px solid #c3c3c3;
  left:1050px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
}
.active{
  color: #f06a0f;
}
.tran-page{
  position: absolute;
  top:55px;
  left:200px;
  width:300px;
  font-size: 25px;
}
.tran-page span{
  display: inline-block;
  width:120px;
  position: relative;
}
.last-title{
  position: absolute;
  font-size: 30px;
  left:200px;
  top:25px;
  color: black;
}
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:80%;
  height:60px;
  margin:0px;
}
.content-header{
  width:100%;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
#title{
  position: relative;
  float: left;
  margin-left:40px;
  font-family: HomeTxt;
  font-size: 20px;
}
.first-line{
  color: black;
  font-size: 30px;
  margin-bottom: 0px;
}
.second-line{
  font-size: 20px;
  letter-spacing:4px;
  color: #a6a4a4;
}
</style>

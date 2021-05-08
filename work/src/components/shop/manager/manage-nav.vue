<template>
  <div>
    <div id="shop-nav">
      <span class="iconfont-go icon-gofangzi  wuzi"><p class="title-nav"><el-breadcrumb-item><router-link tag="span" :to="{ path: '/shop'}" push>用 户 主 页</router-link></el-breadcrumb-item></p></span>
      <el-breadcrumb separator="" id="user-li">
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/manage/managePage'}" push>管理首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/manage/goodsManage'}" push>产品管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/manage/userManage'}" push>账号管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/manage/refund'}" push>订单管理</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-badge :value="2" class="item">
          <span class="el-icon-bell ring"></span>
        </el-badge>

        <router-link tag="span" :to="{ path: '/shop/information'}" push>后台消息</router-link></el-breadcrumb-item>
      </el-breadcrumb>
      <div id="user-pic"><img :src="user.photo==null?'http://west2xianyu.oss-cn-shenzhen.aliyuncs.com/userPhoto/d0c7845e-99dd-4444-a4d1-f58ad59dabd6.jpg':user.photo" alt="get"></div>
      <el-dropdown id="user-link" @command="handleCommand">
        <span class="el-dropdown-link">
          <span v-text="user.username"></span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">用户控制</el-dropdown-item>
          <el-dropdown-item command="b">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="last-title">后台管理</span>
    </div>
    <router-view/>
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
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getUserId
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.user= resp.data.data.user;

        }).catch(function(error){
          alert(error.url);
        })
    },
    methods:{
      handleCommand:function(a){
        if(a=='a'){
          this.$router.push({
            path:'/shop/userManage',
          })
        }
        else if(a=='b'){
          this.logout();
        }
      },
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
.title-nav{
  position: relative;
  top:10px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../../assets/wwww.ttf');
}
.last-title{
  position: absolute;
  left:240px;
  top:30px;
  font-size: 28px;
}
.content-header{
  position: relative;
  width:1200px;
  left:10%;
  top:70px;
}
#title{
  display: inline-block;
  position: absolute;
  top:-20px;
  left:40px;
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
#user-pic img{
  width:50px;
  height:50px;
}
#user-pic{
  position: absolute;
  display: inline-block;
  left:1350px;
  top:5px;
  width:50px;
  height:50px;
  border-radius:100%;
  overflow: hidden;
}
#shop-nav{
  position: fixed;
  top:-2px;
  left:10%;
  width:1550px;
  height:60px;
  margin:0px;
  background-color: #e6e4e7;
  z-index: 10;
}
.wuzi{
  position: absolute;
  display: inline;
  top:15px;
  left:50px;
  width:130px;
  font-size:30px;
}
.title-nav{
  position: relative;
  display: inline;
  font-size: 14px;
  color: #a6a4a4;
  margin-left:13px;
  bottom: 5px;
}
#user-li{
  position: relative;
  top:25px;
  left:920px;
  font-size:15px;
  line-height:20px;
}
#user-link{
  position: relative;
  margin-left:150px;
  top:3px;
  left:600px;
  font-size:16px;
  line-height:20px;
}
.ring{
  position: relative;
  top:2px;
  font-size: 20px;
}
.shop-car{
  font-size: 20px;
  position: relative;
}
.shop-tip{
  position: relative;
  top:-2px;
}
</style>

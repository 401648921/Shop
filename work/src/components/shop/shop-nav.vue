<template>
  <div>
    <div id="shop-nav">
      <span class="iconfont-go icon-gofangzi  wuzi"><p class="title-nav"><router-link tag="span" :to="{ path: '/shop'}" push>主 页</router-link></p></span>
      <el-breadcrumb separator="   " id="user-li">
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/shop/myShop'}" push>我的店铺</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/shop/myCollection'}" push>我的收藏</router-link></el-breadcrumb-item>
        <el-breadcrumb-item class="shop-tip"><span class="iconfont-go icon-goche-copy shop-car"></span><router-link tag="span" :to="{ path: '/shop/purcharCar'}" push>  购物车</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/shop/userPage'}" push>我的交易</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link tag="span" :to="{ path: '/shop/classification'}" push>商品分类</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-badge :value="count1" class="item">
          <span class="el-icon-bell ring"></span>
        </el-badge>

        <router-link tag="span" :to="{ path: '/shop/information'}" push>消息</router-link></el-breadcrumb-item>
      </el-breadcrumb>
      <div id="user-pic"><img :src="user.photo==null?'http://west2xianyu.oss-cn-shenzhen.aliyuncs.com/userPhoto/d0c7845e-99dd-4444-a4d1-f58ad59dabd6.jpg':user.photo" alt="get"></div>
      <el-dropdown id="user-link" @command="handleCommand">
        <span class="el-dropdown-link">
          <span v-text="user.username"></span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item command="a">用户控制</el-dropdown-item>
          <el-dropdown-item command="b">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:{},
      count1:0
    }
  },
  created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/user',
          params: {
            id:this.$store.getters.getUserId
          }
        }).then(resp=>{
          this.user= resp.data.data.user;
        }).catch(function(error){
          alert(error.url);
        })
        //alert(1)
        //alert(this.$store.getters.getToken)
        this.$axios({
          method:'get',
          url:'/api/message',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:5,
            id:this.$store.getters.getUserId,
            isRead:0,
            page:1
          }
        }).then(resp=>{
          this.count1 = resp.data.data.count;
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
#user-pic img{
  width:50px;
  height:50px;
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
  width:100px;
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
  left:850px;
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

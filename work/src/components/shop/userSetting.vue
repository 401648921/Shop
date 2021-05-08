<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="to-Page">
        <span class="first-title">首页</span>
        <span class="second-title">账户设置</span>
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
      <span class="img-box">
        <img :src="user1.photo==null?'http://west2xianyu.oss-cn-shenzhen.aliyuncs.com/userPhoto/d0c7845e-99dd-4444-a4d1-f58ad59dabd6.jpg':user1.photo" alt="">
      </span>
      <span class="user-id"><p>ID</p></span>
      <div class="from-box">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="联系方式:">
            <el-input class="tip-input" v-model="form.tele"></el-input>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input class="tip-input" v-model="form.tips"></el-input>
          </el-form-item>
          <el-form-item label="意见:">
            <el-input class="decribe-text" type="textarea" maxlength="100" v-model="form.infor"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button-submit" type="primary" @click="onSubmit">确定</el-button>
            <el-button class="button-submit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        form: {
          tele: '',
          tips: '',
          infor: ''
        },
        user1:{}
      }
    },
    methods: {
      onSubmit:function(){
        if(this.form.tele==''){
           this.$alert('联系方式不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.tips==''){
           this.$alert('标题不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.infor==''){
           this.$alert('意见不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$axios({
          method:'post',
          url:'/api/feedback',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            feedbacks: this.form.infor,
            id:this.store.getters.getUserId,
            phone:tele,
            title:this.form.tips
          }
        }).then(resp=>{

          this.$alert('提交成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push('/admin/userManage');
        }).catch(function(error){
          alert(error.url);
        })
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

          this.user1= resp.data.data.user;

        }).catch(function(error){
          alert(error.url);
        })
        //alert(11111);
        //alert(this.$store.getters.getToken)
    },
}
</script>

<style scoped="scoped">
.button-submit{
  position: relative;
  left:240px;
}
.tip-input{
  width:160px;
  float: left;
}
.decribe-text textarea{
  width:500px;
  resize: none;
  height:180px;
}
.user-id{
  display: inline-block;
  position: absolute;
  left:100px;
  top:50px;
}
.img-box img{
  width:100px;
  height:100px;
}
.img-box{
  display: inline-block;
  width:100px;
  height:100px;
  background: forestgreen;
  position: absolute;
  left:140px;
  top:30px;
}
.from-box{
  width:600px;
  position: absolute;
  top:200px;
  left:-30px;
}
.user-card{
  position: relative;
  width:800px;
  height:600px;
  border:1px solid #c3c3c3;
  top:160px;
  left:300px;
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
.to-Page span{
  margin-right:30px;
}
.to-Page{
  position: absolute;
  top:60px;
  width:300px;
  font-size: 25px;
  left:260px;
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
  border: 1px solid black;
  left:1000px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
}
.goods-content{
  position: fixed;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
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

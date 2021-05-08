<template>

<span class="form-box">
  <span class="iconfont-go icon-goico1 tranto"><span id="triangle-bottomleft"></span></span>
  <div class="tips">
    <p>微信登录</p>
    <div class="arrow"></div>
  </div>
  <span class="login-title">
    <router-link tag="p" :to="{ path: '/admin/sign'}" push>密码登录</router-link>
  </span>
  <span class="login-title">
    <p>验证码登录</p>
    <span></span>
  </span>

  <form>
    <span class="user-input">
      <input v-model="form.stuNo" type="text" placeholder="学号">
    </span>

    <span class="user-input">
      <input v-model="form.code" type="text" placeholder="验证码">
      <el-button round class="button-admin">获取验证码</el-button>
    </span>


      <el-button class="submit-admin" type="success" round>登录</el-button>
      <span class="admin-tansfer">
        <router-link  :to="{ path: '/admin/resetUser'}" push>忘记密码</router-link>
      </span>
  </form>
</span>
</template>

<script>
export default {
  data() {
      return {
        form: {
          stuNo :'',
          code:''
        }
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
}
</script>

<style>
.tips {
  position:relative;
  left:320px;
  width:100px;
  height:35px;
  line-height: 35px;
  color: #03bb7a;
  background:#dcefed;
  border-radius:5px; /* 圆角 */
  margin:30px auto 0;
}

.tips .arrow {
position:absolute;
top:10px;
right:-16px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border:solid 8px;
border-color:white white white #dcefed;
}
#triangle-bottomleft {
  position: absolute;
  right:1px;
  top:1px;
  width: 0;
  height: 0;
  border-bottom: 35px solid white;
  border-right: 35px solid transparent;
}
.tranto{
  position: absolute;
  right:25px;
  top:25px;
  font-size: 35px;
}
.input{
  border:none;
  border-bottom: 1px solid #000
}
.login-title{
  margin-top: 40px;
  margin-right:30px;
  display: inline-block;
  margin-bottom: 10px;
}
.login-title span{
  display: block;
  margin-top:-5px;
  margin-left:10px;
  border-bottom: 2px solid #03bb7a;
  width:45px;
}
.user-input input{
  border:none;
  height: 35px;
  font-size: 15px;
  /*border-bottom: 1px solid #dbdbdb;*/
  outline:none;
  width:380px;
}
.user-input{
  display: inline-block;
  margin-top:30px;
  width:380px;
  margin-left: 0px;
  border-bottom: 1px solid #dbdbdb;
}
.button-admin{
  position: absolute;
  right:50px;
  top:255px;
  border: 1px solid green;
  color: green;
}
.button-admin:hover{
  border: 1px solid green;
  color: green;
}
.submit-admin{
  position: relative;
  display: block;
  width:350px;
  height:50px;
  top:30px;
  left:65px;
}
.admin-tansfer p{
  display: inline-block;
}
.admin-tansfer{
  position: relative;
  right:-140px;
  top:40px;
  display: block;
  font-size: 10px;
}
.admin-tansfer a {
  color: #03bb7a;
}
</style>

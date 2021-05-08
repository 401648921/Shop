<template>

<span class="form-box">
  <span class="iconfont-go icon-goico1 tranto">
      <span id="triangle-bottomleft"></span>
  </span>
  <div class="tips">
    <p>微信登录</p>
    <div class="arrow"></div>
  </div>
  <span class="login-title">
    <p>密码登录</p>
    <span></span>
  </span>
  <span class="login-title">
    <router-link tag="p" :to="{ path: '/admin/signByEmail'}" push>验证码登录</router-link>
  </span>

  <form>
    <span class="user-input">
      <input v-model="form.stuNo" type="text" placeholder="学号">
    </span>

    <span class="user-input">
      <span v-show="!passwordShow" @click="passwordShow=true" class="look-icon icon-goyanjing1 iconfont-go"></span>
      <span v-show="passwordShow" @click="passwordShow=false" class="look-icon icon-goyanjing iconfont-go"></span>
      <input v-model="form.password" :type="passwordType" placeholder="密码">
    </span>


      <el-button @click="sign"  class="submit-admin" type="success" round>登录</el-button>
      <span class="admin-tansfer">
        <router-link :to="{ path: '/admin/resetUser'}" push>忘记密码</router-link>
      </span>
  </form>
  <p v-text="gege">gegegege</p>
</span>
</template>

<script>
export default {
  data() {
      return {
        form: {
          stuNo :'',
          code:'',
          password: ''
        },
        passwordShow:false,
        gege:''
      }
    },
    methods: {
      sign:function(){
        //alert(this.$md5('123'))
        if(this.form.password==''){
           this.$alert('密码不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.stuNo==''){
           this.$alert('学号不能为空','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$store.commit('REMOVE_INFO');
        //this.$store.commit('setUserId', this.form.stuNo);
        //alert(this.$store.getters.getUserId);
        this.$axios({
          method:'post',
          url:'/api/login',
          header:{
            token:undefined
          },
          params: {
            id:this.form.stuNo,
            password:this.$md5(this.form.password)
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.$store.commit('setUserId', this.form.stuNo);
          this.$store.commit('SET_TOKEN', resp.data.data.token);
          //this.gege = resp.data.code;
          //alert(this.$store.getters.getToken);
          this.$router.push({
          path:'/shop/homePage',
        })
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
    computed: {
      passwordType(){
        if(this.passwordShow==false){
          return 'password';
        }else{
          return 'text';
        }
      }
    }
}
</script>

<style>
.look-icon{
  font-size: 30px;
  position: absolute;
  left:800px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
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
  top:180px;
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

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
      <div class="from-box">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item class="user-pic" label="当前头像:">
            <span class="img-box">
              <img :src="dialogImageUrl==''?'../../assets/userPic.jpg':dialogImageUrl" alt="">
            </span>
            <span class="upload-img-box">
              <el-upload
                class="upload-demo"
                action="/api/userPhoto"
                :limit="1"
                name="photo"
                :on-remove="handleRemove"
                :on-preview="handlePictureCardPreview"
                :on-success="success"
                :file-list="form.fileList"
                :data="{id:form.stuNo}">
                <el-button class="upload-img-button"><span class="el-icon-upload2"></span>   &nbsp;&nbsp;&nbsp;&nbsp;上传图片</el-button>
              </el-upload>
            </span>
          </el-form-item>

          <el-form-item label="昵称:">
            <el-input class="tip-input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="校区:">
            <el-select class="select-domain" v-model="form.domain" placeholder="请选择活动区域">
              <el-option label="旗山校区" value="旗山校区"></el-option>
              <el-option label="铜盘校区" value="铜盘校区"></el-option>
              <el-option label="怡山校区" value="怡山校区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别:">
            <el-input class="tip-input" v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input class="tip-input" v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="简介:">
            <el-input class="decribe-text" type="textarea" maxlength="100" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item class="button-box">
            <el-button class="button-submit" type="primary" @click="onSubmit">保存</el-button>
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
          stuNo: '',
          name: '',
          domain: '',
          sex: '',
          telephone: '',
          type: [],
          desc: '',
          fileList:[],
          photo:''
        },
        dialogImageUrl:'',
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

          this.form.stuNo = this.$store.getters.getUserId==null?'':this.$store.getters.getUserId;
          this.form.name = resp.data.data.user.username==null?'':resp.data.data.user.username;
          this.form.domain = resp.data.data.user.campus==null?'':resp.data.data.user.campus;
          this.form.sex = resp.data.data.user.sex==null?'':resp.data.data.user.sex;
          this.form.telephone = resp.data.data.user.phone==null?'':resp.data.data.user.phone;
          this.form.desc = resp.data.data.user.introduction==null?'':resp.data.data.user.introduction;
          this.dialogImageUrl = resp.data.data.user.photo==null?'':resp.data.data.user.photo;
        }).catch(function(error){
          alert(error.url);
        })
    },
    methods: {
      onSubmit:function(){
        if(this.form.name==''){
          this.$alert('请先输入昵称','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.sex!='男'&&this.form.sex!='女'){
          this.$alert('请输入正确的性别信息','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.domain==''){
          this.$alert('请先选择校区','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.telephone==''){
          this.$alert('请先输入电话号码','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$axios({
          method:'post',
          url:'/api/user',
          params: {
            campus:this.form.domain,
            code: this.form.code,
            id:this.$store.getters.getUserId,
            introduction:this.form.desc,
            phone:this.form.telephone,
            sex:this.form.sex,
            username:this.form.name,
            photo:this.photo
          }
        }).then(resp=>{

          if(resp.data.code==200){
            this.$alert('保存成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push('shop/userManage');
          }
          this.$router.push('/admin/sign');
        }).catch(function(error){
          alert(error.url);
        })
      },
      success:function(response){
          this.form.photo=response.data.url;
      },
      handleRemove(file,fileList) {
        this.form.photo=''
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
      },
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

<style scoped="scoped">
.el-icon-upload2{
  position: absolute;
  font-size: 25px;
  left:8px;
  top:5px;
}
.img-box img{
  width:100%;
}
.img-box{
  margin-left:15px;
  overflow: hidden;
}
.tip-input,.decribe-text,.select-domain{
  margin-left:30px;
}
.button-box{
  position: relative;
  left:130px;
  border-top:1px solid #c3c3c3;
}
.select-domain{
  float: left;
  width:160px;
}
.button-submit{
  position: relative;
  top:30px;
  left:-280px;
  background: #f06a0f;
  color: white;
  font-weight: 700;
}
.tip-input{
  width:160px;
  float: left;
}
.decribe-text textarea{
  width:500px;
  resize: none;
  height:100px;
}
.user-id{
  display: inline-block;
  position: absolute;
  left:170px;
  top:50px;
}
.upload-img-box{
  width:80px;
  height:80px;
  top:30px;
  position: relative;
  border-left:1px solid #c3c3c3;
  float: left;
}
.upload-img-button{
  position: relative;
  top:55px;
  left:20px;
}
.user-pic{
  position: relative;
  left:20px;
  margin-bottom: 50px;
}
.el-form-item__label{
  font-size: 20px;;
}
.img-box{
  width:100px;
  margin-right:20px;
  height:100px;
  background: forestgreen;
  position: relative;
  top:20px;
  float: left;
}
.from-box{
  width:600px;
  position: absolute;
  top:00px;
  left:-80px;
}
.user-card{
  position: relative;
  width:800px;
  height:670px;
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

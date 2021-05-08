<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
    </div>
    <div id="report">
      <el-card class="box-card">
        <div id="clearfix">
          <span class="img-box">
            <img :src="goodsurl" alt="">
          </span>
          <span class="goods-name"><p v-text="goodsName">商品名称商品名称商品名称</p></span>
          <span class="favor-goods">选项，商品特点</span>
        </div>
        <div class="result-content">
          <span @click="select=0" :class="select==0?'selected':''" class="result-card">
            <span class="text-box">时</span>
            <span class="result-title"><p align="left">发货问题</p></span>
            <span class="result-text"><p align="left">延迟发货/缺货/虚假发货等</p></span>
          </span>
          <span @click="select=1" :class="select==1?'selected':''" class="result-card">
            <span class="text-box">承</span>
            <span class="result-title"><p align="left">承诺未履行</p></span>
            <span class="result-text"><p align="left">赠品/换货/包邮</p></span>
          </span>
          <span @click="select=2" :class="select==2?'selected':''" class="result-card">
            <span class="text-box">扰</span>
            <span class="result-title"><p align="left">骚扰他人</p></span>
            <span class="result-text"><p align="left">频繁骚扰骚扰他人,辱骂/诅咒/威胁</p></span>
          </span>
          <span @click="select=3" :class="select==3?'selected':''" class="result-card">
            <span class="text-box">支</span>
            <span class="result-title"><p align="left">卖家拒绝使用支付宝</p></span>
            <span class="result-text"><p align="left">卖家拒绝使用支付宝担保交易</p></span>
          </span>
        </div>
        <div class="report-input-box">
        <span class="input-title">具体原因</span>
        <span class="report-input">
          <textarea v-model="specificReason" name="具体原因" id="report-text" cols="30" rows="10"></textarea>
        </span>
        <el-button class="ok-button" type="success">确定</el-button>
        <el-button class="no-button" type="info">取消</el-button>
      </div>
      </el-card>
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
  mounted:function(){
    this.$axios({
          method:'get',
          url:'/api/order',
          params: {
            number:this.$route.query.number
          }
        }).then(resp=>{
          this.goodsName=resp.data.data.order.goodsName;
          this.goodsurl = resp.data.data.order.photo;
          this.fromId = resp.data.data.order.fromId;
          this.orderNumber = resp.data.data.order.number;
        }).catch(function(error){
          alert(error.url);
        })
  },
  data(){
    return{
      goodsName:'',
      goodsurl:'',
      fromId:'',
      orderNumber:'',
      reason:['发货问题','承诺未履行','骚扰他人','卖家拒绝使用支付宝'],
      select:-1,
      specificReason:''
    }
  },
  methods: {
    submitReport:function(){
      if(this.select==-1){
        this.$alert('先选择举报原因','提示',{
            confirmButtonText:'确定'
          });

        return;
      }
      if(this.select==-1){
        this.$alert('先选择举报原因','提示',{
            confirmButtonText:'确定'
          });

        return;
      }
      this.$axios({
          method:'post',
          url:'/api/complain',
          params: {
            fromId:this.fromId,
            reason:this.reason[this.select]
          }
        }).then(resp=>{
          this.goodsName=resp.data.data.order.goodsName;
          this.goodsurl = resp.data.data.order.photo;
          this.fromId = resp.data.data.order.fromId;
          this.orderNumber = resp.data.data.order.number;
        }).catch(function(error){
          alert(error.url);
        })
    }
  }
}
</script>

<style scoped="scoped">
.selected{
  background: lightgreen;
}
.ok-button{
  position: relative;
  top:100px;
  width:100px;
  left:-780px;
}
.no-button{
  position: relative;
  top:100px;
  width:100px;
  left:-750px;
}
.input-title{
  position: relative;
  top:-100px;
  left:100px;
  font-size: 20px;
}
#report-text{
  resize: none;
  width:880px;
  position: relative;
  left:110px;
  top:40px;
  outline: none;
}
.report-input-box{
  display: block;
  position: absolute;
}
.result-title{
  display: block;
  font-size: 22px;
  font-weight: 700;
  position: relative;
  left:140px;
  top:10px;
  width:250px;
}
.result-text{
  display: block;
  width:250px;
  position: relative;
  left:140px;
  top:10px;
}
.text-box{
  display: inline-block;
  position: absolute;
  left:30px;
  top:30px;
  width:80px;
  height:80px;
  font-size: 40px;
  color: red;
  line-height: 80px;;
  border-radius: 50%;
  border:5px solid red;
}
.result-card{
  position: relative;
  float: left;
  width:450px;
  margin-left:100px;
  margin-bottom: 50px;
  height:150px;
  border:1px solid black;
}
.result-content{
  position:relative;
  width:1280px;
  height:400px;
  top:50px;
}
.favor-goods{
  position: relative;
  left:-465px;
  top:30px;
  display: inline-block;
  width:300px;
  height:40px;
  font-size: 16px;
  overflow: hidden;
  color: #807777;
}
.goods-name{
  position: relative;
  left:-80px;
  top:-20px;
  display: inline-block;
  width:300px;
  height:50px;
  font-size: 23px;
  overflow: hidden;
}
.img-box img{
  width:180px;
  height:180px;
}
.img-box{
  display: inline-block;
  position: absolute;
  width:180px;
  height:180px;
  background-color: bisque ;
  left:0px;
}
#clearfix{
  position: relative;
  width:1150px;
  left:60px;
  height:200px;
  display: block;
  border-bottom: 1px solid #d6d6d6 ;
}
.box-card{
  width:1300px;
  height:950px;
  margin-bottom: 200px;
}
#report{
  position: absolute;
  left:100px;
  top:150px;
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
  border: 2px solid #7a7a7a;
  left:1150px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
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
  height:1000px;
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

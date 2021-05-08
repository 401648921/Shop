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
    <div class="card-header">
      <span class="no-active">1.卖家申请退款</span>
      <span class="no-active">2.卖家处理退款信息</span>
      <span class="active">3.退款完成</span>
    </div>
    <div class="card">
      <span class="card-left">
        <div class="infor-text">退款成功</div>
        <div class="refund-time-box">
          <div class="refund-time-line-box">
            <span class="refund-time-title">退款成功时间:</span>
            <span class="refund-time-text"><p>2012-02-12</p></span>
          </div>
          <div class="steps">
            <div class="steps-title">
              <span>退款总金额</span>
            </div>
            <div class="steps-inline-box">
              <div class="steps-inline-box-header">
                <span>退回某账户</span>
              </div>
              <div class="steps-inline-box-content">
                <el-steps :active="1">
                  <el-step title="买家退款" description="时间"></el-step>
                  <el-step title="管理员受理" description="时间"></el-step>
                  <el-step title="退款成功" description="时间"></el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
        <div class="refund-infor">
          <span class="img-box">
            <img src="#" alt="">
          </span>
          <div class="user-name-box">
            <p>昵称</p>
          </div>
          <div class="refund-create-time-box">
            <p class="refund-create-time">买家于2021/2/12 20：00创建了退款申请</p>
          </div>
          <div class="refund-class">
            <p>退款类型:</p>
          </div>
          <div class="refund-pay">
            <p>退款金额:1111111111111111</p>
          </div>
          <div class="refund-result">
            <p>退款原因:</p>
          </div>
          <div class="refund-infor-content">
            <p>退款描述</p>
          </div>
        </div>
      </span>
      <span class="card-right">
        <div class="card-right-title">
          <span><p>订单详情</p></span>
        </div>
        <div class="goods-infor-box">
          <span class="goods-img-box">
            <img src="" alt="">
          </span>
          <span class="goods-name">
            <p>商品昵称商品昵称商品昵称商品昵称商品昵称商品昵称商品昵称</p>
          </span>
        </div>
        <div class="order-infor-box">
          <div class="saler-content">
            <span class="saler-comtent-title title">卖&nbsp; &nbsp; &nbsp; 家:</span>
            <span class="saler-comtent-text value"><p>卖家昵称</p></span>
          </div>
          <div class="order-number-content">
            <span class="order-number-title title">订单编号:</span>
            <span class="order-number-text value"><p>1234567894546516</p></span>
          </div>
          <div class="tran-price-content">
            <span class="tran-price-title title">运&nbsp; &nbsp; &nbsp; 费:</span>
            <span class="tran-price-text value"><span class="tran-price-icon">￥</span><span class="price-num">0.00</span></span>
          </div>
          <div class="all-price-content">
            <span class="all-price-title title">商品总价:</span>
            <span class="all-price-text value"><span class="all-price-icon">￥</span><span class="price-num all-price-num">0.00</span></span>
          </div>
        </div>
      </span>
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
}
</script>

<style scoped="scoped">
.refund-from{
  position: relative;
  width:500px;
  left:80px;
  top:40px;
}
.all-price-num{
  position: relative;
  left:-35px;
}
.all-price-text{
  position: relative;
  left:-73px;
  top:-50px;
}
.tran-price-text{
  position: relative;
  left:-70px;
  top:-50px;
}
.price-num{
  font-size: 20px;
}
.all-price-title{
  position: relative;
  left:-40px;
  top:-55px;
  font-size: 20px;
}
.tran-price-text{
  position: relative;
  display: inline-block;
  width:100px;
}
.all-price-icon{
  position: relative;
  display: inline-block;
  width:100px;
}
.tran-price-title{
  position: relative;
  left:-58px;
  top:-55px;
  font-size: 20px;
}
.tran-price-icon,.all-price-icon{
  font-size: 30px;
}
.order-number-text{
  position: relative;
  width:200px;
  left:90px;
  top:-52px;
  font-size: 20px;
  text-align: left;
}
.order-number-title{
  position: relative;
  left:-110px;
  top:-10px;
  font-size: 20px;
}
.saler-comtent-text{
  position: relative;
  width:200px;
  left:90px;
  top:-7px;
  font-size: 20px;
  text-align: left;
}
.saler-comtent-title{
  position: relative;
  left:-110px;
  top:40px;
  font-size: 20px;
}
.order-infor-box{
  width:300px;
  display: inline-block;
  position: relative;
  top:100px;
  border-top:2px solid #c3c3c3;
}
.goods-name{
  position: relative;
  top:40px;
  left:70px;
  display: inline-block;
  width:170px;
  text-align: left;
}
.goods-img-box{
  display: inline-block;
  top:130px;
  width:100px;
  height:90px;
  position: absolute;
  left:800px;
  background: lightblue;
}
.card-right-title p{
  margin-left:-10px;
}
.card-right-title span{
  display: inline-block;
  width:300px;
  border-bottom: 2px solid #c3c3c3;
  font-size: 23px;
  text-align: left;
}
.refund-infor-content{
  position: relative;
  width:400px;
  left:160px;
  text-align: left;
  font-size: 18px;
}
.refund-pay{
  position: relative;
  width:400px;
  left:160px;
  text-align: left;
  font-size: 18px;
}
.refund-result{
  position: relative;
  width:400px;
  left:160px;
  text-align: left;
  font-size: 18px;
}
.refund-class{
  position: relative;
  width:400px;
  left:160px;
  text-align: left;
  font-size: 18px;
}
.refund-create-time-box{
  position: relative;
  width:400px;
  left:160px;
  text-align: left;
  font-size: 18px;
}
.user-name-box{
  text-align: left;
  font-size: 18px;
}
.user-name-box{
  position: relative;
  width:300px;
  left:160px;
}
.img-box{
  position: absolute;
  display: inline-block;
  width:100px;
  height:90px;
  background: #a6a4a4;
  left:35px;
}
.refund-infor{
  position: relative;
  top:60px;
  left:0px;
}
.steps-inline-box-content{
  position: relative;
  top:40px;
}
.steps-inline-box-header{
  height:40px;
  border-bottom:2px solid #c3c3c3;
  background: white;
  font-size: 23px;
}
.steps-inline-box{
  position: relative;
  border:2px solid #c3c3c3;
  width:85%;
  left:5%;
  top:10px;
  background: #f4f0f0;
}
.steps-title span{
  position: relative;
  left:-260px;
  font-size: 22px;;
}
.steps{
  position: relative;
  top:40px;
}
.refund-time-title{
  display: inline-block;
  position: relative;
  height:30px;
  left:-200px;
}
.refund-time-text{
  position: relative;
  left:-200px;
  display: inline-block;
  width:90px;
  height:30px;
}
.refund-time-line-box{
  position: relative;
  width:90%;
  height:50px;
  left:5%;
  border-bottom: 2px solid #c3c3c3;
  top:30px;
}
.steps-inline-box-content{
  text-align: left;
  display: inline-block;
  height:150px;
  width:80%;
}
.infor-text{
  position: relative;
  left:-260px;
  top:30px;
  font-size: 24px;
}
.card-right{
  height:100%;
  width:29.5%;
  border-right:1px solid #c3c3c3;
}
.card-left{
  height:100%;
  width:70%;
  float: left;
  border-right:1px solid #c3c3c3;
}
.card{
  position: absolute;
  top:209px;
  left:120px;
  width:1100px;
  height:620px;
  margin-bottom: 200px;
  border: 1px solid #c3c3c3;
}
.no-active{
  background: #e8e8e8;
  border-right:2px solid #c3c3c3;

}
.active{
  background: #f06a0f;
  color: white;
  border-right:2px solid #c3c3c3;
}
.card-header span{
  position: relative;
  font-size: 22px;
  line-height: 45px;
  float: left;
  width:33.147%;
  height:45px;
  margin:0px;
}
.card-header{
  position: absolute;
  width:1100px;
  height:45px;
  left:120px;
  top:160px;
  border:2px solid #c3c3c3;
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

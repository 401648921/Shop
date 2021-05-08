<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <div class="search-content">
      <span class="search-box">
        <span class="iconfont-go icon-gofangdajing fangdajing"></span>
        <input class="search-input" type="text">
        <span class="iconfont-go icon-gozhaoxiangji zhaoxiangji"></span>
      </span>
      <el-button type="success" class="submit-search">搜索</el-button>
    </div>
    <div class="steps-content">
      <span class="step-task did-task">1.确认订单信息</span>
      <span class="step-task done-task">2.付款</span>
      <span class="step-task doing-task">3.确认收货</span>
      <span class="step-task doing-task">4.评价</span>
    </div>
    <div class="infor-content">
      <span class="ok-icon-box">
        <span class="ok-icon el-icon-check"></span>
      </span>
      <div class="first-text">
        <span class="first-text-header">你已成功付款</span>
        <span class="first-title-content">79.9</span>
        <span class="first-title-foot">元</span>
      </div>
      <div class="second-text">
        <span class="second-text-header">货物送至:</span>
        <span class="second-title-content"><p >什么校区几栋楼房间号</p></span>
        <span class="second-title-foot">谁谁谁收</span>
      </div>
      <div class="third-text">
        <span class="third-text-header">12345678909</span>
        <span class="third-title-content">默认地址</span>
      </div>
      <div class="four-text">
        <span class="four-text-header">已买到宝贝列表</span>
        <span class="four-title-content">订单详情</span>
        <span class="four-title-foot">退款</span>
      </div>
      <div class="warning-content">
        <span class="warning-icon-box">
          <img src="../../assets/warning.png" alt="">
        </span>
        <span class="warning-text">安全警告:请提高警惕，谨防假冒客服电话诈骗</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.warning-icon-box{
  position: relative;
  top:10px;
  left:10px;
}
.warning-text{
  position: relative;
  top:16px;
  font-size: 18px;
}
.warning-content{
  position: relative;
  height:60px;
  width:500px;
  left:200px;
  top:150px;
  border-top:1px solid black;
  border-bottom:1px solid black;
}
.four-text{
  position: relative;
  color: #4f8bc3;
  left:-380px;
  top:80px;
}
.third-text-header{
  display: inline-block;
  width:200px;
}
.third-text{
  position: relative;
  left:-400px;
  top:25px;
  font-size: 18px;
  color: #ccc8a6;
}
.second-text-header{
  font-weight: 700;;
}
.second-title-foot{
  display: inline-block;
  width:80px;
}
.second-title-content{
  display: inline-block;
  width:230px;
}
.second-text{
  position: relative;
  font-size: 20px;
  left:-290px;
  top:30px;
}
.first-title-content{
  display: inline-block;
  width:80px;
  color: #f07d47;
}
.first-text{
  position: relative;
  left:-360px;
  font-size: 25px;
  top:40px;
}
.ok-icon{
  font-size: 50px;
  font-weight: 700;
  color: white;
  line-height: 60px;
}
.ok-icon-box{
  position: absolute;
  display: inline-block;
  width:60px;
  height:60px;
  background-color: #18ca00;
  border-radius: 50%;
  left:30px;
  top:30px;
}
.warning-icon-box{
  position: absolute;
  display: inline-block;
  width:50px;
  height:50px;
  border-radius: 50%;
  border: 1px wave;
}
.infor-content{
  position: relative;
  width:1240px;
  height:400px;
  background: #d4f2d0;
  border: 2px solid #60d94f;
  left:140px;
  top:240px;
}
.doing-task{
  background: #e6e6e6;
}
.done-task{
  background: #e9670f;
  color: white;
}
.did-task{
  background: #ecc4a9;
  color: #cd6118;
}
.steps-content span{
  font-weight: 500;
  width:306px;
  float: left;
  margin:0px;
  height:40px;
  line-height: 40px;;
  border:1px solid #c3c3c3;
}
.steps-content{
  position: relative;
  top:150px;
  left:140px;
  width:1240px;
  height:40px;
}
.search-content{
  position: relative;
  top:-70px;
  width:500px;
  left:450px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.submit-search{
  position: absolute;
  height:43px;
  top:99px;
  left:960px;
  border-radius: 0px 20px 20px 0px;
  width:100px;
  background-color: #4baf50;
}
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:80%;
  height:60px;
  margin:0px;
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
.search-box{
  display: inline-block;
  position: absolute;
  top:100px;
  left:360px;
  width:600px;
  height:40px;
  border-radius: 20px 0px 0px 20px;
  border:1px solid black;
}
.fangdajing{
  font-size:20px;
  float: left;
  margin-top:10px;
  margin-left:10px;
  padding-left: 10px;
}
.zhaoxiangji{
  font-size:35px;
  float: left;
  margin-left:10px;
  padding-left: 10px;
}
.search-input{
  float: left;
  width:475px;
  font-size: 25px;
  border:none;
  outline: none;
  margin-top:3px;
  margin-left:4px;
}
</style>

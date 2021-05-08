<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="shop-infor">
        <span class="infor-title">
          <p class="infor-element">卖家昵称</p>
          <span class="infor-element-communication">联系</span>
        </span>
        <span class="infor-content">
          <span>描述</span>
          <span>服务</span>
          <span>物流</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
        </span>
        <span class="infor-tips">
          <span class="tips-text">该店评价</span>
          <span class="tips-number">粉丝数：1234</span>
        </span>
      </span>
      <span class="search-goods">
        <span id="search-input-box">
          <input type="text">
          <span class="iconfont-go icon-gofangdajing icon-input"></span>
        </span>
          <span class="subimt-goods-name1" type="warning">搜全店</span>
          <span class="subimt-goods-name2" type="warning">搜本店</span>
      </span>
      <span class="put-collection">
        <span class="xingxing el-icon-star-off"></span>
        <span class="put-collection-text">收藏店铺</span>
      </span>
    </div>
    <div class="fans-table">
      <div class="table-header-box">
        <span class="table-header">粉丝列表</span>
      </div>
      <div class="table-content">
        <div v-for="o in 8" :key="o" class="table-task">
          <span class="img-box">
            <img src="#" alt="">
          </span>
          <span class="user-name"><p>昵称昵称昵称</p></span>
          <span class="user-infor"><p>个人简介个人简介</p></span>
          <span class="user-goods-number">买过本店多少件商品</span>
          <span class="user-shop-date">买过本店多久了</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.user-shop-date{
  position: relative;
  display: inline-block;
  width:200px;
  color: #cad0c6;
  left:150px;
  top:40px;
  font-size: 18px;
}
.user-goods-number{
  position: relative;
  display: inline-block;
  width:200px;
  left:340px;
  top:-15px;
  font-size: 18px;
  color: #cad0c6;
}
.user-infor{
  position: relative;
  display: inline-block;
  width:200px;
  left:-205px;
  top:30px;
}
.user-name{
  font-size: 20px;
  position: relative;
  display: inline-block;
  height:30px;
  width:150px;
  left:-30px;
  top:-5px;
}
.img-box{
  display: inline-block;
  position: absolute;
  width:80px;
  height:70px;
  background: red;
  top:15px;
  left:15px;
}
.table-task{
  position: relative;
  width:1000px;
  height:100px;
  border:1px solid #c3c3c3;
}
.table-content{
  position: relative;
  left:105px;
  top:10px;
  width:1000px;
  height:1000px;
}
.table-header{
  position: relative;
  left:-560px;
  font-size: 20px;
  color: #f06a0f;
}
.table-header-box{
  position: relative;
}
.fans-table{
  position: absolute;
  top:160px;
  left:80px;
  width:1200px;
}
.put-collection{
  position: absolute;
  top:40px;
  left:1230px;
}
.xingxing{
  font-size: 20px;
  font-weight: 700;
}
.infor-element-communication{
  font-size:14px;
  display: block;
  margin-top:0px;
  margin-bottom: 10px;
  color: #87c0e3;
}
.infor-element{
  font-size:18px;
  display: block;
  margin-top:0px;
  margin-bottom: 10px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.icon-input{
  position: relative;
  top:2px;
  transform: rotateZ(180deg);
}
.subimt-goods-name1{
  display: inline-block;
  position: relative;
  background-color:#f06a0f ;
  border: none;
  height:22px;
  left:539px;
  font-size:15px;
  line-height: 22px;
  padding:2px;
  width:80px;
}
.subimt-goods-name2{
  display: inline-block;
  position: relative;
  background-color:#eec6aa ;
  border: none;
  height:22px;
  left:534px;
  font-size:15px;
  line-height: 22px;
  padding:2px;
  width:80px;

}
.search-goods{
  position: absolute;
  left:700px;
  width:200px;
  top:10px;
}
#search-input-box{
  display: inline-block;
  position: absolute;
  left:250px;
  border:2px solid #eec6aa;
  width:300px;
  height:22px;
}
#search-input-box input{

  border:none;
  outline:none;
  width:270px;
  height:20px;
}
.tips-number{
  display: block;
  font-size: 17px;
  position: relative;
  left:30px;
  top:10px;
  color: #dedede;
}
.tips-text{
  display: block;
  font-size: 19px;
}
.infor-tips{
  position:relative;
  left:260px;
  top:-54px;
  font-weight: 500;
  font-size: 20px;
}
.score{
  color: red;
}
.infor-content span{
  margin-top:10px;
  float: left;
  width:60px;
}
.infor-content{
  display: inline-block;
  margin-top:30px;
  margin-left:40px;
  position: relative;
  left:60px;
  width:190px;
}
.infor-title{
  position: absolute;
  top:40px;
}
.shop-infor{
  position: absolute;
  margin-left:80px;
  left:80px;
  width:500px;
  height:40px;
  display: inline-block;
  top:-20px;
}
.infor-title{
  font-size: 30px;
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
  position: absolute;
  width:100%;
}
#title{
  position: absolute;
  margin-left:40px;
  left:0px;
  top:-20px;
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

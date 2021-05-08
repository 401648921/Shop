<template>
  <div class="content">
    <div>
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="shop-infor">
        <span class="infor-title">我的店铺</span>
        <span class="infor-content">
          <span>描述</span>
          <span>服务</span>
          <span>物流</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
        </span>
        <span class="infor-tips">
          <span>上传商品</span>
          <span v-text="'粉丝数：'+fansNumber">粉丝数：1234</span>
        </span>
      </span>
      <span class="search-goods">
        <span id="search-input-box">
          <input type="text">
          <span class="iconfont-go icon-gofangdajing icon-input"></span>
        </span>
          <span class="subimt-goods-name" type="warning">搜本店</span>
      </span>
      </div>
      <div id="no-sale-tips">
        <div id="title-text1" class="title-tips"><p>未出售的商品：<span class="goods-number" v-text="count">8</span></p></div>
        <el-row class="show-pics">
        <el-col @click="goMyGoods(o.number)" class="show-pic" :span="8" v-for="(o, index) in goodsList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div @click="goMyGoods(o.number)" class="image"><img :src="o.photo" ></div>
            <div @click="goMyGoods(o.number)" class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
              <p align="left" class="goods-price-t"><span class="iconfont-go icon-gofl-renminbi"></span > <span v-text="o.price"></span></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div id="sale-tips">
      <div class="title-tips"><p id="title-text2">已售商品：<span class="goods-number" v-text="orderCount">3</span></p></div>
        <el-row class="show-pics">
        <el-col class="show-pic" :span="8" v-for="(o, index) in orderList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image"><img :src="o.photo" ></div>
            <div class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
              <p align="left" class="goods-price-t"><span class="iconfont-go icon-gofl-renminbi"></span><span v-text="o.price"></span></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      goodsList:[],
      count:0,
      orderList:[],
      orderCount:0,
      fansNumber:0
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
          url:'/api/searchGoods',
          params: {
            cnt:100,
            fromId:this.$store.getters.getUserId,
            high:999999999,
            low:0,
            page:1
          }
        }).then(resp=>{
          this.goodsList= resp.data.data.goodsList;
          this.count = resp.data.data.count;

        }).catch(function(error){
          alert(error.url);
        })
        this.$axios({
          method:'get',
          url:'/api/orderList',
          params: {
            cnt:100,
            id:this.$store.getters.getUserId,
            status:8,
            page:1
          }
        }).then(resp=>{
          this.orderList= resp.data.data.goodsList;
          this.orderCount = resp.data.data.count;
        }).catch(function(error){
          alert(1);
        })
        this.$axios({
          method:'get',
          url:'/api/fans',
          params: {
            cnt:100,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.fansNumber = resp.data.data.count;
        }).catch(function(error){
          alert(1);
        })
    },
    methods: {
      goMyGoods:function(number){
        this.$router.push({
          path:'/shop/myGoods',
          query:{
            number:number
          }
        })
      }
    }
}
</script>

<style scoped="scoped">
.goods-number{
  color: red;;
}
#title-text2{
  position: relative;
  top:50px;
  right:600px;
  font-size:20px;
  margin-bottom: 50px;

}
#title-text1{
  position: relative;
  top:150px;
  right:600px;
  font-size:20px;
  margin-bottom: 50px;
}
#sale-tips{
  display: block;
  position: relative;
  padding-top:50px;
  width:1200px;
  margin-left:100px;
}
.title-tips{
  position: relative;
  height:100px;
}
#no-sale-tips{
  position: relative;
  top:0px;
  width:1200px;
  margin-left:100px;
}
.information{
  height:50px;
}
.goods-price-t span{
  color: red;
}
.goods-title{
  position: relative;
  top:-15px;
}
.goods-price-t{
  position: relative;
  top:-25px;
  font-size:25px;

}
.show-pics{
  position: relative;
  top:50px;
  width:1400px;
  display: block;
}
.show-pic{
  margin-top:5px;
  width:220px;
  margin-bottom: 60px;
  float: left;
  margin-left:50px;
  margin-right: 75px;
}
.image {
  width: 100%;
  display: block;
  height: 235px;
  overflow: hidden;
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
.subimt-goods-name{
  display: inline-block;
  position: relative;
  background-color:#eec6aa ;
  border: none;
  height:32px;
  left:626px;
  font-size:15px;
  line-height: 32px;
  padding:2px;
}
.search-goods{
  position: absolute;
  left:700px;
  width:200px;
}
#search-input-box{
  display: inline-block;
  position: absolute;
  left:350px;
  border:2px solid #eec6aa;
  width:350px;
  height:32px;
}
#search-input-box input{

  border:none;
  outline:none;
  width:320px;
  height:30px;
}
.infor-tips{
  position:relative;
  left:140px;
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
  left:140px;
  width:190px;
}
.infor-title{
  position: absolute;
  top:40px;
}
.shop-infor{
  position: absolute;
  margin-left:80px;
  left:160px;
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

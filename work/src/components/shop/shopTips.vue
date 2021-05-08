<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="shop-infor">
        <span class="infor-title">
          <p class="infor-element" v-text="user.username">卖家昵称</p>
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
          <span class="tips-number" v-text="'粉丝数:'+user.fansCounts">粉丝数：1234</span>
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
    <div class="pic-change-box">
      <template>
      <el-carousel class="pic-change" indicator-position="outside">
        <el-carousel-item  v-for="(item,index) in table.slice(0,3)" :key="index">
        <img :src="item.photo" alt="">
        </el-carousel-item>
      </el-carousel>
    </template>
    </div>
    <div class="goods-content">
      <el-row class="show-pics">
        <el-col class="show-pic" :span="8" v-for="(o, index) in table" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div @click="pushPage(index)" class="image"><img :src="o.photo" ></div>
            <div  @click="pushPage(index)" class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡11111111</p>
              <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span><span v-text="o.price"></span></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      table:{
      },
      user:{

      }
    }
  },
  methods: {
    pushPage:function(index){
      this.$router.push({
        path:'/shop/goods',
        query:{
          number:this.table[index].number
        }
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
          url:'/api/searchGoods',
          params: {
            cnt:8,
            high:9999999,
            low:0,
            page:1
          }
        }).then(resp=>{
          this.table= resp.data.data.goodsList;
          for(let i =0;i<this.comments.length;i++){
            this.table[i].updateTime=this.table[i].updateTime.substring(0,10)+' '+this.table[i].updateTime.substring(11,19)
          }
        }).catch(function(error){
          alert(error.url);
        })
        this.$axios({
          method:'get',
          url:'/api/user',
          params: {
            id:this.$route.query.number
          }
        }).then(resp=>{
          this.user= resp.data.data.user;
        }).catch(function(error){
          alert(error.url);
        })
  }
}
</script>

<style scoped="scoped">
.goods-content{
  position: absolute;
  width:1300px;
  top:-60px;
  left:30px;
  width:600px;
}
.information{
  height:50px;
}
.goods-price span{
  color: red;
}
.goods-title{
  position: relative;
  top:-15px;
}
.goods-price{
  position: relative;
  top:-25px;
  font-size:25px;

}
.show-pics{
  position: absolute;
  top:650px;
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
.pic-change-box{
  position: absolute;
  left:-250px;
}
.pic-change{
  position: absolute;
  top:190px;
  left:350px;
  display: inline-block;
  padding-left:0px;
  margin-left:0px;
  width:1200px;
  background-color: cornflowerblue ;
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

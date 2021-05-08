<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <div>
      <span class="search-box">
        <span class="iconfont-go icon-gofangdajing fangdajing"></span>
        <input v-model="searchText" class="search-input" type="text">
        <span class="iconfont-go icon-gozhaoxiangji zhaoxiangji"></span>
      </span>
      <el-button type="success" class="submit-search" @click="pushSearch">搜索</el-button>
    </div>
    <span class="recommend-tips">
      <span class="recommend-tip">
        <a align="left" href="#">女装</a>
        <a align="left" href="#">男装</a>
        <a align="left" href="#">玩具毛绒</a>
        <a align="left" href="#">鞋帽</a>
        <a align="left" href="#">内衣</a>
        <a align="left" href="#">运动</a>
      </span>
      <span class="recommend-tip">
        <a align="left" href="#">口红</a>
        <a align="left" href="#">零食</a>
        <a align="left" href="#">个人防护</a>
        <a align="left" href="#">美妆彩妆</a>
        <a align="left" href="#">书籍</a>
        <a align="left" href="#">电子产品</a>
      </span>
      <span class="recommend-tip">
        <a align="left" href="#">口红</a>
        <a align="left" href="#">零食</a>
        <a align="left" href="#">个人防护</a>
        <a align="left" href="#">美妆彩妆</a>
        <a align="left" href="#">书籍</a>
        <a align="left" href="#">电子产品</a>
      </span>
      <span class="recommend-tip">
        <a align="left" href="#">口红</a>
        <a align="left" href="#">零食</a>
        <a align="left" href="#">个人防护</a>
        <a align="left" href="#">美妆彩妆</a>
        <a align="left" href="#">书籍</a>
        <a align="left" href="#">电子产品</a>
      </span>
      <span class="recommend-tip">
        <a align="left" href="#">口红</a>
        <a align="left" href="#">零食</a>
        <a align="left" href="#">个人防护</a>
        <a align="left" href="#">美妆彩妆</a>
        <a align="left" href="#">书籍</a>
        <a align="left" href="#">电子产品</a>
      </span>
    </span>
    <template>
      <el-carousel class="pic-change" indicator-position="outside">
        <el-carousel-item v-for="(item,index) in goodsList" :key="index">
          <img  :src="item.photo" alt="">
        </el-carousel-item>
      </el-carousel>
    </template>
    <div id="goods-show">
      <div class="show-tips">
        <span class="show-title" align="left" href="#">推荐</span>
        <a align="left" href="#">细分分类</a>
        <a align="left" href="#">细分分类</a>
        <a align="left" href="#">细分分类</a>
        <a align="left" href="#">细分分类</a>
        <a align="left" href="#">细分分类</a>
      </div>
      <el-row class="show-pics">
        <el-col  class="show-pic" :span="8" v-for="(o, index) in goodsList" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card  :body-style="{ padding: '0px' }">
            <div @click="pushPage(index)" class="image"><img  :src="o.photo" ></div>
            <div @click="pushPage(index)" class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
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
  created () {
    setTimeout( function(){
    //add your code
    }, 5 * 1000 );
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  data(){
    return{
      goodsList:[],
      count:0,
      searchText:''
    }
  },
  mounted:function(){
    //alert(this.$store.getters.getUserId)
      this.$axios({
          method:'get',
          url:'/api/searchGoods',
          params: {
            cnt:8,
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
    },
    methods: {
      pushPage:function(index){
        this.$router.push({
          path:'/shop/goods',
          query:{
            number:this.goodsList[index].number
          }
        })
      },
       pushSearch:function(){
         if(this.searchText!=''){
           this.$router.push({
              path:'/shop/searchPage',
              query:{
                searchText:this.searchText
              }
            })
         }
      }
    }
}
</script>

<style scoped="scoped">
.pic-change img{
  width:800px;
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
.show-title{
  font-weight: 700;
  font-size:20px;
  bottom: 6px;
  position:relative;
  float: left;
  margin-right:20px;
  text-decoration: none;
  color: black;
}
#goods-show{
  position: relative;
  height:20px;
  width:1300px;
  left:60px;;
}
.show-tips{
  position:absolute;
  width:1300px;
  left:0px;
  top:600px;
}
.show-tips a{
  position:relative;
  float: left;
  margin-right:20px;
  text-decoration: none;
  color: black;
  font-size:10px;
}
.pic-change{
  position: absolute;
  top:190px;
  left:350px;
  display: inline-block;
  padding-left:0px;
  margin-left:0px;
  width:1000px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.submit-search{
  position: absolute;
  height:43px;
  top:49px;
  left:1000px;
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
  top:10px;
  left:60px;
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
  top:50px;
  left:400px;
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
.recommend-tips{
  display: inline-block;
  position: absolute;
  left:40px;
  top:160px;
  width:200px;
  height:400px;
}
.recommend-tip{
  float: left;
  width:220px;
  height:70px;
  margin-top:3px;
  border-bottom: 1px solid #d5d5d5;
}
.recommend-tip a{
  float: left;
  right:620px;
  margin-right: 20px;
  height:20px;
  margin-top:10px;
  color: black;
  text-decoration: none;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>

<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="last-title">收藏夹</span>
      <span class="tran-page">
        <span><router-link tag="span" :to="{ path: '/shop/myCollection'}" push>宝贝收藏</router-link></span>
        <span class="active">店铺收藏</span>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
      <span class="manage">
        <el-checkbox  class="element-manage1" @change="changeAll">全选</el-checkbox>
        <span class="el-icon-delete element-manage2" @click="deleteAll" >删除</span>
        <el-button class="element-manage3 button">批量管理</el-button>
        <span class="search-goods">
          <input type="text">
          <span class="iconfont-go icon-gofangdajing goods-input-icon"></span>
        </span>
      </span>
      </div>
      <div class="choice-page">
        <span class="active">全部店铺</span>
      </div>
      <div id="shops">
        <div  :key="index" v-for="(o,index) in tableData" class="shop">
          <img @click="tranShow(index)" v-show="show[index]" class="choice-shop" src="../../assets/shopChoice.png" alt="">
          <span  class="user-box">
            <span @click="tranShow(index)" class="img-box">
              <img :src="o.photo" alt="">
            </span>
            <span @click="tranShow(index)" class="user-name" v-text="o.username">卖家昵称</span>
            <span @click="tranShow(index)" class="shop-commication">联系</span>
            <span class="delete el-icon-delete" @click="deleteFans(o.id,index)"></span>
          </span>
          <span class="goods">
            <span class="goods-shop-title">店铺商品</span>
            <span class="goods-content">
              <el-col  class="show-pic" :span="8" >
                <el-card :class="o.goodsId1==null?'opacity':''" :body-style="{ padding: '0px' }">
                  <div @click="goPurchar(o.goodsId1)" class="image"><img :src="o.goodsPhoto1"></div>
                  <div @click="goPurchar(o.goodsId1)" class="information">
                  <p align="left" class="goods-title" v-text="o.goodsName1">好吃的汉堡111111111</p>
                  <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.goodsPrice1"></span></p>
                  </div>
                </el-card>
              </el-col>
              <el-col :class="o.goodsId2==null?'opacity':''" class="show-pic" :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                  <div @click="goPurchar(o.goodsId2)" class="image"><img :src="o.goodsPhoto2" ></div>
                  <div @click="goPurchar(o.goodsId2)" class="information">
                  <p align="left" class="goods-title" v-text="o.goodsName2">好吃的汉堡111111111</p>
                  <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.goodsPrice2"></span></p>
                  </div>
                </el-card>
              </el-col>
              <el-col :class="o.goodsId3==null?'opacity':''" class="show-pic" :span="8"  >
                <el-card :body-style="{ padding: '0px' }">
                  <div @click="goPurchar(o.goodsId3)" class="image"><img :src="o.goodsPhoto3" ></div>
                  <div @click="goPurchar(o.goodsId3)" class="information">
                  <p align="left" class="goods-title" v-text="o.goodsName3">好吃的汉堡111111111</p>
                  <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.goodsPrice3"></span></p>
                  </div>
                </el-card>
              </el-col>
            </span>
          </span>
          <span class="look-more">查看更多<span class="el-icon-arrow-right"></span></span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    count:0,
    tableData:[],
    photo:'',
    show:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
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
          url:'/api/followList',
          params: {
            cnt:100,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.tableData= resp.data.data.followList;
          this.count = resp.data.data.count;

        }).catch(function(error){
          alert(error.url);
        })
    },
    methods:{
      tranShow:function(index){

        this.$set(this.show,index,!this.show[index])
      },
      isShow:function(index){
        return this.show[index];
      },
      goPurchar:function(number){
        if(number!=null){
          this.$router.push({
          path:'/shop/goods',
          query:{
            number:number
          }
        })
        }
    },
    deleteFans:function(id,index){
      this.$axios({
          method:'delete',
          url:'/api/fans',
          params: {
            fansId:this.$store.getters.getUserId,
            id:id
          }
        }).then(resp=>{
          this.tableData.splice(index,1);
          this.count-=1;
        }).catch(function(error){
          alert(error.url);
        })
    },
    changeAll:function(val){
      for(let i =0;i<this.count;i++){
        this.$set(this.show,i,val)
      }
    },
    deleteAll:function(){
      for(let i =0;i<this.count;i++){
        if(this.show[i]){
          this.deleteFans(this.tableData[i].id,i);
        }
      }
    }
    },
    computed: {

    }
}
</script>

<style scoped="scoped">
.opacity {
  opacity: 0.5;
}
.choice-shop{
  position: absolute;
  width:100%;
  height:100%;
  left:00px;
  z-index: 10;
  opacity: 0.7;
}
.look-more{
  position: relative;
  left:250px;
}
.goods-shop-title{
  position: relative;
  font-size: 20px;
  left:-400px;
  top:20px;
}
.goods-content{
  position: relative;
  top:70px;
  left:360px;
}
.delete{
  position: relative;
  font-size:25px;
  top:-43px;
  left:60px;
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
  position: relative;
  top:50px;
  left:1000px;
  width:1400px;
  display: block;
}
.show-pic{
  margin-top:5px;
  margin-left:10px;
  width:160px;
  float: left;
}
.imge img{
  height: 150px;
  width:160px;
}
.image {
  width: 160px;
  display: block;
  height: 150px;
  overflow: hidden;
}
.shop-commication{
  position: absolute;
  top:40px;
  left:80px;
}
.user-name{
  position: relative;
  top:-50px;
  left:10px;
  font-size:18px;
  text-align: left;
}
.user-box{
  display: inline-block;
  position: absolute;
  left:-0px;
}
.img-box img{
  width:80px;
  height:80px;
}
.img-box{
  display: inline-block;
  position: relative;
  width:80px;
  height:80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: blueviolet;
}
.shop{
  position: relative;
  display: block;
  width:1200px;
  margin-left:200px;
  margin-top:20px;
  height:300px;
  border:1px solid black;
}
#shops{
  position:absolute;
  display: block;
  top:200px;
  left:-30px;
}
.choice-page{
  position: absolute;
  top:140px;
  font-size: 20px;
  left:150px;
}
.choice-page span{
  margin-right:30px;
}
.goods-input-icon{
  position: relative;
  font-size:20px;
}
.button{
 font-size:10px;
}
.search-goods{
  display: inline-block;
  position: absolute;
  left:300px;
  top:5px;
  width:300px;
  height:24px;
  border: 1px solid black;
}
.search-goods input{
  position: relative;
  font-size:20px;
  height:20px;
  width:270px;
  border:none;
  outline: none;
}
.element-manage1{
  position: absolute;
  margin-left: 20px;
  left:0px;
  top:10px;
}
.element-manage2{
  position: absolute;
  width:50px;
  margin-left: 20px;
  left:80px;
  top:10px;
}
.element-manage3{
  position: absolute;
  margin-left: 20px;
  left:160px;
}
.manage{
  position: absolute;
  top:140px;
  left:780px;
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
  left:1050px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
}
.active{
  color: #f06a0f;
}
.tran-page{
  position: absolute;
  top:55px;
  left:450px;
  width:300px;
  font-size: 25px;
}
.tran-page span{
  display: inline-block;
  width:120px;
  position: relative;
}
.last-title{
  position: absolute;
  font-size: 30px;
  left:200px;
  top:25px;
  color: black;
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
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
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

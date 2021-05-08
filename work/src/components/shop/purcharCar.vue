<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <span class="last-title">购物车</span>
    <div class="search-content">
      <span class="search-box">
        <span class="iconfont-go icon-gofangdajing fangdajing"></span>
        <input class="search-input" type="text">
        <span class="iconfont-go icon-gozhaoxiangji zhaoxiangji"></span>
      </span>
      <el-button type="success" class="submit-search">搜索</el-button>
    </div>
    <div id="goods-boxs">
      <span class="content-title">
        <span class="title-text">全部商品</span>
        <span class="title-line"></span>
      </span>
      <span  class="all-price">
        <span class="price-title">已选商品</span>
        <span class="price-sum">0.00</span>
        <el-button type="primary" disabled class="price-button">结算</el-button>
      </span>
    </div>
    <div class="goods-content">
      <div class="table-header">
        <span class="check"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></span>
        <span class="tip">商品信息</span>
        <span class="tip">单价</span>
        <span class="tip">运费</span>
        <span class="tip">金额</span>
        <span class="tip">操作</span>
      </div>
      <div class="table-content">
        <div class="table-task" :key="index" v-for="(o,index) in data.shoppingList">
          <div class="task-header"></div>
          <span class="check-one"><el-checkbox @change="handleCheckedCitiesChange" v-model="checkedElement[index]"></el-checkbox> </span>
          <span class="img-box">
            <img :src="o.photo" alt="">
          </span>
          <span class="goods-infor" @click="pushPage(index)"><p align="left" v-text="o.description"  >商品描述商品描述商品描述商品描述商品描述</p></span>
          <span class="one-price"><span class="price-icon">￥</span><span v-text="o.price"></span></span>
          <span class="transFrom-price"><span class="price-icon">￥</span>0.00</span>
          <span class="price"><span class="price-icon">￥</span><span v-text="o.price"></span></span>
          <span class="operation">
            <span class="put-on">移入收藏夹</span>
            <span class="delete" @click="deleteGoods(o.number,index)">删除</span>
          </span>
        </div>
      </div>
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
  data(){
    return{
      checkAll: false,
      checkedCities: [0,1,2,3],
      cities: 4,
      isIndeterminate: false,
      checkedElement:[false,false,false,false],
      data:{}
    }
  },
  mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/shopping',
          params: {
            cnt:100,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.data= resp.data.data;
        }).catch(function(error){
          alert(error.url);
        })
    },
  methods: {
      deleteGoods:function(number,index){
        this.$axios({
          method:'delete',
          url:'/api/shopping',
          params: {
            id:this.$store.getters.getUserId,
            number:number
          }
        }).then(resp=>{
          this.data.shoppingList.splice(index,1)
        }).catch(function(error){
          alert(error.url);
        })
      },
      pushPage:function(index){
        this.$router.push({
          path:'/shop/goods',
          query:{
            number:this.data.shoppingList[index].number
          }
        })
      },
      handleCheckAllChange(val) {
        if(val){
          for(let i = 0;i<this.checkedElement.length;i++){
            this.checkedElement[i]=true;
          }
        }else{
          for(let i = 0;i<this.checkedElement.length;i++){
            this.checkedElement[i]=false;
          }
        }
      },
      handleCheckedCitiesChange(value) {
        if(this.checkedElement[0]&&this.checkedElement[1]&&this.checkedElement[2]&&this.checkedElement[3]){
          this.checkAll=true;

        }else if(!this.checkedElement[0]&&!this.checkedElement[1]&&!this.checkedElement[2]&&!this.checkedElement[3]){
          this.checkAll=false;
          //alert(1)
        }else{
          this.checkAll=false;
          //alert(2)
        }

      }
    }
}
</script>

<style scoped="scoped">
.price-title{
  display: inline-block;
  position: relative;
  width:100px;
  left:0px;
}
.price-sum{
  display: inline-block;
  position: relative;
  width:40px;
  left:9px;
}
.price-button{
  position: relative;
  left:20px;
  top:-5px;
}
.content-title{
  position: absolute;
  top:180px;
  left:-45px;
}
.table-content{
  position: absolute;
  top:300px;
}
.operation span{
  float: left;
  margin-bottom: 10px;
  width:80px;
}
.operation{
  float: left;
  margin-top:20px;
  margin-left:170px;
  width:90px;
}
.price{
  float: left;
  margin-top:20px;
  margin-left:180px;
}
.transFrom-price{
  float: left;
  margin-top:20px;
  margin-left:170px;
}
.price-icon{
  font-size: 20px;
  margin-right:10px;
}
.one-price{
  float: left;
  margin-top:20px;
  margin-left:120px;
}
.goods-infor{
  float: left;
  width:150px;
  margin-left:150px;

}
.img-box img{
  width:80px;
  height: 80px;
}
.img-box{
  float: left;
  width:80px;
  height:80px;
  margin-top:7px;
  margin-left:10px;
  background-color: brown;

}
.check-one{
  float: left;
  margin-left:10px;
  margin-top:5px;
}
.table-task{
  position: relative;
  height:90px;
  width:1380px;
  border:1px solid black;
  left:30px;
  margin-bottom:60px;
}
.check{
  float: left;
  margin-left:20px;
  font-size: 15px;
}
.tip{
  float: left;
  margin-left:210px;
  font-size: 15px;
}
.table-header{
  width:1380px;
  position:absolute;
  border:1px solid black;
  top:220px;
  left:30px;
  height:20px;
  margin-bottom: 30px;
}
.all-price{
  position:absolute;
  left:1120px;
  width:300px;
  top:180px;
  font-size: 25px;
}
.title-line{
  position:relative;
  display: inline-block;
  width:150px;
  height:5px;
  border-bottom: 1px solid orange;
}
.title-text{
  position: relative;
  font-size:20px;
  width:100px;
  color: orange;
  top:-20px;
  left:80px;
}
.last-title{
  position:absolute;
  font-size:35px;
  top:20px;
  left:200px;
}
.task-header{
  position: absolute;
  width:1380px;
  height:30px;
  top:-32px;
  left:-1px;
  border:1px solid black;
}
.search-content{
  width:500px;
  position: relative;
  top:-70px;
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
.recommend-tips{
  display: inline-block;
  position: relative;
  right:100px;
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

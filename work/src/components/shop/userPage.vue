<template>
  <div class="content">
    <div class="content-header">
      <span id="title-po">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="to-Page">
        <span class="first-title">首页</span>
        <span class="second-title-po">账户设置</span>
      </span>
      <span class="search-box-po">
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
    <div class="table-header-content">
      <el-breadcrumb class="goods-to" separator="|">
        <el-breadcrumb-item @click="changeTo(-1,-1);select=1" :class="select==1?'active':''"><span @click="changeTo(-1,100);select=1">所有订单</span></el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(1,0);select=2" :class="select==2?'active':''"> <span @click="changeTo(1,0);select=2">待付款</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(2,0);select=3" :class="select==3?'active':''"> <span @click="changeTo(2,0);select=3">待发货</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(3,0);select=4" :class="select==4?'active':''"> <span @click="changeTo(3,0);select=4">待收货</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(2,1);select=5" :class="select==5?'active':''"> <span @click="changeTo(2,1);select=5">待发出</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(3,1);select=6" :class="select==6?'active':''"> <span @click="changeTo(3,1);select=6">已发出</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(4,0);select=7" :class="select==7?'active':''"> <span @click="changeTo(4,0);select=7">待评价</span> </el-breadcrumb-item>
        <el-breadcrumb-item @click="changeTo(8,0);select=8" :class="select==8?'active':''"> <span @click="changeTo(8,0);select=8">已完成</span> </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="input-submit">
        <span class="goods-search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
        <span class="last-title-yrt">更多筛选条件</span>
        </span>
      </div>
      <div class="header-span-po">
        <span class="header-span1">宝贝</span>
        <span class="header-span2">单价</span>
        <span class="header-span3">商品操作</span>
        <span class="header-span4">实付款</span>
        <span class="header-span5">交易状态</span>
        <span class="header-span6">交易操作</span>
      </div>

    </div>
    <div class="table-content-po">
      <div class="table-task-one-po" v-for="(o,index) in data" :key="index">
        <div class="table-task-header">
          <el-checkbox size="big" class="date-task" v-model="checkedGoods[index]">2020-03-04</el-checkbox>
          <span class="goods-number" v-text="'订单号:'+o.number">订单号:12334567890000009876</span>
          <span class="shop-name" v-show="o.isBuyer==1" v-text="o.fromName">卖家名称</span>
          <span class="el-icon-delete delete"></span>
        </div>
        <div class="table-task-content">
          <span class="img-box">
            <img :src="o.photo" alt="">
          </span>
          <span class="goods-name"><p align="left" v-text="o.goodsName">名名称名称名称商品名称名称商品名称</p></span>
          <span class="goods-price" v-text="'￥'+o.price">￥99.9</span>
          <span class="operator" v-show="position==-1">联系买家</span>
          <span class="operator-after" v-show="o.isBuyer==1&&o.status!=1" @click="goReport(o,number,o.fromId)">投诉卖家</span>
          <span class="operator-after-it" @click="goRefund(o.number)">退款</span>
          <span class="true-price">
            <span class="all-price" v-text="'￥'+o.price">￥99.9</span>
            <span class="tran-price">含运费0.00</span>
          </span>
          <span class="goods-condition">
            <span class="success-go">交易成功</span>
            <span class="detail-infor" @click="goInfor(o.number)">订单详情</span>
          </span>
          <span class="comment">
            <span v-if="o.status==8&&o.isBuyer==1"  class="comment-go" >追加评论</span>
            <span v-else-if="o.status==1&&o.isBuyer==1" @click="goPay(o.number)" class="comment-go-pay">付款</span>
            <span v-else-if="o.status==2&&o.isBuyer==1" class="comment-go-tran">提醒卖家发货</span>
            <span v-else-if="o.status==3&&o.isBuyer==1" class="comment-go-take" @click="goReceive(o.number,o.fromId)">确认收货</span>
            <span v-else-if="o.status==2&&o.isBuyer==0" class="comment-go-pay" @click="sendOrder(o.number)">已发出</span>
            <span v-else-if="o.status==3&&o.isBuyer==0" class="comment-go-tran">等待买家收货</span>
            <span v-else-if="o.status==4&&o.isBuyer==1" @click="goComment(o.number,o.fromId)"  class="comment-go-coment">评价</span>
            <span v-else class="comment-go">&nbsp; &nbsp; &nbsp; </span>
          </span>
        </div>
      </div>
    </div>
    <div class="page-content">

      <span class="page-tran">
        <div class="block">
            <el-pagination
              background
              :page-size="4"
              :current-page="page.nowPage"
              @current-change="pageChange"
              layout="prev, pager, next,jumper"
              :total="page.count">
            </el-pagination>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    headerInput:'',
    checked:10,
    checkedGoods:[
      false,false,false,false
    ],
    page:{
      nowPage:1,
      count:1,
      allPage:1
    },
    data:[],
    position:-1,
    select:2,
    status:-1,
    isBuyer:0
  }
},
methods: {
  pageChange:function(page){
      this.page.nowPage = page;
      this.$axios({
          method:'get',
          url:'/api/orderList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:this.page.nowPage,
            status:this.status,
            isBuyer:this.isBuyer
          }
        }).then(resp=>{

          this.data= resp.data.data.orderList;
        }).catch(function(error){
          alert(error.url);
        })
    },
    goRefund:function(number){
      this.$router.push({
          path:'/shop/submitRefund',
          query:{
            number:number,
          }
        })
    },
    sendOrder:function(number){
        this.$axios({
          method:'post',
          url:'/api/sendOrder',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            fromId:this.$store.getters.getUserId,
            number:number
          }
        }).then(resp=>{

           this.$alert('发送成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push({
          path:'/shop/userPage',
        })
        }).catch(function(error){
          alert(error.url);
        })
      },
    goReceive:function(number,salerId){
      this.$router.push({
          path:'/shop/receiveGoods',
          query:{
            number:number,
            salerNumber:salerId
          }
        })
    },
    goInfor:function(number){
      this.$router.push({
          path:'/shop/goodsInformation',
          query:{
            number:number,
          }
        })
    },
    goComment:function(number,salerNumber){
      this.$router.push({
          path:'/shop/toComment',
          query:{
            number:number,
            salerNumber:salerNumber
          }
        })
    },
    goReport:function(number,fromId){
      this.$router.push({
          path:'/shop/report',
          query:{
            number:number,
            fromId:fromId
          }
        })
    },
    goPay(number){
      this.$router.push({
          path:'/shop/payPage',
          query:{
            number:number
          }
        })
    },
    changeTo:function(status,isBuyer){
      this.page.nowPage = 1;
      this.status = status;
      this.isBuyer = isBuyer;
      this.$axios({
          method:'get',
          url:'/api/orderList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:this.page.nowPage,
            status:this.status,
            isBuyer:this.isBuyer
          }
        }).then(resp=>{

          this.data= resp.data.data.orderList;
          this.page.count = resp.data.data.count;
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
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/orderList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:this.page.nowPage,
            status:this.status,
            isBuyer:this.isBuyer
          }
        }).then(resp=>{

          this.data= resp.data.data.orderList;
          this.page.count = resp.data.data.count;
        }).catch(function(error){
          alert(error.url);
        })
  }
}
</script>

<style scoped="scoped">
.active>>>.el-breadcrumb__inner{
  color: #f4880f  !important;
}
.page-tip{
  position: relative;
  left:280px;
  top:5px;
}
.page-tran{
  position: relative;
  left:490px;
}
.page-infor{
  font-size: 13px;
}
.page-tran{
  display: inline-block;
}
.page-content{
  position: absolute;
  top:1000px;
  left:280px;
}
.comment-go-tran{
  display: inline-block;
  width:70px;
  text-align: left;
  display: block;
  position: relative;
  left:30px;
  top:10px;
  color: red;
}
.comment-go-coment{
  display: block;
  position: relative;
  display: inline-block;
  height:30px;
  width:50px;
  line-height: 30px;
  border:2px solid #c3c3c3;
}
.comment-go-take{
  display: block;
  position: relative;
  color: white;
  position: relative;
  left:30px;
  background: #4672c1;
}
.comment-go-pay{

  position: relative;
  left:30px;
  display: block;
  position: relative;
  color: white;
  background: #f06a0f;
}
.comment-go{
  display: block;
  position: relative;
  width:60px;
  height:30px;
}
.detail-infor{
  display: block;
  position: relative;
  left:-20px;
  top:20px;
}
.success-go{
  display: block;
  position: relative;
  left:-20px;
  top:10px;
}
.comment{
  display: inline-block;
  height:100px;
  position: relative;
  width:90px;
  left:120px;
  top:-40px;
}
.goods-condition{
  display: inline-block;
  height:100px;
  left:125px;
  top:-40px;
  position: relative;
  border-right:1px solid black;
}
.tran-price{
  position: relative;
  display: block;
  top:15px;
}
.true-price{
  display: inline-block;
  height:100px;
  top:-36px;
  position: relative;
  left:80px;
  width:120px;
  border-right:1px solid black;
}
.all-price{
  position: relative;
  top:10px;
  display: block;
  font-size: 20px;
}
.operator-after-it{
  display: block;
  position: absolute;
  left:610px;
  top:110px;
}
.operator-after{
  display: block;
  position: absolute;
  left:610px;
  top:80px;
}
.operator{
  position: relative;
  display: inline-block;
  left:60px;
  top:-45px;
}
.goods-price{
  position: relative;
  left:-85px;
  top:-13px;
  font-size: 20px;
  display: inline-block;
  width:60px;
}
.goods-name{
  position: relative;
  display: inline-block;
  top:-45px;
  left:-150px;
  width:220px;
  height:220px;
}
.goods-name p{
  display: -webkit-box;
  text-overflow:ellipsis;
  overflow: hidden;
  -webkit-line-clamp:2;
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
  background-color:yellow ;
  left: -160px;
  top:10px;
  overflow: hidden;
}
.delete{
  position: relative;
  left:300px;
  font-size: 26px;
  top:5px;
}
.shop-name{
  position: relative;
  left:-160px;
  top:7px;
}
.goods-number{
  position: relative;
  font-size: 18px;
  left:-230px;
  top:7px;
}
.date-task{
  transform: scale(1.5);
  position: relative;
  display: inline-block;
  left:-280px;
  top:5px;
  font-size: 20px;
}
.table-task-header{
  display: block;
  height: 40px;
  background-color: #e8e8e8 ;
}
.table-task-one-po{
  position: relative;
  display: block;
  height:140px;
  width:1080px;
  left:270px;
  top:140px;
  margin-bottom: 30px;;
  border:1px solid black;
}
.input-submit{
  position: relative;
  top:100px;
  left:-330px;
}
.page-change{
  position: relative;
  left:775px;
}
.header-button{
  font-size: 14px;
  border:1px solid #d0cece;
  padding-left:5px;
  padding-right:15px;
  padding-top:2px;
  padding-bottom: 2px;;
}
.header-after-span{
  display: inline-block;

}
.header-after{
  position: relative;
  top:140px;
  left:-100px;
  width:1050px;
  height:40px;
}
.header-span1{
  margin-left:160px;
}
.header-span2{
  margin-left:210px;
}
.header-span3{
  margin-left:150px;
}
.header-span4{
  margin-left:50px;
}
.header-span5{
  margin-left:50px;
}
.header-span6{
  margin-left:50px;
}
.last-title-yrt{
  position: absolute;
  width:100px;
  left:380px;
  top:5px;
}
.goods-to span{
  margin-left:10px;
}
.goods-to{
  position: relative;
  top:140px;
  left:50px;
  width:1400px;
  font-size: 25px;
}
.header-span-po{
  display: block;
  font-size: 20px;
  position: relative;
  top:120px;
  left:270px;
  height:30px;
  width:1080px;
  border:2px solid #d0cece;
  background-color: #f4f0f0;
}
.header-span span{
  float: left;
}
.header-input>input{
  width:200px;
  height:20px;
}
.header{
  position: absolute;
  width:800px;
}
.goods-search-box{
  display: inline-block;
  position: absolute;
  width:330px;
  height:30px;
  top:-20px;
  left:600px;
  border: 2px solid #7a7a7a;
}
.goods-search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
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
.search-box-po{
  display: inline-block;
  position: absolute;
  width:330px;
  height:30px;
  border: 1px solid black;
  left:1000px;
}
.search-box-po input{
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
#title-po{
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

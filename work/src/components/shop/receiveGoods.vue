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
    </div>
    <span class="infor-title">订单信息</span>
    <div class="goods-content">
      <div class="table-header">
        <span class="title-one">宝贝</span>
        <span class="title-two">状态</span>
        <span class="title-three">单价</span>
        <span class="title-four">运费</span>
        <span class="title-five">总价</span>
      </div>
      <div class="table-task">
        <span class="content-one">
          <span class="img-box">
            <img :src="order.photo" alt="">
          </span>
          <span class="goods-name"><p align="left" v-text="order.goodsName">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p></span>
        </span>
        <span class="content-two">
          <span class="condition-text">已发货</span>
        </span>
        <span class="content-three">
          <span class="price-icon">￥</span>
          <span class="price-text" v-text="order.price">99.9</span>
        </span>
        <span class="content-four">
          <span class="price-icon">￥</span>
          <span class="price-text" v-text="order.freight">0.0</span>
        </span>
        <span class="content-five">
          <span class="price-icon">￥</span>
          <span class="price-text" v-text="order.freight+order.price">99.9</span>
        </span>
      </div>
      <div class="last-price-content">
        <span class="last-price-titile">实付款</span>
        <span class="last-price-text" v-text="order.freight+order.price">79.9</span>
      </div>
    </div>
    <div class="submit-receive">
      <div class="order-case">
        <div class="order-number-case">
          <span class="order-number-title">订单编号:</span>
          <span class="order-number-text" v-text="order.number">12345678912836756278</span>
        </div>
        <div class="transaction-case">
          <span class="transaction-title">交易号:</span>
          <span class="transaction-text" v-text="order.number">34565787654</span>
        </div>
        <div class="saler-name">
          <span class="saler-name-title">卖家昵称:</span>
          <span class="saler-name-text" v-text="order.fromName">昵称昵称</span>
        </div>
        <div class="address-case">
          <span class="address-title">收货信息:</span>
          <span class="address-text" v-text="order.campus+order.realAddress">什么校区几号楼宿舍号</span>
        </div>
        <div class="time-case">
          <span class="time-title">交易时间:</span>
          <span class="time-text" v-text="order.createTime.substring(0,10)+' '+order.createTime.substring(11,20)">2021-03-24 12:00:00</span>
        </div>
      </div>
      <div class="button-case">
        <div class="warning-text">请收到货后，在确认收货！否则您可能人才两空!</div>
        <el-button class="submit-receive-button" type="danger" @click="receive">确定</el-button>
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
      order:{}
    }
  },
  mounted () {
    this.$axios({
      method:'get',
      url:'/api/order',
      params: {
        number:this.$route.query.number
      }
    }).then(resp=>{
      this.order= resp.data.data.order;
      this.order.createTime=this.order.createTime.substring(0,10)+'  '+this.order.createTime.substring(11,19)
    }).catch(function(error){
      alert(error.url);
    })
  },
  methods: {
    receive:function(){
       this.$axios({
          method:'post',
          url:'/api/confirmOrder',
          params: {
            fromId:this.$route.query.salerNumber,
            number:this.$route.query.number,
            toId:this.$store.getters.getUserId
          }
        }).then(resp=>{
          this.$alert('提交成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push({
            path:'/shop/userPage',
          })
        })
    }
  }
}
</script>

<style scoped="scoped">
.submit-receive span{
  text-align: left;
}
.submit-receive-button{
  width:100px;
  position: relative;
  left:450px;
  top:20px;
}
.warning-text{
  position: relative;
  left:950px;
  color: red;
  width:400px;
}
.button-case{
  position: relative;
  top:160px;
}
.order-case div{
  margin-bottom: 10px;
}
.time-text{
  display: inline-block;
  position: relative;
  width:200px;
  left:-450px;
}
.time-title{
  position: relative;
  left:-460px;
}
.address-text{
  display: inline-block;
  position: relative;
  width:200px;
  left:-445px;
}
.address-title{
  position: relative;
  left:-450px;
}
.saler-name-text{
  display: inline-block;
  position: relative;
  width:200px;
  left:-445px;
}
.saler-name-title{
  position: relative;
  left:-450px;
}
.transaction-text{
  display: inline-block;
  position: relative;
  width:200px;
  left:-440px;
}
.transaction-title{
  position: relative;
  left:-445px;
}
.order-number-text{
  display: inline-block;
  position: relative;
  width:200px;
  left:-450px;
}
.order-number-title{
  position: relative;
  left:-450px;
}
.order-case{
  position: relative;
  height:150px;
  width:1200px;
  left:150px;
  top:160px;
}
.last-price-titile{
  position: relative;
  top:110px;
  left:500px;
}
.last-price-text{
  position: relative;
  top:110px;
  left:500px;
  width:50px;
  color: red;
}
.last-price-content span{
  display: inline-block;
}
.last-price-content{
  position: relative;
  width:1200px;
  top:-30px;
  border-bottom: 1px solid #c3c3c3;
  font-size: 18px;
}
.infor-title{
  position: absolute;
  left:160px;
  top:220px;
  font-size: 20px;
}
.all-price-text-value{
  font-size: 25px;
}
.all-price-text-icon{
  font-size: 25px;
}
.all-price-title{
  font-size: 20px;
}
.all-price{
  position: relative;
  left:15px;
  color: red;
}
.tran-price-text-icon{
  font-size: 20px;
}
.tran-price{
  position: relative;
  left:18px;
}
.goods-price-text-value{
  font-size: 17px;
}
.goods-price-title{
  position: relative;
  font-size: 20px;
}
.goods-price-text-icon{
  font-size: 20px;
}
.price-box div{
  margin-bottom: 20px;
}
.price-box{
  position: relative;
  left:470px;
}
.last-price-content{
  position: relative;
  height:150px;
  width:1200px;
}
.title-five{
  margin-left:125px;
  margin-top:5px;
  float: left;
}
.title-four{
  margin-left:140px;
  margin-top:5px;
  float: left;
}
.title-three{
  margin-left:140px;
  margin-top:5px;
  float: left;
}
.title-two{
  margin-left:330px;
  margin-top:5px;
  float: left;
}
.title-one{
  margin-left:200px;
  margin-top:5px;
  float: left;
}
.condition-text{
  position: relative;
  top:30px;
  font-size: 20px;
}
.price-text{
  position: relative;
  font-size: 20px;
  top:30px;
}
.price-icon{
  font-size: 25px;
  position: relative;
  top:30px;
}
.content-five{
  float: left;
  width:170px;
  height:120px;
  border-left:1px solid #d2d2d2;
}
.content-four{
  float: left;
  width:170px;
  height:120px;
  border-left:1px solid #d2d2d2;
}
.content-three{
  float: left;
  width:170px;
  height:120px;
  border-left:1px solid #d2d2d2;
}
.content-two{
  float: left;
  width:170px;
  height:120px;
  border-left:1px solid #d2d2d2;
}
.goods-name{
  position: relative;
  display: inline-block;
  width:300px;
  left:-30px;
}
.img-box img{
  width:100px;
  height:100px;
}
.img-box{
  float: left;
  width:100px;
  height:100px;
  margin-left:10px;
  margin-top: 10px;
  background: lawngreen;
}
.content-one{
  width:500px;
  float: left;
  height:120px;
}
.table-task{
  position: relative;
  height:120px;
  width:1200px;
  top:60px;
  border: 1px solid #c3c3c3;
}
.table-header{
  position: relative;
  top:60px;
  height:35px;
  font-size: 18px;
  border: 1px solid #c3c3c3;
  display: block;
  background: #c2e4f7;
}
.doing-task{
  background: #e9670f;
}
.done-task{
  background: #ecc4a9;
  color: white;
}
.did-task{
  background: #ecc4a9;
  color: #cd6118;
}
.steps-content span{
  font-weight: 500;
  width:410px;
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
.goods-content{
  position: relative;
  top:150px;
  left:160px;
  width:1200px;
  height:300px;
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

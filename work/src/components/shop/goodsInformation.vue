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
    <div  class="information-content">
      <div  class="steps-content">
        <el-steps :active="active" finish-status="success">
          <el-step title="拍下商品"></el-step>
          <el-step title="付款"></el-step>
          <el-step title="确认收货"></el-step>
          <el-step title="评价"></el-step>
        </el-steps>
      </div>
      <div class="order-content">
        <span class="order-title-content"><p>订单信息</p></span>
        <span class="order-information-content">
          <div class="address">
            <span class="address-title">收货地址:</span>
            <span class="address-text" v-text="order.campus+order.realAddress">什么校区几号楼宿舍号</span>
          </div>
          <div class="seller">
            <span class="seller-title">商家:</span>
            <span class="seller-text" v-text="order.fromName">卖家昵称</span>
            <span class="comminucation">联系</span>
          </div>
          <div class="phone">
            <span class="phone-title">卖家号码:</span>
            <span class="phone-text" v-text="order.fromId">12345678909</span>
          </div>
          <div class="order">
            <span class="order-title">订单编号:</span>
            <span class="order-text" v-text="order.number">1234567777777654</span>
          </div>
        </span>
        <span class="state-content">
          <span class="state-title">订单状态:</span>
          <span class="state-text" v-text="title">卖家已发货，等待收货</span>
          <span class="action">
            <span class="action-title" v-text="order.status==5?'交易成功':'您可以'">您可以</span>
            <span v-show="order.status==3" class="action-way" @click="goReceive(order.number,order.fromId)">确认收货</span>
            <span v-show="order.status==4" class="action-way" @click="goComment(order.number,order.fromId)">评价</span>
            <span v-show="order.status==2" class="action-way" @click="goRefund(order.number)">退款</span>
            <span v-show="order.status==1" class="action-way" @click="goPay(order.number)">付款</span>
            <span v-show="order.status==1" class="action-way1" @click="open">取消订单</span>
          </span>
        </span>
      </div>
      <div class="goods-content">
        <div class="table-header">
          <span class="title-one">宝贝</span>
          <span class="title-two">单价</span>
          <span class="title-three">运费</span>
          <span class="title-four">实付款</span>
          <span class="title-five">交易状态</span>
        </div>
        <div class="table-task">
          <span class="content-one">
            <span class="img-box">
              <img :src="order.photo" alt="">
            </span>
            <span class="goods-name"><p align="left" v-text="order.goodsName">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p></span>
          </span>
          <span class="content-two">
            <span class="price-icon">￥</span>
            <span class="price-text" v-text="order.price">99.9</span>
          </span>
          <span class="content-three">
            <span class="price-icon">￥</span>
            <span class="price-text" v-text="order.freight">0.0</span>
          </span>
          <span class="content-four">
            <span class="price-icon">￥</span>
            <span class="price-text" v-text="order.price+order.freight">99.9</span>
          </span>
          <span class="content-five">
            <span class="condition-text">待收货</span>
          </span>
        </div>
      </div>
      <div class="last-price-content">
        <span class="price-box">
          <div class="goods-price">
            <span class="goods-price-title">商品总价:</span>
            <span class="goods-price-text">
              <span class="goods-price-text-icon">￥</span>
              <span class="goods-price-text-value" v-text="order.price">99.99</span>
            </span>
          </div>
          <div class="tran-price">
            <span class="tran-price-title">运费:</span>
            <span class="tran-price-text">
              <span class="tran-price-text-icon">￥</span>
              <span class="tran-price-text-value" v-text="order.freight">0.00</span>
            </span>
          </div>
          <div class="all-price">
            <span class="all-price-title">实付款:</span>
            <span class="all-price-text">
              <span class="all-price-text-icon">￥</span>
              <span class="all-price-text-value" v-text="order.price+order.freight">99.99</span>
            </span>
          </div>
        </span>
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
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/order',
          params: {
            number:this.$route.query.number
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          this.order = resp.data.data.order;
          this.active = this.order.status==5?4:this.order.status;
          this.title = this.order.status<6?this.titles[this.order.status - 1]:'交易关闭';
        })
  },
  data(){
    return{
      order:{},
      titles:['商品已拍下，等待买家付款','买家已付款，等待发货','卖家已发货，等待收货','买家已付款，等待评价','已评价成功','交易关闭'],
      title:'',
      active:1
    }
  },
   methods: {
      open() {
        this.$confirm('你确定要取消订单吗?取消订单后,不能恢复', '删除宝贝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'delete',
            url:'/api/order',
            params: {
              fromId:this.order.fromId,
              number:this.$route.query.number,
              toId:this.order.toId
            }
          }).then(resp=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.push({
              path:'/shop/goodsInformation',
              query:{
                number:this.$route.query.number
              }
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      goPay(number){
        this.$router.push({
            path:'/shop/payPage',
            query:{
              number:number
            }
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
    goComment:function(number,salerNumber){
      this.$router.push({
          path:'/shop/toComment',
          query:{
            number:number,
            salerNumber:salerNumber
          }
        })
    },
    goReceive:function(number,salerId){
      this.$router.push({
          path:'/shop/receiveGoods',
          query:{
            number:number,
            salerId:salerId
          }
        })
    },
    }
}
</script>

<style scoped="scoped">
.action-way1{
  color: #468fd5;
  margin-left:50px;
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
  margin-left:110px;
  margin-top:5px;
  float: left;
}
.title-four{
  margin-left:110px;
  margin-top:5px;
  float: left;
}
.title-three{
  margin-left:150px;
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
  margin-top:10px;
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
  border: 1px solid #c3c3c3;
}
.table-header{
  position: relative;
  height:35px;
  font-size: 18px;
  border: 1px solid #c3c3c3;
  display: block;
  background: #f4f0f0;
}
.goods-content{
  position: relative;
  top:80px;
  width:1200px;
  height:300px;
}
.action-way{
  border:1px solid #c3c3c3;
  padding:5px;
  background-color: #f4f0f0;
}
.action-title{
  position: relative;
  left:-10px;
}
.action{
  font-size: 25px;
  position: absolute;
  left:120px;
  top:120px;
}
.state-text{
  font-size: 30px;
  position: relative;
  top:50px;
  left:100px;
  width:300px;
}
.state-title{
  font-size: 30px;
  position: relative;
  top:50px;
  left:100px;
}
.state-content{
  position: absolute;
  left:300px;
}
.order-title{
  position: relative;
  left:-10px;
}
.order-text{
  position: relative;
  width:180px;
  left:-10px;
}
.phone-text{
  position: relative;
  width:180px;
  left:-30px;
}
.phone-title{
  position: relative;
  left:-10px;
}
.comminucation{
  font-size: 13px  !important;
  color: #468fd5;
  position: relative;
  top:55px;
  left:-90px;
}
.seller-text{
  position: relative;
  left:-40px;
  width:180px;
}
.seller-title{
  position: relative;
  left:-5px;
}
.address-text{
  position: relative;
  width:180px;
  left:-10px;
  font-size: 18px;
}
.address-title{
  position: relative;
  left:-16px;
  font-size: 18px;
}
.order-information-content span{
  display: inline-block;
  position: relative;
  top:20px;
  height:60px;
  font-size: 18px;
}
.order-information-content{
  position: absolute;
  width:300px;
  height:260px;
  border-right: 2px solid #c3c3c3;
  left:0px;
  top:40px;
}
.order-title-content{
  position: absolute;
  width:300px;
  height:40px;
  border-right: 2px solid #c3c3c3;
  border-bottom: 2px solid #c3c3c3;
  left:0px;
}
.order-title-content p{
  position: relative;
  width:150px;
  height:40px;
  left:-10px;
  font-weight: 700;
  top:-13px;
  font-size: 20px;
}
.order-content{
  position: relative;
  width:1200px;
  height:300px;
  border:2px solid #c3c3c3;
  top:50px;
}
.el-step__icon{
  height:50px;
  width:50px;
  top:-10px;
  left:-5px;
}

.steps-content{
  text-align: left;
  width:750px;
}
.steps{
  display:block;
  position: absolute;
  width:500px;
}
.information-content{
  position: absolute;
  width:1100px;
  height:700px;
  top:200px;
  left:100px;
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
</style>

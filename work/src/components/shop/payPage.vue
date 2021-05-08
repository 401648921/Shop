<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <div  class="steps-content">
      <el-steps :active="0" finish-status="success">
        <el-step title="拍下商品"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="确认收货"></el-step>
        <el-step title="评价"></el-step>
      </el-steps>
    </div>
    <div class="table-header">
      <span class="table-header-one">店铺宝贝</span>
      <span class="table-header-two">商品描述</span>
      <span class="table-header-three">单价</span>
      <span class="table-header-four">运费</span>
      <span class="table-header-five">小计</span>
    </div>
    <div class="saler">
      <span class="saler-name">卖家昵称</span>
      <div class="goods-infor">
        <span class="img-box">
          <img :src="order.photo" alt="">
        </span>
        <span class="goods-name" v-text="order.goodsName">商商名称商商名称商商名称商商名称商商名称商商名称</span>
        <span class="goods-descrip" v-text="order.goodsName">商品描述商品描述商品描述商品描述</span>
        <span class="one-price"><p v-text="order.price">79.9</p></span>
        <span class="tran-price" v-text="order.freight">0.0</span>
        <span class="all-price" v-text="order.freight+order.price">79.9</span>
      </div>
    </div>
    <div class="submit-content">
      <div class="submit-infor">
        <div class="price-last-infor">
          <span class="price-last-infor-title">实付款:</span>
          <span class="price-last-infor-icon">￥</span>
          <span class="price-last-infor-sum" v-text="order.freight+order.price">79.9</span>
        </div>
        <div class="address-last-infor">
          <span class="address-last-title">寄送至:</span>
          <span class="address-last-content" v-text="order.realAddress">铜盘校区几号楼宿舍号或其他地址</span>
        </div>
        <div class="distribution-content">
          <span class="distribution-title">收货人:</span>
          <span class="distribution-text" v-text="order.name">谁谁谁</span>
          <span class="order-number" v-text="order.number">12345678928</span>
        </div>
        <div class="time-content">
          <span class="time-title">送货时间:</span>
          <span class="time-text" v-text="order.createTime">××/×× ××-××</span>
        </div>
        <div class="submit-button">
          <el-button type="warning" class="buttion-order" @click="pay" >确认付款</el-button>
        </div>
      </div>
    </div>
    <div v-html="html" ref="alipayWap"></div>
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
      this.order= resp.data.data.order;
      this.order.createTime=this.order.createTime.substring(0,10)+'  '+this.order.createTime.substring(11,19)
    }).catch(function(error){
      alert(error.url);
    })
  },
  data(){
    return{
      order:{},
      html:''
    }
  },
  methods: {
    pay:function(){
       this.$axios({
          method:'get',
          url:'/api/payBill',
          params: {
            goodsName:this.order.goodsName,
            number:this.$route.query.number,
            price:this.order.freight+this.order.price
          }
        }).then(resp=>{
          this.html = resp.data;
          this.$nextTick(() => {
            	this.$refs.alipayWap.children[0].submit()
          	})
        })
    }
  }
}
</script>

<style scoped="scoped">

.time-content{
  position: relative;
  top:-10px;
  width:300px;
  left:1045px;
}
.buttion-order{
  width:100px;
}
.submit-button{
  position: relative;
  top:5px;
  width:300px;
  left:1070px;
}
.distribution-content{
  position: relative;
  top:-15px;
  width:300px;
  left:1020px;
}
.address-last-infor{
  position: relative;
  width:300px;
  top:-20px;
  left:980px;
}
.price-last-infor-sum{
  font-size: 30px;
  color: red;
}
.price-last-infor-icon{
  font-size: 30px;
  color: red;
}
.price-last-infor{
  position: relative;
  width:200px;
  margin-right: 0px;
  padding-right: 1px;
  height:60px;
  left:1100px;
}
.set-date-text{
  position: relative;
  left:-450px;
  color: red;
  font-size: 14px;
}
.submit-content{
  position: relative;
  top:0px;
  width:1200px;
  height:80px;
}
.all-price{
  margin-top:25px;
  margin-left:95px;
  float: left;
  width:120px;
  height:50px;
}
.tran-price{
  margin-top:25px;
  margin-left:60px;
  float: left;
  width:120px;
  height:50px;
}
.one-price{
  margin-top:10px;
  margin-left:60px;
  float: left;
  width:120px;
  height:50px;
}
.goods-descrip{
  text-align: left;
  margin-top:15px;
  margin-left:50px;
  float: left;
  width:120px;
  height:50px;
}
.goods-name{
  margin-top:10px;
  margin-left:20px;
  float: left;
  width:240px;
  height:50px;
  text-align: left;
}
.img-box img{
  width:100%;
  height:100%;
}
.img-box{
  margin-top:10px;
  margin-left:10px;
  float: left;
  background: red;
  width:100px;
  height:100px;
}
.goods-infor{
  position: relative;
  top:30px;
  left:100px;
  width:1200px;
  height:140px;
  background: #e8ffff;
  border-bottom: 1px solid #c3c3c3;
}
.saler-name{
  position: absolute;
  left:100px
}
.saler{
  width:1200px;
  height:500px;
  position: relative;
  top:280px;
}
.table-header-five{
  width:180px;
}
.table-header-four{
  width:180px;
}
.table-header-three{
  width:180px;
}
.table-header-two{
  width:180px;
}
.table-header-one{
  width:350px;
}
.table-header{
  position: absolute;
  top:200px;
  left:100px;
  width:1200px;
  border:1px solid #c3c3c3;

}
.table-header span{
  float: left;
  height:40px;
  line-height: 40px;
  margin-right:20px;
}
.manage-address{
  z-index: 10;
  position: relative;
  font-size: 13px;
  color: #d78662;
  left:-210px;
  top:150px;
}
.change-button{
  position: relative;
  font-size: 13px;
  left:-92px;
  color: #d78662;
}
.address-content-text{
  position: relative;
  left:20px;
  height:40px;
  width:220px;
}
.address-content-title p{
  position: relative;
  top:-10px;

}
.address-content-title{
  position: relative;
  left:20px;
  border-bottom: 1px solid #c3c3c3;
  height:40px;
  width:220px;
  line-height: 40px;;
}
.address-content{
  float: left;
  width:250px;
  margin-right:100px;
  height:140px;
  border: 1px solid #c3c3c3;
}
.addresses{
  position: relative;
  top:200px;
  left:140px;
  width:1200px;
  height:140px;
}
.el-step__icon{
  height:50px;
  width:50px;
  top:-10px;
  left:-5px;
}

.steps-content{
  text-align: left;
  width:650px;
  position: absolute;
  left:600px;
  top:60px;
}
.steps{
  display:block;
  position: absolute;
  width:500px;
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
</style>

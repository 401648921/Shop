<template>
  <div class="content">
    <div class="path-content">
    <span class="steps">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">商品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
  </div>
    <div class="content-header">
      <span class="img-box">
        <img src="" class="goods-img" >
      </span>
      <span class="goods-text">
        <span class="goods-title">
          <p v-text="goodsName">商品名称</p>
        </span>
        <span class="goods-infor">
          <p align="left" v-text="goodsInfor">商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</p>
        </span>
        <span class="goods-tips">
          <span v-bind:key="o" v-for="(o , index) in 3" v-text="'标签'+(index+1)"></span>
        </span>
        <span class="price">
          <span class="price-title">
            销售价
          </span>
          <span class="price-sum">￥99.9</span>
        </span>
        <span class="look">
          <span class="look-title">浏览量:</span>
          <span class="look-number">123</span>
        </span>
        <span class="goods-submit">
          <el-button>立即购买</el-button>
          <el-button>加入购物车</el-button>
        </span>
      </span>
    </div>
    <div class="content-foot">
    <span class="shop-comment">
      <span class="comment">
        <span   class="comment-tip" :key="o" v-for="o in 2">
          <span class="user-infor">
            <span  class="user-comment-img-box">
              <img src="#" alt="" class="user-img">
            </span>
            <span class="user-name">买家昵称</span>
          </span>
          <p  class="comment-text" align="left">商品评论商品评论商品评论商品评论商品评论</p>
          <span class="comemnt-pics">
            <span v-for="o in 1" :key="o" class="comment-img-box">
              <img  src="#" alt="" class="comment-img">
            </span>
          </span>
          <span class="infor-content">
            <span>描述</span>
            <span>服务</span>
            <span>物流</span>
            <span class="score-sum">4.9</span>
            <span class="score-sum">4.9</span>
            <span class="score-sum">4.9</span>
          </span>
          <span class="comment-time">2021年3月8日 14:00</span>

        </span>
        <span class="comment-title">
        <span>商品评论</span>
        <span>商品留言</span>
      </span>
        <span  class="comment-tip" :key="o" v-for="o in 2">
          <span class="user-infor-talk">
            <span  class="user-comment-img-box">
              <img src="#" alt="" class="user-img">
            </span>
            <span class="user-name">买家昵称</span>
          </span>
          <p class="comment-text-talk" align="left">商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论商品评论</p>
          <span class="comment-time-talk">2021年3月8日 14:00</span>

        </span>
      </span>
    </span>
    </div>
  </div>

</template>

<script>
export default {
data(){
  return{
    goodsName:'gegegegegegegegegegegeg',
    goodsInfor:'gegegegegegegegegegegegeg'
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
}
</script>

<style scoped="scoped">
.getGood-talk{
  font-size: 20px;
  position: absolute;
  left:1150px;
  top:20px;
}
.comment-time-talk{
  display: inline-block;
  position: relative;
  left:-610px;
  top:30px;
  color: #a6a4a4;
}
.comment-text-talk{
  display: inline-block;
  position: relative;
  top:-12px;
  left:-280px;
  height:90px;
  width:320px;
}
.user-infor-talk{
  position:relative;
  display: inline-block;
  left:-300px;
  top:10px;
  width:70px;
  color: #a6a4a4;
}
.getGood{
  font-size: 20px;
  position: absolute;
  left:1150px;
  top:120px;
}
.score-sum{
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
  position: absolute;
  top:-30px;
  left:970px;
  width:220px;
}
.comment-time{
  display: inline-block;
  position: relative;
  left:-700px;
  top:30px;
  color: #a6a4a4;
}
.comemnt-pics{
  display: inline-block;
  position: relative;
  left:-530px;
  width:160px;
}
.comment-img-box{
  float: left;
  background-color: yellow;
  width:60px;
  height:60px;
  margin-right: 20px;
}
.comment-text{
  display: inline-block;
  position: relative;
  top:-82px;
  left:-210px;
}
.user-infor{
  position:relative;
  display: inline-block;
  left:-230px;
  top:10px;
  width:70px;
  color: #a6a4a4;
}
.user-comment-img-box{
  display: inline-block;
  position: relative;
  margin-bottom: 20px;
  width:60px;
  height:70px;
  background-color: blue;
}
.comment-tip{
  border:1px solid #dedede;
  left:-230px;
  display: inline-block;
  position: relative;
  width:1200px;
  height:150px;
}
.comment{
  display: inline-block;
  position: absolute;
  top:200px;
  left:-240px;
}
.comment-title span{
  margin-right:30px;
  float: left;
  line-height: 30px;
}
.comment-title{
  display: inline-block;
  position: absolute;
  top:-30px;
  left:-230px;
  width:1200px;
  height:30px;
  font-size:20px;
  border:1px solid #dedede;
}
.shop-comment{
  position: absolute;
  left:550px;
  top:-100px;
  display: inline-block;
  width:300px;
}
.shopkeeper-submit{
  position: relative;
  top:40px;
}
.last-score{
  border-right:none !important;
}
.score{
  display: inline-block;
  position: relative;
  border-right: 1px solid #dedede;
  height:35px;
  width:60px;
  left:-10px;
  top:20px;
  padding-right: 10px;
}
.score-title{
  font-size:30px;
  position: relative;
  top:-10px;
}
.score-sum{
  color: red;
}
.score-title,.score-sum{
  display: inline-block;
  font-size:20px;
}
.commication{
  display: block;
  position: relative;
  text-decoration: none;
  left:-100px;
  color: #579fdb;
}
.shopkeeper-name{
  display: block;
  position: relative;
  font-size:20px;
  left:-80px;
}
.recommend-goods{
  display: inline;
  position: absolute;
  left:220px;
  top:-10px;
  margin-left:20px;
  width:100px;
}
.get-good{
  display: inline;
  position: absolute;
  left:320px;
  margin-left:20px;
  top:-10px;
  width:100px;
}
.shopkeeper-infor{
  position: absolute;
  left:230px;
  top:20px;
  display: inline-block;
  border: 1px solid #dedede;
  width:250px;
  height:200px;
}
.shop-infor{
  position: relative;
  display: inline;
  height:200px;
  top:-100px;
  left:-700px
}
.price-sum{
  color: red;;
}
.look{
  display: block;
  position: relative;
  top:20px;
  font-size:12px;
  left:-190px;
}

.price{
  position: relative;
  top:15px;
  left:-130px;
  font-size: 30px;
  display: block;
}
.goods-submit{
  position: relative;
  top:50px;
  left:-100px;
  display: block;
}
.goods-tips {
  display: block;
  position: relative;
  top:10px;
  left:-30px;
  width:200px;
  height:30px;
}
.goods-tips span{
  margin-right:20px;
  float: left;
}
.goods-infor{
  display: block;
  position: relative;
  top:10px;
  left:-30px;
  height:180px;
}
.goods-infor p{
  line-height: 30px;
  width:300px;
  text-align: left;
}
.content-foot{
  position: relative;
  top:600px;
  width:1000px;
}
.goods-title{
  position: relative;
  display: block;
  left:-30px;
}
.goods-title p{
  font-size:30px;
}
.goods-text{
  position: absolute;
  left:450px;
  top:-20px;
  margin-top:35px;
  margin-left:10px;
}
.img-box{
  position: absolute;
  background-color: burlywood;
  width:400px;
  height:450px;
  left:20px;
  top:20px;
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
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:1500px;
  margin:0px;
}
.content-header{
  position: absolute;
  top:160px;
  left:60px;
  width: 100%;
}
.el-breadcrumb__inner{
  font-weight: 500 !important;
}
.path-content{
  position: relative;
  top:20px;
  left:40px;
}
.steps{
  position: absolute;
  display: inline-block;
  width:300px;
  left:100px;
  top:120px;
  font-size: 19px;
  transform: scale(1.3);
}
</style>

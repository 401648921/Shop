<template>
  <div class="content">
    <div class="content-header">
      <span class="img-box">
        <img :src="data.photo" class="goods-img" >
      </span>
      <span class="goods-text">
        <span class="goods-title">
          <p v-text="data.goodsName">商品名称</p>
        </span>
        <span class="goods-infor">
          <p align="left" v-text="data.description">商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</p>
        </span>
        <span class="goods-tips">
          <span v-text="data.label1"></span>
          <span v-text="data.label2"></span>
          <span v-text="data.label3"></span>
        </span>
        <span class="price">
          <span class="price-title" >
            销售价
          </span>
          <span class="price-sum" v-text="'￥'+data.price">￥99.9</span>
        </span>
        <span class="look">
          <span class="look-title">浏览量:</span>
          <span class="look-number" v-text="data.scanCounts">123</span>
        </span>
        <span class="goods-submit">
          <el-button @click="goPurchar">立即购买</el-button>
          <el-button @click="putPurchar">加入购物车</el-button>
        </span>
      </span>
    </div>
    <div class="content-foot">
      <span class="shop-infor">
      <span class="recommend-goods">
        <span class="el-icon-star-off"></span>
        <span @click="favor">收藏商品</span>
      </span>
      <span class="get-good">
        <span class="iconfont-go icon-godamuzhi"></span>
        <span>点赞</span>
      </span>
      <span class="shopkeeper-infor">
        <span class="shopkeeper-name">卖家昵称</span>
        <a class="commication" href="#">联系</a>
        <span class="score">
          <span class="score-title">描述</span>
          <span class="score-sum">4.9</span>
        </span>
        <span class="score">
          <span class="score-title">服务</span>
          <span class="score-sum">4.9</span>
        </span>
        <span class="score last-score">
          <span class="score-title">物流</span>
          <span class="score-sum">4.9</span>
        </span>
        <span class="shopkeeper-submit">
          <el-button @click="goShop" >进入店铺</el-button>
          <el-button @click="fans">收藏店铺</el-button>
        </span>
      </span>
    </span>
    <span class="shop-comment">
      <span class="comment-title">
        <span>商品评论</span>
        <span>商品留言</span>
      </span>
      <span class="comment">
        <span   class="comment-tip" :key="index" v-for="(o,index) in comments">
          <span class="user-infor">
            <span  class="user-comment-img-box">
              <img :src="o.photo" alt="" class="user-img">
            </span>
            <span class="user-name" v-text="o.username">买家昵称</span>
          </span>
          <p  class="comment-text" align="left" v-text="o.comments">商品评论商品评论商品评论商品评论商品评论</p>
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
          <span class="comment-time" v-text="o.create_time">2021年3月8日 14:00</span>
          <span class="iconfont-go icon-godamuzhi getGood"  @click="getGood(o.comments,o.create_time,o.id)"></span>
        </span>
        <span v-show="false" class="comment-tip" :key="o" v-for="o in 2">
          <span class="user-infor-talk">
            <span  class="user-comment-img-box">
              <img src="#" alt="" class="user-img">
            </span>
            <span class="user-name">买家昵称</span>
          </span>
          <p class="comment-text-talk" align="left">商品评品评论商品评论商品评论商品评论商品评论商品评论商品评论</p>
          <span class="comment-time-talk">2021年3月8日 14:00</span>
          <span class="iconfont-go icon-godamuzhi getGood-talk"></span>
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
      data:{},
      goodsName:'',
      goodsInfor:'',
      comments:{}
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
          url:'/api/goods',
          params: {
            id:this.$store.getters.getUserId,
            number:this.$route.query.number
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.data= resp.data.data.goods;
          //this.count = resp.data.data.count;
          //this.data.create_time=this.data.create_time.substring(0,10)+'  '+this.data.create_time.substring(11,16)

        }).catch(function(error){
          alert(error.url);
        })
        /*this.$axios({
          method:'get',
          url:'/api/comments',
          params: {
            cnt:4,
            goodsId:this.$route.query.number,
            page:1
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.comments= resp.data.data.commentList;
          //this.count = resp.data.data.count;

        }).catch(function(error){
          alert(error.url);
        })*/
        this.$axios({
          method:'get',
          url:'/api/comments',
          params: {
            cnt:4,
            goodsId:this.$route.query.number,
            page:1
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.comments= resp.data.data.commentList;
          //this.count = resp.data.data.count;
          for(let i =0;i<this.comments.length;i++){
            this.comments[i].create_time=this.comments[i].create_time.substring(0,10)+' '+this.comments[i].create_time.substring(11,19)
          }
        }).catch(function(error){
          alert(error.url);
        })
    },
    methods: {
      getGood:function(comments,createTime,id){
        this.$axios({
          method:'post',
          url:'/api/likes',
          params: {
            comments:comments,
            createTime:createTime,
            fromId:id,
            goodsId:this.$route.query.number,
            likeId:this.$store.getters.getUserId
          }
        }).then(resp=>{
           this.$alert('点赞成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
      },
      favor:function(){
        this.$axios({
          method:'post',
          url:'/api/favor',
          params: {
            goodsId:this.$route.query.number,
            id:this.$store.getters.getUserId
          }
        }).then(resp=>{
           this.$alert('收藏成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
      },
      goShop:function(){
        this.$router.push({
          path:'/shop/shopTips',
          query:{
            number:this.data.fromId
          }
        })
      },
      fans:function(){
        this.$axios({
          method:'post',
          url:'/api/fans',
          params: {
            fansId:this.$store.getters.getUserId,
            id:this.data.fromId
          }
        }).then(resp=>{
           this.$alert('收藏店铺成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
      },
      putPurchar:function(){
        this.$axios({
          method:'post',
          url:'/api/shopping',
          params: {
            id:this.$store.getters.getUserId,
            number:this.$route.query.number
          }
        }).then(resp=>{
           this.$alert('添加成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
      },
      goPurchar:function(){
      this.$router.push({
          path:'/shop/placeOrder',
          query:{
            number:this.$route.query.number
          }
        })
    }
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
  width:320px;
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
.user-comment-img-box img{
  width:60px;
  height:70px;
}
.user-comment-img-box{
  overflow: hidden;
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
  top:50px;
  left:30px;
}
.comment-title span{
  margin-right:30px;
  float: left;
  line-height: 30px;
}
.comment-title{
  display: inline-block;
  position: absolute;
  top:0px;
  left:-200px;
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
  left:-110px;
}

.price{
  position: relative;
  top:15px;
  left:-50px;
  font-size: 30px;
  display: block;
}
.goods-submit{
  position: relative;
  top:50px;
  left:-25px;
  display: block;
}
.goods-tips {
  display: block;
  position: relative;
  top:10px;
  left:-50px;
}
.goods-tips span{
  margin-right:20px;
}
.goods-infor{
  display: block;
  position: relative;
  top:10px;
  left:0px;
  height:180px;
}
.goods-infor p{
  line-height: 30px;
  width:300px;
}
.content-foot{
  position: relative;
  top:600px;
  width:1000px;
}
.goods-title{
  position: relative;
  display: block;
  left:-10px;
}
.goods-title p{
  font-size:30px;
  text-align: left;
}
.goods-text{
  position: absolute;
  left:450px;
  top:-20px;
  margin-top:35px;
  margin-left:10px;
}
.img-box img{
  min-height:450px;
  min-width:400px;
}
.img-box{
  position: absolute;
  background-color: burlywood;
  width:400px;
  height:450px;
  left:20px;
  top:20px;
  overflow: hidden;
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
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:80%;
  margin:0px;
}
.content-header{
  width: 100%;
}
</style>

<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="shop-infor">
        <span class="infor-title">
          <p class="infor-element">卖家昵称</p>
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
          <span class="tips-number">粉丝数：1234</span>
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
    <div class="comment-content">
      <div class="comment-title">
        <span class="comment-title-text">该店评价</span>
      </div>
      <div class="comemt-table">
        <span  class="comment-tip" :key="index" v-for="(o,index) in userComments">
          <span class="user-infor">
            <span  class="user-comment-img-box">
              <img :src="o.userPhoto" alt="" class="user-img">
            </span>
            <span class="user-name" v-text="o.username" >买家昵称</span>
          </span>
          <p  class="comment-text" align="left" v-text="o.evaluation">商品评论商品评论商品评论商品评论商品评论</p>
          <span class="comemnt-pics">
            <span v-for="o in 1" :key="o" class="comment-img-box">
              <img  src="#" alt="" class="comment-img">
            </span>
          </span>
          <span class="infor-content">
            <span>描述</span>
            <span>服务</span>
            <span>物流</span>
            <span class="score-sum" v-text="o.describe">4.9</span>
            <span class="score-sum" v-text="o.service">4.9</span>
            <span class="score-sum" v-text="o.logistics">4.9</span>
          </span>
          <span class="comment-time"  v-text="o.createTime">2021年3月8日 14:00</span>
          <span class="iconfont-go icon-godamuzhi getGood"  @click="getGood(o.comments,o.create_time,o.id)"></span>
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
          url:'/api/evaluateList',
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.userComments= resp.data.data.evaluateList;
          for(let i =0;i<this.userComments.length;i++){
            this.userComments[i].createTime=this.userComments[i].createTime.substring(0,10)+' '+this.userComments[i].createTime.substring(11,19);
             //alert(123)
          }
        })
  },
  data(){
    return{
      userComments:[]
    }
  }
}
</script>

<style scoped="scoped">
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
.user-infor{
  position:relative;
  display: inline-block;
  left:-230px;
  top:10px;
  width:70px;
  color: #a6a4a4;
}
.comment-tip{
  border:1px solid #dedede;
  display: inline-block;
  position: relative;
  width:1200px;
  height:150px;
}
.comemt-table{
  position: absolute;
  left:100px;
  top:50px;
}
.comment-time{
  display: inline-block;
  position: relative;
  left:-700px;
  top:30px;
  color: #a6a4a4;
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
.comemnt-pics{
  display: inline-block;
  position: relative;
  left:-530px;
  width:160px;
}
.comment-tip{
  border:1px solid #dedede;
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
.comment-title{
  font-size: 24px;
  position: absolute;
  left:100px;
  width:100px;
}
.comment-content{
  display: block;
  position: absolute;
  top:150px;
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

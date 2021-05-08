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
      <span class="step-task did-task">2.付款</span>
      <span class="step-task done-task">3.确认收货</span>
      <span class="step-task doing-task">4.评价</span>
    </div>
    <div class="success-content">
      <span class="ojbk-icon el-icon-check"></span>
      <span class="success-text">交易成功！宝贝等你评价</span>
    </div>
    <div class="comment-box">
      <div class="comment-header">
        <span class="comment-header-title">评价宝贝</span>
      </div>
      <div class="comment-content">
        <div class="comment-input-box">
          <div class="comment-input">
            <span class="img-box">
              <img src="#" alt="">
            </span>
            <span class="user-input">
              <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容" class="comment-textarea"
              v-model="textarea2">
            </el-input>
            <span class="img-button">
              <span class="img-icon iconfont-go icon-goimg"></span>
              <span class="img-button-text">晒图片</span>
            </span>
            <span class="no-name-box">
              <template>
                <el-radio @change="go" v-model="radio" label="0">公开</el-radio>
                <el-radio @change="go" v-model="radio" label="1">匿名</el-radio>
              </template>
            </span>
            </span>
          </div>
          <div class="rate-input">
            <span class="rate-titile-box">
              <span class="rate-title-text">店铺动态评分</span>
            </span>
            <div class="rate-elememnt">
              <span class="rate-element-title">宝贝与描述相符</span>
              <span class="rate-element-input">
                <el-rate
                  v-model="goodsValue"
                  show-text>
                  </el-rate>
              </span>
            </div>
            <div class="rate-elememnt">
              <span class="rate-element-title">卖家的服务态度</span>
              <span class="rate-element-input">
                <el-rate
                  v-model="salerValue"
                  show-text>
                  </el-rate>
              </span>
            </div>
            <div class="rate-elememnt">
              <span class="rate-element-title">卖家的发货速度</span>
              <span class="rate-element-input">
                <el-rate
                  v-model="tranValue"
                  show-text>
                  </el-rate>
              </span>
            </div>
             <el-button class="submit-comment-button" type="primary" @click="go">发表评论</el-button>
          </div>
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
      goodsValue:0,
      salerValue:0,
      tranValue:0,
      textarea2:'',
      radio:'0'
    }
  },
  methods: {
    go:function(){
      this.$axios({
          method:'post',
          url:'/api/evaluate',
          params: {
            describe:this.goodsValue,
            evaluation:this.textarea2,
            fromId:this.$route.query.salerNumber,
            isNoname:this.radio,
            logistics:this.tranValue,
            number:this.$route.query.number,
            service:this.salerValue,
            toId:this.$store.getters.getUserId
          }
        }).then(resp=>{
          this.$alert('评价成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push({
            path:'/shop/homePage',
          })
        }).catch(function(error){
          alert(error.url);
        })
    }
  }
}
</script>

<style scoped="scoped">
.user-input>>>textarea{
  resize: none;
}
.submit-comment-button{
  position: relative;
  top:100px;
}
.rate-elememnt{
  position: relative;
  top:70px;
  left:-20px;
  margin-bottom: 10px;;
}
.rate-element-input{
  display: inline-block;
}
.rate-titile-box{
  position: absolute;
  display: inline-block;
  height:60px;
  line-height: 60px;;
  left:100px;
  top:350px;
  background:#e8e8e8;
  border:1px solid #c3c3c3;
}
.img-box{
  position: relative;
  display: inline-block;
  top:-50px;
  left:-30px;
  width:120px;
  height:100px;
  background: orchid;
}
.img-icon{
  font-size: 20px;
}
.no-name-box{
  position: relative;
  top:35px;
  left:55px;
}
.img-button{
  display: inline-block;
  background: #cec4c4;
  position: relative;
  top:35px;
  left:-282px;
}
.user-input{
  position: relative;
  left:40px;
  top:50px;
  display: inline-block;
  height:180px;
  width:600px;
  background: #e2f1f2;
}
.comment-textarea>textarea{
  width:580px;
  height:110px;
  resize: none;
}
.comment-textarea{
  position: relative;
  top:10px;
  left:-80px;
  width:200px;
  resize: none;
}
.comment-input{
  height:300px;
  width:880px;
  border-bottom:1px solid #c3c3c3;
  position: relative;
  left:10px;
}
.comment-input-box{
  height:600px;
  width:900px;
  position: relative;
  left:100px;
  border:1px solid #c3c3c3;
}
.comment-header-title{
  line-height: 40px;
  float: left;
  background: #f06a0f;
  height:40px;
  width:140px;
}
.comment-header{
  background: #e8e8e8;
  height:40px;
  width:900px;
  position: relative;
  left:100px;
  border:1px solid #c3c3c3;
}
.ojbk-icon{
  position: relative;
  left:-430px;
  top:5px;
  width:40px;
  height:40px;
  display: inline-block;
  font-size: 35px;
  font-weight: 700;
  border-radius: 50%;
  background: #3fc930;
  line-height: 40px;
  color:white;
}
.success-text{
  position: relative;
  left:-430px;
  font-size: 24px;
}
.success-content{
  position: relative;
  top:170px;
  left:140px;
  width:1200px;
  height:50px;
  background: #d4f2d0;
  border:2px solid #83df79;
}
.comment-box{
  position: relative;
  top:200px;
  left:140px;
  height:700px;
  width:1200px;
}
.doing-task{
  background: #e6e6e6;
}
.done-task{
  background: #e9670f;
  color: white;
}
.did-task{
  background: #ecc4a9;
  color: #cd6118;
}
.steps-content span{
  font-weight: 500;
  width:306px;
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

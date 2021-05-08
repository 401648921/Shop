<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <div>
      <span class="search-box">
        <span class="iconfont-go icon-gofangdajing fangdajing"></span>
        <input v-model="searchText" class="search-input" type="text">
        <span class="iconfont-go icon-gozhaoxiangji zhaoxiangji"></span>
      </span>
      <el-button type="success" class="submit-search" @click="search">搜索</el-button>
    </div>
    <div class="condition">
      <div class="condition-title">所有宝贝</div>
      <div class="condition-content">
        <div class="condition-content-title">所有分类</div>
        <div class="condition-task task-bofore">
          <span class="condition-task-title"><p>标签1:</p></span>
          <span class="codition-choice"><el-input class="lable-input" v-model="input1" placeholder="筛选条件"></el-input></span>
          <span class="codition-select" @click="input1= '毛衣'">毛衣</span>
          <span class="codition-select" @click="input1= '短裤'">短裤</span>
        </div>
        <div class="condition-task task-bofore">
          <span class="condition-task-title"><p>标签2:</p></span>
          <span class="codition-choice"><el-input class="lable-input" v-model="input2" placeholder="筛选条件"></el-input></span>
          <span class="codition-select" @click="input2= '睡袍'">睡袍</span>
          <span class="codition-select" @click="input2= '睡衣'">睡衣</span>
        </div>
        <div class="condition-task ">
          <span class="condition-task-title"><p>标签3:</p></span>
          <span class="codition-choice"><el-input class="lable-input" v-model="input3" placeholder="筛选条件"></el-input></span>
          <span class="codition-select" @click="input3= '床上用品'">床上用品</span>
          <span class="codition-select" @click="input3= '生活用品'">生活用品</span>
        </div>
      </div>
      <div class="condition-price">
        <span class="condition-price-title">综合排序</span>
        <span class="price-tips">
          <span class="price-text">价格</span>
          <span class="price-icon el-icon-arrow-down"></span>
          <span class="input-box">
            <span class="input-icon">￥</span>
            <el-input class="price-input" v-model="low"></el-input>
          </span>
          <span class="input-box">
            <span class="input-icon">￥</span>
            <el-input prefix="iconfont-go icon-gorenminbi" class="price-input" v-model="high"></el-input>
          </span>
        </span>
      </div>
    </div>
    <div class="goods-content">
      <el-row class="show-pics">
        <el-col class="show-pic" :span="8" v-for="(o, index) in list" :key="index" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image"><img :src="o.photo" ></div>
            <div class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
              <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.price"></span></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    input1:'',
    input2:'',
    input3:'',
    searchText:'',
    high:'',
    low:'',
    list:[]
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
  methods: {
    search:function(){
      //alert(this.high)
      this.$axios({
          method:'get',
          url:'/api/searchGoods',
          params: {
            cnt:8,
            high:this.high==''?'10000':this.high,
            keyword:this.searchText,
            low:this.low==''?'0':this.low,
            page:1,
            label1:this.input1==''?undefined:this.input1,
            label2:this.input2==''?undefined:this.input2,
            label3:this.input3==''?undefined:this.input3,
          }
        }).then(resp=>{

          this.list= resp.data.data.goodsList;
        }).catch(function(error){
          alert(error.url);
        })
    }
  },
  mounted () {
    this.searchText = this.$route.query.searchText;
    this.search()
  }
}
</script>

<style scoped="scoped">
.lable-input{
  width:120px;
}
.goods-content{
  position: absolute;
  left:50px;
  top:-100px;
}
.show-pic{
  margin-top:5px;
  width:220px;
  margin-bottom: 60px;
  float: left;
  margin-left:20px;
  margin-right: 25px;
}
.image img{
  width:100%;
  height:234px;
}
.image {
  width: 100%;
  display: block;
  height: 235px;
  overflow: hidden;
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
  position: absolute;
  top:650px;
  width:1400px;
  display: block;
}
.price-input>span{
  position: relative;
  width:60%;
  left:100px;
}
.input-icon{
  position: relative;
  font-size: 20px;
  left:23px;
  top:2px;
  z-index: 10;
}
.price-tips{
  position: relative;
  left:-450px;
  display: inline-block;
  height:50px;
}
.condition-price-title{
  display: inline-block;
  position: relative;
  left:-463px;
  font-size: 20px;
  background-color: white ;
  height:50px;
  width:100px;
  line-height: 50px;
}
.price-input{
  width:80px;
}
.condition-price{
  width:1300px;
  height:50px;
  display: block;
  position: absolute;
  background-color: #f4f0f0 ;
  top:300px;
  left:70px;
  border:1px solid #dedede;
}
.codition-select{
  position: relative;
  left:-220px;
  display: inline-block;
  width:100px;
  font-size: 20px;
  margin-right: 30px;
  text-align: left;
}
.codition-choice{
  position: relative;
  left:-360px;
  font-size: 20px;
}
.task-bofore{
  border-bottom: 1px dashed #dedede;
}
.condition-task-title{
  position: relative;
  left:-390px;
  font-size: 20px;
}
.condition-task{
  position: relative;
  width:1200px;
  left:50px;
  height:70px;
  top:40px;
}
.condition-task span{
  position: relative;
  display: inline-block;
  height:70px;
}
.condition-content-title{
  position: absolute;
  font-size: 18px;
  left:20px;
}
.condition-content{
  width:1300px;
  height:240px;
  position: relative;
  top:50px;
  left:70px;
  border:1px solid #dedede;
}
.condition{
  width:1300px;
  position: absolute;
  height:400px;
  top:150px;
}
.condition-title{
  position: absolute;
  top:0px;
  left:80px;
  font-size: 25px;
  color: #cc633d;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.submit-search{
  position: absolute;
  height:43px;
  top:49px;
  left:1000px;
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
  top:10px;
  left:60px;
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
  top:50px;
  left:400px;
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
  position: absolute;
  left:40px;
  top:160px;
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
</style>

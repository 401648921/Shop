<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="last-title">收藏夹</span>
      <span class="tran-page">
        <span class="active">宝贝收藏</span>
        <span class="tran-page-last"><router-link tag="span" :to="{ path: '/shop/myCollectionShop'}" push>店铺收藏</router-link></span>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
      <span class="manage">
        <el-checkbox v-show="isManage"  class="element-manage" @change="allChange">全选</el-checkbox>
        <span v-show="isManage" class="el-icon-delete element-manage" @click="deleteGoods" >删除</span>
        <el-button class="element-manage button" @click="isManage=!isManage;selectAll()">批量管理</el-button>
        <span class="search-goods">
          <input type="text">
          <span class="iconfont-go icon-gofangdajing goods-input-icon"></span>
        </span>
      </span>
      </div>
      <div class="choice-page">
        <span :class="select==1?'active':''" @click="goAll();select=1">全部宝贝</span><span :class="select==2?'active':''" @click="godown();select=2">降价</span><span :class="select==3?'active':''" @click="goNoEffect();select=3">失效</span>
      </div>
      <div id="show-cards">
        <el-card  :key="index" v-for="(o,index) in goodses" :body-style="{ padding: '0px' }" class="card">
          <img @click="selectGoods(index)" v-show="o.createTime==''" src="../../assets/getOn.png" class="get-on">
            <div @click="selectGoods(index)" class="image"><img :src="o.photo" ></div>
            <div @click="selectGoods(index)" class="information">
              <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
              <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.price"></span></p>
            </div>
          </el-card>
      </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    show:false,
    goodses:[],
    selects:[],
    isManage:false,
    select:1
  }
},
mounted () {
  //alert(this.$store.getters.getUserId+'  '+this.$route.query.number)
  this.$axios({
    method:'get',
    url:'/api/favor',
    params: {
      cnt:40,
      id:this.$store.getters.getUserId,
      page:1
      }
  }).then(resp=>{

    this.goodses= resp.data.data.favorList;
    for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].select = true;
        }
  }).catch(function(error){
    alert(10086);
  })
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
    selectGoods:function(index){
      if(this.isManage){
        this.goSelect(index)
      }
    },
    selectAll:function(){
      if(!this.isManage){
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].createTime='1';
        }
      }
    },
    goAll(){
       this.$axios({
        method:'get',
        url:'/api/favor',
        params: {
          cnt:40,
          id:this.$store.getters.getUserId,
          page:1
        }
      }).then(resp=>{

        this.goodses= resp.data.data.favorList;
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].select = true;
        }
      })
    },
    deleteGoods:function(){
      for(let i = 0;i<this.goodses.length;i++){
        if(this.goodses[i].createTime==''){
          this.$axios({
            method:'delete',
            url:'/api/favor',
            params: {
              id:this.$store.getters.getUserId,
              goodsId:this.goodses[i].goodsId
            }
          }).then(resp=>{

            this.goodses.splice(i,1);
          }).catch(function(error){
            alert(10086);
        })
        }
      }
    },
    godown(){
       this.$axios({
        method:'get',
        url:'/api/favor2',
        params: {
          cnt:40,
          id:this.$store.getters.getUserId,
          page:1
        }
      }).then(resp=>{

        this.goodses= resp.data.data.favorList;
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].select = true;
        }
      }).catch(function(error){
        alert(10086);
     })
    },
    goNoEffect(){
       this.$axios({
        method:'get',
        url:'/api/favor1',
        params: {
          cnt:40,
          id:this.$store.getters.getUserId,
          page:1
        }
      }).then(resp=>{

        this.goodses= resp.data.data.favorList;
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].select = true;
        }
      })
    },
    goSelect:function(index){
      //alert(this.goodses[index].select)
      if(this.goodses[index].createTime==''){
        this.goodses[index].createTime = '1';
      }else{
        this.goodses[index].createTime = '';
      }
    },
    allChange:function(val){
      if(val){
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].createTime = ''
        }
      }else{
        for(let i = 0;i<this.goodses.length;i++){
          this.goodses[i].createTime = '1'
        }
      }
    }
  },
  computed: {
    isShow(index){
      return this.select[index];
    }
  }
}
</script>

<style scoped="scoped">
.get-on{
  width:245px;
  height:300px;
  left:-5px;
  top:0px;
  opacity: 0.9;
  position: absolute;
}
#show-cards{
  position: absolute;
  left:20px;
  top:300px;
}
.card{
  position: relative;
  float: left;
  width:240px;
  margin-right:50px;
  margin-bottom: 30px;
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
  position: relative;
  top:50px;
  width:1400px;
  display: block;
}
.show-pic{
  margin-top:5px;
  width:220px;
  margin-bottom: 60px;
  float: left;
  margin-left:50px;
  margin-right: 75px;
}
.image {
  width: 100%;
  display: block;
  height: 235px;
  overflow: hidden;
}
.choice-page{
  position: absolute;
  top:160px;
  left:px;
  font-size: 20px;
}
.choice-page span{
  position: relative;
  margin-left:20px;
}
.goods-input-icon{
  position: relative;
  font-size:20px;
}
.button{
 font-size:10px;
}
.search-goods{
  display: inline-block;
  position: absolute;
  width:300px;
  height:24px;
  border: 1px solid black;
  left:300px;
  top:5px;
}
.search-goods input{
  position: relative;
  font-size:20px;
  height:20px;
  width:270px;
  border:none;
  outline: none;
}
.element-manage{
  margin-left:20px;
}
.manage{
  position: absolute;
  top:140px;
  left:850px;
}
.input-icon{
  position: relative;
  font-size:20px;
  top:4px;
}
.search-box{
  display: inline-block;
  position: absolute;
  width:330px;
  height:30px;
  border: 1px solid black;
  left:1150px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
}
.active{
  color: #f06a0f;
}
.tran-page{
  position: absolute;
  top:50px;
  left:330px;
  font-size: 25px;
}
.tran-page-last{
  left:50px;
}
.tran-page span{
  position: absolute;
  width:230px;
}
.last-title{
  position: absolute;
  font-size: 30px;
  left:200px;
  top:15px;
  color: black;
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
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
#title{
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

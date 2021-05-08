<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="last-title">我的足迹</span>
      <span class="tran-page">
        <span @click="deleteAll">全部清空</span>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
      </div>
      <div >
      </div>
      <div v-if="num1!=0" class="foot-content">
        <div class="foot-today">
          <div class="today-infor">
            <span class="date-text" v-text="list[0].updateTime.substring(5,10)">03.25</span>
            <span class="goods-number" v-text="num1+'件'">几件</span>
          </div>
          <div class="goods-content-today">
            <el-row class="show-pics">
              <el-col class="show-pic" :class="index<4?'move':''" :span="12" v-for="(o, index) in list.slice(0,num1)" :key="index" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="image"><img :src="o.photo" ></div>
                  <div class="information">
                    <p class="el-icon-delete"></p>
                    <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
                    <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.price"></span></p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="num2!=0" class="foot-content">
        <div class="foot-today">
          <div class="yesterday-infor">
            <span class="date-text" v-text="list[num1].updateTime.substring(5,10)">03.25</span>
            <span class="goods-number" v-text="num2-num1 +'件'">几件</span>
          </div>
          <div class="goods-content-today">
            <el-row class="show-pics">
              <el-col class="show-pic"  :span="12" v-for="(o, index) in list.slice(num1,num2)" :key="index" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="image"><img :src="o.photo" ></div>
                  <div class="information">
                    <p class="el-icon-delete"></p>
                    <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
                    <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.price"></span></p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="num3!=0" class="foot-content">
        <div class="foot-today">
          <div class="yesterday-infor">
            <span class="date-text" v-text="list[num2].updateTime.substring(5,10)">03.25</span>
            <span class="goods-number" v-text="num3-num2 +'件'">几件</span>
          </div>
          <div class="goods-content-today">
            <el-row class="show-pics">
              <el-col class="show-pic"  :span="12" v-for="(o, index) in list.slice(num2,num3)" :key="index" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div class="image"><img :src="o.photo" ></div>
                  <div class="information">
                    <p class="el-icon-delete"></p>
                    <p align="left" class="goods-title" v-text="o.goodsName">好吃的汉堡111111111</p>
                    <p align="left" class="goods-price"><span class="iconfont-go icon-gofl-renminbi"></span> <span v-text="o.price"></span></p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
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
  mounted () {
     this.$axios({
          method:'get',
          url:'/api/allHistory',
          params: {
            cnt:100,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.list = resp.data.data.historyList;
          let i = 0;
          let j =0;
          let num = [0,0,0,0];
          //alert(1)
          let time = this.list[i].updateTime.substring(0,10);
          //alert(1)
          for(i = 0;i<this.list.length&&j!=4;i++){
            //alert(this.list.length)
            if(time!=this.list[i].updateTime.substring(0,10)){
              time = this.list[i].updateTime.substring(0,10);
              num[j] = i;
              j++;
            }
          }
          num[j] = i;
          //alert(111)
          this.num1=num[0];
          this.num2=num[1];
          this.num3=num[2];
          alert(this.num1)
        })
  },
  data(){
    return{
      num1:0,
      num2:0,
      num3:0,
      list:[]
    }
  },
  methods: {
    deleteAll:function(){
      this.$axios({
          method:'delete',
          url:'/api/allHistory',
          params: {
            id:this.$store.getters.getUserId,
          }
        }).then(resp=>{
          this.$alert('删除成功','提示',{
            confirmButtonText:'确定'
          });
          this.list.splice(0,this.list.length)
          this.num1=this.num2 = this.num3 = 0;
        })
    }
  }
}
</script>

<style scoped="scoped">
.move{
  position: relative;
  left:-200px;
}
.today-infor{
  width:500px;
  background: white;
  position: relative;
  top:-15px;
  height:40px;
  left:-290px;
}
.goods-number{
  display: inline-block;
  position: relative;
  width:70px;
  left:50px;
  top:-15px;
}
.date-title{
  position: relative;
  left:60px;
  top:-15px;
  font-size: 25px;
}
.date-text{
  position: relative;
  left:60px;
  top:-15px;
  font-size: 35px;
}
.yesterday-infor{
  width:300px;
  background: white;
  position: relative;
  top:-20px;
  height:40px;
  left:-100px;
}
.el-icon-delete{
  position: relative;
  font-size: 20px;
  left:80px;
  top:-10px;
}
.icon-gofl-renminbi{
  font-size: 20px;
}
.foot-yesterday{
  position: relative;
  margin-top:100px;
  border-top:2px solid #c3c3c3;
  width:1050px;
}
.foot-today{
  border-top:2px solid #c3c3c3;
}
.goods-content-today{
  top:10px;
  position: relative;
}
.goods-content{
  top:10px;
  height:300px;
}
.foot-today{
  position: relative;
}
.foot-yesterday{
  position: relative;

  height:400px;
}
.foot-content{
  position: relative;
  width:1200px;
  top:180px;
  left:100px;
}
.information{
  height:70px;
}
.goods-price span{
  color: red;
}
.goods-title{
  position: relative;
  top:-40px;
  left:5px;
}
.goods-price{
  position: relative;
  top:-105px;
  font-size:18px;
}
.show-pics{
  position: relative;
  width:1400px;
  display: block;
}
.show-pic{
  margin-top:5px;
  width:220px;
  margin-bottom: 60px;
  float: left;
  margin-left:50px;
  margin-right: 25px;
}
.image {
  width: 100%;
  height: 235px;

}
.image {
  width: 100%;
  display: block;
  height: 235px;
  overflow: hidden;
}
.tran-page{
  position: absolute;
  color: #6fbae9;
  left:320px;
  top:40px;
}
.last-title{
  position: absolute;
  font-size: 25px;
  left:200px;
  top:35px;
  color: black;
}
.search-box{
  display: inline-block;
  position: absolute;
  width:330px;
  height:30px;
  border: 1px solid black;
  left:1050px;
}
.search-box input{
  height: 28px;
  width:300px;
  border:none;
  outline: none;
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
  height:60px;
  margin:0px;
}
.content-header{
  width:100%;
}
</style>

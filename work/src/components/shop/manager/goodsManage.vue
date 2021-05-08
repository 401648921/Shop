<template>
  <div class="content">
    <div class="path-content">
    <span class="steps">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">账号管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <div class="search-content">
        <span class="search-title">学生ID:</span>
        <span class="search-box">
          <input v-model="input" type="text">
        </span>
        <el-button class="submit-id" icon="el-icon-search" type="primary" @click="search">搜 索</el-button>
      </div>
  </div>
  <div class="goods-content">
      <span class="goods-nav">
        <span class="first-to">全部商品(24)</span>
        <span class="second-tos">
          <span class="second-to" @click="changeToBan">已审核(12)</span>
          <span class="second-to" @click="changeToOk">待审核(12)</span>
        </span>
      </span>
  </div>
  <div v-show="show" class="table-content">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="headerStyle"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="number"
      label="产品编号"
      width="220">

    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="添加时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="商品简介"
      width="220">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <el-button type="danger " class="el-icon-delete"></el-button>
    </el-table-column>
  </el-table>
  </div>
  <div v-show="!show" class="table-content">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="headerStyle"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="number"
      label="产品编号"
      width="220">

    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="添加时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="商品简介"
      width="220">
    </el-table-column>
    <el-table-column
      label="审核状态"
      width="120">
      <span>
        <span class="dian"></span>
        <span class="text">待审核</span>
      </span>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
      <el-button type="primary" @click="judgeGoods(tableData[scope.$index].number,1)">同意</el-button>
      <el-button type="danger" @click="judgeGoods(tableData[scope.$index].number,0)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div class="page-content">
      <span v-text="'第'+page.nowPage+'页'+' 共'+page.allPage+'页 '+'共'+page.count+'条'" class="page-infor">
        第3页 共十页,共100条
      </span>
      <span v-text="'共'+page.allPage+'页/'+'共'+page.count+'条数据'" class="page-tip">
        共10页/100条数据
      </span>
      <span class="page-tran">
        <div class="block">
            <el-pagination
              background
              :page-size="7"
              :current-page="page.nowPage"
              @current-change="pageChange"
              layout="prev, pager, next,jumper"
              :total="page.count">
            </el-pagination>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:1,
            page:this.page.nowPage
          }
        }).then(resp=>{
          if(resp.data.msg=='authorityWrong'){
            this.$alert('您不是管理员','提示',{
            confirmButtonText:'确定'
          });
            this.$router.go(-1);
          }
          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
  },
data(){
  return{
    show:true,
    stuNo:'',
    tableData: [],
    input:'',
    multipleSelection: [],
    page:{
      nowPage:1,
      count:1,
      allPage:1
    }
  }
},
methods: {
  handleSelectionChange:function(){

  },
  search:function(){
    this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:1,
            keyword:this.input,
            page:this.page.nowPage
          }
        }).then(resp=>{
          if(resp.data.msg=='authorityWrong'){
            this.$alert('您不是管理员','提示',{
            confirmButtonText:'确定'
          });
            this.$router.go(-1);
          }
          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
  },
  pageChange:function(val){
    this.page.nowPage= val;
    if(this.show){
       this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:1,
            page:this.page.nowPage
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
    }else{
      this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:0,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
    }
  },
  headerStyle:function(){
      return {
        background:'#e8e8e8'
      }
  },
    changeToOk:function(){
      this.show = false;
      this.page.nowPage= 1;
      this.page.count = 1;
      this.page.allPage = 1;
      this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:0,
            page:this.page.nowPage
          }
        }).then(resp=>{

          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
    },
    judgeGoods:function(number,staus){
      this.page.count-=1;
      this.$axios({
          method:'post',
          url:'/api/judgeGoods',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getUserId,
            isPass:staus,
            number:number
          }
        }).then(resp=>{

          if(this.show){
       this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:1,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
    }else{
      this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:0,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
    }
        })
    },
    changeToBan:function(){
      this.show= true;
      this.page.nowPage= 1;
      this.page.count = 1;
      this.page.allPage = 1;
      this.$axios({
          method:'get',
          url:'/api/goodsList',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            isPass:1,
            page:this.page.nowPage
          }
        }).then(resp=>{

          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.goodsList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,10)+'  '+this.tableData[i].updateTime.substring(11,19)
          }
        })
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

<style  scoped="scoped">
.page-tip{
  position: relative;
  left:280px;
  top:5px;
}
.page-tran{
  position: relative;
  left:290px;
}
.page-infor{
  font-size: 13px;
}
.page-tran{
  display: inline-block;
}
.page-content{
  position: absolute;
  top:800px;
  left:180px;
}
.dian{
  display: inline-block;
  width:10px;
  height:10px;
  background: #f06a0f;
  border-radius: 50%;
}
.el-icon-delete{
  font-size: 20px;
  width:80px;
  transform: scaleY(0.8);
}
.table-content{
  position: relative;
  width:1000px;
  left:280px;
  top:200px;
}
.goods-content{
  position: fixed;
  position: relative;
  top:-10px;
  left:30px;
}
.second-tip{
  left:15px;
}
.second-to{
  position: relative;
  display: block;
  margin-bottom: 10px;
}
.second-tos{
  position: relative;
  display: block;
}
.first-to{
  position: relative;
  display: block;
  font-size: 20px;
  margin-bottom: 20px;
}
.goods-nav{
  position: absolute;
  width:150px;
  left:50px;
  top:160px;
}
.search-content{
  position: relative;
  top:160px;
  left:-300px;
}
.submit-id{
  transform: scale(0.75);
  position: relative;
  left:100px;
}
.search-box input{
  border:none;
  outline: none;
  width:230px;
  height:23px;
  font-size: 16px;;
}
.search-box{
  display: inline-block;
  width:250px;
  height:25px;
  position: relative;

  border:2px solid #c3c3c3;
}
.search-title{
  font-size: 20px;
  position: relative;
  top:5px;
}
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:1500px;
  margin:0px;
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

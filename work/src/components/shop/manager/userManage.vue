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
          <input type="text" v-model="input">
        </span>
        <el-button class="submit-id" icon="el-icon-search" type="primary" @click="search">搜 索</el-button>
      </div>
  </div>
  <div class="goods-content">
      <span class="goods-nav">
        <span class="first-to">全部账号(24)</span>
        <span class="second-tos">
          <span class="second-to">正常账号(12)</span>
          <span class="second-to">已禁用账号(12)</span>
        </span>
      </span>
  </div>
  <div  class="table-content">
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
      prop="id"
      label="学生ID"
      width="120">

    </el-table-column>
    <el-table-column
      prop="createTime"
      label="添加时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="introduction"
      label="账户简介"
      width="220">
    </el-table-column>
    <el-table-column
      prop="frozenCounts"
      label="不合格商品数"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button @click="dialogFormVisible = true;select.index=scope.$index;" type="success" v-show="timeRange(tableData[scope.$index].reopenDate)" style="position:relative;left:10px;">禁用</el-button>
        <el-button @click="reopenUser(tableData[scope.$index].id)" type="warning" v-show="!timeRange(tableData[scope.$index].reopenDate)">恢复</el-button>
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
    <el-dialog title="封禁用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="封禁天数" :label-width="'100px'">
          <el-input class="input" v-model="form.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封禁原因" :label-width="'100px'">
          <el-input class="input" v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="banUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    pageChange:function(page){
      this.page.nowPage = page;
      this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }

          }
        })
    },
    handleSelectionChange:function(){

    },
    timeRange:function(time1){
      if(time1==null){
        return true;
      }
      let now = new Date();
      let than = new Date(time1.replace('-','/'));
      //alert(now.getTime())
      return now.getTime()>than.getTime();
    },
    search:function(){
      this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            keyword:this.input,
            page:this.page.nowPage
          }
        }).then(resp=>{

          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }
          }
        })
    },
    reopenUser:function(number){
      this.$axios({
          method:'post',
          url:'/api/reopenUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            adminId:this.$store.getters.getUserId,
            id:number
          }
        }).then(resp=>{

          this.$alert('解禁成功','提示',{
            confirmButtonText:'确定'
          });
        })
        this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }
          }
        })
        this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }

          }
        })
    },
    headerStyle:function(){
      return {
        background:'#e8e8e8'
      }
    },
    banUser:function(){
      this.$axios({
          method:'post',
          url:'/api/frozeUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            days:this.form.days,
            id:this.tableData[this.select.index].id,
            reason:this.form.reason
          }
        }).then(resp=>{
          //alert(id);
          this.dialogFormVisible=false;
           this.$alert('封禁成功','提示',{
            confirmButtonText:'确定'
          });
          this.tableData[index].frozenDate= new Date();
        })
        this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }
          }
        })
        this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }

          }
        })
    },
    setTime:function(oldTimes1){
        var time1 = oldTimes1.split(' ')[0];
        var arrTime = oldTimes1.split(' ')[1].split(':');
        var time2 = arrTime.slice(1, arrTime.length).join(':');
        var h = parseInt(arrTime[0]) + 8;
        var newH = ((h < 24) ? h : (h % 24)).toString();
        return time1 + ' ' + newH + ':' + time2;
      },
  },
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/getUser',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:7,
            page:this.page.nowPage
          }
        }).then(resp=>{

          this.page.nowPage= 1;
          this.page.count = resp.data.data.count;
          this.page.allPage = resp.data.data.pages;
          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.userList;
          //alert(this.tableData[4].createTime.substring(0,10)+' '+this.tableData[6].createTime.substring(11,19));
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+' '+this.tableData[i].createTime.substring(11,19);
            this.tableData[i].createTime=this.setTime(this.tableData[i].createTime);
            if(this.tableData[i].reopenDate!=null){
              this.tableData[i].reopenDate=this.tableData[i].reopenDate.substring(0,10)+' '+this.tableData[i].reopenDate.substring(11,19);
              this.tableData[i].reopenDate=this.setTime(this.tableData[i].reopenDate);
            }
          }
        })
  },
data(){
  return{
    stuNo:'',
    dialogFormVisible:false,
    select:{
      number:0,
      index:0
    },
    page:{
      nowPage:1,
      count:1,
      allPage:1
    },
    show:{
      okUser:true,
      noOkUser:true
    },
    tableData: [],
        multipleSelection: [],
        input:'',
        form:{
          days:'',
          reason:''
        }
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
.input{
  width:350px;
  float: left;
}
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

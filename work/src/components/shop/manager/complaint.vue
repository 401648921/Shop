<template>
  <div class="content">
    <div class="path-content">
    <span class="steps">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">投诉处理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <div class="search-content">
        <span class="search-title">学生ID:</span>
        <span class="search-box">
          <input type="text">
        </span>
        <el-button class="submit-id" icon="el-icon-search" type="primary">主要按钮</el-button>
      </div>
  </div>

  <div class="table-content">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="'background:#e8e8e8'"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="goodsNumber"
      label="投诉者ID"
      width="220">

    </el-table-column>
    <el-table-column
      prop="date"
      label="被投诉者ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goodsInfor"
      label="投诉原因"
      width="220">
    </el-table-column>
    <el-table-column
      prop="price"
      label="具体原因"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
       <el-button type="success" >处理</el-button>
      <el-button type="danger " class="el-icon-delete"></el-button>
    </el-table-column>
  </el-table>
  </div>

  <div class="page-content">
      <span class="page-infor">
        第3页 共十页,共100条
      </span>
      <span class="page-tip">
        共10页/100条数据
      </span>
      <span class="page-tran">
        <div class="block">
            <el-pagination
              background
              :page-size="20"
              :current-page="20"
              @current-change="pageChange"
              layout="prev, pager, next,jumper"
              :total="1000">
            </el-pagination>
        </div>
      </span>
    </div>
  </div>
</template>

<script scoped="scoped">
export default {
data(){
  return{
    stuNo:'',
    tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
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

<style>
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
  left:180px;
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
  left:-400px;
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

<template>
  <div class="content">
    <div class="content-header">
      <span class="steps">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">退款处理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">退款详情</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <div class="refund-box">
      <div class="refund-box-header">
        <span class="refund-box-header-text">退款详情</span>
      </div>
      <div class="table-top">
        <div class="table-top-element">
          <span class="table-element-header">
            <span>订单编号</span>
          </span>
          <span class="table-element-content">
            <span>123456789098</span>
            <span>查看</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>申请状态</span>
          </span>
          <span class="table-element-content">
            <span>卖家已处理</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>申请时间</span>
          </span>
          <span class="table-element-content">
            <span>2012-12-12 12:00</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>用户 ID</span>
          </span>
          <span class="table-element-content">
            <span>123456</span>
          </span>
        </div>
      </div>
      <div class="table-middle">
        <div class="table-top-element">
          <span class="table-element-header">
            <span>订单金额</span>
          </span>
          <span class="table-element-content">
            <span>200.00</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>确定退款金额</span>
          </span>
          <span class="table-element-content">
            <span>200.00</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>退款方式</span>
          </span>
          <span class="table-element-content">
            <span>退回原支付渠道</span>
          </span>
        </div>
        <div class="table-top-element">
          <span class="table-element-header">
            <span>退款原因</span>
          </span>
          <span class="table-element-content">
            <span>原因详述</span>
          </span>
        </div>
      </div>
      <div class="table-bottom">
        <div class="table-element">
          <span class="table-element-header">
            <span>退款原因</span>
          </span>
          <span class="table-input-content">
            <input type="text">
          </span>
        </div>
      </div>
      <el-button class="button" type="success">确认退款</el-button>
      <el-button class="button" type="danger">拒绝退款</el-button>
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

        })
  },
}
</script>

<style scoped="scoped">
.button{
  position: relative;
  top:200px;
  margin-right: 50px;;
  width:100px;
}
.table-input-content input{
  position: relative;
  top:-2px;
  border:1px solid #c3c3c3;
  outline: none;
  width:70%;
  height:60%;
}
.table-element{
  height:99%;
  border-bottom: 2px solid #c3c3c3;
  line-height: 50px;
  font-size: 20px;
}
.table-bottom{
  position: relative;
  width:95%;
  height:48px;
  border: 2px solid #c3c3c3;
  left:3%;
  top:120px;
}
.table-middle{
  position: relative;
  width:95%;
  height:200px;
  border: 2px solid #c3c3c3;
  border-bottom: none;
  left:3%;
  top:80px;
}
.table-element-content span{
  float: left;
  margin-left:20px;
  margin-right:40px;
}
.table-element-content{
  width:500px;
  float: left;
}
.table-element-header span{
  float:right;
  margin-right: 40px;;
}
.table-element-header{
  float: left;
  width:200px;
  height:48px;
  background: #e8e8e8;
  border-right: 2px solid #c3c3c3;
}
.table-top-element{
  height:24%;
  border-bottom: 2px solid #c3c3c3;
  line-height: 50px;
  font-size: 20px;
}
.table-top{
  position: relative;
  width:95%;
  height:200px;
  border: 2px solid #c3c3c3;
  border-bottom: none;
  left:3%;
  top:40px;
}
.refund-box-header span{
  font-size: 18px;
  line-height: 40px;
  margin-left:10px;
  float: left;
}
.refund-box-header{
  height:40px;
  border-bottom:2px solid #c3c3c3;
}
.refund-box{
  position: absolute;
  width:900px;
  border:2px solid #c3c3c3;
  top:150px;
  left:250px;
  height:800px;
  margin-bottom: 300px;
}
.el-breadcrumb__inner{
  font-weight: 500 !important;
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
.tran-page{
  position: absolute;
  top:55px;
  left:200px;
  width:300px;
  font-size: 25px;
}
.tran-page span{
  display: inline-block;
  width:120px;
  position: relative;
}

.content{
  position: absolute;
  left:10%;
  top:65px;
  width:80%;
  height:600px;
  padding-bottom: 400px;;
}
.content-header{
  width:100%;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../../assets/wwww.ttf');
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
</style>

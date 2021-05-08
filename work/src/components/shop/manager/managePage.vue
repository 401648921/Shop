<template>
  <div class="content">
    <div class="content-title-box">
      <span class="content-title">
        <span class="iconfont-go icon-gohome-full"></span>
        <span class="content-title-text">管理首页</span>
      </span>
    </div>
    <div class="content-infor">
      <span class="content-infor-box">
        <span class="content-infor-img-box">
          <img src="../../../assets/manger1.png" alt="">
        </span>
        <span class="infor-box">
          <div class="infor-num" v-text="information.userCount">12345</div>
          <div class="infor-title">用户</div>
        </span>
      </span>
      <span class="content-infor-box">
        <span class="content-infor-img-box">
          <img src="../../../assets/manger2.png" alt="">
        </span>
        <span class="infor-box">
          <div class="infor-num" v-text="information.orderCount">12345</div>
          <div class="infor-title">订单</div>
        </span>
      </span>
      <span class="content-infor-box">
        <span class="content-infor-img-box">
          <img src="../../../assets/manger3.png" alt="">
        </span>
        <span class="infor-box">
          <div class="infor-num" v-text="information.tradeCount">12345</div>
          <div class="infor-title">交易金额</div>
        </span>
      </span>
    </div>
    <div class="tables">
      <span class="table">
        <div class="table-header"> 订单统计信息</div>
        <div class="table-task">
          <span class="table-task-title"> 未处理订单:</span>
          <span class="table-task-text" v-text="information.orderCount1+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 待发货订单:</span>
          <span class="table-task-text" v-text="information.orderCount2+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 待付款订单:</span>
          <span class="table-task-text" v-text="information.orderCount3+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 已成交订单:</span>
          <span class="table-task-text" v-text="information.orderCount4+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 交易失败订单:</span>
          <span class="table-task-text" v-text="information.orderCount5+'个'">12个</span>
        </div>
      </span>
      <span class="table">
        <div class="table-header"> 商品统计信息</div>
        <div class="table-task">
          <span class="table-task-title"> 商品总数:</span>
          <span class="table-task-text" v-text="information.goodsCount+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 上架商品:</span>
          <span class="table-task-text" v-text="information.goodsCount1+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 下架商品:</span>
          <span class="table-task-text" v-text="information.goodsCount2+'个'">12个</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 商品评论:</span>
          <span class="table-task-text" v-text="information.evaluate+'个'">12条</span>
        </div>
        <div class="table-task">
          <span class="table-task-title"> 商品留言:</span>
          <span class="table-task-text" v-text="information.comments+'个'">12条</span>
        </div>
      </span>
      <span class="table">
        <div class="table-header"> 最新信息</div>
        <div class="table-task">
          <span class="table-task-icon el-icon-bell ring"></span>
          <span class="table-task-text-to" v-text="information.feedback1"> 反馈意见1</span>
        </div>
        <div class="table-task">
          <span class="table-task-icon el-icon-bell ring"></span>
          <span class="table-task-text-to" v-text="information.feedback2"> 反馈意见1</span>
        </div>
        <div class="table-task">
          <span class="table-task-icon el-icon-bell ring"></span>
          <span class="table-task-text-to" v-text="information.feedback3"> 反馈意见1</span>
        </div>
        <div class="table-task">
          <span class="table-task-icon el-icon-bell ring"></span>
          <span class="table-task-text-to" v-text="information.feedback4"> 反馈意见1</span>
        </div>
        <div class="table-task">
          <span class="table-task-icon el-icon-bell ring"></span>
          <span class="table-task-text-to" v-text="information.feedback5"> 反馈意见1</span>
        </div>
      </span>
    </div>
    <div class="img-boxs">
      <span @click="pushGoods" class="img-box">
        <img src="../../../assets/manger4.png" alt="">
      </span>
      <span @click="pushUser" class="img-box">
        <img src="../../../assets/manger5.png" alt="">
      </span>
      <span @click="pushOrder" class="img-box">
        <img src="../../../assets/manger6.png" alt="">
      </span>
    </div>
  </div>
</template>

<script scoped="scoped">
export default {
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/information',
          params: {
            id:this.$store.getters.getUserId
          }
        }).then(resp=>{
          this.information = resp.data.data.information;
        })
  },
  methods: {
    pushGoods:function(){
      this.$router.push({
          path:'/manage/goodsManage'
        })
    },
    pushUser:function(){
      this.$router.push({
          path:'/manage/userManage'
        })
    },
    pushOrder:function(){
      this.$router.push({
          path:'/manage/refund'
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
    data(){
      return{
        information:{}
      }
    }
}
</script>

<style>
.img-box{
  float: left;
  margin-left:180px;
  margin-right:60px;
}
.img-boxs{
  position: absolute;
  top:600px;
  width:1300px;
}
.table-task-text-to{
  font-size: 18px;
  line-height: 56px;
  float: left;
  text-align: left;
  text-indent: 15px;
}
.table-task-icon{

  font-size: 25px;
  line-height: 56px;
  float: left;
  text-align: left;
  text-indent: 15px;
  color: red;
}
.table-task-text{
  width:120px;
  font-size: 18px;
  line-height: 56px;
  float: left;
  text-align: left;
  text-indent: 15px;;
}
.table-task-title{
  width:180px;
  font-size: 18px;
  line-height: 56px;
  float: left;
  text-align: left;
  text-indent: 15px;;
}
.table-task{
  height:56px;
  border-top:2px solid #c3c3c3;
}
.table-header{
  text-indent: 5px;
  text-align: left;
  font-size: 25px;;
  height:60px;
  line-height: 60px;
  font-weight: 700;
  background: #f4f0f0;
}
.table{
  float: left;
  margin-right:10px;
  margin-left:100px;
  width:300px;
  border:2px solid #c3c3c3;
  height:350px;
}
.tables{
  position: absolute;
  top:200px;

  width:1300px;
  height:400px;
}
.infor-title{
  position: relative;
  top:20px;
  font-size: 20px;
}
.infor-num{
  width:150px;
  position: relative;
  left:20px;
  top:20px;
  font-size: 30px;
}
.infor-box{
  float: left;
  width:200px;
}
.content-infor-img-box{
  float: left;
  height:95px;
}
.content-infor-box{
  width:300px;
  float: left;
  border:1px solid #c3c3c3;
  margin-right:10px;
  margin-left:100px;
}
.content-infor{
  width:1300px;
  position: relative;
  top:40px;
}

.content-title{
  position: relative;
  left:-520px;
  font-size: 18px;
}
.content-title-box{
  width:1300px;
}
.content{
  width:1300px;
  position: relative;
  left:10%;
  top:180px;
  height:1000px;
}
</style>

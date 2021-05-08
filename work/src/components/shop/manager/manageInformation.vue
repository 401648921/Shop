<template>
  <div class="content">
    <div class="path-content">
    <span class="steps">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">通知</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
  </div>
    <span class="information-choice">
      <span class="information-choice-span"><p>未读反馈消息</p></span>
      <span class="information-choice-span"><p>已读反馈消息</p></span>
      <span class="information-choice-span"><p>通知商家消息</p></span>
    </span>
    <span class="information-content-tre">
      <span class="table-content-infor-tre">
        <span class="table-header-tre">
          <span class="table-header-text">已反馈消息</span>
          <span class="table-header-num">5</span>
        </span>
        <span class="table-content-tre">
          <span class="table-task-tre" :key="o" v-for="o in 5">
            <span class="img-box-infor-tre">
              <img src="http://west2xianyu.oss-cn-shenzhen.aliyuncs.com/userPhoto/d0c7845e-99dd-4444-a4d1-f58ad59dabd6.jpg" alt="">
            </span>
            <span class="task-name">昵称昵称</span>
            <span class="task-infor"><p>内容内容内容内容容内容内容容内容内容容内容内容内容内容内容</p></span>
            <span class="time">2019年10月3日 15：30</span>
          </span>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    pushGoods:function(){

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
.time{
  position: relative;
  top:-60px;
  left:90px;
  width:180px;
  height:30px;
  display: inline-block;
}
.task-infor p{
  display: block;
}
.task-infor{
  position: relative;
  display: inline-block;
  height:40px;
  width:280px;
  left:-150px;
  overflow: hidden;
  font-size: 18px;
}
.task-name{
  position: relative;
  display: inline-block;
  top:-60px;
  left:-75px;
}
.img-box-infor-tre img{
  width:80px;
  height:80px;
}
.img-box-infor-tre{
  width:80px;
  height:80px;
  position: relative;
  display: inline-block;
  background-color: antiquewhite ;
  left:-85px;
  top:5px;
}
.table-task-tre{
  display: block;
  height:87px;
  border-bottom: 1px solid #dedede;
}
.table-content-infor-tre{
  display: block;
  height:420px;
}
.table-header-num{
  display: inline-block;
  line-height: 30px;;
  position: relative;
  left:-290px;
  top:12px;
  width:20px;
  height:30px;
  background-color: #f4f0f0 ;
  border:1px solid #dedede;
}
.table-header-text{
  position: relative;
  left:-300px;
  font-size: 23px;
  top:15px;
}
.table-header-tre{
  display: block;
  height:60px;
  border-bottom: 1px solid #dedede;
}
.information-content-tre{
  position: absolute;
  width:800px;
  height:500px;
  left:500px;
  border:1px solid #dedede;
  top:180px;
}
.information-choice{
  position: absolute;
  width:300px;
  height:180px;
  left:80px;
  top:200px;
  border:1px solid #dedede;
}
.content{
  position: absolute;
  left:10%;
  top:65px;
  width:1500px;
  margin:0px;
}
.information-choice span{
  display: block;
  position: relative;
  border-top:1px solid #dedede;
  height:60px;
  line-height: 100px;
  font-size: 20px;;
}
.information-choice p{
  position: relative;
  top:-40px;
  left:-70px;
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
  left:80px;
  top:90px;
  font-size: 19px;
  transform: scale(1.3);
}
</style>

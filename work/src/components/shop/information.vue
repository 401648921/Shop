<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <span class="information-choice">
      <span class="information-choice-span"><p>未读消息</p></span>
      <span class="information-choice-span"><p>已读消息</p></span>
      <span class="information-choice-span"><p>系统通知</p></span>
    </span>
    <span class="information-content-tre">
      <span class="table-content-infor-tre">
        <span class="table-header-tre">
          <span class="table-header-text">已读消息</span>
          <span class="table-header-num">5</span>
        </span>
        <span class="table-content-tre">
          <span class="table-task-tre" :key="index" v-for="(o,index) in tableData">
            <span class="img-box-infor-tre">
              <img src="../../assets/gouzi.jpg" alt="">
            </span>
            <span class="task-name" v-text="o.title">昵称昵称</span>
            <span class="task-infor" v-text="o.msg">内容内容内容内容容内容内容容内容内容容内容内容内容内容内容</span>
            <span class="time" v-text="o.createTime">2019年10月3日 15：30</span>
          </span>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:[]
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
  mounted () {
    this.$axios({
          method:'get',
          url:'/api/message',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:5,
            id:this.$store.getters.getUserId,
            isRead:0,
            page:1
          }
        }).then(resp=>{


          //this.dialogFormVisible = false;
          this.tableData=resp.data.data.messageList;
          for(let i =0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)+'  '+this.tableData[i].createTime.substring(11,19)
          }
        })
  },
}
</script>

<style scoped="scoped">
.time{
  position: relative;
  top:-140px;
  left:50px;
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
  height:75px;
  width:500px;
  left:60px;
  top:-45px;
  overflow: hidden;
  font-size: 15px;
  text-align: left;
}
.task-name{
  position: relative;
  display: inline-block;
  top:-60px;
  left:-75px;
  width:500px;
  text-align: left;
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
</style>

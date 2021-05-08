<template>
  <div class="content">
    <span id="title"><p class="first-line">二手网站</p><p class="second-line">Secondhand</p></span>
    <div  class="steps-content">
      <el-steps  finish-status="success">
        <el-step title="拍下商品"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="确认收货"></el-step>
        <el-step title="评价"></el-step>
      </el-steps>
    </div>
    <div class="addresses">
      <span :class="index==select?'select':''" @click="select=index;selectAddressNumber=o.number" :key="index" v-for="(o,index) in addresses" class="address-content">
        <div class="address-content-title"><p align="left" v-text="o.campus+'('+o.name+'收)'">什么校区 (谁谁谁收)</p></div>
        <div class="address-content-text"><p align="left" v-text="o.realAddress">几号楼房间号或其他地址</p></div>
        <div @click="select=index;electAddressNumber=o.number;dialogFormVisibleModify=true;" class="change-button">修改</div>
      </span>
      <span class="manage-address">管理收货地址</span>
    </div>
    <div class="table-header">
      <span class="table-header-one">店铺宝贝</span>
      <span class="table-header-two">商品描述</span>
      <span class="table-header-three">单价</span>
      <span class="table-header-four">运费</span>
      <span class="table-header-five">小计</span>
    </div>
    <div class="saler">
      <span class="saler-name"  v-text="data.username">卖家昵称</span>
      <div class="goods-infor">
        <span class="img-box">
          <img src="" alt="">
        </span>
        <span class="goods-name" ><span v-text="data.goodsName"></span></span>
        <span class="goods-descrip"><span v-text="data.description"  >商品描述商品描述商品描述商品描述</span></span>
        <span class="one-price"><span v-text="data.price">79.9</span></span>
        <span class="tran-price">0.0</span>
        <span class="all-price" v-text="data.price">79.9</span>
      </div>
      <div class="message">
        <span class="message-title">给卖家留言:</span>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="100"
          show-word-limit
          class="input-message"
        >
        </el-input>
        <div class="price-content">
          <span class="price-content-title">店铺合计:</span>
          <span class="price-content-text">
            <span class="price-content-text-icon">￥</span>
            <span class="price-content-text-num" v-text="data.price">79.9</span>
          </span>
        </div>
      </div>
    </div>
    <div class="submit-content">
      <div class="set-date">
        <span class="set-date-text">设置收货时间</span>
      </div>
      <div class="submit-infor">
        <div class="price-last-infor">
          <span class="price-last-infor-title">实付款:</span>
          <span class="price-last-infor-icon">￥</span>
          <span class="price-last-infor-sum" v-text="data.price">79.9</span>
        </div>
        <div class="address-last-infor">
          <span class="address-last-title">寄送至:</span>
          <span class="address-last-content" v-text="addresses[select].realAddress">铜盘校区几号楼宿舍号或其他地址</span>
        </div>
        <div class="distribution-content">
          <span class="distribution-title">收货人:</span>
          <span class="distribution-text" v-text="addresses[select].name">谁谁谁</span>
          <span class="order-number" v-text="addresses[select].number">12345678928</span>
        </div>
        <div class="submit-button">
          <el-button @click="order" class="buttion-order" type="danger">提交订单</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleModify">
      <el-form :model="form">
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input class="dialog-input" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input class="dialog-input" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址信息" :label-width="formLabelWidth">
          <el-select class="region-select" v-model="form.addressInfor" placeholder="请选择活动区域">
            <el-option label="旗山校区" value="旗山校区"></el-option>
            <el-option label="怡山校区" value="怡山校区"></el-option>
            <el-option label="铜盘校区" value="铜盘校区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input class="dialog-textarea" type="textarea" v-model="form.addressDetail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <template>
            <el-checkbox class="setAddress" v-model="form.checked">设为默认地址</el-checkbox>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleModify = false">取 消</el-button>
        <el-button type="primary" @click="modify">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
data(){
  return{
    textarea:'',
    addresses:[],
    select:0,
    selectAddressNumber:'',
    dialogFormVisibleModify:false,
    form:{
          addressInfor:'',
          checked:false,
          name:'',
          phone:'',
          addressDetail:'',
          realAddress:'',
          number:''
        },
    formLabelWidth: '120px',
    data:{}
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
  mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/address',
          params: {
            cnt:3,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.addresses= resp.data.data.addressList;
          //this.count = resp.data.data.count;
          this.selectAddressNumber = addresses[0].number;
        }).catch(function(error){
          alert(error.url);
        })
        this.$axios({
          method:'get',
          url:'/api/goodsWhenever1',
          params: {
            number:this.$route.query.number
          }
        }).then(resp=>{
          this.data= resp.data.data.goods;
          alert(this.addresses[0].number)
        }).catch(function(error){
          alert(10086);
        })
  },
  methods: {
     modify:function(){
       alert(this.form.number)
        if(this.form.name==''){
          this.$alert('请先输入收货人姓名','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.addressDetail==''){
          this.$alert('请先输入详细地址','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.phone==''){
          this.$alert('请先输入电话号码','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.addressInfor==''){
          this.$alert('请先选择校区','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$axios({
          method:'patch',
          url:'/api/address',
          params: {
            campus:this.form.addressInfor,
            id: this.$store.getters.getUserId,
            name:this.form.name,
            phone:this.form.phone,
            realAddress:this.form.addressDetail,
            number:this.selectAddressNumber
          }
        }).then(resp=>{
          if(resp.data.code==-1){
            alert(1);
          }
          this.$alert('修改成功','提示',{
            confirmButtonText:'确定'
          });
          this.dialogFormVisibleModify=false;
          this.$axios({
          method:'get',
          url:'/api/address',
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          this.addresses= resp.data.data.addressList;

        }).catch(function(error){
          alert(error.url);
        })
        })

      },
    order:function(){
      if(this.selectAddressNumber==''){
         this.$alert('请先选择地址','提示',{
            confirmButtonText:'确定'
          });
        return;
      }
      //alert(this.selectAddressNumber+'    '+this.$route.query.number)
      this.$axios({
          method:'post',
          url:'/api/order',
          params: {
            address:this.selectAddressNumber,
            message:this.textarea,
            number:this.$route.query.number,
            toId:this.$store.getters.getUserId
          }
        }).then(resp=>{
          this.$alert('提交成功','提示',{
            confirmButtonText:'确定'
          });
          this.$router.push({
          path:'/shop/payPage',
          query:{
            number:resp.data.data.number
          }
        })
        })
    }
  }
}

</script>

<style scoped="scoped">
.oper-span{
  margin-right:30px;
}
.setAddress{
  float: left;
}
.dialog-textarea textarea{
  resize: none;
}
.dialog-textarea{
  float: left;
  width:400px;
  resize: none;
}
.dialog-input{
  float: left;
  width:200px;
}
.region-select{
  float: left;
}
.address-take{
  position: relative;
  left:-300px;
  font-size: 14px;
  top:-5px;
  color: #f2c389;
}
.select{
  background: green;
}
.buttion-order{
  width:150px;
}
.submit-button{
  position: relative;
  top:-5px;
  width:300px;
  left:1050px;
}
.distribution-content{
  position: relative;
  top:-15px;
  width:300px;
  left:1020px;
}
.address-last-infor{
  position: relative;
  width:300px;
  top:-20px;
  left:980px;
}
.price-last-infor-sum{
  font-size: 30px;
  color: red;
}
.price-last-infor-icon{
  font-size: 30px;
  color: red;
}
.price-last-infor{
  position: relative;
  width:200px;
  margin-right: 0px;
  padding-right: 1px;
  height:60px;
  left:1100px;
}
.set-date{
  position: absolute;
  top:-30px;
  left:550px;
}
.set-date-text{
  position: relative;
  left:-450px;
  color: red;
  font-size: 14px;
}
.submit-content{
  position: relative;
  top:660px;
  width:1200px;
  height:80px;
}
.price-content-text-num{
  color: red;
  height:40px;
  margin-top:3px;
  line-height:100%;
}
.price-content-text-icon{
  color: red;
  font-size: 24px;
  height:40px;
  line-height:100%;
}
.price-content-title{
  display: inline-block;
  height:30px;
  position: relative;
  top:-15px;
}
.price-content-text span{
  float: left;
  height:30px;
}
.price-content-text{
  display: inline-block;
  width:200px;
  height:30px;
}
.price-content{
  position: relative;
  left:1020px;
  top:30px;
  width:300px;
}
.message-title{
  position: relative;
  left:-350px;
  top:-50px;
}
.input-message{
  position: relative;
  left:-350px;
  top:10px;
  width:400px;
  height:80px;
  resize: none;
}
.input-message>textarea{
  width:400px;
  height:80px;
  resize: none;
}
.message{
  position: relative;
  top:30px;
  left:100px;
  width:1200px;
  height:140px;
  background: #e8ffff;
}
.all-price{
  float: left;
  width:120px;
  height:50px;
  margin-left:80px;
  margin-top:20px;
}
.tran-price{
  float: left;
  width:120px;
  height:50px;
  margin-left:70px;
  margin-top:20px;
}
.one-price{
  float: left;
  width:120px;
  height:50px;
  margin-left:50px;
  margin-top:20px;
}
.goods-descrip{
  float: left;
  text-align: left;
  margin-left:30px;
  margin-top:20px;
  width:120px;
  height:50px;
}
.goods-name p{
  width:240px;
  height:100px;
}
.goods-name{
  float: left;
  width:240px;
  text-align:left;
  height:150px;
  margin-left:30px;
  margin-top:20px;
}
.img-box{
  display: block;
  float: left;
  margin-left:30px;
  margin-top:20px;
  background: red;
  width:100px;
  height:100px;
}
.goods-infor{
  position: relative;
  top:30px;
  left:100px;
  width:1200px;
  height:140px;
  background: #e8ffff;
  border-bottom: 1px solid #c3c3c3;
}
.saler-name{
  position: absolute;
  left:100px
}
.saler{
  width:1200px;
  height:500px;
  position: absolute;
  top:450px;
}
.table-header-five{
  width:180px;
}
.table-header-four{
  width:180px;
}
.table-header-three{
  width:180px;
}
.table-header-two{
  width:180px;
}
.table-header-one{
  width:350px;
}
.table-header{
  position: absolute;
  top:400px;
  left:100px;
  width:1200px;

}
.table-header span{
  float: left;
  height:40px;
  line-height: 40px;
  margin-right:20px;
  border-bottom: 1px solid #c3c3c3;
}
.manage-address{
  z-index: 10;
  position: relative;
  font-size: 13px;
  color: #d78662;
  left:-210px;
  top:150px;
}
.change-button{
  position: relative;
  font-size: 13px;
  left:-92px;
  color: #d78662;
}
.address-content-text{
  position: relative;
  left:20px;
  height:40px;
  width:220px;
}
.address-content-title p{
  position: relative;
  top:-10px;

}
.address-content-title{
  position: relative;
  left:20px;
  border-bottom: 1px solid #c3c3c3;
  height:40px;
  width:220px;
  line-height: 40px;;
}
.address-content{
  float: left;
  width:250px;
  margin-right:100px;
  height:140px;
  border: 1px solid #c3c3c3;
}
.addresses{
  position: relative;
  top:200px;
  left:140px;
  width:1400px;
  height:140px;
}
.el-step__icon{
  height:50px;
  width:50px;
  top:-10px;
  left:-5px;
}

.steps-content{
  text-align: left;
  width:650px;
  position: absolute;
  left:600px;
  top:60px;
}
.steps{
  display:block;
  position: absolute;
  width:500px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.submit-search{
  position: absolute;
  height:43px;
  top:99px;
  left:960px;
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

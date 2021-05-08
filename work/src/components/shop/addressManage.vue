<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="tran-page">
        <span >首页</span>
        <span>账户设置</span>
      </span>
      <span class="search-box">
        <input type="text">
        <span class="iconfont-go icon-gofangdajing input-icon"></span>
      </span>
    </div>
    <div class="goods-content">
      <span class="goods-nav">
        <span class="first-to">全部功能</span>
        <span class="second-tos">
          <span class="second-to"><router-link tag="span" :to="{ path: '/shop/purcharCar'}" push>我的购物车</router-link></span>
          <span class="second-to">已买到的宝贝</span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/foot'}" push>我的足迹</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/myshop'}" push>我的售品</router-link></span>
          <span class="second-to"><router-link tag="span" :to="{ path: '/shop/addressManage'}" push>我的收货地址</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/personInformation'}" push>个人信息</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/shop/userSetting'}" push>反馈信息</router-link></span>
          <span class="second-to second-tip"><router-link tag="span" :to="{ path: '/manage/managePage'}" push>后台管理</router-link></span>
        </span>
      </span>
    </div>
    <div class="address-content">
      <div class="address-content-header">
        <span class="address-content-title">默认地址</span>
        <span @click="increase" class="address-take">新建收货地址</span>
      </div>
      <div class="address-line">
        地址信息:
        <template>
          <el-select class="input" v-model="data.addressInfor" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="true">
            </el-option>
          </el-select>
        </template>
        详细地址:
        <el-input class="input" :disabled="true" v-model="data.addressDetail" placeholder="请输入内容"></el-input>
      </div>
      <div class="address-line">
        收货人姓名:
        <el-input class="input" :disabled="true" v-model="data.name" placeholder="请输入内容"></el-input>
        手机号码:
        <el-input class="input" :disabled="true" v-model="data.phone" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="table-header">
        <span v-text="'已保存了'+count+'条地址'">已保存了4条地址</span>
    </div>
    <div class="table-content">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="name"
            label="收货人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="campus"
            label="所在校区"
            width="180">
          </el-table-column>
          <el-table-column
            prop="realAddress"
            label="详细地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column

            label="                操作"
            width="180">
            <template slot-scope="scope">
              <span class="oper-span" @click="deleteRow(scope.$index)">删除</span><span @click="dialogFormVisibleModify=true;rowNum=scope.$index" class="oper-span">修改</span>
            </template>
          </el-table-column>
          <el-table-column

            label="   "
            width="180">
            <template slot-scope="scope">
              <span class="oper-span" @click="scope">设为默认地址</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress">提 交</el-button>
      </div>
    </el-dialog>
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
   data() {
      return {
        tableRowClassName:'gege',
        options: [],
        data:{
          addressInfor:'旗山校区',
          addressDetail:'',
          name:'',
          phone:'',
          checked:false
        },
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form:{
          name:'',
          region:''
        },
        count:0,
        tableData:[],
        rowNum:0,
        dialogFormVisibleModify:false
      }
    },
    mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/address',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{

          //this.dialogFormVisible = false;
          //alert(this.$store.getters.getUserId);
          this.tableData= resp.data.data.addressList;
          this.count = resp.data.data.count;

        }).catch(function(error){
          alert(error.url);
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
      modify:function(index){
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
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            campus:this.form.addressInfor,
            id: this.$store.getters.getUserId,
            isDefault:this.form.checked?1:0,
            name:this.form.name,
            phone:this.form.phone,
            realAddress:this.form.addressDetail,
            number:this.tableData[this.rowNum].number
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
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            cnt:4,
            id:this.$store.getters.getUserId,
            page:1
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;

          alert(this.$store.getters.getUserId);
          this.tableData= resp.data.data.addressList;
          this.count = resp.data.data.count;

        }).catch(function(error){
          alert(error.url);
        })
        })

      },
      increase:function(){
        this.dialogFormVisible=true;
      },
      deleteRow:function(line){
        alert(this.tableData[line].number);
        this.$axios({
          method:'delete',
          url:'/api/address',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            id:this.$store.getters.getUserId,
            number:this.tableData[line].number
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          //alert(number);
          //alert(this.tableData);

          //this.tableData= resp.data.data.addressList;
          if(resp.data.code==-1){
            alert(1);
          }
          this.count -= 1;
          this.tableData.splice(line,1)
        })
      },
      submitAddress:function(){
        //alert(this.$store.getters.getUserId);
        //alert(this.$store.getters.getUserId);
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
          method:'post',
          url:'/api/address',
          headers:{
            token:this.$store.getters.getToken
          },
          params: {
            campus:this.form.addressInfor,
            id: this.$store.getters.getUserId,
            isDefault:this.form.checked?1:0,
            name:this.form.name,
            phone:this.form.phone,
            realAddress:this.form.addressDetail
          }
        }).then(resp=>{
          this.dialogFormVisible = false;

          alert(this.$store.getters.getUserId);
          this.$alert('地址已保存','提示',{
            confirmButtonText:'确定'
          });

        }).catch(function(error){
          alert(error.url);
        }).catch()
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
.address-content-title{
  position: relative;
  left:-420px;
  color: #aaa9a8;
}
.table-header span{
  float: left;
  margin-left:10px;
  font-size: 20px;
}
.table-header{
  position: relative;
  border:1px solid #c3c3c3;
  height:30px;
  width:1100px;
  top:180px;
  left:260px;
}
.address-line{
  position: relative;
  left:-380px;
  margin-bottom: 20px;
  width:1200px;
}
.address-line{
  position: relative;
  top:60px;
}
.table-content{
  position: relative;
  top:200px;
  left:260px;
  width:1100px;
  border: 1px solid #c3c3c3;
}
.address-content{
  position: relative;
  width:800px;
  height:200px;
  top:160px;
  left:260px;
}
.input{
  display: inline-block;
  width:200px;
  margin-right: 40px;
}
.goods-content{
  position: fixed;
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
  width:100px;
  left:50px;
  top:160px;
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
  border: 2px solid #c3c3c3;
  left:1050px;
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
.last-title{
  position: absolute;
  font-size: 30px;
  left:200px;
  top:25px;
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

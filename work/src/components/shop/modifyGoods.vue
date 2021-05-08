<template>
  <div class="content">
    <div class="content-header">
      <span id="title">
        <p class="first-line">二手网站</p>
        <p class="second-line">Secondhand</p>
      </span>
      <span class="shop-infor">
        <span class="infor-title">我的店铺</span>
        <span class="infor-content">
          <span>描述</span>
          <span>服务</span>
          <span>物流</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
          <span class="score">4.9</span>
        </span>
        <span class="infor-tips">
          <span>上传商品</span>
          <span>粉丝数：1234</span>
        </span>
      </span>
      <span class="search-goods">
        <span id="search-input-box">
          <input type="text">
          <span class="iconfont-go icon-gofangdajing icon-input"></span>
        </span>
          <span class="subimt-goods-name" type="warning">搜本店</span>
      </span>
    </div>
    <div class="from-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="asOn" label="标题:">
          <el-input class="decribe-title" v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input class="decribe-text" type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="标签1:">
          <el-input class="tip-input" v-model="form.label1"></el-input>
        </el-form-item>
        <el-form-item label="标签2:">
          <el-input class="tip-input" v-model="form.label2"></el-input>
        </el-form-item>
        <el-form-item label="标签3:">
          <el-input class="tip-input" v-model="form.label3"></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input class="price-input" v-model="form.price"><template slot="append">元</template></el-input>
        </el-form-item>

        <el-form-item label="转卖原因:">
          <el-input class="result-input" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="上传图片:">
         <el-upload class="usrPic-submit"
            action="/api/goodsPhoto"
            list-type="picture-card"
            name="photo"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-success="success"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Onsubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        form: {
          description : '',
          fromId: '',
          goodsName: '',
          label1: '',
          label2: '',
          label3: '',
          photo: '',
          price: '',
          reason:'',
        }
        ,imageUrl:'',
        disabled:false,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted:function(){
      this.$axios({
          method:'get',
          url:'/api/goodsWhenever',
          params: {
            number:this.$route.query.number
          }
        }).then(resp=>{
          //this.dialogFormVisible = false;
          let goods= resp.data.data.goods;
          this.form.description = goods.description;
          //this.form.formId=goods.number;
          this.form.goodsName=goods.goodsName;
          this.form.label1 = goods.label1;
          this.form.label2 = goods.label2;
          this.form.label3 = goods.label3;
          this.form.photo = goods.photo;
          this.form.price = goods.price;
          this.form.reason = goods.reason;
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
      onSubmit() {
        console.log('submit!');
      },
      handleRemove(file,fileList) {
        //this.formData.splice(i, 1)
        //fileList.splice(0,1);
        //this.form.photo=''
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        this.dialogVisible = false;
        this.dialogImageUrl = '';
        //file.url='';
      },
      success:function(response){
          this.form.photo=response.data.url;
      },
      Onsubmit:function(){
        //alert(this.dialogImageUrl);
        if(this.form.goodsName==''){
          this.$alert('请先输入标题','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.description==''){
          this.$alert('请先输入描述','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.price==''){
          this.$alert('请先输入价格','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        if(this.form.reason==''){
          this.$alert('请先输入原因','提示',{
            confirmButtonText:'确定'
          });
          return;
        }
        this.$axios({
          method:'patch',
          url:'/api/goods',
          params: {
            description: this.form.description,
            fromId:this.$store.getters.getUserId,
            number:this.$route.query.number,
            label1:this.form.label1,
            label2:this.form.label2,
            label3:this.form.label3,
            photo:this.form.photo,
            price:this.form.price,
            reason:this.form.reason
          }
        }).then(resp=>{
          if(resp.data.code==-1){
            alert(fromId);
          }
          this.$alert('修改成功','提示',{
            confirmButtonText:'确定'
          });
        }).catch(function(error){
          alert(error.url);
        })
      }
    }
}
</script>

<style scoped="scoped">

.usrPic-submit{
  float: left;
}
.decribe-title{
  width:400px;
  float: left;
}
.avatar-uploader{
  float: left;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.result-input{
  width:700px;
  float: left;
}
.price-input{
  width:180px;
  float: left;
}
.tip-input{
  width:100px;
  float: left;
}
.decribe-text textarea{
  width:700px;
  height:100px;
  resize: none;
}
.from-box{
  position: relative;
  top:140px;
  left:200px;
  width:1200px;
}
@font-face {
    font-family: HomeTxt ;
    src: url('../../assets/wwww.ttf');
}
.icon-input{
  position: relative;
  top:2px;
  transform: rotateZ(180deg);
}
.subimt-goods-name{
  display: inline-block;
  position: relative;
  background-color:#eec6aa ;
  border: none;
  height:32px;
  left:626px;
  font-size:15px;
  line-height: 32px;
  padding:2px;
}
.search-goods{
  position: absolute;
  left:700px;
  width:200px;
}
#search-input-box{
  display: inline-block;
  position: absolute;
  left:350px;
  border:2px solid #eec6aa;
  width:350px;
  height:32px;
}
#search-input-box input{

  border:none;
  outline:none;
  width:320px;
  height:30px;
}
.infor-tips{
  position:relative;
  left:140px;
  font-weight: 500;
  font-size: 20px;
}
.score{
  color: red;
}
.infor-content span{
  margin-top:10px;
  float: left;
  width:60px;
}
.infor-content{
  display: inline-block;
  margin-top:30px;
  margin-left:40px;
  position: relative;
  left:140px;
  width:190px;
}
.infor-title{
  position: absolute;
  top:40px;
}
.shop-infor{
  position: absolute;
  margin-left:80px;
  left:160px;
  top:-20px;
}
.infor-title{
  font-size: 30px;
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
  position: absolute;
  width:100%;
}
#title{
  position: absolute;
  margin-left:40px;
  left:0px;
  top:-20px;
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

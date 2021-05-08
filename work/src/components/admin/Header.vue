<template>
  <div class="box-card">
    <span class="pic-box"><img src="../../assets/admin/login.jpg" alt="44"></span>
    <router-view/>
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
}
</script>

<style>
  body{
    background-color: #f5f5fa;
  }
  .pic-box{
    position: relative;
    float: left;
    height:100%;
    width:400px;
    border-radius:3px 3px 3px 3px;
    overflow: hidden;
  }
  .pic-box>img{
    position: absolute;
    height:100%;
    left:-200px;
  }
  .box-card {
    position: absolute;
    top:230px;
    left: 500px;
    width: 900px;
    height:520px;
    background-color: white;
    border-radius:10px;
    box-shadow: 3px 3px  #eaeaef;
  }
</style>

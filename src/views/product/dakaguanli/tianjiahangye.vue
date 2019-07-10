<template>
  <div id="container">
    <div class="top">
      <span>添加</span>
      <router-link to="dakaluru">
        <span class="closs">[x]</span>
      </router-link>
    </div>
    <div class="content">
      <div class="content-print">
        <span>行业分类</span>
        <input type="text">
      </div>
    </div>
    <div class="build">
      <router-link to="dakaluru">
        <button>取消</button>
      </router-link>
      <button>创建</button>

    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  #container{
    width: 525px;
    height: 240px;
    border: 1px solid black;
  }
  .top{
    padding: 0 10px;
    font-size: 20px;
    color: black;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid black;
  }
  .closs{
    float: right;
    cursor: pointer;
  }
  .content{
    font-size: 17px;
    width: 470px;
    height: 130px;
    border: 1px solid gray;
    margin: 0 auto;
    margin-top: 10px;
  }
  .content-print{
    width: 300px;
    height: 25px;
    margin: 40px  auto;
  }
  .content-print input{
    margin-left: 10px;
  }
  .build{
    margin-left: 150px;
    margin-top: 20px;
  }
  .build button{
    font-size: 17px;
    width: 80px;
    margin-right: 50px;
  }
</style>

<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="tiwenguanli">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link to="">
        <button class="pan-btn light-blue-btn">保存录入</button>
      </router-link>
    </div>
    <br>
    <div>
      <span>问题ID :</span>
      <span>309</span>
    </div>
    <br>
    <br>
    <div>
      <span>问题详情 :</span>
      <span>这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题</span>
    </div>
    <br>
    <br>
    <div>
      <span style="margin-right:50px;">提问用户 :</span>
      <div class="userImg" style="margin-right:50px;">这是头像</div>
      <span style="margin-right:50px;">飞翔的可乐</span>
      <span>( ID:</span>
      <span>309</span>
      <span>)</span>
    </div>
    <br>
    <br>
    <div>
      <span style="margin-right:50px;">回答大咖 :</span>
      <div class="userImg" style="margin-right:50px;">这是头像</div>
      <span style="margin-right:50px;">张三</span>
      <span>( ID:</span>
      <span>1245322</span>
      <span>)</span>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>回答录入 :</span>
      <input type="file">
      <el-button type="mini">播放</el-button>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>回答时长 :</span>
      <span>45641</span>
      <span>（秒）</span>
    </div>
  </div>

</template>

<script>

</script>

<style lang="scss" scoped>
  *{
    font-size: 17px;
  }
  .userImg{
    display:inline-block;
    width:50px;
    height:50px;
    border:1px solid black;
  }
</style>

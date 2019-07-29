<template>
  <div>
    <div style="position:absolute; right:60px; top:15px">
      <router-link to="huidaguanli">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div>
      <span>问题ID :</span>
      <span>{{ this.$route.query.no }}</span>
    </div>
    <br>
    <br>
    <div>
      <span>问题详情 :</span>
      <span>{{ this.$route.query.question }}</span>
    </div>
    <br>
    <br>
    <div>
      <span style="margin-right:50px;">提问用户 :</span>
      <span style="margin-right:50px;">{{ this.$route.query.questionUserName }}</span>
      <span>( ID:</span>
      <span>{{ this.$route.query.questionUserNo }}</span>
      <span>)</span>
      <br>
      <br>
      <div>
        <span style="margin-right:50px;">回答大咖 :</span>
        <span style="margin-right:50px;">{{ this.$route.query.answerUserName }}</span>
        <span>( ID:</span>
        <span>{{ this.$route.query.answerUserNo }}</span>
        <span>)</span>
      </div>
      <br>
      <br>
      <audio :src="this.$route.query.fileUrl" controls="controls" />
      <br>
      <br>
      <!-- <div>
        <span style="color:red">*</span>
        <span>回答时长 :</span>
        <span>{{ this.$route.query.fileDuration }}</span>
        <span>（秒）</span>
      </div> -->
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
*{
  font-size:17px;
}
</style>

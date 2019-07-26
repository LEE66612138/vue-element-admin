<template>
  <div>
    <h1 style="color:black">问答管理</h1>
    <br>
    <div class="total" style="margin-left:50px">
      <div style="display:inline-block; margin-right:150px">
        <svg-icon class="problemPicture" icon-class="comment" />
        <span>今日提问：</span>
        <span>{{ todayQuestion }}</span>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <svg-icon class="problemPicture" icon-class="hourglass" />
        <span>急需处理问题：</span>
        <span>{{ urgentQuestion }}</span>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <svg-icon class="problemPicture" icon-class="question" />
        <span>当前待处理问题：</span>
        <span>{{ pendingQuestion }}</span>
      </div>
    </div>
    <br>
    <br>
    <br>
    <h2>待回答问题大咖</h2>
    <br>
    <br>
    <br>
    <ul>
      <li v-for="item in slist" :key="item.value" style="display:inline-block; float：left; margin-right:100px; margin-bottom:30px;">
        <img class="userPicture" :src="item.answerHeadImgUrl">
        <br>
        <span style="margin-left:40px">{{ item.answerUserName }}</span>
        <br>
        <br>
        <svg-icon class="smallPicture" icon-class="hourglass" />
        <span>待回答：</span>
        <span>{{ item.userSize }}</span>
      </li>
    </ul>
  </div></template>

<script>
export default {
  data() {
    return {
      pendingQuestion: '',
      todayQuestion: '',
      urgentQuestion: '',
      list: '',
      slist: '',
      isShow: ''
    }
  },
  created() {
    this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/question/getQuestionNum', {}).then(response => {
      this.pendingQuestion = response.data.data.pendingQuestion
      this.todayQuestion = response.data.data.todayQuestion
      this.urgentQuestion = response.data.data.urgentQuestion
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
    this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/question/getUserQuestion', {}).then(response => {
      this.slist = this.list = response.data.data
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
  }
}

</script>

<style lang="scss" scoped>
span, form{
  font-size: 17px;
}
.total *{
  display: inline-block;
  vertical-align: middle;
}
.problemPicture{
  display: inline-block;
  margin-right: 20px;
  width: 64px;
  height: 64px;
}
.smallPicture{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.userPicture{
  margin-right: 20px;
  width: 128px;
  height: 128px;
  border: 1px solid black;
}
</style>

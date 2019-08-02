<template>
  <div>
    <div style="float:right;margin-left:10px ">
      <router-link to="dakaliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <h1>大咖详情</h1>
    <div>
      <span>大咖创建时间 :</span>
      <span style="margin-right:300px">{{ timestampToTime(listQuery.createTime) }}</span>
      <span>录入人员 :</span>
      <span>{{ listQuery.createUserName }}</span>
    </div>
    <br>
    <div>
      <span>大咖上架时间 :</span>
      <span style="margin-right:300px">{{ timestampToTime(listQuery.putawayTime) }}</span>
      <span>上架人员 :</span>
      <span>{{ listQuery.putawayUserName }}</span>
    </div>
    <br>
    <br>
    <br>
    <br>
    <div>
      <span>大咖履历</span>
      <br>
      <br>
      <span>{{ listQuery.introduce }}</span>
    </div>
    <br>
    <br>
    <br>
    <br>
    <span>擅长回答问题</span>
    <br>
    <span>{{ listQuery.goodQuestion }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: ''
    }
  },
  created() {
    this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/queryByNo', { no: this.$route.query.no }).then(response => {
      this.listQuery = response.data.data
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
  },
  methods: {
    timestampToTime(row, column) {
      var date = new Date(row)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="scss" scoped>
span{
  font-size: 17px
}
</style>

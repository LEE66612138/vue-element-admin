<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="tiwenguanli">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <h1>婉拒理由</h1>
    <el-input
      v-model="listQuery.remarks"
      style="display:inline-block;width:400px"
      size="medium"
      type="textarea"
      placeholder="必须输入拒绝的理由，限制最少输入10个汉字"
    />
    <el-button @click="publish()">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        no: this.$route.query.no,
        remarks: this.$route.query.remarks
      }
    }
  },
  methods: {
    publish() {
      const obj = this.listQuery
      if (obj.remarks.length < 10) {
        this.$message.error('不可少于10字')
        return false
      }
      for (const p in obj) {
        if (obj[p] === '') {
          this.$message.error('请完整填写')
          return false
        }
      }
      this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/question/expertAnswer', this.listQuery).then(response => {
        if (response.data.code === 200) {
          alert('上传成功')
        } else {
          alert('上传失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// span{
//     font-size: 12px;
//   }
  form{
    font-size: 12px;
  }
</style>

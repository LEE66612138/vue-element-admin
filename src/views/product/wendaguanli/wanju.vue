<template>
  <div>
    <h1>婉拒理由</h1>
    <el-input
      v-model="listQuery.remarks"
      style="display:inline-block;width:400px"
      size="medium"
      type="textarea"
    />
    <el-button @click="publish()">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        no: this.$router.query.no,
        remarks: ''
      }
    }
  },
  methods: {
    publish() {
      const obj = this.listQuery
      if (this.listQuery.remarks.length < 15) {
        this.$message.error('不可少于15字')
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

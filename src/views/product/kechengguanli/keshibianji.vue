<template>
  <div>
    <div style="float:right;margin-left:10px ">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="float:right;margin-left:10px ">
      <button class="pan-btn light-blue-btn" @click="publish()">课时发布</button>
    </div>
    <div style="display：inline-block; float:left">
      <span style="color:red">*</span>
      <span>课时名称 :</span>
      <el-input
        v-model="listQuery.unitTitle"
        style="display:inline-block;width:400px"
        size="medium"
        placeholder="请输入内容(限制15个字)"
        maxlength="30"
      />
    </div>
    <div style="display：inline-block; float:left">
      <span>课时序列 :</span>
      <el-input
        v-model="listQuery.sortNum"
        style="display:inline-block;width:400px"
        size="medium"
      />
    </div>
    <div style="clear:both" />
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时时长 :</span>
      <el-input
        v-model="listQuery.duration"
        style="display:inline-block;width:200px"
        size="medium"
      />
      <span>秒</span>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时大小 :</span>
      <el-input
        v-model="listQuery.fileSize"
        style="display:inline-block;width:200px"
        size="medium"
      />
      <span>MB</span>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时上传 :</span>
      <el-upload
        action=""
        multiple
        :file-list="fileList"
        :on-change="changeFileUrl"
        :auto-upload="false"
        :limit="1"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div slot="tip" class="el-upload__tip">只能上传MP3或MP4文件</div>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时试听 :</span>
      <el-radio v-model="listQuery.isSample" :label="0">可试听</el-radio>
      <el-radio v-model="listQuery.isSample" :label="1">需付费</el-radio>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时文稿 :</span>
      <br>
      <markdown-editor v-model="listQuery.textInfo" />
    </div>
  </div></template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: { MarkdownEditor },
  data() {
    return {
      list: null,
      fileList: [],
      listQuery: {
        courseNo: this.$route.query.no,
        unitTitle: this.$route.query.unitTitle,
        sortNum: this.$route.query.sortNum,
        duration: this.$route.query.duration,
        fileSize: this.$route.query.fileSize,
        fileUrl: this.$route.query.fileUrl,
        isSample: this.$route.query.isSample,
        textInfo: this.$route.query.textInfo
      }
    }
  },
  methods: {
    publish() {
      const obj = this.listQuery
      for (const p in obj) {
        if (obj[p] === '') {
          this.$message.error('请完整填写')
          return false
        }
      }
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/editUnit', this.listQuery).then(response => {
        if (response.data.code === 200) {
          alert('上传成功')
        } else {
          alert('上传失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    changeFileUrl(file) {
      const that = this
      const isTrue = (file.raw.type === 'audio/mp4' || file.raw.type === 'video/mp4' || file.raw.type === 'audio/mpeg')

      if (!isTrue) {
        this.$message.error('上传只能是 MP3或MP4 格式!')
        this.fileList = []
        return false
      }
      var COS = require('cos-js-sdk-v5')

      // 初始化实例
      var cos = new COS({
        getAuthorization: function(options, callback) {
          // 异步获取临时密钥
          that.$axios.get(process.env.VUE_APP_BASE_API + '/api/v1/cos-upload/getTmpSign', {
            bucket: options.Bucket,
            region: options.Region
          }).then(data => {
            var credentials = data.data.data
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              ExpiredTime: credentials.expiredTime
            })
          })
        }
      })
      cos.putObject({
        Bucket: 'att-rtworld-1252783162',
        Region: 'ap-shanghai',
        Key: '/files/' + file.raw.name,
        Body: file.raw
      }, function(err, data) {
        if (err) {
          console.log(err)
        }
        that.listQuery.fileUrl = 'http://att.rtworld.com/files/' + file.raw.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

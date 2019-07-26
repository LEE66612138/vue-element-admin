<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="tiwenguanli">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <button class="pan-btn light-blue-btn" @click="publish()">保存录入</button>
    </div>
    <br>
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
      <img class="userImg" style="margin-right:50px;" :src="this.$route.query.questionHeadImgUrl">
      <span style="margin-right:50px;">{{ this.$route.query.questionUserName }}</span>
      <span>( ID:</span>
      <span>{{ this.$route.query.questionUserNo }}</span>
      <span>)</span>
      <br>
      <br>
      <div>
        <span style="margin-right:50px;">回答大咖 :</span>
        <img class="userImg" style="margin-right:50px;" :src="this.$route.query.answerHeadImgUrl">
        <span style="margin-right:50px;">{{ this.$route.query.answerUserName }}</span>
        <span>( ID:</span>
        <span>{{ this.$route.query.answerUserNo }}</span>
        <span>)</span>
      </div>
      <br>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>回答录入 :</span>
        <el-upload
          action=""
          :on-change="changeFileUrl"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传MP3文件</div>
        <el-button @click="doPlay">播放</el-button>
      </div>
      <br>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>回答时长 :</span>
        <el-input
          v-model="listQuery.fileDuration"
          style="display:inline-block;width:400px"
          size="medium"
          type="number"
        />
        <span>（秒）</span>
      </div>
    </div>

  </div></template>

<script>
export default {
  data() {
    return {
      fileList: [],
      audio: '',
      listQuery: {
        no: this.$route.query.no,
        fileUrl: '',
        fileDuration: '',
        answerUserNo: this.$route.query.answerUserNo
      }
    }
  },
  methods: {

    doPlay() {
      const audio = new Audio()
      audio.src = this.listQuery.fileUrl
      audio.play()
    },
    changeFileUrl(file) {
      const that = this
      const isTrue = (file.raw.type === 'audio/mp3')

      if (!isTrue) {
        this.$message.error('上传只能是 MP3格式!')
        this.fileList = []
        return false
      }
      var COS = require('cos-js-sdk-v5')

      // 初始化实例
      var cos = new COS({
        getAuthorization: function(options, callback) {
          // 异步获取临时密钥
          that.$axios.get(process.env.VUE_APP_BASE_API2 + '/api/v1/cos-upload/getTmpSign', {
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

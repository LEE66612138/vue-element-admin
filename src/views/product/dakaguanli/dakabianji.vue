<template>
  <div>
    <div>
      <div style="float:right;margin-left:10px ">
        <router-link to="dakaliebiao">
          <el-button class="pan-btn yellow-btn">返回列表</el-button>
        </router-link>
      </div>
      <div style="float:right;margin-left:10px ">
        <button class="pan-btn light-blue-btn" @click="publish()">保存录入</button>
      </div>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖昵称 :</span>
      <el-input
        v-model="listQuery.nickName"
        style="display:inline-block;width:400px"
        size="medium"
        placeholder="请输入内容(限制15个字)"
        maxlength="8"
      />
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖头像 :</span>
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-change="changeHeadImg"
        :auto-upload="false"
      >
        <img v-if="listQuery.headImgUrl" :src="listQuery.headImgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过32k</div>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖职位 :</span>
      <el-input
        v-model="listQuery.occupationName"
        style="display:inline-block;width:400px"
        size="medium"
        placeholder="请输入内容(限制15个字)"
        maxlength="15"
      />
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>视频简介 :</span>
      <el-upload
        action=""
        :on-change="changeVideoUrl"
        :auto-upload="false"
        :limit="1"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过10M</div>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖简介 :</span>
      <br>
      <el-input
        v-model="listQuery.introduce"
        type="textarea"
        :rows="3"
      />
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>擅长领域 :</span>
      <el-select
        v-model="listQuery.industryName"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择"
        @change="selectThree"
      >
        <el-option
          v-for="item in industryNameList"
          :key="item.categoryName"
          :label="item.categoryName"
          :value="item.categoryName"
        />
      </el-select>
      <el-input v-model="newIndustryName" size="small" style="display:inline-block;width:200px;margin-left:50px" />
      <el-button size="mini" @click="addNewTag">添加标签</el-button>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>擅长问题 :</span>
      <br>
      <el-input
        v-model="listQuery.goodQuestion"
        type="textarea"
        maxlength="1000"
        :rows="3"
        placeholder="请输入内容（1000字以内）"
      />
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      listQuery: {
        no: this.$route.query.no,
        nickName: this.$route.query.nickName,
        headImgUrl: this.$route.query.headImgUrl,
        occupationName: this.$route.query.occupationName,
        introduce: this.$route.query.introduce,
        videoUrl: this.$route.query.videoUrl,
        industryName: this.$route.query.industryName,
        goodQuestion: this.$route.query.goodQuestion,
        status: '0'
      },
      newIndustryName: '',
      industryNameList: '',
      list: null
    }
  },
  created() {
    this.getIndustryNameList()
  },
  methods: {
    getIndustryNameList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/lable/queryList', { categoryType: 5 }).then(response => {
        this.industryNameList = response.data.data
        console.log(this.industryNameList)
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    selectThree() {
      if (this.listQuery.industryName.length > 3) {
        this.$message.error('最多选择三个选项')
        this.listQuery.industryName.splice(-1, 1)
      }
    },
    changeHeadImg(file) {
      const that = this
      const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt1M = file.size / 1024 < 32

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 35k!')
        return false
      }
      this.headImgUrl = URL.createObjectURL(file.raw)
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
        that.listQuery.headImgUrl = 'http://att.rtworld.com/files/' + file.raw.name
      })
    },
    changeVideoUrl(file) {
      const that = this
      const isJPG = (file.raw.type === 'audio/mp4' || file.raw.type === 'video/mp4')
      const isLt1M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片只能是 MP4 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 10M!')
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
        that.listQuery.videoUrl = 'http://att.rtworld.com/files/' + file.raw.name
      })
    },
    publish() {
      const obj = this.listQuery
      console.log(this.listQuery.industryName)
      for (const p in obj) {
        if (obj[p] === '') {
          this.$message.error('请完整填写')
          console.log(this.listQuery)
          return false
        }
      }
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/editExpert', this.listQuery).then(response => {
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
    addNewTag() {
      if (this.newIndustryName === '') {
        this.$message.error('此处不能为空')
        return false
      }
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/lable/addLable', { labelName: this.newIndustryName, labelType: '4', sortNum: '1' }).then(response => {
        if (response.data.code === 200) {
          alert('上传成功')
        } else {
          alert('上传失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
      this.newIndustryName = ''
    }
  }
}
</script>

<style lang="scss" scoped>

  form, span, input{
    font-size: 17px;
  }
.avatar-uploader {
    border: 1px dashed #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    // border: 1px dashed #000000
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

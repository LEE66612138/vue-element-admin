<template>
  <div>
    <div style="float:right;margin-left:10px ">
      <el-button type="primary" @click="publish">课程发布</el-button>
    </div>
    <div style="float:right;margin-left:10px ">
      <router-link to="kechengliebiao">
        <el-button type="primary">返回列表</el-button>
      </router-link>
    </div>
    <form action="">
      <div>
        <span style="color:red">*</span>
        <span>课程名称 :</span>
        <el-input
          v-model="listQuery.courseTitle"
          style="display:inline-block;width:400px"
          size="medium"
          placeholder="请输入内容(限制15个字)"
          maxlength="15"
        />
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>所属大咖 :</span>
        <el-select v-model="listQuery.broadcaster" style="display:inline-block">
          <el-option v-for="item in broadcasterList" :key="item.no" :label="item.nickName" :value="item.nickName" />
        </el-select>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程简介 :</span>
        <br>
        <el-input
          v-model="listQuery.courseAbstract"
          type="textarea"
          maxlength="3000"
          :rows="3"
          placeholder="请输入内容（3000字以内）"
        />
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程类型 :</span>
        <template>
          <el-radio v-model="listQuery.courseType" label="1">音频</el-radio>
          <el-radio v-model="listQuery.courseType" label="2">视频</el-radio>
        </template>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程版块 :</span>
        <el-select v-model="listQuery.categoryName" style="display:inline-block">
          <el-option v-for="item in categoryNameList" :key="item.no" :label="item.categoryName" :value="item.categoryName" />
        </el-select>
        <el-input v-model="newCategoryName" size="small" style="display:inline-block;width:200px;margin-left:50px" />
        <el-button size="mini" @click="addNewTag">添加标签</el-button>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程价格 :</span>
        <el-radio v-model="listQuery.currencyType" label="0" @change="addPrice">公益</el-radio>
        <el-radio v-model="listQuery.currencyType" label="1" @change="addPrice">答币</el-radio>
        <el-radio v-model="listQuery.currencyType" label="2" @change="addPrice">答贝</el-radio>
        <input
          v-show="PriceIsShow"
          v-model="listQuery.price"
          type="number"
          style="display:inline-block;width:100px"
        >
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课时数量 :</span>
        <el-radio v-model="listQuery.publishType" label="0" @change="publishTypeChoice">无限制</el-radio>
        <el-radio v-model="listQuery.publishType" label="1" @change="publishTypeChoice">有限制</el-radio>
        <input
          v-show="publishTypeIsShow"
          v-model="listQuery.classTotalNum"
          style="display:inline-block;width:100px"
        >
      </div>
      <br>
      <div style="float:left">
        <span style="color:red">*</span>
        <span>封面大图 :</span>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-change="changeMainImg"
          :auto-upload="false"
        >
          <img v-if="listQuery.mainImgUrl" :src="listQuery.mainImgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
      </div>
      <div style="float:left;margin-left:200px">
        <span style="color:red">*</span>
        <span>课程播放图 :</span>
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
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
      </div>
    </form>

  </div>

</template>

<script>

// import cos from '@/utils/cos'
export default {
  data() {
    return {
      mainImgUrl: '',
      headImgUrl: '',
      broadcasterList: '',
      categoryNameList: '',
      newCategoryName: '',
      PriceIsShow: false,
      addTagIsShow: false,
      publishTypeIsShow: false,
      listQuery: {
        courseTitle: '',
        broadcaster: '',
        courseAbstract: '',
        courseType: '1',
        categoryName: '',
        currencyType: '0',
        price: '0',
        publishType: '0',
        classTotalNum: '无限制',
        mainImgUrl: '',
        headImgUrl: '',
        status: '0'
      }
    }
  },
  created() {
    this.getBroadcasterList()
    this.getCategoryNameList()
  },
  methods: {
    // selectCategoryName(vId) {
    //   let obj = {}
    //   obj = this.categoryNameList.find((item) => {
    //     return item.no === vId
    //   })
    //   this.listQuery.categoryName = obj.categoryName
    //   this.listQuery.categoryNo = obj.no
    // },
    // selectBroadcaster(vId) {
    //   let obj = {}
    //   obj = this.broadcasterList.find((item) => {
    //     return item.no === vId
    //   })
    //   this.listQuery.broadcaster = obj.nickName
    //   this.listQuery.expertNo = obj.no
    // },
    getBroadcasterList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/expertPage', {}).then(response => {
        this.broadcasterList = response.data.data
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    getCategoryNameList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/lable/queryList', { categoryType: 1 }).then(response => {
        this.categoryNameList = response.data.data
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    addPrice() {
      this.PriceIsShow = false
      if (this.listQuery.currencyType !== '0') {
        this.PriceIsShow = true
      }
    },
    addNewTag() {
      if (this.newCategoryName === '') {
        this.$message.error('此处不能为空')
        return false
      }
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/lable/addLable', { categoryType: 1, categoryName: this.newCategoryName, sortNum: 1 }).then(response => {
        if (response.data.code === 200) {
          this.$message.success('添加成功')
          this.getLabel()
        } else {
          this.$message.error('添加失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
      this.categoryNameList.push(this.newCategoryName)
      this.newCategoryName = ''
    },
    publishTypeChoice() {
      this.publishTypeIsShow = false
      if (this.listQuery.publishType !== '0') {
        this.publishTypeIsShow = true
        this.listQuery.classTotalNum = ''
      }
    },
    changeMainImg(file) {
      const that = this
      const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
        return false
      }
      this.mainImgUrl = URL.createObjectURL(file.raw)
      // this.listQuery.mainImgUrl = str.substring(5)
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
        that.listQuery.mainImgUrl = 'http://att.rtworld.com/files/' + file.raw.name
      })
    },
    changeHeadImg(file) {
      const that = this
      const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
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
    publish() {
      const obj = this.listQuery
      for (const p in obj) {
        if (obj[p] === '') {
          this.$message.error('请完整填写')
          return false
        }
      }
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/createCourse', this.listQuery).then(response => {
        alert('上传成功')
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    }
    // show() {
    //   console.log(this.listQuery)
    // },

  }
  // watch: {
  //   items: {
  //     handler: function() {
  //       const _this = this
  //       const _sum = 15 // 字体限制为100个
  //       _this.$refs.count.setAttribute('maxlength', _sum)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  *{
    font-size: 17px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #000000
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

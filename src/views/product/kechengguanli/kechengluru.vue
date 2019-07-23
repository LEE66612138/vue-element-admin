<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link to="">
        <button class="pan-btn light-blue-btn" @click="publish">课程发布</button>
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
          <el-option v-for="item in broadcasterList" :key="item" :label="item" :value="item" />
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
          <el-option v-for="item in categoryNameList" :key="item" :label="item" :value="item" />
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
          type="text"
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
          type="number"
          min="1"
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
          <img v-if="mainImgUrl" :src="mainImgUrl" class="avatar">
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
          <img v-if="headImgUrl" :src="headImgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>

      </div>
    </form>

  </div>

</template>

<script>
export default {
  data() {
    return {
      broadcasterList: this.$route.query.broadcasterList,
      categoryNameList: this.$route.query.categoryNameList,
      newCategoryName: '',
      PriceIsShow: false,
      addTagIsShow: false,
      publishTypeIsShow: false,
      mainImgUrl: '',
      headImgUrl: '',
      listQuery: {
        courseTitle: '',
        broadcaster: '',
        courseAbstract: '',
        courseType: '1',
        categoryName: '',
        currencyType: '0',
        price: '0',
        publishType: '0',
        classTotalNum: '0',
        mainImgUrl: '',
        headImgUrl: '',
        status: '0'
      }
    }
  },
  watch: {
    price: function() {
      var elValue = this.price
      var reg = /^(0|[1-9][0-9]{0,4})(\.([1-9]|[0-9][1-9]))?$/
      if (!elValue.match(reg)) {
        this.price = ''
        alert('请输入正确价格')
        return false
      } else {
        return true
      }
    }
  },
  methods: {
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
      this.categoryNameList.push(this.newCategoryName)
      this.newCategoryName = ''
    },
    publishTypeChoice() {
      this.publishTypeIsShow = false
      if (this.listQuery.publishType !== '0') {
        this.publishTypeIsShow = true
      }
    },
    changeMainImg(file) {
      // const that = this
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
      const str = this.mainImgUrl = URL.createObjectURL(file.raw)
      this.listQuery.mainImgUrl = str.substring(5)
      console.log(file.raw)
      console.log(str)
      console.log(this.listQuery.mainImgUrl)
      // const reader = new FileReader()
      // reader.readAsDataURL(file.raw)
      // reader.onload = function() {
      //   that.mainImgUrl = this.result
      //   that.listQuery.mainImgUrl = that.mainImgUrl
      //   console.log(that.mainImgUrl)
      // }
    },
    changeHeadImg(file) {
      // const that = this
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
      const str = this.headImgUrl = URL.createObjectURL(file.raw)
      this.listQuery.headImgUrl = str.substring(5)
      // const reader = new FileReader()
      // reader.readAsDataURL(file.raw)
      // reader.onloadend = function() {
      //   that.listQuery.headImgUrl = this.result
      // }
    },
    publish() {
      const obj = this.listQuery
      for (const p in obj) {
        if (obj[p] === '') {
          this.$message.error('请完整填写')
          return false
        }
      }
      this.$axios.post('http://192.168.2.51/api/man/v1/course/createCourse', this.listQuery).then(response => {
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

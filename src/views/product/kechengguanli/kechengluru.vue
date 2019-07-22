<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link to="">
        <button class="pan-btn light-blue-btn">课程发布</button>
      </router-link>
    </div>
    <form action="http://192.168.2.51/api/man/v1/course/createCourse">
      <div>
        <span style="color:red">*</span>
        <span>课程名称 :</span>
        <el-input
          v-model="courseTitle"
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
        <el-select v-model="broadcaster" style="display:inline-block">
          <el-option v-for="item in this.$route.query.broadcasterList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程简介 :</span>
        <br>
        <el-input
          v-model="courseAbstract"
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
          <el-radio v-model="courseType" label="1">音频</el-radio>
          <el-radio v-model="courseType" label="2">视频</el-radio>
        </template>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程版块 :</span>
        <el-select v-model="categoryName" style="display:inline-block">
          <el-option v-for="item in this.$route.query.categoryNameList" :key="item" :label="item" :value="item" />
        </el-select>
        <router-link to="xinbiaoqian">
          <el-button size="mini">添加标签</el-button>
        </router-link>
      </div>
      <br>
      <div>
        <span style="color:red">*</span>
        <span>课程价格 :</span>
        <el-radio v-model="currencyType" label="0" @change="focus">公益</el-radio>
        <el-radio v-model="currencyType" label="1" @change="focus">答币</el-radio>
        <el-radio v-model="currencyType" label="2" @change="focus">答贝</el-radio>
        <input
          v-show="isShow"
          v-model="price"
          type="text"
          style="display:inline-block;width:100px"
        >
      </div>
      <br>
      <div style="float:left">
        <span style="color:red">*</span>
        <span>封面大图 :</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="mainImgUrlSuccess"
          :before-upload="beforeAvatarUpload"
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
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="headImgUrlSuccess"
          :before-upload="beforeAvatarUpload"
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
      courseTitle: '',
      broadcaster: '',
      courseAbstract: '',
      courseType: '1',
      categoryName: '',
      currencyType: '0',
      price: '',
      isShow: false,
      mainImgUrl: '',
      headImgUrl: ''
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
    focus() {
      this.isShow = false
      if (this.currencyType !== '0') {
        this.isShow = true
      }
    },
    mainImgUrlSuccess(res, file) {
      this.mainImgUrl = URL.createObjectURL(file.raw)
      console.log(res, file)
    },
    headImgUrlSuccess(res, file) {
      this.headImgUrl = URL.createObjectURL(file.raw)
      console.log(res, file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === ('image/jpeg' || 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
    }
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

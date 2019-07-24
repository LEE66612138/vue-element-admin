<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link to="">
        <button class="pan-btn light-blue-btn">课时发布</button>
      </router-link>
    </div>
    <div style="display：inline-block; float:left">
      <span style="color:red">*</span>
      <span>课时名称 :</span>
      <el-input
        v-model="listQuery.courseTitle"
        style="display:inline-block;width:400px"
        size="medium"
        placeholder="请输入内容(限制15个字)"
        maxlength="30"
      />
    </div>
    <div style="display：inline-block; float:left">
      <span>课时序列 :</span>
      <el-input
        v-model="listQuery.courseTitle"
        style="display:inline-block;width:400px"
        size="medium"
        placeholder="请输入内容(限制15个字)"
        maxlength="30"
      />
    </div>
    <div style="clear:both" />
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时时长 :</span>
      <input type="text">
      <span>秒</span>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时大小 :</span>
      <input type="text">
      <span>MB</span>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时上传 :</span>
      <input type="file">
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时试听 :</span>
      <input type="radio" name="class-audition" checked="checked">可试听
      <input type="radio" name="class-audition">需付费
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课时文稿 :</span>
      <br>
      <textarea cols="100" rows="20" />
    </div>
  </div></template>

<script>
export default {
  data() {
    return {
      list: null,
      listQuery: {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    font-size: 17px;
  }
</style>

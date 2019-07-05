<template>
  <div>
    <div>
      <span style="color:red">*</span>
      <span>课程名称 :</span>
      <input type="text">
      <span>（限制15个字）</span>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>所属大咖 :</span>
      <form style="display:inline-block">
        <select name="">
          <option value="fenglun">冯仑</option>
          <option value="rongtoushijie">融投世界</option>
          <option value="zhangsan">张三</option>
          <option value="lisi">李四</option>
        </select>
      </form>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课程简介 :</span>
      <textarea id="" name="" cols="50" rows="5" />
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课程类型 :</span>
      <input type="radio" checked="checked" name="course-type">音频
      <input type="radio" name="course-type">视频
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课程版块 :</span>
      <form style="display:inline-block">
        <select name="">
          <option value="jinrong">金融</option>
          <option value="jisuanji">计算机</option>
          <option value="shuxue">数学</option>
          <option value="wenxue">文学</option>
        </select>
      </form>
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课程价格 :</span>
      <input type="text" value="公益">
      <input type="radio" name="price" checked="checked">公益
      <input type="radio" name="price">答币
      <input type="radio" name="price">答贝
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>封面大图 :</span>
      <input type="file" accept="image">
    </div>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>课程播放图 :</span>
      <input type="file" accept="image">

    </div>
  </div>

</template>

<script>

</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <h1 style="color:black">问答管理</h1>
    <br>
    <div class="total" style="margin-left:50px">
      <div style="display:inline-block; margin-right:150px">
        <div class="problemPicture">这是图片</div>
        <span>今日提问：</span>
        <span>788</span>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <div class="problemPicture">这是图片</div>
        <span>急需处理问题：</span>
        <span>188</span>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <div class="problemPicture">这是图片</div>
        <span>当前待处理问题：</span>
        <span>1788</span>
      </div>
    </div>
    <br>
    <br>
    <br>
    <h2>待回答问题大咖</h2>
    <br>
    <br>
    <br>
    <ul>
      <li v-for="item in items" :key="item.name" style="display:inline-block; float：left; margin-right:100px; margin-bottom:30px;">
        <div class="userPicture">{{ item.picture }}</div>
        <span>图标</span>
        <span>{{ item.name }}</span>
        <br>
        <span>待回答：</span>
        <span>{{ item.number }}</span>
      </li>
    </ul>
  </div></template>

<script>
export default {
  data() {
    return {
      items: [
        {
          picture: '',
          name: '张三',
          number: '25'
        },
        {
          picture: '',
          name: '李四',
          number: '1825'
        },
        {
          picture: '',
          name: '张三1',
          number: '25'
        },
        {
          picture: '',
          name: '李四1',
          number: '1825'
        },
        {
          picture: '',
          name: '张三2',
          number: '25'
        },
        {
          picture: '',
          name: '李四2',
          number: '1825'
        },
        {
          picture: '',
          name: '张三3',
          number: '25'
        },
        {
          picture: '',
          name: '李四3',
          number: '1825'
        }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>
span, form{
  font-size: 17px;
}
.total *{
  display: inline-block;
  vertical-align: middle;
}
.problemPicture{
  display: inline-block;
  margin-right: 20px;
  width: 64px;
  height: 64px;
  border: 1px solid black;
}
.userPicture{
  margin-right: 20px;
  width: 128px;
  height: 128px;
  border: 1px solid black;
}
</style>

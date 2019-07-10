<template>
  <div>
    <div>
      <div style="position:absolute; right:160px; top:15px">
        <router-link to="dakaliebiao">
          <el-button class="pan-btn yellow-btn">返回列表</el-button>
        </router-link>
      </div>
      <div style="position:absolute; right:10px; top:15px">
        <router-link to="">
          <button class="pan-btn light-blue-btn">保存录入</button>
        </router-link>
      </div>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖昵称 :</span>
      <input type="text">
      <span>（限制8个字）</span>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖头像 :</span>
      <input type="file">
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖职位 :</span>
      <input type="text">
      <span>（限制15个字）</span>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>视频简介 :</span>
      <input type="file">
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>大咖简介 :</span>
      <br>
      <textarea rows="10" cols="70" />
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>擅长领域 :</span>
      <el-drag-select v-model="value" style="width:500px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-drag-select>
      <router-link to="tianjiahangye">
        <el-button size="mini" style="margin-left:10px">添加行业</el-button>
      </router-link>
      <span>不超过3个</span>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>擅长问题 :</span>
      <br>
      <textarea rows="10" cols="70" />
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>回答价格 :</span>
      <input type="text">
      <span>答贝</span>
    </div>
    <br>
    <br>
    <div>
      <span style="color:red">*</span>
      <span>聆听价格 :</span>
      <form style="display:inline-block;width:199px">
        <select name="" style="width:199px">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
      <span>答贝</span>
    </div>
  </div>

</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: ['Apple', 'Banana', 'Orange'],
      options: [{
        value: 'Apple',
        label: 'Apple'
      }, {
        value: 'Banana',
        label: 'Banana'
      }, {
        value: 'Orange',
        label: 'Orange'
      }, {
        value: 'Pear',
        label: 'Pear'
      }, {
        value: 'Strawberry',
        label: 'Strawberry'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

  form, span, input{
    font-size: 17px;
  }

</style>

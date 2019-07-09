<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link to="xinzengkeshi">
        <button class="pan-btn light-blue-btn">新增课时</button>
      </router-link>
    </div>
    <div id="up">
      <img src="../../../assets/logo/logo.png" alt="">
      <div>高等数学</div>
      <div>ID：1</div>
      <div>总课时：12/15</div>
      <div>发布类型：完整发布</div>
    </div>
    <div>
      <el-table
        :data="list"
      >
        <el-table-column type="selection" width="45px" />
        <el-table-column label="序号" prop="id" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时排序" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时名称" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时时长" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.classTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试听" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.audition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <router-link to="">编辑</router-link>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        id: '1',
        order: '1',
        title: '高等数学1',
        classTime: '06:30',
        address: 'dfghjkrtyujfghjfghj',
        audition: '可试听'
      },
      {
        id: '2',
        order: '2',
        title: '高等数学2',
        classTime: '06:39',
        address: 'dfghjkrtyujfghjfghk',
        audition: '需付费'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#up *{
    // border:1px solid red;
    // width: 1100px;
    // height: 64px;
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
}
#up div{
    margin-left: 20px;
}
</style>

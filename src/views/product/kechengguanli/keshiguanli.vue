<template>
  <div>
    <div style="position:absolute; right:160px; top:15px">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="position:absolute; right:10px; top:15px">
      <router-link :to="({path:'xinzengkeshi',query:{listLength:listLength,no:no}})">
        <button class="pan-btn light-blue-btn">新增课时</button>
      </router-link>
    </div>
    <div id="up" style="margin: 10px 20px">
      <template>
        <img :src="this.$route.query.mainImgUrl" alt="" style="width:110px;height:66px">
      </template>
      <div> <h1>{{ this.$route.query.courseTitle }}</h1></div>
      <div>
        <span>ID :</span>
        <span>{{ this.$route.query.no }}</span>
      </div>
      <div>
        <span>总课时 :</span>
        <span>{{ this.$route.query.classUpdateNum + '/' + this.$route.query.classTotalNum }}</span>
      </div>
      <div>
        <span>发布类型 :</span>
        <span>{{ this.$route.query.classUpdateNum/this.$route.query.classTotalNum == 1?'已完结':'连载中' }}</span>
      </div>
    </div>
    <div>
      <el-table
        :data="slist"
      >
        <el-table-column type="selection" width="45px" />
        <el-table-column label="序号" prop="id" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时排序" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.sortNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时名称" align="center" width="250" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.unitTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时时长" align="center" width="200px">
          <template slot-scope="scope">
            <span>{{ timeStamp(scope.row.duration) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试听" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.isSample == 0?'需付费':'可试听' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" color="blue">
          <template slot-scope="scope">
            <router-link :to="{path: 'keshibianji', query:scope.row}">编辑</router-link>
          </template>
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: null,
      slist: null,
      no: '',
      listLength: ''

    }
  },
  created() {
    this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/course/queryCourseUnitList', { no: this.$route.query.no }).then(response => {
      this.slist = this.list = response.data.data
      this.no = this.$route.query.no
      this.listLength = this.list.length
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
  },
  methods: {
    timeStamp(second_time) {
      var time = parseInt(second_time) + '秒'
      if (parseInt(second_time) > 60) {
        var second = parseInt(second_time) % 60
        var min = parseInt(second_time / 60)
        time = min + '分' + second + '秒'
        if (min > 60) {
          min = parseInt(second_time / 60) % 60
          var hour = parseInt(parseInt(second_time / 60) / 60)
          time = hour + '小时' + min + '分' + second + '秒'
          if (hour > 24) {
            hour = parseInt(parseInt(second_time / 60) / 60) % 24
            var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24)
            time = day + '天' + hour + '小时' + min + '分' + second + '秒'
          }
        }
      }
      return time
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

<template>
  <div>
    <div style="float:right;margin-left:10px ">
      <router-link to="kechengliebiao">
        <el-button class="pan-btn yellow-btn">返回列表</el-button>
      </router-link>
    </div>
    <div style="float:right;margin-left:10px ">
      <router-link :to="({path:'xinzengkeshi',query:{total:total,no:no}})">
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
        :data="list"
        border
      >
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
        <el-table-column label="操作" align="center" width="200" color="blue">
          <template slot-scope="scope">
            <router-link :to="{path: 'keshibianji', query:scope.row}">
              <el-button type="primary">编辑</el-button>
            </router-link>
            <el-button type="danger" @click="handleDelete(scope.row.no)">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList()" />

    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      slist: null,
      no: '',
      total: 0,
      courseTitle: '',
      listQuery: {
        page: 1,
        pageSize: 10
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/queryCourseUnitList', { no: this.$route.query.no }).then(response => {
        this.list = response.data.data
        this.total = response.data.pagination.total
        this.no = this.$route.query.no
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
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
    },
    handleDelete(no) {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/delUnit', { no: no }).then(response => {
        if (response.data.code === 200) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.success('删除失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
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

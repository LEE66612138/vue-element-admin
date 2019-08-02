<template>
  <div>
    <h1 style="color:black">课程管理</h1>
    <br>
    <div style="margin-left:50px">
      <div style="display:inline-block; margin-right:50px">
        <span>上架人员</span>
        <el-select v-model="listQuery.putawayUserNo" style="display:inline-block" @change="handleFilter()">
          <el-option v-for="item in putawayUserNameList" :key="item.no" :label="item.nickName" :value="item.no" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:50px">
        <span>所属大咖 :</span>
        <el-select v-model="listQuery.expertNo" style="display:inline-block" @change="handleFilter()">
          <el-option v-for="item in broadcasterList" :key="item.no" :label="item.nickName" :value="item.no" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:50px">
        <span>课程版块 :</span>
        <el-select v-model="listQuery.courseTitle" style="display:inline-block" @change="handleFilter()">
          <el-option v-for="item in categoryNameList" :key="item.categoryName" :label="item.categoryName" :value="item.categoryName" />
        </el-select>
      </div>
      <div style="float:right; margin-right:10px">
        <router-link :to="{path: 'kechengluru', query:{broadcasterList:broadcasterList,categoryNameList:categoryNameList}}">
          <el-button type="primary" align="center">
            课程录入
          </el-button>
        </router-link>
      </div>
      <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="resetAll()">全部重置</el-button>
      </div>
    </div>
    <br>
    <br>
    <div>
      <div>
        <el-table
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          :data="list"
          style="width: 100%;"
        >
          <el-table-column label="ID" prop="id" align="center" width="50px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.no }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.courseTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column label="封面" align="center" width="170px">
            <template slot-scope="scope">
              <img :src="scope.row.mainImgUrl" alt="" style="width:150px;height:90px">
            </template>
          </el-table-column>
          <el-table-column label="课程类型" align="center" width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.courseType == '1'?'音频':'视频' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总课时" align="center" width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.classUpdateNum + '/' + scope.row.classTotalNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属大咖" width="80px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.broadcaster }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程板块" align="center" width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布类型" align="center" width="100px">
            <template slot-scope="scope">
              <el-tag :type="scope.row.classUpdateNum/scope.row.classTotalNum | publishFilter">
                {{ scope.row.classUpdateNum/scope.row.classTotalNum == '1'?'已完结':'连载中' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" class-name="status-col" align="center" width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">
                {{ scope.row.status == '0'?'未上架':'已上架' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上架时间" align="center" width="110">
            <template slot-scope="scope">
              <span>{{ timestampToTime(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上架人员" width="110px" align="center">
            <template slot-scope="scope">
              <span style="color:red;">{{ scope.row.putawayUserName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <router-link :to="{path: 'kechengbianji', query:scope.row}">
                <el-button type="primary" align="center" style="margin-bottom:5px">
                  课程编辑
                </el-button>
              </router-link>
              <router-link :to="{path: 'keshiguanli', query:scope.row}">
                <el-button type="primary" align="center" style="margin-bottom:5px">
                  课时管理
                </el-button>
              </router-link>
              <el-button v-if="scope.row.status!=1" type="success" align="center" @click="handleModifyStatus(scope.row,'1')">
                上架
              </el-button>
              <el-button v-if="scope.row.status!=0" align="center" @click="handleModifyStatus(scope.row,'0')">
                下架
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/kechengliebiao'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      if (status !== 0) {
        status = 1
      }
      const statusMap = {
        0: 'info',
        1: 'success'
      }
      return statusMap[status]
    },
    publishFilter(status) {
      if (status !== 1) {
        status = 0
      }
      const statusMap = {
        0: 'info',
        1: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      putawayUserNameList: null,
      broadcasterList: null,
      categoryNameList: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 20,
        putawayUserNo: '',
        expertNo: '',
        courseTitle: ''
      }
    }
  },

  created() {
    this.getList()
    this.getPutawayUserNameList()
    this.getBroadcasterList()
    this.getCategoryNameList()
  },

  methods: {
    getList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/coursePage', this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.pagination.total
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    getPutawayUserNameList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/basic/manager/managerList', {}).then(response => {
        this.putawayUserNameList = response.data.data
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    timestampToTime(row, column) {
      var date = new Date(row.putawayTime)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    handleModifyStatus(row, status) {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/course/putawayCourse', { no: row.no }).then(response => {
        if (response.data.code === 200) {
          row.status = status
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    resetAll() {
      this.listQuery.page = 1
      this.listQuery.putawayUserNo = ''
      this.listQuery.expertNo = ''
      this.listQuery.courseTitle = ''
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

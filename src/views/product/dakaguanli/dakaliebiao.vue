<template>
  <div>
    <h1 style="color:black">大咖管理</h1>
    <div style="float:right;margin-right:10px">
      <router-link :to="{path: 'dakaluru', query:{industryNameList:industryNameList}}">
        <el-button type="primary">大咖录入</el-button>
      </router-link>
    </div>
    <div style="float:right;margin-right:10px">
      <el-button type="primary" @click="resetAll()">全部重置</el-button>
    </div>
    <br>
    <div style="display:inline-block; margin-right:150px">
      <span>上架人员</span>
      <el-select v-model="listQuery.putawayUserNo" style="display:inline-block" @change="handleFilter()">
        <el-option v-for="item in putawayUserNameList" :key="item.no" :label="item.nickName" :value="item.no" />
      </el-select>
    </div>

    <br>
    <br>
    <br>
    <div class="dakaliebiao">
      <el-table
        :data="list"
        border
      >
        <el-table-column label="ID" prop="id" align="center" width="50px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" align="center" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.headImgUrl" alt="" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center" width="80px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.occupationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="擅长领域" align="center" width="100px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.industryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已回答" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.answerNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未回答" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.attentionNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程数" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.dataLimit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center" width="70">
          <template slot-scope="scope">
            {{ scope.row.fansNum }}
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">
              {{ scope.row.status == '0'?'未上架':'已上架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="上架时间" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架人员" width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.putawayUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link :to="{path: 'dakabianji', query:scope.row}">
              <el-button type="primary" align="center" style="margin-bottom:5px">
                大咖编辑
              </el-button>
            </router-link>
            <router-link :to="{path: 'dakaxiangqing', query:scope.row}">
              <el-button type="primary" align="center" style="margin-bottom:5px">
                大咖详情
              </el-button>
            </router-link>
            <el-button v-if="scope.row.status!='1'" type="success" align="center" @click="handleModifyStatus(scope.row,'1')">
              上架
            </el-button>
            <el-button v-if="scope.row.status!='0'" align="center" @click="handleModifyStatus(scope.row,'0')">
              下架
            </el-button>
            <el-button type="danger" align="center" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList()" />
    </div>
  </div></template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      if (status < 1) {
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
      putawayUserNameList: '',
      industryNameList: '',
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10,
        putawayUserNo: null
      }
    }
  },
  created() {
    this.getList()
    this.getPutawayUserNameList()
  },
  methods: {
    getList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/expertPage', this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.pagination.total
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
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/putawayExpert', { no: row.no }).then(response => {
        if (response.data.code === 200) {
          row.status = status
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    handleDelete(row) {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/expert/delExpert', { no: row.no }).then(response => {
        if (response.data.code === 200) {
          row.status = status
          this.$message({
            message: '操作Success',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    resetAll() {
      this.listQuery.page = 1
      this.listQuery.putawayUserNo = null
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

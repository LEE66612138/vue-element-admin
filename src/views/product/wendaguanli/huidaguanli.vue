<template>
  <div>
    <h1 style="color:black">回答管理</h1>
    <br>
    <div style="display:inline-block; margin-right:150px">
      <span>大咖 :</span>
      <el-select v-model="listQuery.answerUserNo" style="display:inline-block" @change="handleFilter()">
        <el-option v-for="item in broadcasterList" :key="item.no" :label="item.nickName" :value="item.no" />
      </el-select>
    </div>
    <div style="float:right;margin-right:10px">
      <el-button type="primary" @click="resetAll()">全部重置</el-button>
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
        <el-table-column label="用户昵称" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.questionUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" align="center" width="80px">
          <template slot-scope="scope">
            <img :src="scope.row.questionHeadImgUrl" alt="" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column label="问题详情" align="center" width="100px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.question }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答大咖" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.answerUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提问日期" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row.questionTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答倒计时" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ toTime(scope.row.countDown) }}</span>
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
            <span>{{ timestampToTime(scope.row.putawayTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架人员" width="80px" align="center">
          <template slot-scope="scope">
            <span style="color:red;">{{ scope.row.putawayUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link :to="{path: 'huidaxiangqing', query:scope.row}">
              <el-button type="primary" align="center" @click="open(scope.row.isShow)">
                详情
              </el-button>
            </router-link>
            <el-button v-if="scope.row.status!='1'" type="success" align="center" @click="handleModifyStatus(scope.row,'1')">
              上架
            </el-button>
            <el-button v-if="scope.row.status!='0'" align="center" @click="handleModifyStatus(scope.row,'0')">
              下架
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
      slist: [],
      total: 0,
      broadcasterList: null,
      listQuery: {
        page: 1,
        pageSize: 20,
        answerUserNo: null
      }
    }
  },
  created() {
    this.getList()
    this.getBroadcasterList()
  },
  methods: {
    getList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/question/userAnswer', this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.pagination.total
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // select(p) {
    //   const newArr = []
    //   for (var i = 0; i < this.slist.length; i++) {
    //     if (newArr.indexOf(this.slist[i][p]) === -1) {
    //       newArr.push(this.slist[i][p])
    //     }
    //   }
    //   return newArr
    // },
    // selectOne(p, l) {
    //   const newArr = []
    //   for (var i = 0; i < this.slist.length; i++) {
    //     if (this.slist[i][p] === this[p]) {
    //       newArr.push(this.slist[i])
    //     }
    //   }
    //   this.slist = newArr
    //   this.answerUserNameList = this.select('answerUserName')
    //   this.isInvalidList = this.select('isInvalid')
    // },
    timestampToTime(row, column) {
      var date = new Date(row)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    toTime(time) {
      if (time < 0) {
        return 0
      }
      const days = Math.floor(time / (1000 * 60 * 60 * 24))
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.round((time % (1000 * 60)) / 1000)
      return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
    },
    selectStatus(p) {
      if (p === 0) {
        return '待回答'
      } else if (p === 1) {
        return '已过期'
      } else {
        return '已婉拒'
      }
    },
    resetAll() {
      this.listQuery.page = 1
      this.listQuery.answerUserNo = null
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/question/putawayAnswer', { no: row.no }).then(response => {
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
    close(row) {
      console.log(typeof (row))
      row = false
    },
    open(row) {
      console.log(typeof (row))
      row = true
    }
  }
}
</script>

<style lang="scss" scoped>
// span{
//     font-size: 12px;
//   }
  form{
    font-size: 12px;
  }
  .audioStyle{
    margin-right: 0;
    position:absolute;
    right:0;
    top: 0;
    background:white;

  // float: right;
    margin-right: 10px
  }
</style>

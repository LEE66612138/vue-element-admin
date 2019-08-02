<template>
  <div>
    <h1 style="color:black">提问管理</h1>
    <br>
    <div style="display:inline-block; margin-right:150px">
      <span>大咖 :</span>
      <el-select v-model="listQuery.answerUserNo" style="display:inline-block" @change="handleFilter()">
        <el-option v-for="item in broadcasterList" :key="item.no" :label="item.nickName" :value="item.no" />
      </el-select>
    </div>
    <div style="display:inline-block;margin-left:50px">
      <span>问题状态:</span>
      <el-select v-model="listQuery.isInvalid" style="display:inline-block" @change="handleFilter()">
        <el-option v-for="item in isInvalidList" :key="item.value" :label="item.label" :value="item.value" />
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
      >
        <el-table-column label="ID" prop="id" align="center" width="50px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.questionUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" align="center" min-width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.questionHeadImgUrl" alt="" style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column label="问题详情" align="center" min-width="100px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.question }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答大咖" align="center" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.answerUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提问日期" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答倒计时" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ toTime(scope.row.countDown) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" align="center" width="100">
          <template slot-scope="scope">
            {{ selectStatus(scope.row.isInvalid) }}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="备注" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link :to="{path: 'wendaluru', query:scope.row}">
              <el-button type="primary" align="center">
                问答录入
              </el-button>
            </router-link>
            <router-link :to="{path: 'wanju', query:scope.row}">
              <el-button type="primary" align="center">
                婉拒
              </el-button>
            </router-link>
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
  data() {
    return {
      list: null,
      isInvalidList: [
        {
          value: 0,
          label: '待回答'
        },
        {
          value: 1,
          label: '已失效'
        },
        {
          value: 2,
          label: '婉拒'
        }
      ],
      broadcasterList: null,
      total: 0,
      listQuery: {
        page: 1,
        pageSize: 10,
        answerUserNo: null,
        isInvalid: ''
      }
    }
  },
  created() {
    this.getList()
    this.getBroadcasterList()
  },
  methods: {
    getList() {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/question/userQuestion', this.listQuery).then(response => {
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
    timestampToTime(row, column) {
      var date = new Date(row.questionTime)
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
      this.listQuery.isInvalid = null
      this.getList()
    },
    refuse(row, isInvalid) {
      this.$axios.post(process.env.VUE_APP_BASE_API + '/api/man/v1/question/declineAnswer', { no: row.no }).then(response => {
        row.isInvalid = isInvalid
        if (response.data.code === 200) {
          alert('上传成功')
        } else {
          alert('上传失败')
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
</style>

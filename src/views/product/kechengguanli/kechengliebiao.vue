<template>
  <div>
    <h1 style="color:black">课程管理</h1>
    <br>
    <div ref="selectContainer" style="margin-left:50px">
      <div style="display:inline-block; margin-right:150px">
        <span>上架人员</span>
        <el-select v-model="putawayUserName" style="display:inline-block" @change="selectOne('putawayUserName','putawayUserNameList')">
          <el-option v-for="item in putawayUserNameList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>所属大咖</span>
        <el-select v-model="broadcaster" style="display:inline-block" @change="selectOne('broadcaster','broadcasterList')">
          <el-option v-for="item in broadcasterList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>课程版块</span>
        <el-select v-model="categoryName" style="display:inline-block" @change="selectOne('categoryName','categoryNameList')">
          <el-option v-for="item in categoryNameList" :key="item" :label="item" :value="item" />
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
      <div class="kechengliebiao">
        <el-table
          v-loading="listLoading"
          :data="slist"
        >
          <el-table-column type="selection" width="45px" />
          <el-table-column label="ID" prop="id" align="center" width="50px" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.no }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.courseTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column label="封面" align="center" min-width="150px">
            <template slot-scope="scope">
              <img :src="scope.row.mainImgUrl" alt="" style="width:150px;height:90px">
            </template>
          </el-table-column>
          <el-table-column label="课程类型" align="center" min-width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.courseType == '1'?'音频':'视频' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总课时" align="center" min-width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.classUpdateNum + '/' + scope.row.classTotalNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属大咖" width="110px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.broadcaster }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程板块" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布类型" align="center" min-width="150px">
            <template slot-scope="scope">
              <el-tag :type="scope.row.classUpdateNum/scope.row.classTotalNum | statusFilter">
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
              <el-button v-if="scope.row.status!='1'" type="success" align="center" @click="handleModifyStatus(scope.row,'1')">
                上架
              </el-button>
              <el-button v-if="scope.row.status!='0'" align="center" @click="handleModifyStatus(scope.row,'0')">
                下架
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/kechengliebiao'

export default {
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
      putawayUserName: '',
      broadcaster: '',
      categoryName: '',
      list: null,
      slist: null,
      putawayUserNameList: null,
      broadcasterList: null,
      categoryNameList: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 40
      }
    }
  },
  created() {
    this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/course/coursePage', this.listQuery).then(response => {
      this.slist = this.list = response.data.data
      this.putawayUserNameList = this.select('putawayUserName')
      this.broadcasterList = this.select('broadcaster')
      this.categoryNameList = this.select('categoryName')
      this.listLoading = false
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
  },
  methods: {
    select(p) {
      const newArr = []
      for (var i = 0; i < this.slist.length; i++) {
        if (newArr.indexOf(this.slist[i][p]) === -1) {
          newArr.push(this.slist[i][p])
        }
      }
      return newArr
    },
    selectOne(p, l) {
      const newArr = []
      for (var i = 0; i < this.slist.length; i++) {
        if (this.slist[i][p] === this[p]) {
          newArr.push(this.slist[i])
        }
      }
      this.slist = newArr
      this.putawayUserNameList = this.select('putawayUserName')
      this.broadcasterList = this.select('broadcaster')
      this.categoryNameList = this.select('categoryName')
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
      this.$axios.post(process.env.VUE_APP_BASE_API2 + '/api/man/v1/course/putawayCourse', { no: row.no }).then(response => {
        console.log(response.data.code)
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
      this.slist = this.list
      this.putawayUserNameList = this.select('putawayUserName')
      this.broadcasterList = this.select('broadcaster')
      this.categoryNameList = this.select('categoryName')
      this.putawayUserName = ''
      this.broadcaster = ''
      this.categoryName = ''
    }
    // show() {
    //   console.log(this.broadcasterList)
    // }
  // created() {
  //   this.getList()
  // },
  // methods: {
  //   getList() {
  //     fetchList(this.listQuery).then(response => {
  //       console.log(response.data + '1')
  //     }).catch(response => {
  //       console.log(response.data + '2')
  //     })
  //   }
  // }
  }
}
</script>

<style lang="scss" scoped>
  span{
    font-size: 17px;
  }
  form{
    font-size: 17px;
  }
</style>

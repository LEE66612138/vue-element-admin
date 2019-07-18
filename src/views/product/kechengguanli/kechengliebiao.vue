<template>
  <div>
    <h1 style="color:black">课程管理</h1>
    <br>
    <div style="margin-left:50px">
      <div style="display:inline-block; margin-right:150px">
        <span>上架人员</span>
        <el-select v-model="putawayUserName" style="display:inline-block">
          <el-option v-for="item in putawayUserNameList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>所属大咖</span>
        <el-select v-model="broadcaster" style="display:inline-block" @change="selectOne('broadcaster')">
          <el-option v-for="item in broadcasterList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>课程版块</span>
        <el-select v-model="categoryName" style="display:inline-block">
          <el-option v-for="item in categoryNameList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div style="float:right;">
        <el-button class="pan-btn light-blue-btn">全部重置</el-button>
      </div>
    </div>
    <br>
    <br>
    <div>
      <div class="kechengliebiao">
        <el-table
          v-loading="listLoading"
          :data="list"
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
              <span>{{ scope.row.courseType }}</span>
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
              <span>{{ scope.row.publishType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" class-name="status-col" align="center" width="100">
            <template slot-scope="scope">
              {{ scope.row.status }}
            </template>
          </el-table-column>
          <el-table-column label="上架时间" align="center" width="100">
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
            <template slot-scope="{row}">
              <router-link to="kechengluru">
                <el-button type="primary" align="center">
                  课程录入
                </el-button>
              </router-link>
              <router-link to="keshibianji">
                <el-button type="primary" align="center">
                  课时编辑
                </el-button>
              </router-link>
              <el-button v-if="row.status!='published'" type="success" align="center">
                上架
              </el-button>
              <el-button v-if="row.status!='draft'" align="center">
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
  data() {
    return {
      putawayUserName: '',
      broadcaster: '',
      categoryName: '',
      list: null,
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
    this.$axios.post('http://192.168.2.51/api/man/v1/course/coursePage', this.listQuery).then(response => {
      console.log(response.data)
      this.list = response.data.data
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
      for (var i = 0; i < this.list.length; i++) {
        if (newArr.indexOf(this.list[i][p]) === -1) {
          newArr.push(this.list[i][p])
        }
      }
      return newArr
    },
    selectOne(p) {
      const newArr = []
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i][p] === this[p]) {
          newArr.push(this.list[i])
        }
      }
      this.list = newArr
      return this.list
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
    }
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

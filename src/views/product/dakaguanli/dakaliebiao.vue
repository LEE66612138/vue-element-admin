<template>
  <div>
    <h1 style="color:black">大咖管理</h1>
    <div style="position:absolute; right:10px; top:25px">
      <router-link to="dakaluru">
        <el-button class="pan-btn light-blue-btn">大咖录入</el-button>
      </router-link>
    </div>
    <br>
    <div style="display:inline-block;margin-left:50px;font-size:17px">
      <span>上架人员:</span>
      <form style="display:inline-block;margin-left:10px;font-size:17px">
        <select name="operator">
          <option value="quanbu">全部</option>
          <option value="kechengbankuai">张三</option>
          <option value="lisi">李四</option>
          <option value="wangwu">王五</option>
          <option value="audi">Audi</option>
        </select>
      </form>
    </div>
    <br>
    <br>
    <br>
    <div class="dakaliebiao">
      <el-table
        :data="list"
      >
        <el-table-column type="selection" width="45px" />
        <el-table-column label="ID" prop="id" align="center" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" align="center" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.picture }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.job }}</span>
          </template>
        </el-table-column>
        <el-table-column label="擅长领域" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.field }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已回答" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.isReply }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未回答" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.notReply }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程数" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.courses }}</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.fans }}
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column label="上架时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架人员" width="110px" align="center">
          <template slot-scope="scope">
            <span style="color:red;">{{ scope.row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <router-link to="dakaluru">
              <el-button type="primary" align="center">
                编辑大咖
              </el-button>
            </router-link>
            <router-link to="dakaxiangqing">
              <el-button type="primary" align="center">
                大咖详情
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
  </div></template>

<script>
export default {
  data() {
    return {
      slist: null,
      list: null,
      listQuery: {
        page: 1,
        pageSize: 40
      }

    }
  },
  created() {
    this.$axios.post('http://192.168.2.51/api/man/v1/expert/expertPage', this.listQuery).then(response => {
      this.slist = this.list = response.data.data
      this.putawayUserNameList = this.select('putawayUserName')
      this.listLoading = false
    }).catch(error => {
      console.log(error)
      alert('网络错误，不能访问')
    })
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
</style>

<template>
  <div>
    <h1 style="color:black">提问管理</h1>
    <div style="position:absolute; right:300px; top:80px">
      <el-button>全部重置</el-button>
    </div>
    <br>
    <div style="display:inline-block;margin-left:50px;font-size:17px">
      <span>大咖:</span>
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
    <div style="display:inline-block;margin-left:50px;font-size:17px">
      <span>问题状态:</span>
      <form style="display:inline-block;margin-left:10px;font-size:17px">
        <select name="operator">
          <option value="quanbu">全部</option>
          <option value="kechengbankuai">待回答</option>
          <option value="lisi">已过期</option>
          <option value="wangwu">已婉拒</option>
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
        <el-table-column label="用户昵称" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问题详情" align="center" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.details }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答大咖" align="center" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提问日期" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答倒计时" align="center" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <router-link to="wendaluru">
            <el-button type="primary" align="center">
              问答录入
            </el-button>
          </router-link>
          <el-button type="primary" align="center">
            婉拒
          </el-button>
        </el-table-column>
      </el-table>

    </div>
  </div></template>

<script>
export default {
  data() {
    return {
      list: [{
        id: '1',
        name: '张三',
        picture: '',
        job: '一中数学老师',
        field: '数学',
        isReply: '3',
        notReply: '6',
        courses: '3',
        fans: '66688',
        stadus: '已上架',
        timestamp: '2019-05-02 05:20',
        reviewer: '管理员一'
      },
      {
        id: '2',
        name: '李四',
        picture: '',
        job: '一中英语老师',
        field: '英语',
        isReply: '5',
        notReply: '2',
        courses: '1',
        fans: '6846',
        stadus: '未上架',
        timestamp: '2018-07-15 10:40',
        reviewer: '管理员二'
      }
      ]
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
</style>

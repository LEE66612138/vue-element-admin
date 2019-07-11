<template>
  <div>
    <h1 style="color:black">回答管理</h1>
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
    <el-button type="mini" style="float:right; margin-right:10px;">全部重置</el-button>
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
        <el-table-column label="头像" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.userImg }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="问题详情" align="center" min-width="250px">
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
        <el-table-column label="提问日期" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回答倒计时" align="center" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.countdown }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column label="上架时间" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="上架人员" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.reviewer }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
          <router-link to="">
            <el-button type="primary" align="center">
              回答上架
            </el-button>
          </router-link>
          <el-button type="primary" align="center">
            详情
          </el-button>
          <el-button type="primary" align="center">
            试听
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
        username: '飞翔的可乐',
        userImg: '',
        details: '这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题',
        name: '张三',
        price: '12',
        date: '2019-02-06 12:06',
        countdown: '52:12',
        status: '已上架',
        time: '2019-03-02',
        people: '张亚奇'
      },
      {
        id: '2',
        username: '婉转却小白',
        userImg: '',
        details: '这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题',
        name: '李四',
        price: '25',
        date: '2019-09-06 08:06',
        countdown: '12:12',
        status: '未上架',
        time: '2019-03-02',
        reviewer: '张亚奇'
      },
      {
        id: '3',
        username: '狂信的云烟',
        userImg: '',
        details: '这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题这是问题',
        name: '王五',
        price: '78',
        date: '2017-11-12 04:15',
        countdown: '02：05',
        status: '已上架',
        time: '2019-03-02',
        reviewer: '张亚奇'
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

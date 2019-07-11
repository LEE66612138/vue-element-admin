<template>
  <div>
    <h1 style="color:black">课程管理</h1>
    <br>
    <div style="margin-left:50px">
      <div style="display:inline-block; margin-right:150px">
        <span>上架人员</span>
        <el-select v-model="reviewer" style="display:inline-block">
          <el-option v-for="item in list" :key="item.id" :label="item.reviewer" :value="item.id" />
        </el-select>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>所属大咖</span>
        <form style="display:inline-block">
          <select name="operator">
            <option key="quanbu" value="quanbu">全部</option>
            <option key="suoshudaka" value="suoshudaka">所属大咖</option>
            <option key="lisi" value="lisi">李四</option>
            <option key="wangwu" value="wangwu">王五</option>
            <option key="audi" value="audi">Audi</option>
          </select>
        </form>
      </div>
      <div style="display:inline-block; margin-right:150px">
        <span>课程版块</span>
        <form style="display:inline-block">
          <select name="operator">
            <option value="quanbu">全部</option>
            <option value="kechengbankuai">课程板块</option>
            <option value="lisi">李四</option>
            <option value="wangwu">王五</option>
            <option value="audi">Audi</option>
          </select>
        </form>
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
          :data="list"
        >
          <el-table-column type="selection" width="45px" />
          <el-table-column label="ID" prop="id" align="center" width="50px">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="封面" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.picture }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程类型" align="center" min-width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.format }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总课时" align="center" min-width="100px">
            <template slot-scope="scope">
              <span>{{ scope.row.period }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属大咖" width="110px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程板块" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.classtype }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发布类型" align="center" min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.isComplete }}</span>
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
export default {
  data() {
    return {
      reviewer: '',
      list: [{
        id: '1',
        title: '高等数学',
        picture: '',
        format: '视频',
        period: '20/25',
        author: '张三',
        classtype: '数学',
        isComplete: '连载中',
        status: '已上架',
        timestamp: '2019-05-02 05:20',
        reviewer: '管理员一'
      },
      {
        id: '2',
        title: '英语四级',
        picture: '',
        format: '音频',
        period: '12/15',
        author: '李四',
        classtype: '英语',
        isComplete: '已完结',
        status: '未上架',
        timestamp: '2018-07-15 10:40',
        reviewer: '管理员二'
      },
      {
        id: '3',
        title: '土木工程',
        picture: '',
        format: '音频',
        period: '15/19',
        author: '李四',
        classtype: '建筑',
        isComplete: '已完结',
        status: '未上架',
        timestamp: '2018-07-15 10:40',
        reviewer: '管理员二'
      }
      ]
    }
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

<template>
  <div>
    <h1 style="color:black">日志</h1>
    <br>
    <div style="display:inline-block;margin-left:50px;font-size:17px">
      <span>录入人员 :</span>
      <form style="display:inline-block;margin-left:10px;font-size:17px">
        <el-select v-model="reviewer" @change="selectOne('reviewer')">
          <el-option v-for="item in select('reviewer')" :key="item" :value="item" />
        </el-select>
      </form>
    </div>
    <div style="display:inline-block;margin-left:50px;font-size:17px">
      <span>操作类型 :</span>
      <form style="display:inline-block;margin-left:10px;font-size:17px">
        <el-select v-model="operation" @change="selectOne('operation')">
          <el-option v-for="item in select('operation')" :key="item" :value="item" />
        </el-select>
      </form>
    </div>
    <el-button type="mini" style="float:right; margin-right:10px; margin-top:5px;">全部重置</el-button>
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
        <el-table-column label="录入人员" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作类型" align="center" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.operation }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="操作日志" align="center" min-width="250px">
          <template slot-scope="scope">
            <span>{{ scope.row.log }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center" min-width="250px">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      </el-table></div>
  </div></template>

<script>
export default {
  data() {
    return {
      reviewer: '',
      operation: '',
      list: [{
        id: '1',
        reviewer: '张亚奇',
        operation: '编辑课程',
        log: '编辑了ID123456的课程',
        date: '2019-02-06 12:06'
      },
      {
        id: '2',
        reviewer: '张亚奇',
        operation: '新增课程',
        log: '新增了ID123456的课程',
        date: '2019-02-06 12:06'
      }, {
        id: '3',
        reviewer: '娜姐',
        operation: '编辑课程',
        log: '编辑了ID123456的课程',
        date: '2019-02-06 12:06'
      }, {
        id: '4',
        reviewer: '娜姐',
        operation: '编辑课程',
        log: '编辑了ID123456的课程',
        date: '2019-02-06 12:06'
      }, {
        id: '5',
        reviewer: '娜姐',
        operation: '编辑课程',
        log: '编辑了ID123456的课程',
        date: '2019-02-06 12:06'
      }
      ]
    }
  },
  computed: {

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

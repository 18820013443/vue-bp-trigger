<template>
  <div class="app-container">
    <div class="app-container-filter-button">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input
            v-model="listQuery.number"
            class="full-width"
            placeholder="请输入邮箱"
            size="small"
          />
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-button class="font-bold" size="small" type="primary" icon="el-icon-search" >查询</el-button>
            <el-button class="font-bold" size="small" type="info" icon="el-icon-set-up" >重置</el-button>
            <el-button class="font-bold" size="small" type="success" icon="el-icon-plus" >新增</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        number: undefined,
        color: undefined
      },
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {}
  }
}
</script>

<style scoped>

</style>

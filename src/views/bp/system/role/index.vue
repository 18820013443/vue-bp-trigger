<template>
  <div class="app-container">
    <div class="app-container-filter-button">
      <el-row :gutter="10" type="flex" justify="left">
        <el-col :span="5">
          <el-input
            v-model="listQuery.number"
            class="full-width"
            placeholder="请输入邮箱"
            size="small"
          />
        </el-col>
        <el-col>
<!--          <el-row>-->
          <el-button class="font-bold" size="small" type="primary" icon="el-icon-search" >查询</el-button>
          <el-button class="font-bold" size="small" type="info" icon="el-icon-set-up" >重置</el-button>
          <el-button class="font-bold" size="small" type="success" icon="el-icon-plus" >新增</el-button>
<!--          </el-row>-->
        </el-col>
      </el-row>
    </div>
    <div class="card-container">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>角色列表</span>
            </div>
            <el-table v-loading="listLoading" :data="list" element-loading-text="玩命加载中" style="width: 100%">
              <el-table-column prop="id" label="ID" width="180" />
              <el-table-column prop="name" label="角色名称" width="180" />
              <el-table-column prop="status" label="角色状态" />
              <el-table-column prop="description" label="角色描述" />
              <el-table-column prop="address" label="操作" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
          <el-card id="card2" class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                <span>菜单分配</span>
              </el-tooltip>
              <el-button
                type="primary"
                icon="el-icon-check"
                size="mini"
                style="float: right; padding: 6px 9px"
              >保存</el-button>
            </div>
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps">
            </el-tree>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRoles } from '@/api/bp/role'
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        number: undefined,
        color: undefined
      },
      list: null,
      listLoading: true,
      treeData: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getRoles().then(res => {
        this.listLoading = true
        this.list = res
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .clearfix {
    font-weight: bold;
  }
  /*#card2 {*/
  /*  padding: 13px 20px;*/
  /*}*/
</style>

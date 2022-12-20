<template>
  <div class="app-container">
<!--    <div class="app-container-filter-button">-->
<!--      <el-row :gutter="10" type="flex">-->
<!--        <el-col>-->
<!--          <el-input-->
<!--            v-model="listQuery.number"-->
<!--            class="full-width"-->
<!--            placeholder="请输入邮箱"-->
<!--            size="small"-->
<!--          />-->
<!--        </el-col>-->
<!--        <el-col>-->
<!--            <el-button class="font-bold" size="small" type="primary" icon="el-icon-search" >查询</el-button>-->
<!--            <el-button class="font-bold" size="small" type="info" icon="el-icon-set-up" >重置</el-button>-->
<!--            <el-button class="font-bold" size="small" type="success" icon="el-icon-plus" >新增</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </div>-->
    <div class="filter-container">
      <el-input v-model="listQuery.number" class="filter-item" placeholder="请输入邮箱" size="small" style="width: 200px;margin-right: 10px"/>
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search">
        查询
      </el-button>
      <el-button v-waves class="filter-item" size="small" type="info" icon="el-icon-set-up">
        重置
      </el-button>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-plus">
        新增
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      element-loading-text="玩命加载中"
      style="width: 100%;"
      fit
    >
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="80"
      />
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
        width="150"
      />
      <el-table-column
        prop="roles"
        label="角色"
        align="center"
        width="150"
      />
      <el-table-column
        prop="email"
        label="用户邮箱"
        align="center"
      />
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-button
              class="operation-small-button"
              type="primary"
              size="mini"
              @click="editFn(scope.row)"
            ><i class="el-icon-edit" />编辑
            </el-button>
            <el-button
              class="operation-small-button"
              type="danger"
              size="mini"
              @click="deleteFn(scope.row)"
            ><i class="el-icon-delete" />删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--    <el-dialog :title="formTitle" :visible.sync="dialogAddUpdateIncomeVisible">-->
    <!--      <el-divider class="postForm-el-divider-header" />-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <AddUpdateForm ref="FormRef" :edit-object-form="currentEditObject" />-->
    <!--        <el-button @click="cancelForm">取 消</el-button>-->
    <!--        <el-button type="primary" @click="saveForm">确 定</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />

  </div>
</template>

<script>
// import { fetchAllRequest, fetchSingleRequest, reviseRequest, deleteRequest, createRequest } from '@/api/bp/account'
import { fetchAllRequest, fetchSingleRequest } from '@/api/bp/account'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Message } from 'element-ui'
// import AddUpdateForm from './addupdate'

export default {
  components: { Pagination },
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
      showCreateIncomeDialog: false,
      total: 0,
      clickEditOrCreate: 'edit',
      currentEditObject: {},
      formTitle: '',
      dialogAddUpdateIncomeVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchAllRequest(this.listQuery).then(
        response => {
          const data = response.data
          this.listLoading = true
          this.total = response.count
          data.forEach((el, index) => {
            const roleList = []
            el.roles.forEach((e, index) => {
              roleList.push(e.name)
            })
            el.roles = roleList.toString()
          })
          this.list = data
          this.listLoading = false
        })
    }
    // handleFilter() {
    //   fetchAllRequest(this.listQuery).then(response => {
    //     this.listLoading = true
    //     this.list = response.data
    //     this.total = response.count
    //     this.listLoading = false
    //   })
    // },
    // resetFilter() {
    //   this.listQuery = {
    //     page: 1,
    //     size: 10,
    //     date: undefined,
    //     number: undefined,
    //     color: undefined
    //   }
    //   this.getList()
    // },
    // editFn(item) {
    //   this.clickEditOrCreate = 'edit'
    //   this.formTitle = '入库编辑'
    //   this.getSingleRecord(item.id)
    //   this.dialogAddUpdateIncomeVisible = true
    // },
    // getSingleRecord(id) {
    //   fetchSingleRequest(id).then((response) => {
    //     this.listLoading = true
    //     this.currentEditObject = Object.assign({}, response)
    //     this.listLoading = false
    //   })
    // }
    // saveForm() {
    //   this.$refs.FormRef.$refs.editObjectForm.validate(valid => {
    //     if (valid) {
    //       const editObject = this.currentEditObject
    //       console.log(editObject)
    //       var savePromise = this.clickEditOrCreate === 'edit' ? reviseRequest(editObject.id, editObject) : createRequest(editObject)
    //       savePromise.then(
    //         (res) => {
    //           this.dialogAddUpdateIncomeVisible = false
    //           this.getList()
    //           this.$refs.FormRef.resetEditObjectFormFields()
    //         },
    //         (response) => {
    //           Message({
    //             message: response.message,
    //             type: 'error'
    //           })
    //         }
    //       )
    //     }
    //   })
    // },
    // cancelForm() {
    //   this.dialogAddUpdateIncomeVisible = false
    //   this.$refs.FormRef.resetEditObjectFormFields()
    // },
    // createFn() {
    //   this.formTitle = '新建库存'
    //   this.clickEditOrCreate = 'new'
    //   this.currentEditObject = {
    //     clothe_num: undefined,
    //     color: undefined,
    //     amount: undefined
    //   }
    //   this.dialogAddUpdateIncomeVisible = true
    // },
    // deleteFn(item) {
    //   const del = (cb) => deleteRequest(item.id).then(
    //     (res) => {
    //       cb()
    //       this.getList()
    //     },
    //     (error) => {
    //       Message({
    //         message: error.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       })
    //     }
    //   );
    //   this.$confirm('此操作将删除库存，是否继续？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     del(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功！'
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已经取消删除'
    //     })
    //   })
    // }
  }
}
</script>


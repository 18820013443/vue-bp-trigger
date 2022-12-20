<template>
  <div class="app-container">
    <div class="app-container-filter-button">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input
            v-model="listQuery.number"
            class="full-width"
            placeholder="请输入邮箱"
          />
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-button class="font-bold" type="primary" icon="el-icon-search">查询</el-button>
            <el-button class="font-bold" type="info" icon="el-icon-set-up">重置</el-button>
            <el-button class="font-bold" type="success" icon="el-icon-plus">新增</el-button>
          </el-row>
        </el-col>
      </el-row>
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
        prop="processName"
        label="Process Name"
        align="center"
        width="320"
      />
      <el-table-column
        prop="postBody"
        label="Post Body"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="owner"
        label="Owner"
        align="center"
        width="200"
      />
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-button
              class="el-button el-button--info el-button--mini is-plain operation-small-button"
              type="info"
              @click="uploadFn(scope.row)"
            ><i class="el-icon-upload2" />上传
            </el-button>
            <el-button
              class="el-button el-button--success el-button--mini is-plain operation-small-button"
              type="success"
              @click="executeFn(scope.row)"
            ><i class="el-icon-mobile-phone" />执行
            </el-button>
            <el-button
              class="el-button el-button--primary el-button--mini is-plain operation-small-button"
              type="primary"
              @click="editFn(scope.row)"
            ><i class="el-icon-edit" />编辑
            </el-button>
            <el-button
              class="el-button el-button--danger el-button--mini is-plain operation-small-button"
              type="danger"
              @click="deleteFn(scope.row)"
            ><i class="el-icon-delete" />删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="上传文件" :visible.sync="dialogUploadFilesVisble" @close="closeDialog">
      <el-divider class="postForm-el-divider-header" />
      <Upload ref="upload" />
    </el-dialog>
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
import { fetchAllRequest } from '@/api/bp/process'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { Message } from 'element-ui'
// import AddUpdateForm from './addupdate'
import Upload from './upload'

export default {
  components: { Pagination, Upload },
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
      dialogUploadFilesVisble: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchAllRequest(this.listQuery).then(
        response => {
          this.listLoading = true
          this.list = response.data
          this.total = response.count
          this.listLoading = false
        })
    },
    uploadFn(row) {
      this.dialogUploadFilesVisble = true
      setTimeout(() => {
        this.$refs.upload.getList(row)
      }, 100)
      console.log(row)
    },
    closeDialog() {
      this.$refs.upload.fileList = []
    }
  }
}
</script>

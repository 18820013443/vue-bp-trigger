<template>
  <el-upload
    class="upload-demo"
    drag
    action="#"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :http-request="uploadFile"
    multiple>
    <i class="el-icon-upload" />
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <div slot="tip" class="el-upload__tip">xlsx/xls/csv files with a size less than 3M</div>
  </el-upload>

</template>

<script>
import { uploadFileRequest, deleteFileRequest, getFileInfo, downloadFile } from '@/api/bp/file'
import request from '@/utils/request'
export default {
  name: 'Upload',
  data() {
    return {
      // 上传文件列表
      fileList: [],
      dataForm: {
        file: null
      },
      query: {
        processId: null
      },
      fileData: {
        name: null,
        url: null,
        id: null
      }
    }
  },
  methods: {
    getList(row) {
      // this.fileList = []
      this.rowData = row
      this.query.processId = null
      this.query.processId = row.id
      console.log(this.query.processId)
      getFileInfo(this.query).then(response => {
        const res = response.data
        for (var i = 0; i < res.length; i++) {
          this.fileList.push({ name: res[i].fileName, url: res[i].file.substring(1), id: res[i].id })
        }
      })
    },
    beforeUpload(file) {
      const fileType = file.name.substring(file.name.lastIndexOf('.'))
      if (fileType.toLocaleLowerCase() !== '.xlsx' && fileType.toLocaleUpperCase() !== '.xls' && fileType.toLocaleLowerCase() !== '.csv') {
        this.$message.error('文件必须为xlsx/xls/csv')
        this.fileList = []
        this.dataForm.file = null
        this.dataForm.fileName = ''
        return false
      }
      if (file.size / 1024 / 1024 > 3) {
        this.$message.error('文件大小不能超过3M')
        return false
      }
      this.dataForm.file = file
    },
    uploadFile() {
      const fd = new FormData()
      fd.append('file', this.dataForm.file)
      fd.append('processId', this.rowData.id)
      uploadFileRequest(fd).then((response) => {
        if (response.code === 1000) {
          const res = response.data
          this.fileList.push( { name: res[0].fileName, url: res[0].file.substring(1), id: res[0].id })
          this.$message.success(response.msg)
        } else {
          this.fileList = []
          this.$message.error(response.msg)
        }
      })
    },
    handlePreview(file) {
      console.log(file)
      this.fileList.forEach(element => {
        if (element.name === file.name) {
          var a = document.createElement('a')
          var event = new MouseEvent('click')
          a.download = file.name
          a.href = request.defaults.baseURL + '/file/download/?filePath=' + element.url
          a.dispatchEvent(event)
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file)
      this.fileList.forEach( (element, index) => {
        if (element.name === file.name) {
          deleteFileRequest(element.id).then((response) => {
            if (response.code === 1000) {
              this.fileList.splice(index, 1)
              this.$message.success(response.msg)
            } else {
              this.$message.error(response.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

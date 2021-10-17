<template>
  <div class="upload-page">
    <el-form
      ref="publishForm"
      class="publish-form-content"
      :model="publishForm"
      :rules="rules"
      size="medium"
      label-width="100px"
      label-position="left"
    >
      <el-form-item v-if="uploadFileUrl">
        <el-link type="primary" :href="uploadFileUrl" underline icon="el-icon-location">
          {{ uploadFileUrl }}
        </el-link>
      </el-form-item>
      <el-form-item label-width="0" prop="fileToken">
        <div v-loading.lock="uploadLoading" class="el-upload__dragger">
          <el-upload
            ref="fileToken"
            multiple
            drag
            :auto-upload="true"
            :file-list="uploadFileList"
            :action="uploadAction"
            :before-upload="handleUploadBefore"
            :http-request="handleUploadHttpRequest"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :before-remove="handleUploadRemove"
            :on-remove="handleUploadOnRemove"
            :on-preview="handleUploadPreview"
            :on-change="handleUploadChange"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
              <!--              <div class="el-upload__tip">-->
              <!--                Only jpg/png file with a size less than 15MB-->
              <!--              </div>-->
            </div>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <el-divider />
    <div class="file-table">
      <el-table
        ref="table"
        v-loading="table.loading"
        :data="table.data"
        :row-key="table.id"
        border
        style="width: 100%"
        @selection-change="handleTableSelectionChange"
      >
        <el-table-column
          type="selection"
          min-width="55"
        />
        <el-table-column
          label="ID"
          prop="id"
          min-width="40"
        />
        <el-table-column
          label="Original Name"
          prop="original_name"
          align="center"
          header-align="center"
        />
        <el-table-column
          label="File Name"
          prop="file_name"
          align="center"
          header-align="center"
        />
        <el-table-column
          label="Url"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" :href="scope.row.url" underline icon="el-icon-location"><b>{{ scope.row.url }}</b></el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Create Time"
          prop="create_time"
          align="center"
          header-align="center"
          min-width="60"
        />
        <el-table-column
          fixed="right"
          label="Operation"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click.stop="handleRowDeleteShow(scope.row,scope.$index)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin-top: 15px;margin-bottom: 50px">
        <el-pagination
          :current-page="page.current"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { snowflakeId } from '@/assets/js/NumberUtil'
import upload from '@/api/upload'

export default {
  name: 'Upload',
  data () {
    return {
      publishForm: {
        fileToken: ''
      },
      rules: {},
      // 文件上传开始
      uploadLoading: false,
      uploadDisabled: false,
      uploadAction: '',
      uploadToken: '',
      uploadLimit: 2048, // MB
      uploadFileList: [],
      uploadFileUrl: '',
      uploadPreviewDlgShow: false,
      uploadPreviewDlgImgUrl: '',
      // 文件上传结束
      table: {
        loading: false,
        selectList: [],
        id: 'id',
        data: []
      },
      page: {
        current: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  head () {
    return {
      title: 'Upload | ' + this.site.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sample demo for upload files'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['site'])
  },
  mounted () {
    this.loadData()
  },
  methods: {
    handleUploadBefore (file) {
      const isRightSize = file.size / 1024 / 1024 < this.uploadLimit
      if (!isRightSize) {
        this.$message.error(`File maximum size is ${this.uploadLimit}`)
      }
      // const isAccept = /\.(jpe?g|png|gif|bmp)$/i.test(file.type)
      // if (!isAccept) {
      //   this.$message.error('Only image file type supported')
      // }
      return true
    },
    handleUploadHttpRequest (config) {
      const uploadData = new FormData()
      uploadData.append('file', config.file)
      uploadData.append('token', this.uploadToken || snowflakeId())
      return upload.uploadFile(uploadData)
    },
    handleUploadChange (file, fileList) {
      this.uploadFileList = fileList
    },
    handleUploadSuccess (res, file, fileList) {
      this.uploadLoading = false
      const resCode = res.code
      if (resCode === 0) {
        const resData = res.data
        this.uploadToken = resData.token
        file.url = resData.url
        this.uploadFileUrl = file.url
        // refresh table list
        this.loadData()
      } else {
        file.url = ''
        fileList.splice(fileList.length - 1, 1)
      }
      this.$message.success('upload success!')
    },
    handleUploadError (res, file, fileList) {
      this.uploadLoading = false
      file.url = ''
      fileList.splice(fileList.length - 1, 1)
      this.$message.error('upload failed，please retry it later!')
    },
    handleUploadPreview (file) {
      if (file.url) {
        const url = file.url
        this.uploadPreviewDlgImgUrl = url
        this.uploadPreviewDlgShow = true
      }
    },
    handlePreviewImageChange () {
      this.publishForm.preview = this.uploadPreviewDlgImgUrl
      this.uploadPreviewDlgShow = false
    },
    // 上传删除文件
    handleUploadRemove (file, fileList) {
      return new Promise((resolve, reject) => {
        this.$confirm('Are you sure to remove it?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch((action) => {
          this.$message.info('Cancel delete file!')
          reject(action)
        })
      })
    },
    handleUploadOnRemove (file, fileList) {
      this.uploadLoading = true
      upload.delFile({
        url: file.url,
        token: this.uploadToken
      }).then((res) => {
        this.uploadLoading = false
        const resCode = res.code
        if (resCode === 0) {
          this.uploadFileUrl = ''
          this.$message({
            type: 'success',
            showClose: true,
            message: 'Delete file succesfully!'
          })
          // refresh the table
          this.loadData()
        } else {
          this.$message({
            type: 'error',
            duration: 5000,
            showClose: true,
            message: JSON.stringify(res.data) || 'Delete file failed,please retry it later!'
          })
        }
      }).finally(() => {
        this.uploadLoading = false
      })
    },
    // table start
    loadData (pagination, filters, sorter) {
      const postData = {
        pageNum: (pagination && pagination.current) || this.page.current,
        pageSize: (pagination && pagination.pageSize) || this.page.pageSize
      }
      this.table.loading = true
      upload.getFilesList(postData).then((res) => {
        const resCode = res.code
        if (resCode === 0) {
          const resData = res.data
          this.page.total = 0
          this.table.data = resData
        }
      }).finally(() => {
        this.table.loading = false
      })
    },
    handleTableSelectionChange (selection) {
      // 单行或多行选择回调
      this.table.selectList = selection
    },
    handleSizeChange (size) {
      this.page.pageSize = size
      this.page.current = 1
      this.loadData()
    },
    handleCurrentChange (page) {
      this.page.current = page
      this.loadData()
    },
    handleRowDeleteShow (row, index) {
      this.$confirm('Are you sure to delete this record?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCEL',
        type: 'warning'
      })
        .then(() => {
          this.table.loading = true
          const idParams = { url: row.url }
          upload.delFile(idParams).then((res) => {
            const resCode = res.code
            const message = res.message
            if (resCode === 0) {
              this.loadData()
              this.$message({
                type: 'success',
                offset: 100,
                message: 'Delete record successfully!'
              })
            } else {
              console.log('Delete record failed, error: ', message)
              this.$message({
                type: 'error',
                offset: 100,
                message
              })
            }
          }).catch((err) => {
            console.log('Delete record exception, exception: ', err)
            this.$message({
              type: 'error',
              offset: 100,
              message: 'Delete record exception, please retry later!'
            })
          }).finally(() => {
            this.table.loading = false
          })
        }).catch(() => {
        // 取消操作
        })
    }
  }

}
</script>

<style scoped>
.publish-form-content {
  text-align: center;
  padding: 80px 20px;
}
</style>

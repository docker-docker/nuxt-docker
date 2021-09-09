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
      uploadLimit: 1024,
      uploadFileList: [],
      uploadFileUrl: '',
      uploadPreviewDlgShow: false,
      uploadPreviewDlgImgUrl: ''
      // 文件上传结束
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
  methods: {
    handleUploadBefore (file) {
      const isRightSize = file.size / 1024 / 1024 < 15
      if (!isRightSize) {
        this.$message.error('File maximum size is 15MB')
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
      upload.delFile({ url: file.url, token: this.uploadToken }).then((res) => {
        this.uploadLoading = false
        const resCode = res.code
        if (resCode === 0) {
          this.uploadFileUrl = ''
          this.$message({
            type: 'success',
            showClose: true,
            message: 'Delete file succesfully!'
          })
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

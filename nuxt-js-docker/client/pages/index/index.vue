<template>
  <div class="home-content">
    <h1>演示页面</h1>
    <div class="option">
      <el-row>
        <el-col :md="6" :sm="12">
          <el-button type="primary" @click="goPage('upload')">
            Upload File
          </el-button>
        </el-col>
        <el-col :md="6" :sm="12" />
        <el-col :md="6" :sm="12" />
        <el-col :md="6" :sm="12" />
        <el-col :md="6" :sm="12" />
        <el-col :md="6" :sm="12" />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  methods: {
    goPage (pageName) {
      this.$router.push({ name: 'index-' + pageName })
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.option {
  text-align: center;
}
</style>

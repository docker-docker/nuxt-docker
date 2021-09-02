<template>
  <div class="home-content">
    <h1>演示页面</h1>
    <div class="option">
      <el-button type="primary" @click="goPage('upload')">
        Upload File
      </el-button>
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

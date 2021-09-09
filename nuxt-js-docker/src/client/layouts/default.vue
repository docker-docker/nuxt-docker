<template>
  <div>
    <client-only>
      <div v-if="$nuxt.isOffline" class="error">
        <h4>Sorry,Your network is offline!</h4>
      </div>
      <nuxt v-else id="app" />
    </client-only>
  </div>
</template>
<style scoped>
.error {
  text-align: center;
}
</style>

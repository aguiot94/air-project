<template>
  <header class="app-header bg-lm-green pl-4">
    <div class="d-flex align-center">
      <img src="/src/assets/images/logo-blanc.png" alt="logo leroy merlin blanc">
      <h1>{{ appTitle }}</h1>
    </div>
  </header>
</template>

<script setup lang="ts">
const appTitle = 'Leroy Merlin - Air Project'
</script>

<style scoped lang="scss">
.app-header {
  img {
    height: 80px;
    width: auto;
    margin-right: 20px;
  }
}
</style>
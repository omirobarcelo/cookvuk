<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="layout-container bg-white">
    <header class="header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.header {
  background-color: white;
  @apply p-3;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @apply gap-3;
}
</style>

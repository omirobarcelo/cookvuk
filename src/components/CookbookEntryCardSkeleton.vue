<script setup lang="ts"></script>

<template>
  <div class="animate-pulse card">
    <div class="line h-7 mb-2"></div>
    <div class="line h-6 mb-2 w-1/2"></div>
    <div class="line h-6 mb-2 w-2/3"></div>
    <div class="line h-6 w-1/3"></div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  @apply rounded-lg overflow-hidden shadow-lg p-3 bg-white;
}

.line {
  @apply bg-gray-200 rounded;
}
</style>

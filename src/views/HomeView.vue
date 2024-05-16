<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue';
import { onMounted } from 'vue';
import { cookbookStore } from '@/stores/cookbook.store';

onMounted(() => {
  console.log(`the component is now mounted.`);
  cookbookStore.load();
});
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <p v-if="cookbookStore.loading">Loading...</p>
    <div v-else>{{ JSON.stringify(cookbookStore.cookbook) }}</div>
  </main>
</template>

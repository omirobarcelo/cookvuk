<script setup lang="ts">
import { onMounted } from 'vue';
import { cookbookStore } from '@/stores/cookbook.store';
import CookbookEntryCard from '@/components/CookbookEntryCard.vue';
import CookbookEntryCardSkeleton from '@/components/CookbookEntryCardSkeleton.vue';

onMounted(() => {
  cookbookStore.load();
});
</script>

<template>
  <div class="layout-container">
    <main class="page">
      <h1 class="mb-3">Cookbook</h1>
      <div class="list-grid">
        <template v-if="cookbookStore.loading">
          <CookbookEntryCardSkeleton v-for="_ in 4" :key="_" />
        </template>
        <template v-else>
          <CookbookEntryCard v-for="entry in cookbookStore.cookbook" :key="entry.id" :entry="entry" />
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>
.list-grid {
  @apply grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { CookbookEntry, Recipe } from '@/api/types';

const props = defineProps<{
  entry: CookbookEntry;
}>();

const latestRecipe = computed<Recipe>(() => {
  return props.entry.history[0].recipe;
});

const lastVersion = computed(() => {
  return props.entry.history[0];
});

const cookingTime = computed(() => {
  const hours = Math.floor(latestRecipe.value.cookingTime / 60);
  const minutes = latestRecipe.value.cookingTime % 60;
  return { hours, minutes };
});
</script>

<template>
  <RouterLink :to="{ name: 'recipe-detail', params: { id: entry.id } }">
    <div class="card">
      <div class="font-bold text-xl mb-2">{{ latestRecipe.name }}</div>
      <p class="text-gray-700 text-base mb-2">
        <!-- <strong>Cooking Time:</strong> {{ cookingTime.hours }} hours {{ cookingTime.minutes }} minutes -->
        <strong>Cooking Time:</strong>
        {{ cookingTime.hours > 0 ? `${cookingTime.hours} hours ` : '' }}{{ cookingTime.minutes }} minutes
      </p>
      <p class="text-gray-700 text-base mb-2">
        <strong>Last Updated:</strong>
        {{
          new Intl.DateTimeFormat(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
            lastVersion.date
          )
        }}
      </p>
      <p class="text-gray-700 text-base"><strong>Versions:</strong> {{ entry.history.length }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  width: 100%;
  @apply rounded-lg overflow-hidden shadow-lg p-3 bg-white;
}

.card:hover {
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.1);
  @apply transition-shadow duration-300;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { cookbookEntryStore } from '@/stores/cookbook-entry.store';
import type { Recipe } from '@/api/types';

const route = useRoute();
const currentVersionIndex = ref(0);
const recipeId = route.params.id as string;

onMounted(() => {
  if (cookbookEntryStore.cookbookEntry == null || cookbookEntryStore.cookbookEntry.id !== recipeId) {
    // Fetch entry if not already in store
    cookbookEntryStore.load(recipeId);
  }
});

const currentEntryDate = computed<Date | undefined>(() => {
  return cookbookEntryStore.cookbookEntry?.history[currentVersionIndex.value].date;
});

const currentRecipe = computed<Recipe | undefined>(() => {
  return cookbookEntryStore.cookbookEntry?.history[currentVersionIndex.value].recipe;
});

const cookingTime = computed(() => {
  let hours = 0;
  let minutes = 0;
  if (currentRecipe.value != null) {
    hours = Math.floor(currentRecipe.value.cookingTime / 60);
    minutes = currentRecipe.value.cookingTime % 60;
  }
  return { hours, minutes };
});

const hasPrev = computed(() => currentVersionIndex.value > 0);
const hasNext = computed(() => currentVersionIndex.value < (cookbookEntryStore.cookbookEntry?.history.length ?? 0) - 1);

const prevVersion = () => {
  if (hasPrev.value) {
    currentVersionIndex.value -= 1;
  }
};

const nextVersion = () => {
  if (hasNext.value) {
    currentVersionIndex.value += 1;
  }
};
</script>

<template>
  <div class="layout-container">
    <main class="page">
      <div class="nav mb-4">
        <button
          @click="prevVersion"
          :disabled="!hasPrev"
          class="btn secondary"
          :class="{ 'cursor-not-allowed opacity-50': !hasPrev }"
        >
          &larr; Previous
        </button>
        <div v-if="cookbookEntryStore.loading" class="skeleton h-8"></div>
        <p v-else class="text-lg font-medium">
          {{
            new Intl.DateTimeFormat(undefined, {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              weekday: 'long'
            }).format(currentEntryDate!)
          }}
        </p>
        <button
          @click="nextVersion"
          :disabled="!hasNext"
          class="btn secondary"
          :class="{ 'cursor-not-allowed opacity-50': !hasNext }"
        >
          Next &rarr;
        </button>
      </div>

      <div class="nav">
        <div v-if="cookbookEntryStore.loading" class="skeleton h-8 mb-3"></div>
        <h1 v-else class="mb-3">{{ currentRecipe!.name }}</h1>

        <RouterLink :to="{ name: 'recipe-add', params: { id: recipeId } }">
          <button class="btn primary">Add note</button>
        </RouterLink>
      </div>

      <p class="text mb-3">
        <span class="label">Cooking Time: </span>
        <span v-if="cookbookEntryStore.loading" class="skeleton">______________</span>
        <span v-else>
          {{ cookingTime.hours > 0 ? `${cookingTime.hours} hours ` : '' }}{{ cookingTime.minutes }} minutes
        </span>
      </p>

      <p class="text mb-3">
        <strong>Ingredients:</strong>
      </p>
      <pre v-if="cookbookEntryStore.loading" class="skeleton clear full mb-3 h-10"></pre>
      <pre v-else class="text-block mb-3">{{ currentRecipe!.ingredients }}</pre>

      <p class="text mb-3">
        <strong>Steps:</strong>
      </p>
      <pre v-if="cookbookEntryStore.loading" class="skeleton clear full h-10"></pre>
      <pre v-else class="text-block">{{ currentRecipe!.steps }}</pre>
    </main>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @apply gap-3;
}

.skeleton {
  width: clamp(25%, 256px, 90%);
  color: transparent;
  @apply animate-pulse bg-gray-300 rounded;
}

.skeleton.clear {
  @apply bg-gray-100;
}

.skeleton.full {
  width: 100%;
}

.text {
  @apply text-base text-gray-700;
}

.label {
  @apply font-bold;
}

.text-block {
  text-wrap: pretty;
  @apply bg-gray-100 p-2;
}
</style>

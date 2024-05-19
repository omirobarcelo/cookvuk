<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cookbookStore } from '@/stores/cookbook.store';
import { cookbookEntryStore } from '@/stores/cookbook-entry.store';
import type { RecipeVersion } from '@/api/types';

const route = useRoute();
const router = useRouter();

const date = ref(new Date().toISOString().split('T')[0]); // Default to current date in YYYY-MM-DD format
const name = ref('');
const cookingTime = ref<number | null>(null);
const ingredients = ref('');
const steps = ref('');

const isEditing = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEditing.value) {
    const recipeId = route.params.id as string;
    if (cookbookEntryStore.cookbookEntry == null || cookbookEntryStore.cookbookEntry.id !== recipeId) {
      await cookbookEntryStore.load(recipeId);
    }
    const entry = cookbookEntryStore.cookbookEntry;
    if (entry != null) {
      const latestRecipe = entry.history[0].recipe;
      name.value = latestRecipe.name;
      cookingTime.value = latestRecipe.cookingTime;
      ingredients.value = latestRecipe.ingredients;
      steps.value = latestRecipe.steps;
    }
  }
});

const saveRecipe = () => {
  const newRecipeVersion: RecipeVersion = {
    date: new Date(date.value),
    recipe: {
      name: name.value,
      cookingTime: cookingTime.value!,
      ingredients: ingredients.value,
      steps: steps.value
    }
  };

  (isEditing.value ? cookbookEntryStore.addVersion(newRecipeVersion) : cookbookStore.addRecipe(newRecipeVersion)).then(
    () => router.push({ name: 'home' })
  );
};
</script>

<template>
  <div class="layout-container">
    <main class="page">
      <h1 class="mb-3">{{ isEditing ? 'Add Note' : 'Write New Recipe' }}</h1>
      <form @submit.prevent="saveRecipe">
        <div class="mb-3">
          <label for="date" class="label">Date</label>
          <input type="date" id="date" v-model="date" class="input" />
        </div>

        <div class="mb-3">
          <label for="name" class="label">Recipe Name</label>
          <input type="text" id="name" v-model="name" class="input" required />
        </div>

        <div class="mb-3">
          <label for="cookingTime" class="label">Cooking Time (minutes)</label>
          <input type="number" id="cookingTime" v-model="cookingTime" class="input" required />
        </div>

        <div class="mb-3">
          <label for="ingredients" class="label">Ingredients</label>
          <textarea id="ingredients" v-model="ingredients" class="textarea" required></textarea>
        </div>

        <div class="mb-3">
          <label for="steps" class="label">Steps</label>
          <textarea id="steps" v-model="steps" class="textarea" required></textarea>
        </div>

        <button type="submit" class="btn primary">{{ isEditing ? 'Save Recipe' : 'Create Recipe' }}</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
.label {
  @apply block text-gray-700 font-bold mb-2;
}
</style>

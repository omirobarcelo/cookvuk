import { reactive } from 'vue';
import { CookbookApiService } from '@/api/cookbook-api.service';
import type { CookbookEntry, RecipeVersion } from '@/api/types';

const cookbookApiService = new CookbookApiService();

export const cookbookEntryStore = reactive({
  loading: true,
  cookbookEntry: undefined as CookbookEntry | undefined,
  async load(id: string) {
    this.loading = true;
    const data = await cookbookApiService.getCookbookEntry(id);
    this.cookbookEntry = data;
    this.loading = false;
  },
  async addVersion(version: RecipeVersion) {
    if (this.cookbookEntry != null) {
      await cookbookApiService.addVersion(this.cookbookEntry.id, version);
    }
  }
});

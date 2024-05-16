import { reactive } from 'vue';
import { CookbookApiService } from '@/api/cookbook-api.service';
import type { Cookbook } from '@/api/types';

const cookbookApiService = new CookbookApiService();

export const cookbookStore = reactive({
  loading: true,
  cookbook: undefined as Cookbook | undefined,
  async load() {
    this.loading = true;
    const data = await cookbookApiService.getCookbook();
    this.cookbook = data;
    this.loading = false;
  }
});

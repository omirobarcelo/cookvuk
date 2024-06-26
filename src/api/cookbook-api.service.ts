import { addEntry, addVersion, getCookbook, getCookbookEntry } from './db';
import type { Cookbook, CookbookEntry, RecipeVersion } from './types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class CookbookApiService {
  public async getCookbook(): Promise<Cookbook> {
    await delay(Math.random() * 1000 + 100);
    return getCookbook();
  }

  public async getCookbookEntry(id: string): Promise<CookbookEntry | undefined> {
    await delay(Math.random() * 1000 + 100);
    return getCookbookEntry(id);
  }

  public async addEntry(version: RecipeVersion): Promise<{ ok: 1 }> {
    await delay(Math.random() * 1000 + 100);
    return addEntry(version);
  }

  public async addVersion(id: string, version: RecipeVersion): Promise<{ ok: 1 }> {
    await delay(Math.random() * 1000 + 100);
    return addVersion(id, version);
  }
}

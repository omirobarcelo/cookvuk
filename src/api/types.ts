export interface Recipe {
    name: string;
    cookingTime: number;
    ingredients: string;
    steps: string;
}

export interface RecipeVersion {
    date: Date;
    recipe: Recipe;
}

export type RecipeHistory = RecipeVersion[];

export interface CookbookEntry {
    id: string;
    history: RecipeHistory;
}

export type Cookbook = CookbookEntry[];

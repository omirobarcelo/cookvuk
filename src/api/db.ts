import type { Cookbook, CookbookEntry, RecipeVersion } from './types';

export const cookbook: Cookbook = [
  {
    id: '1',
    history: [
      {
        date: new Date('2023-01-01'),
        recipe: {
          name: 'Pancakes',
          cookingTime: 20,
          ingredients: '2 cups flour, 2 eggs, 1 cup milk, 1 tbsp sugar, 1 tsp baking powder, pinch of salt',
          steps:
            '1. Mix all ingredients. 2. Heat a pan. 3. Pour batter onto pan. 4. Cook until bubbles form. 5. Flip and cook until golden brown.'
        }
      }
    ]
  },
  {
    id: '2',
    history: [
      {
        date: new Date('2023-01-02'),
        recipe: {
          name: 'Spaghetti Carbonara',
          cookingTime: 30,
          ingredients: '200g spaghetti, 100g pancetta, 2 eggs, 1/2 cup grated Parmesan, 2 cloves garlic, salt, pepper',
          steps:
            '1. Cook spaghetti. 2. Fry pancetta and garlic. 3. Beat eggs and mix with cheese. 4. Combine everything. 5. Season with salt and pepper.'
        }
      }
    ]
  },
  {
    id: '3',
    history: [
      {
        date: new Date('2023-01-03'),
        recipe: {
          name: 'Grilled Cheese Sandwich',
          cookingTime: 10,
          ingredients: '2 slices of bread, 2 slices of cheese, butter',
          steps:
            '1. Butter one side of each bread slice. 2. Place cheese between bread slices, buttered sides out. 3. Grill until golden brown on both sides.'
        }
      }
    ]
  },
  {
    id: '4',
    history: [
      {
        date: new Date('2023-01-04'),
        recipe: {
          name: 'Tomato Soup',
          cookingTime: 40,
          ingredients:
            '1 tbsp olive oil, 1 onion, 2 cloves garlic, 4 cups tomatoes, 2 cups vegetable broth, salt, pepper, basil',
          steps:
            '1. Sauté onion and garlic in olive oil. 2. Add tomatoes and broth. 3. Simmer for 30 minutes. 4. Blend until smooth. 5. Season and garnish with basil.'
        }
      }
    ]
  },
  {
    id: '5',
    history: [
      {
        date: new Date('2023-01-05'),
        recipe: {
          name: 'Caesar Salad',
          cookingTime: 15,
          ingredients: '1 head romaine lettuce, 1/2 cup croutons, 1/4 cup grated Parmesan, Caesar dressing',
          steps: '1. Chop lettuce. 2. Add croutons and cheese. 3. Toss with dressing.'
        }
      }
    ]
  },
  {
    id: '6',
    history: [
      {
        date: new Date('2023-01-06'),
        recipe: {
          name: 'Chicken Stir Fry',
          cookingTime: 25,
          ingredients:
            '1 tbsp oil, 1 lb chicken breast, 2 cups mixed vegetables, 2 tbsp soy sauce, 1 clove garlic, ginger, salt, pepper',
          steps:
            '1. Heat oil in a pan. 2. Cook chicken until browned. 3. Add garlic and ginger. 4. Add vegetables and cook until tender. 5. Stir in soy sauce and seasonings.'
        }
      }
    ]
  },
  {
    id: '7',
    history: [
      {
        date: new Date('2023-01-07'),
        recipe: {
          name: 'Beef Tacos',
          cookingTime: 20,
          ingredients:
            '1 lb ground beef, taco seasoning, taco shells, shredded lettuce, diced tomatoes, shredded cheese, sour cream',
          steps:
            '1. Cook beef with seasoning. 2. Fill taco shells with beef. 3. Top with lettuce, tomatoes, cheese, and sour cream.'
        }
      }
    ]
  },
  {
    id: '8',
    history: [
      {
        date: new Date('2023-01-08'),
        recipe: {
          name: 'Vegetable Curry',
          cookingTime: 35,
          ingredients:
            '1 tbsp oil, 1 onion, 2 cloves garlic, 1 tbsp curry powder, 2 cups mixed vegetables, 1 cup coconut milk, 1 cup vegetable broth, salt, pepper',
          steps:
            '1. Sauté onion and garlic in oil. 2. Add curry powder and cook for 1 minute. 3. Add vegetables, coconut milk, and broth. 4. Simmer until vegetables are tender. 5. Season with salt and pepper.'
        }
      }
    ]
  },
  {
    id: '9',
    history: [
      {
        date: new Date('2023-01-09'),
        recipe: {
          name: 'Chocolate Chip Cookies',
          cookingTime: 25,
          ingredients:
            '1 cup butter, 1 cup sugar, 2 cups flour, 1 tsp baking soda, 1/2 tsp salt, 2 cups chocolate chips, 2 eggs, 1 tsp vanilla extract',
          steps:
            '1. Cream butter and sugar. 2. Add eggs and vanilla. 3. Mix in dry ingredients. 4. Stir in chocolate chips. 5. Drop by spoonfuls onto baking sheet. 6. Bake at 350°F for 10-12 minutes.'
        }
      }
    ]
  },
  {
    id: '10',
    history: [
      {
        date: new Date('2023-01-10'),
        recipe: {
          name: 'Banana Bread',
          cookingTime: 60,
          ingredients:
            '3 ripe bananas, 1/3 cup melted butter, 1 cup sugar, 1 egg, 1 tsp vanilla extract, 1 tsp baking soda, pinch of salt, 1 1/2 cups flour',
          steps:
            '1. Mash bananas. 2. Mix in melted butter. 3. Add sugar, egg, and vanilla. 4. Sprinkle in baking soda and salt. 5. Add flour and mix until combined. 6. Pour into a greased loaf pan. 7. Bake at 350°F for 1 hour.'
        }
      }
    ]
  }
];

const sortByDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

export function getCookbook(): Cookbook {
  return cookbook.map((entry) => ({ id: entry.id, history: [...entry.history].sort(sortByDateDesc) }));
}

export function getCookbookEntry(id: string): CookbookEntry | undefined {
  let entry = cookbook.find((e) => e.id === id);
  if (entry != null) {
    entry = { ...entry, history: [...entry.history].sort(sortByDateDesc) };
  }
  return entry;
}

export function addEntry(version: RecipeVersion): { ok: 1 } {
  cookbook.push({ id: `${version.recipe.name}_${Math.random()}`, history: [version] });
  return { ok: 1 };
}

export function addVersion(id: string, version: RecipeVersion): { ok: 1 } {
  const entry = cookbook.find((e) => e.id === id);
  if (entry != null) {
    entry.history.push(version);
  }
  return { ok: 1 };
}

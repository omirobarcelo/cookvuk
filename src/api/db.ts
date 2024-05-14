import type { Cookbook, CookbookEntry, RecipeVersion } from "./types";

const cookbook: Cookbook = [
    {
        id: 'R1',
        history: [
        {
            date: new Date('2024-04-21'),
            recipe: {
                name: 'R1',
                cookingTime: 45,
                ingredients: 'i1.a',
                steps: 's1.a'
            }
        },
        {
            date: new Date('2024-04-17'),
            recipe: {
                name: 'R1',
                cookingTime: 45,
                ingredients: 'i1.b',
                steps: 's1.a'
            }
        }
    ]
    },
    {
        id: 'R2',
        history: [
        {
            date: new Date('2024-03-10'),
            recipe: {
                name: 'R2',
                cookingTime: 45,
                ingredients: 'i2.a',
                steps: 's2.a'
            }
        },
        {
            date: new Date('2024-03-15'),
            recipe: {
                name: 'R2',
                cookingTime: 45,
                ingredients: 'i2.b',
                steps: 's2.b'
            }
        }
    ]
    }
];

const sortByDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

export function getCookbook(): Cookbook {
    return cookbook.map(entry => ({ id: entry.id, history: [...entry.history].sort(sortByDateDesc) }));
}

export function getCookbookEntry(id: string): CookbookEntry | undefined {
    let entry = cookbook.find(e => e.id === id);
    if (entry != null) {
        entry = { ...entry, history: [...entry.history].sort(sortByDateDesc) };
    }
    return entry;
}

export function addVersion(id: string, version: RecipeVersion): { ok: 1 } {
    const entry = cookbook.find(e => e.id === id);
    if (entry != null) {
        entry.history.push(version);
    }
    return { ok: 1 };
}

// console.log(getCookbook());
// addVersion('R2', { 
//     date: new Date('2024-03-12'),
//     recipe: {
//         name: 'R2',
//         cookingTime: 45,
//         ingredients: 'i2.c',
//         steps: 's2.c'
//     }
//  });
//  console.log(getCookbook());
//  console.log(cookbook);
// console.log(getCookbookEntry('R2'));

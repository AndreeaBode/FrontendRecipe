export interface SearchFoodOptions {
    query: string;
    diet?: string;
    intolerances?: string;
    includeIngredients?: string;
    excludeIngredients?: string;
    maxReadyTime?: number;
    minCarbs?: number;
    maxCarbs?: number;
    minProtein?: number;
    maxProtein?: number;
    minCalories?: number;
    maxCalories?: number;
    minFat?: number;
    maxFat?: number;
    minCholesterol?: number;
    maxCholesterol?: number;
    minSugar?: number;
    maxSugar?: number;
  }
  
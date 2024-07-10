import { RecipeUnderReviewIngredient } from "./recipe-under-review-instruction";
import { RecipeUnderReviewStep } from "./recipe-under-review-step";

export class RecipeUnderReview {
  title: string;
  image: string;
  ingredients: RecipeUnderReviewIngredient[] = [];
  instructions: RecipeUnderReviewStep[] = [];

  constructor(title: string, image: string, ingredients: RecipeUnderReviewIngredient[], instructions: RecipeUnderReviewStep[]) {
    this.title = title;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}

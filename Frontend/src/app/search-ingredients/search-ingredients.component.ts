import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-search-ingredients',
  templateUrl: './search-ingredients.component.html',
  styleUrls: ['./search-ingredients.component.scss']
})
export class SearchIngredientsComponent {

  searchResult: any[] = [];
  ingredients: string = '';
  ranking: number = 1;
  recipes: any[] = [];
  errorMessage: string = '';

  constructor(private recipeService: RecipeService, private router: Router,
    private authService: AuthService, private likeService: LikeService){}

    searchByIngredients(): void {
      const formattedIngredients = this.ingredients.split(',').map(ingredient => ingredient.trim()).join(',');
    
      this.recipeService.findRecipesByIngredients(formattedIngredients, this.ranking).subscribe(
        (response: any) => {
          this.searchResult = response;
          console.log("Search results:", response);
          this.recipes = this.searchResult;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Error fetching recipes. Please try again.';
          this.searchResult = [];
        }
      );
    }
    
  
    showRecipeDetails(recipeId: number) {
      this.router.navigate(['/advanced-detail', recipeId]);
    }

  toggleLike(recipe: any): void {

    console.log("RR3", recipe);
    const userId = this.authService.userId();
    if (!userId) {
     
      return;
    }

    const recipeId = recipe.id;
    const name = "spoonacular";
    console.log(name);
    recipe.isLoved = !recipe.isLoved;

    console.log("ue", userId);
    console.log("re", recipeId);
    console.log("ne", name);
    console.log("Lo", recipe.isLoved);
    this.likeService.toggleLike(userId, recipeId,recipe.isLoved, name).subscribe(
      response => {
        console.log('Succes');
       // window.location.reload();
      },
      (error) =>{
        console.log('Esec', error);
      }
    )
  }



  checkIfLiked(recipe: any): void {
    console.log("Recipe object:", recipe); 
    const userId = this.authService.userId();
    const recipeId = recipe.id;
    const name = "spoonacular";
    console.log("name", name);

 
    console.log("U", userId);
    console.log("R",  recipe.id);
    this.recipeService.checkIfLiked(userId, recipeId).subscribe(
      response => {
        recipe.isLoved = response; 
      },
      error => {
        console.error('Error checking if liked:', error);
      }
    );
  }
  
}

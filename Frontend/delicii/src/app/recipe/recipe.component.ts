import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  searchResult: any[] = [];
  randomRecipes: any;
  searchTerm: string = '';
  recipeUrl: string = '';
  extractedRecipe: any;
  recipeDetails: any = {};
  
  
  constructor(private recipeService: RecipeService,    
    private authService: AuthService,
    private router: Router,
    private likeService: LikeService) {}

  searchFood(query: string): void {
    this.recipeService.searchFood(query).subscribe(
      (response: any) => {
        this.searchResult = response.results; 
        this.searchResult.forEach(recipe => {
          console.log("C", recipe);
          if (recipe) {
              this.checkIfLiked(recipe);
          }
      });
        console.log("Search results:", this.searchResult); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
      }
    );
  }
  
  

  getRandomRecipes(): void {
    this.recipeService.getRandomRecipes().subscribe(
      (response: any) => {
        this.randomRecipes = response.recipes; 
        console.log("random", this.randomRecipes);
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
      }
    );
  }

  showRecipeDetails(recipeId: number) {
    this.router.navigate(['/advanced-detail', recipeId]);
  }

  toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) {
      return;
    }

    const recipeId = recipe.id;
    const name = "spoonacular";
    console.log(name);
    recipe.isLoved = !recipe.isLoved;

    console.log("Lo", recipe.isLoved);
    this.likeService.toggleLike(userId, recipeId, recipe.isLoved, name).subscribe(
      response => {
        console.log('Succes');
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
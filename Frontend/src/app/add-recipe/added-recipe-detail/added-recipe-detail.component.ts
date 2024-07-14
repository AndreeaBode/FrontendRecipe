import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-added-recipe-detail',
  templateUrl: './added-recipe-detail.component.html',
  styleUrls: ['./added-recipe-detail.component.scss']
})
export class AddedRecipeDetailComponent implements OnInit {
  recipes: any[] = [];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAddedRecipeDetails().subscribe(
      (response: any) => {
        this.recipes = response;
        this.recipes.forEach(recipe => {
          console.log("D", recipe);
          this.checkIfLiked(recipe); 
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  checkIfLiked(recipe: any): void {
    const userId = this.authService.userId();
    const recipeId = recipe.id;

    this.recipeService.checkIfLiked(userId, recipeId).subscribe(
      response => {
        recipe.isLoved = response; 
      },
      error => {
        console.error('Error checking if liked:', error);
      }
    );
  }


  showRecipeDetails(id: number): void {
    this.router.navigate(['/details', id, 'addedRecipe']);
  }




  toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) {
      
      return;
    }

    const recipeId = recipe.id;
    const name = "added_recipes";
    console.log(name);
    recipe.isLoved = !recipe.isLoved;

    console.log("Afiseazaaaaaaaaa!!!!!!!!!!", recipe.isLoved);
    this.likeService.toggleLike(userId, recipeId, recipe.isLoved, name).subscribe(
      response => {
        console.log('Succes');
      },
      (error) =>{
        console.log('Esec', error);
      }
    )
  }



}

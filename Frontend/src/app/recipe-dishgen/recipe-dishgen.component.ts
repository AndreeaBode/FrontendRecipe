import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LikeService } from '../services/like.service';
import { RecipeService } from '../services/recipe.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recipe-dishgen',
  templateUrl: './recipe-dishgen.component.html',
  styleUrls: ['./recipe-dishgen.component.scss']
})
export class RecipeDishgenComponent implements OnInit {
  recipes: any[] = [];
  pagedRecipes: any[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService,
    private likeService: LikeService
  ) { }

  ngOnInit(): void {
    this.loadRecipes();

  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data: any[]) => {
        this.recipes = data;
        this.updatePagedRecipes(0); 
        this.recipes.forEach(recipe => {
          console.log("C", recipe);
          if (recipe) {
              this.checkIfLiked(recipe);
          }
      });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showRecipeDetails(id: number): void {
    this.router.navigate(['/details', id, 'dishgen']);
  }

  toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) {
      return;
    }

    const recipeId = recipe.id;
    const name = "extracted_recipes";
    recipe.isLoved = !recipe.isLoved;

    this.likeService.toggleLike(userId, recipeId, recipe.isLoved, name).subscribe(
      response => {
        console.log('Success');
      },
      (error) => {
        console.log('Error', error);
      }
    )
  }

  checkIfLiked(recipe: any): void {
    const userId = this.authService.userId();
    const recipeId = recipe.id;
    this.recipeService.checkIfLiked(userId, recipeId).subscribe(
      response => {
        recipe.isLoved = response;
        console.log("isLoved ", response);
      },
      error => {
        console.error('Error checking if liked:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.updatePagedRecipes(startIndex);
  }

  updatePagedRecipes(startIndex: number): void {
    this.pagedRecipes = this.recipes.slice(startIndex, startIndex + 19);
  }
}

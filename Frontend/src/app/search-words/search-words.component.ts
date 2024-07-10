import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import { LikeService } from '../services/like.service';

@Component({
  selector: 'app-search-words',
  templateUrl: './search-words.component.html',
  styleUrls: ['./search-words.component.scss']
})
export class SearchWordsComponent implements OnInit {
  recipes: any[] = [];
  pagedRecipes: any[] = [];
  constructor(private router: Router, private recipeService: RecipeService, private likeService: LikeService, private searchResultsService: RecipeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.recipes = this.searchResultsService.getCachedResults();
    this.updatePagedRecipes(0); 
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
      error => {
        console.log('Error', error);
      }
    );
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
    this.pagedRecipes = this.recipes.slice(startIndex, startIndex + 16);
  }
}

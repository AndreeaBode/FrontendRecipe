import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-extract-recipe',
  templateUrl: './extract-recipe.component.html',
  styleUrls: ['./extract-recipe.component.scss']
})
export class ExtractRecipeComponent {
  searchResult: any[] = [];
  randomRecipes: any;
  searchTerm: string = '';
  recipeUrl: string = '';
  extractedRecipe: any;
  recipeDetails: any = {};
  showInfo: boolean = false;
  
  constructor(private recipeService: RecipeService, private toastr: ToastrService) {}

  extractRecipe(url: string): void {
    this.recipeService.extractRecipe(url).subscribe(
      (response: any) => {
        this.recipeDetails = response;
        console.log("Resss ", response);
        console.log("Extracted Recipe:", this.recipeDetails);
        this.showInfo = true; 
      },
      (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.toastr.error('A recipe with the same title already exists');
        } else {
          this.toastr.error('An error occurred while processing the request.');
        }
        console.error('Error:', error);
      }
    );
  }

  getDishTypes(): string {
    return this.recipeDetails.dishTypes?.join(', ');
  }

  getDiets(): string {
    return this.recipeDetails.diets?.join(', ');
  }

  getProteinPercentage(): number {
    return this.recipeDetails.nutrition.caloricBreakdown?.percentProtein || 0;
  }

  getFatPercentage(): number {
    return this.recipeDetails.nutrition.caloricBreakdown?.percentFat || 0;
  }

  getCarbsPercentage(): number {
    return this.recipeDetails.nutrition.caloricBreakdown?.percentCarbs || 0;
  }
}

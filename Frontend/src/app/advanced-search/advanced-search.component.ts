import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchFoodOptions } from '../search-food-options';
import { AuthService } from '../auth.service';
import { LikeService } from '../services/like.service';
import { PaymentService } from '../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  searchResult: any[] = [];
  searchTerm: string = '';
  diet: string = '';
  intolerances: string = '';
  includeIngredients: string = '';
  excludeIngredients: string = '';
  maxReadyTime: number = 0;
  minCarbs: number = 0;
  maxCarbs: number = 0;
  minProtein: number = 0;
  maxProtein: number = 0;
  minCalories: number = 0;
  maxCalories: number = 0;
  minFat: number = 0;
  maxFat: number = 0;
  minCholesterol: number = 0;
  maxCholesterol: number = 0;
  minSugar: number = 0;
  maxSugar: number = 0;
  paymentUrl: string = '';


  constructor(
    private recipeService: RecipeService, 
    private toastr: ToastrService, 
    private router: Router, 
    private authService: AuthService, 
    private paymentService: PaymentService, 
    private likeService: LikeService,
    private cdr: ChangeDetectorRef
  ) {}

  searchFoodAdvanced(options: SearchFoodOptions): void {
    const userId = this.authService.userId();
    this.recipeService.searchFoodAdvanced(options, userId).subscribe(
        (response: any) => {
            console.log("Response: ", response);
            this.searchResult = response.results;
        },
        (error: HttpErrorResponse) => {
            console.log("Error: ", error);
            if (error.status === 403 && error.error === 'Search limit exceeded. Please make a payment.') {
              this.toastr.error('Search limit exceeded. Please make a payment.');
                this.promptPayment(userId);
            } else {
                console.error('Error:', error);
                this.toastr.error("Search limit exceeded. Please make a payment.");
            }
        }
    );
  }

  
  promptPayment(userId: number): void {
      this.paymentService.createCheckoutSession(userId).subscribe(
          (response: any) => {
              console.log('Payment URL:', response);
              this.paymentUrl = response;
              this.cdr.detectChanges();
          },
          (error: HttpErrorResponse) => {
              console.error('Payment error:', error);
          }
      );
  }
  


  showRecipeDetails(recipeId: number) {
    this.router.navigate(['/advanced-detail', recipeId]);
  }

  toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) return;

    recipe.isLoved = !recipe.isLoved;

    this.likeService.toggleLike(userId, recipe.id, recipe.isLoved, "spoonacular").subscribe(
      response => {
        console.log('Success');
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  checkIfLiked(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) return;

    this.recipeService.checkIfLiked(userId, recipe.id).subscribe(
      response => {
        recipe.isLoved = response;
      },
      error => {
        console.error('Error checking if liked:', error);
      }
    );
  }
}

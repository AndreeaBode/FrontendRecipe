import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from 'src/app/services/predict.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-advanced-detail',
  templateUrl: './advanced-detail.component.html',
  styleUrls: ['./advanced-detail.component.scss']
})
export class AdvancedDetailComponent implements OnInit {
 
  recipeId!: number;
  recipe: any;
  nutritionData: any;
  ingredients: any[] = []; 
  prediction: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private predictionService: PredictionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      
      this.recipeService.getRecipeInformation(this.recipeId, false).subscribe(
        (response) => {
          this.recipe = response;
          console.log('Detaliile rețetei:', this.recipe);
          this.extractIngredients();
          this.getPrediction();
        },
        (error) => {
          console.error('Eroare la obținerea detaliilor rețetei:', error);
        }
      );

      this.recipeService.getRecipeNutritionWidget(this.recipeId).subscribe(
        (response) => {
          this.nutritionData = response;
          console.log('Datele de nutriție:', this.nutritionData);
        },
        (error) => {
          console.error('Eroare la obținerea datelor de nutriție:', error);
        }
      );
    });
  }

  
  extractIngredients(): void {
    if (this.recipe && this.recipe.ingredients) {
      this.ingredients = this.recipe.ingredients.map((ingredient: any) => ingredient.ingredient);
      console.log("Extracted Ingredients:", this.ingredients);
    }
  }

  getPrediction(): void {
    this.predictionService.getPrediction(this.ingredients)
      .subscribe(
        data => {
          console.log("Ingredients ", this.ingredients);
          this.prediction = data.prediction;
          console.log('Prediction:', this.prediction);
        },
        error => {
          console.error('There was an error!', error);
        }
      );
      }
}
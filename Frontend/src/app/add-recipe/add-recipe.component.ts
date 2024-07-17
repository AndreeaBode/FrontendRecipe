import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Instruction } from '../models/instruction';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  recipe: Recipe = new Recipe('', '', [], []); 
  newIngredient: string = ''; 
  newInstruction: string = '';

  constructor(private toastr: ToastrService, private recipeService: RecipeService) {}
  
  submitRecipe(): void {
    if (!this.recipe.title || !this.recipe.image) {
      alert('Te rugăm să completezi titlul și imaginea rețetei.');
      return;
    }
  
    const recipe = new Recipe(this.recipe.title, this.recipe.image, this.recipe.ingredients, this.recipe.instructions);
    console.log("Recipe to submit:", recipe);
  
    this.recipeService.submitRecipe(recipe)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.toastr.success('Rețetă adăugată cu succes!', 'Succes');
            this.resetForm();
            this.newIngredient = '';
            this.newInstruction = '';
          } else {
            this.toastr.error('Eroare la adăugarea rețetei. Te rugăm să încerci din nou mai târziu.', 'Eroare');
          }
        },
        (error: any) => {
          console.error('Eroare la adăugarea rețetei:', error);
          this.toastr.error('Eroare la adăugarea rețetei. Te rugăm să încerci din nou mai târziu.', 'Eroare');
        }
      );
  }
  
  

  resetForm(): void {
    this.recipe = new Recipe('', '', [], []); 
  }

  addFieldIngredient(): void {
    this.recipe.ingredients.push(new Ingredient('')); 
  }

  addFieldStep(): void {
    this.recipe.instructions.push(new Instruction('')); 
  }
}

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
          this.checkIfLiked(recipe); //76
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
        recipe.isLoved = response; // Actualizăm starea inimii pentru rețeta curentă
      },
      error => {
        console.error('Error checking if liked:', error);
      }
    );
  }

 /* toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) {
      // Nu putem adăuga sau șterge like-ul fără un utilizator autentificat
      return;
    }

    const recipeId = recipe.id;
    const name = "added_recipes";
    console.log(name);
    recipe.isLoved = !recipe.isLoved;

    if (recipe.isLoved) {
      this.saveLikeToDatabase(userId, recipeId, name); 
    } else { 
      this.deleteLikeFromDatabase(userId, recipeId, name); 
    }
  }

  saveLikeToDatabase(userId: number, recipeId: number, name: string): void {
    this.recipeService.saveLike(userId, recipeId, name).subscribe(
      response => {
        console.log('Datele au fost salvate cu succes în baza de date!');
      },
      error => {
        console.error('Eroare la salvarea datelor în baza de date:', error);
      }
    );
  }
  
  deleteLikeFromDatabase(userId: number, recipeId: number, name: string): void {
    this.recipeService.deleteLike(userId, recipeId, name).subscribe(
      response => {
        console.log('Datele au fost șterse cu succes din baza de date!');
      },
      error => {
        console.error('Eroare la ștergerea datelor din baza de date:', error);
      }
    );
  }
*/
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

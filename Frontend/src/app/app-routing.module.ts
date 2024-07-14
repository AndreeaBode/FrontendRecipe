import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { ExtractRecipeComponent } from './extract-recipe/extract-recipe.component';
import { SearchIngredientsComponent } from './search-ingredients/search-ingredients.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedDetailComponent } from './advanced-search/advanced-detail/advanced-detail.component';
import { RecipeDishgenComponent } from './recipe-dishgen/recipe-dishgen.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddedRecipeDetailComponent } from './add-recipe/added-recipe-detail/added-recipe-detail.component';
import { DetailsComponent } from './details/details.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RecipeUnderReviewComponent } from './recipe-under-review/recipe-under-review.component';
import { SearchWordsComponent } from './search-words/search-words.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'extract-recipe', component: ExtractRecipeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'search-ingredients', component: SearchIngredientsComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'advanced-search', component: AdvancedSearchComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'advanced-detail/:id', component: AdvancedDetailComponent, },
  { path: 'dishgen', component: RecipeDishgenComponent },
  { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'add', component: AddRecipeComponent, canActivate: [AuthGuard], data: { roles: ['Admin','User', 'Premium'] } },
  { path: 'add-recipe-detail', component: AddedRecipeDetailComponent }, 
  { path: 'recipe-under-review', component: RecipeUnderReviewComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'search-words', component: SearchWordsComponent },
  { path: 'details/:id/:sourcePage', component: DetailsComponent }, 
  { path: 'payment', component: PaymentComponent }, 
  { path: 'success', component: SuccessComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token-interceptor'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { TitlecasePipe } from './titlecase.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { ExtractRecipeComponent } from './extract-recipe/extract-recipe.component';
import { SearchIngredientsComponent } from './search-ingredients/search-ingredients.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedDetailComponent } from './advanced-search/advanced-detail/advanced-detail.component';
import { RecipeDishgenComponent } from './recipe-dishgen/recipe-dishgen.component';import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ToastrModule } from 'ngx-toastr';
import { AddedRecipeDetailComponent } from './add-recipe/added-recipe-detail/added-recipe-detail.component';
import { DetailsComponent } from './details/details.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RecipeUnderReviewComponent } from './recipe-under-review/recipe-under-review.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchWordsComponent } from './search-words/search-words.component';
import { PaymentComponent } from './payment/payment.component';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { SuccessComponent } from './success/success.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatInputModule, 
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
   

  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    TitlecasePipe,
    HomePageComponent,
    RecipeComponent,
    RecipeDetailComponent,
    ExtractRecipeComponent,
    SearchIngredientsComponent,
    AdvancedSearchComponent,
    AdvancedDetailComponent,
    RecipeDishgenComponent,
    AddRecipeComponent,
    AddedRecipeDetailComponent,
    DetailsComponent,
    DropdownMenuComponent,
    FavoriteComponent,
    RecipeUnderReviewComponent,
    NavbarComponent,
    SearchWordsComponent,
    PaymentComponent,
    SuccessComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

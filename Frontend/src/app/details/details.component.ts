import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PredictionService } from '../services/predict.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  recipe: any;
  recipeDetails: any = {};
  id: number = 0;
  isLoved: boolean = false;
  loading: boolean = false;
  name: string = '';
  comments: any[] = [];
  newComment: string = '';
  reviewsUpdate: any[] = [];
  reviews: any[] = [];
  newReview: any = { rating: 0 };
  isReviewed: boolean = false;
  ingredients: any[] = [];
  prediction: any;
  errorMessage: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private predictionService: PredictionService
  ) {}

  ngOnInit(): void {
    const recipeId = +this.route.snapshot.paramMap.get('id')!;
    if (recipeId) {
      const sourcePage = this.route.snapshot.paramMap.get('sourcePage');
      this.name = sourcePage ?? '';
      this.loading = true;

      if (sourcePage === 'addedRecipe') {
        this.recipeService.getAddeddRecipeDetails(recipeId).subscribe(
          (recipe: any) => {
            this.recipe = recipe;
            this.loading = false;
            this.extractIngredients();
            this.getPrediction();
          },
          (error: any) => {
            console.error('Error loading added recipe:', error);
            this.loading = false;
          }
        );
      } else if (sourcePage === 'dishgen') {
        this.recipeService.getRecipeDishgenDetails(recipeId).subscribe(
          (recipe: any) => {
            this.recipe = recipe;
            this.recipeDetails = recipe;
            this.loading = false;
            this.extractIngredients();
            this.getPrediction();
          },
          (error: any) => {
            console.error('Error loading dishgen recipe:', error);
            this.loading = false;
          }
        );
      } else if (sourcePage === 'spoonacular') {
        this.recipeService.getRecipeInformation(recipeId, false).subscribe(
          (response) => {
            this.recipe = response;
            this.extractIngredients();
            this.getPrediction();
          },
          (error) => {
            console.error('Error getting recipe details:', error);
          }
        );
      }
    } else {
      console.error('Cannot obtain recipe ID.');
    }

    this.isAuthenticated = this.authService.isLoggedIn();
    console.log("Login", this.isAuthenticated);
    console.log("Review", this.isReviewed);
    this.getComments();
    this.getReviews();
    this.addOrUpdateReview();
  }

  extractIngredients(): void {
    if (this.recipe && this.recipe.ingredients) {
      this.ingredients = this.recipe.ingredients.map((ingredient: any) => ingredient.ingredient);
      console.log('Extracted Ingredients:', this.ingredients);
    }
  }

  getPrediction(): void {
    this.predictionService.getPrediction(this.ingredients).subscribe(
      (data) => {
        if (data.prediction && data.prediction.length === 1 && data.prediction[0].length === 0) {
          this.prediction = null;
          this.errorMessage = 'SORRY, but we have a small problem! Please come back!';
        } else {
          this.prediction = data.prediction;
        }
        console.log('Prediction:', this.prediction);
      },
      (error) => {
        console.error('There was an error!', error);
        this.errorMessage = 'SORRY, but we have a small problem! please come back';
      }
    );
  }

  toggleLike(recipe: any): void {
    const userId = this.authService.userId();
    if (!userId) {
      return;
    }

    const recipeId = recipe.id;
    const name = this.name;
    this.isLoved = !this.isLoved;

    if (this.isLoved) {
      this.saveLikeToDatabase(userId, recipeId, name);
    } else {
      this.deleteLikeFromDatabase(userId, recipeId, name);
    }
  }

  saveLikeToDatabase(userId: number, recipeId: number, name: string): void {
    this.recipeService.saveLike(userId, recipeId, name).subscribe(
      (response) => {
        console.log('Data successfully saved to the database!');
      },
      (error) => {
        console.error('Error saving data to the database:', error);
      }
    );
  }

  deleteLikeFromDatabase(userId: number, recipeId: number, name: string): void {
    this.recipeService.deleteLike(userId, recipeId, name).subscribe(
      (response) => {
        console.log('Data successfully deleted from the database!');
      },
      (error) => {
        console.error('Error deleting data from the database:', error);
      }
    );
  }

  getComments(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }
    if (id) {
      this.recipeService.getCommentsByRecipeId(username, id, additionalPath)?.subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

  addComment(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const userId = this.authService.userId();
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }

    if (id) {
      this.recipeService.addCommentToRecipe(id, userId, username, { content: this.newComment }, additionalPath)?.subscribe((comment) => {
        this.comments.push(comment);
        this.newComment = '';
        location.reload();
      });
    }
  }

  getReviews(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const userId = this.authService.userId();
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }

    if (id) {
      this.recipeService.getReviewsByRecipeId(username, id, additionalPath)?.subscribe((reviews) => {
        this.reviews = reviews;
      });
    }
  }

  addReview(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const userId = this.authService.userId();
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }

    if (id) {
      this.recipeService.addReviewToRecipe(id, this.newReview, userId, username, additionalPath)?.subscribe((review) => {
        this.reviews.push(review);
        this.newReview = { rating: 0 };
        location.reload();
      });
    }
  }

  setRating(rating: number): void {
    this.newReview.rating = rating;
  }

  getStarArray(rating: number): boolean[] {
    const starArray: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(i < rating);
    }
    return starArray;
  }

  calculateAverageRating(): string {
    if (!this.reviews || this.reviews.length === 0) {
      return 'N/A';
    }

    const ratings = this.reviews.filter((review) => review !== null).map((review) => parseInt(review.rating, 10));

    const allRatingsValid = ratings.every((rating) => !isNaN(rating) && Number.isInteger(rating));

    if (!allRatingsValid) {
      return 'N/A';
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return average.toFixed(2);
  }

  addOrUpdateReview(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const userId = this.authService.userId();
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }

    if (id) {
      this.recipeService.checkReview(userId, id, additionalPath)?.subscribe((response) => {
        if (response) {
          this.isReviewed = true;
          this.reviewsUpdate = [response];
        } else {
          this.isReviewed = false;
        }
      });
    }
  }

  updateRating(newRating: number): void {
    if (this.reviewsUpdate.length > 0) {
      this.reviewsUpdate[0].rating = newRating;
      this.newReview.rating = newRating.toString();
    }
  }

  updateReview(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    const userId = this.authService.userId();
    const urlParts = this.route.snapshot.url.map((segment) => segment.path);
    const username = this.authService.username();

    let additionalPath = '';
    console.log("");
    if (urlParts.length > 1) {
      additionalPath = urlParts[2];
    }

    if (id) {
      this.recipeService.updateReviewOfRecipe(id, this.newReview, userId, username, additionalPath)?.subscribe((updatedReview) => {
        location.reload();
      });
    }
  }
}

import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private recipeService: RecipeService) { }

  toggleLike(userId: number, recipeId: number, isLiked: boolean, name: string): Observable<any> {
    const likeObservable = isLiked ? this.saveLike(userId, recipeId, name) : this.deleteLike(userId, recipeId, name);
    return likeObservable;
  }

  saveLike(userId: number, recipeId: number, name: string): Observable<any> {
    console.log("S");
    return this.recipeService.saveLike(userId, recipeId, name);
  }
  
  deleteLike(userId: number, recipeId: number, name: string): Observable<any> {
    console.log("D");
    return this.recipeService.deleteLike(userId, recipeId, name);
  }
}

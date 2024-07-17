import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeUnderReviewService {
  private apiUrl = 'http://backendrecipe-production.up.railway.app:8080'; 

  constructor(private http: HttpClient) { }

  getRecipesUnderReview(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipes/under-review`);
  }

  submitAction(recipeId: number, action: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recipes/${recipeId}/${action}`, null);
  }

  deleteRecipe(recipeId: number): Observable<any> {
    const url = `${this.apiUrl}/recipes/delete/under-review/${recipeId}`; 
    return this.http.delete(url);
  }
  
}

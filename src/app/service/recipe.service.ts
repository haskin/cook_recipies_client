import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipe?: Recipe;
  readonly recipeUrlPrefix = 'http://localhost:8080/api/recipe';
  constructor(private httpClient: HttpClient) {}
  getRecipeById(recipeId: number) {
    let url = `${this.recipeUrlPrefix}/${recipeId}`;
    return this.httpClient.get<Recipe>(url);
  }
}

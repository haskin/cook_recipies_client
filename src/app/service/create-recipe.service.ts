import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../model/Ingredient';
import { Recipe } from '../model/Recipe';
import { RecipeResponse } from '../model/RecipeReponse';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeService {
  private readonly RECIPE_URL = 'http://localhost:8080/api/recipe';
  private readonly USER_RECIPE_URL = 'http://localhost:8080/api/user/recipe';
  constructor(private httpClient: HttpClient) {}

  createRecipe(ingredients: Ingredient[], recipe: Recipe) {
    ingredients = ingredients.filter(
      (ingredient) => ingredient.name.trim().length > 0
    );
    if (ingredients.length < 0) {
      this.postRecipe(recipe);
      return;
    }

    postRecipeWithIngredients(ingredients, recipe);
  }
  postRecipe(recipe: Recipe) {
    this.httpClient
      .post<RecipeResponse>(this.RECIPE_URL, recipe)
      .subscribe((recipeResponse) => this.postRecipeToUser(recipeResponse.id));
  }

  putRecipeToUser(recipeId: number) {
    this.httpClient
      .put<Recipe>(`${this.USER_RECIPE_URL}/${recipeId}`)
      .subscribe((response) => console.log(response));
  }
  dataToRecipe(
    recipeName: string,
    recipeImage: string,
    instructions: string[]
  ): Recipe {
    let delimeter = '|';
    let instructionString: string = instructions
      .map((instruction) => instruction.trim())
      .filter((instruction) => instruction.length > 0)
      .join(delimeter);
    return {
      name: recipeName,
      image: recipeImage,
      instruction: instructionString,
    };
  }
  postRecipe() {}
}

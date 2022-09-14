import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
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

  trimIngredients(ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter(
      (ingredient) => ingredient.name.trim().length > 0
    );
  }
  createRecipe(ingredients: Ingredient[], recipe: Recipe): Observable<RecipeResponse> {
    ingredients = this.trimIngredients(ingredients);
    return this.postRecipe(recipe)
      .pipe(
        tap((response) => console.log(`Reponse from postRecipe(): ${response}`)));

      //   this.putRecipeToUser(recipeResponse.id)
      //     .pipe(tap((response) => console.log(response)))
      //     .subscribe((reponse) => {
      //       if (ingredients.length > 0)
      //         this.putIngredientsToRecipe(ingredients, recipeResponse.id);
      //     });
      // });
  }

  postRecipe(recipe: Recipe) {
    return this.httpClient.post<RecipeResponse>(this.RECIPE_URL, recipe);
    // .subscribe((recipeResponse) => this.putRecipeToUser(recipeResponse.id));
  }

  // postRecipeWithIngredients(ingredient: Ingredient[], recipe: Recipe) {
  //   this.httpClient
  //     .post<RecipeResponse>(this.RECIPE_URL, recipe)
  //     .subscribe((recipeResponse) => this.putRecipeToUser(recipeResponse.id));
  // }
  putRecipeToUser(recipeId: number) {
    return this.httpClient.put<Recipe>(
      `${this.USER_RECIPE_URL}/${recipeId}`,
      {}
    );
  }

  putIngredientsToRecipe(ingredients: Ingredient[], recipeId: number) {
    // 'api/recipe/{recipeId}/ingredients'
    this.httpClient
      .put<Recipe>(`${this.RECIPE_URL}/${recipeId}/ingredients`, ingredients)
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
      instructions: instructionString,
      ingredients: [],
    };
  }
}

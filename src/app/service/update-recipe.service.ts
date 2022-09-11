import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../model/Ingredient';
import { Recipe } from '../model/Recipe';

@Injectable({
  providedIn: 'root',
})
export class UpdateRecipeService {
  private readonly DELIMETER = '|';
  private readonly RECIPE_URL = 'http://localhost:8080/api/recipe';
  constructor(private httpClient: HttpClient) {}

  updateRecipe(recipe: Recipe) {
    return this.httpClient.put(`${this.RECIPE_URL}/${recipe.id}`, recipe);
  }

  convertInstructionStringToArray(instructionString: string): string[] {
    return instructionString.split(this.DELIMETER);
  }
}

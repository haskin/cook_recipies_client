import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/model/Ingredient';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import { UpdateRecipeService } from 'src/app/service/update-recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  recipe?: Recipe;
  recipeId?: number;
  recipeName: string = '';
  recipeImage: string = '';
  ingredients: Ingredient[] = [{ name: '' }];
  instructions: string[] = [''];

  constructor(
    private updateRecipeService: UpdateRecipeService,
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.activeRoute.snapshot.paramMap.get('recipeId'));
    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => {
        // this.recipe = recipeResponse
        this.recipeName = recipeResponse.name;
        this.recipeImage = recipeResponse.image;
        this.instructions =
          this.updateRecipeService.convertInstructionStringToArray(
            recipeResponse.instructions
          );
      });
  }

  addIngredient(): void {
    this.ingredients = [...this.ingredients, { name: '' }];
    console.log('Added ingredient: ' + this.ingredients);
  }
  deleteIngredient(ingredientIndex: number): void {
    console.log(this.ingredients);
    this.ingredients = [
      ...this.ingredients.slice(0, ingredientIndex),
      ...this.ingredients.slice(ingredientIndex + 1, this.ingredients.length),
    ];
    console.log(this.ingredients);
  }

  addInstruction(): void {
    this.instructions = [...this.instructions, ''];
  }

  deleteInstruction(instructionIndex: number): void {
    this.instructions = [
      ...this.instructions.slice(0, instructionIndex),
      ...this.instructions.slice(
        instructionIndex + 1,
        this.instructions.length
      ),
    ];
  }

  updateRecipe() {}

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}

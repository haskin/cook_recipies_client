import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Ingredient } from 'src/app/model/Ingredient';
import { Instruction } from 'src/app/model/Instruction';
import { Recipe } from 'src/app/model/Recipe';
import { CreateRecipeService } from 'src/app/service/create-recipe.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { UpdateRecipeService } from 'src/app/service/update-recipe.service';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';

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
  instructions: Instruction[] = [{ step: 0, description: '' }];

  constructor(
    private updateRecipeService: UpdateRecipeService,
    private createRecipeService: CreateRecipeService,
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.activeRoute.snapshot.paramMap.get('recipeId'));
    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => {
        // this.recipe = recipeResponse
        this.recipeName = recipeResponse.name;
        this.recipeImage = recipeResponse.image;
        this.instructions = recipeResponse.instructions;
        // this.instructions =
        //   this.updateRecipeService.convertInstructionStringToArray(
        //     recipeResponse.instructions
        //   );
        this.ingredients = recipeResponse.ingredients;
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
    this.instructions = [
      ...this.instructions,
      { step: this.instructions.length, description: '' },
    ];
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

  updateRecipe() {
    let ingredients = this.createRecipeService.trimIngredients(
      this.ingredients
    );

    let instructions = this.createRecipeService.trimInstructions(
      this.instructions
    );

    let recipe: Recipe = {
      id: this.recipeId,
      name: this.recipeName,
      image: this.recipeImage,
      instructions: instructions,
      ingredients: ingredients,
    };

    recipe.instructions.forEach((instruction) =>
      console.log(
        `step:${instruction.step}, description:${instruction.description}`
      )
    );

    this.updateRecipeService.updateRecipe(recipe).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Recipe has been updated successfuly', 'SUCCESS');
      },
      (error) => {
        // console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}

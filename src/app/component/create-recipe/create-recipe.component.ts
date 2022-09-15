import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/model/Ingredient';
import { Instruction } from 'src/app/model/Instruction';
import { Recipe } from 'src/app/model/Recipe';
import { CreateRecipeService } from 'src/app/service/create-recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  recipeName: string = '';
  recipeImage: string = '';
  ingredients: Ingredient[] = [{ name: '' }];
  instructions: Instruction[] = [{ step: 0, description: '' }];
  constructor(
    private createRecipeService: CreateRecipeService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
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

  submitNewRecipe(): void {
    console.log('creating a new recipe');
    let ingredients = this.createRecipeService.trimIngredients(
      this.ingredients
    );

    let instructions = this.createRecipeService.trimInstructions(
      this.instructions
    );

    let recipe: Recipe = {
      name: this.recipeName,
      image: this.recipeImage,
      instructions: instructions,
      ingredients: ingredients,
    };
    this.createRecipeService.createRecipe(this.ingredients, recipe).subscribe(
      (recipe) => {
        this.userService.addRecipeToUser(recipe.id).subscribe(
          () => {
            this.toastr.success(
              `Successfully created ${recipe.name} recipe`,
              'SUCCESS'
            );
            this.resetParameters();
          },
          (error: any) => this.toastr.error(error.message, 'ERROR')
        );
        // this.userService.getUserRecipes();
      },
      (error) => this.toastr.error(error.message, 'ERROR')
    );
    // let result: boolean = this.createRecipeService.createRecipe(
    //   this.ingredients.slice(),
    //   this.instructions.slice()
    // );
  }

  resetParameters() {
    this.recipeName = '';
    this.recipeImage = '';
    this.ingredients = [{ name: '' }];
    this.instructions = [{ step: 0, description: '' }];
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}

import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/model/Ingredient';
import { Recipe } from 'src/app/model/Recipe';
import { CreateRecipeService } from 'src/app/service/create-recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  recipeName: string = '';
  recipeImage: string = '';
  ingredients: Ingredient[] = [{ name: '' }];
  instructions: string[] = [''];
  constructor(
    private createRecipeService: CreateRecipeService,
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

  submitNewRecipe(): void {
    console.log('creating a new recipe');
    let recipe: Recipe = this.createRecipeService.dataToRecipe(
      this.recipeName,
      this.recipeImage,
      this.instructions
    );
    this.createRecipeService.createRecipe(this.ingredients, recipe).subscribe(
      (response) => {
        this.toastr.success(
          `Successfully created ${recipe.name} recipe`,
          'SUCCESS'
        );
        this.resetParameters();
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
    this.instructions = [''];
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}

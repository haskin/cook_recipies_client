import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/model/Ingredient';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
})
export class CreateRecipeComponent implements OnInit {
  recipeName: string = '';
  ingredients: Ingredient[] = [{ name: '' }];
  // ingredients: string[] = [''];
  directions: string[] = [''];
  constructor() {}
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
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}

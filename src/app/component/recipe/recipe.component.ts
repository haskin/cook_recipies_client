import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe?: Recipe;
  recipeId?: number;
  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => (this.recipe = recipeResponse));
  }

  getInstructions(): string[] {
    if (this.recipe) return this.recipe.instructions.split('|');
    return [];
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  recipe?: Recipe;
  recipeId?: number;
  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.activeRoute.snapshot.paramMap.get('recipeId'));
    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => (this.recipe = recipeResponse));
  }
}

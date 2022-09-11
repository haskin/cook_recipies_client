import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from './component/create-recipe/create-recipe.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RecipeComponent } from './component/recipe/recipe.component';
import { UpdateRecipeComponent } from './component/update-recipe/update-recipe.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
  },
  {
    path: 'user/recipe/create',
    component: CreateRecipeComponent,
  },
  {
    path: 'recipe/update/:recipeId',
    component: UpdateRecipeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

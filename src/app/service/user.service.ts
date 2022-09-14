import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, pipe, Subject, tap } from 'rxjs';
import { Recipe } from '../model/Recipe';
import { User } from '../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private readonly USER_URL: string = 'http://localhost:8080/api/user';
  loggedIn: boolean = false;
  recipesSubject = new Subject<Recipe[]>();
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    authService.getTokenActive().subscribe((tokenState) => {
      console.log('In user service: ' + tokenState);
      this.loggedIn = tokenState;
    });
  }

  ngOnInit(): void {}

  getUserInformation() {
    return this.httpClient.get<User>(this.USER_URL);
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn;
    // console.log('Token value: ' + this.token);
    // if (typeof this.token === undefined) return false;
    // if (typeof this.token !== undefined) return this.token.trim().length > 0;
    // return false;
  }

  getUserRecipes(): void {
    this.httpClient
      .get<Recipe[]>(`${this.USER_URL}/recipes`)
      .pipe(
        tap((recipes) => recipes.forEach((recipe) => console.log(recipe.name)))
      )
      .subscribe((recipes) => this.recipesSubject.next(recipes));
    // return this.httpClient.get<Recipe[]>(`${this.USER_URL}/recipes`);
  }

  addRecipeToUser(recipeId: number): any {
    return this.httpClient.put(`${this.USER_URL}/recipe/${recipeId}`, {});
  }

  deleteUserRecipe(recipeId: number) {
    let url = `${this.USER_URL}/recipe/${recipeId}`;
    console.log(url);
    this.httpClient
      .delete<Recipe>(url)
      .subscribe((response) => this.getUserRecipes());
  }
}

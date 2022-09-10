import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/Recipe';
import { User } from '../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  private readonly USER_URL: string = 'http://localhost:8080/api/user';
  loggedIn: boolean = false;
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

  getUserRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${this.USER_URL}/recipes`);
  }
}

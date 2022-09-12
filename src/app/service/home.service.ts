import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../model/Recipe';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly RECIPES_URL = 'http://localhost:8080/api/recipes';
  private searchTerm: string = '';
  searchTermSubject = new Subject<string>();
  searchRecipes$: Observable<Recipe[]> = of([]);
  constructor(private httpClient: HttpClient) {}

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermSubject.next(searchTerm);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(
      `${this.RECIPES_URL}?name=${this.searchTerm}`
    );
  }
}

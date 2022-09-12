import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../model/Recipe';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly RECIPE_URL = 'http://localhost:8080/api/recipes';
  constructor(private httpClient: HttpClient) {}

  search(searchTerm: string): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`this.RECIPE_URL/?name=${searchTerm}`);
  }
}

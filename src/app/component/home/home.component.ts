import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Recipe } from 'src/app/model/Recipe';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes$: Observable<Recipe[]> = of([]);

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.recipes$ = this.homeService.searchTermSubject.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(() => this.homeService.getRecipes())
    );
  }

  search(searchTerm: string): void {
    let searchTermTrimmed = searchTerm.trim();
    if (searchTermTrimmed.length != 0)
      this.homeService.search(searchTerm.trim());
    // this.homeService
    //   .search(searchValue)
    //   .subscribe((recipes) => (this.recipes = recipes));
  }
}

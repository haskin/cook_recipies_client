import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private homeService: HomeService) {}
  ngOnInit(): void {}

  search(searchValue: string): void {
    this.homeService
      .search(searchValue)
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
